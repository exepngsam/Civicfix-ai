import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const eventBridge = new EventBridgeClient({});

const TABLE_NAME = process.env.REPORTS_TABLE || 'CivicFixReports';
const EVENT_BUS = process.env.EVENT_BUS_NAME || 'CivicFixEvents';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const handler = async (event: any) => {
  const method = event.requestContext?.http?.method || event.httpMethod;
  const path = event.requestContext?.http?.path || event.path;
  const pathParams = event.pathParameters;

  try {
    // GET /reports
    if (method === 'GET' && (!pathParams || !pathParams.id)) {
      const response = await ddb.send(new ScanCommand({ TableName: TABLE_NAME, Limit: 50 }));
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response.Items || []),
      };
    }

    // GET /reports/{id}
    if (method === 'GET' && pathParams?.id) {
      const response = await ddb.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { id: pathParams.id },
        })
      );
      if (!response.Item) {
        return { statusCode: 404, headers, body: JSON.stringify({ error: 'Report not found' }) };
      }
      return { statusCode: 200, headers, body: JSON.stringify(response.Item) };
    }

    // POST /reports
    if (method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const newReport = {
        ...body,
        id: body.id || `REP-${Date.now()}`,
        createdAt: body.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 1. Write to DynamoDB
      await ddb.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: newReport,
        })
      );

      // 2. Emit Event to EventBridge
      await eventBridge.send(
        new PutEventsCommand({
          Entries: [
            {
              Source: 'civicfix.api',
              DetailType: 'CivicFix.ReportCreated',
              Detail: JSON.stringify(newReport),
              EventBusName: EVENT_BUS,
            },
          ],
        })
      );

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newReport),
      };
    }

    // PATCH /reports/{id}
    if (method === 'PATCH' && pathParams?.id) {
      const body = JSON.parse(event.body || '{}');
      const updateExpr: string[] = [];
      const exprAttrNames: Record<string, string> = {};
      const exprAttrValues: Record<string, any> = {};

      if (body.status) {
        updateExpr.push('#st = :st');
        exprAttrNames['#st'] = 'status';
        exprAttrValues[':st'] = body.status;
      }
      if (body.department) {
        updateExpr.push('#dp = :dp');
        exprAttrNames['#dp'] = 'department';
        exprAttrValues[':dp'] = body.department;
      }
      updateExpr.push('#ua = :ua');
      exprAttrNames['#ua'] = 'updatedAt';
      exprAttrValues[':ua'] = new Date().toISOString();

      const result = await ddb.send(
        new UpdateCommand({
          TableName: TABLE_NAME,
          Key: { id: pathParams.id },
          UpdateExpression: `SET ${updateExpr.join(', ')}`,
          ExpressionAttributeNames: exprAttrNames,
          ExpressionAttributeValues: exprAttrValues,
          ReturnValues: 'ALL_NEW',
        })
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result.Attributes),
      };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  } catch (err: any) {
    console.error('Error in reports handler:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' }),
    };
  }
};
