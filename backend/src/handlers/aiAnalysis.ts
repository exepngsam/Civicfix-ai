import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';

const bedrock = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

const MODEL_ID =
  process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-5-sonnet-20241022-v2:0';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { description, category, address, imageBase64, imageMediaType } = body;

    const systemPrompt = `You are CivicFix AI, an automated municipal incident triage classifier.
You analyze photographic evidence and citizen complaints.
Return a STRICT JSON object with NO markdown formatting:
{
  "summary": "Concise summary of the civic hazard",
  "detectedObjects": ["Object 1", "Object 2"],
  "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
  "severityScore": number (0-100),
  "severityReasoning": "Why this score was assigned",
  "recommendedAction": "Immediate remediation steps for municipal crew",
  "targetDepartment": "Road Maintenance & Infrastructure" | "Municipal Electrical & Power Bureau" | "Sanitation & Waste Management" | "Public Utilities Commission (Water Division)" | "Structural Engineering & Bridges" | "Civic Blight & Graffiti Abatement",
  "confidenceScore": number (0-100),
  "estimatedRepairHours": number
}`;

    const contentBlocks: any[] = [];

    // Attach multimodal image block if present
    if (imageBase64 && imageMediaType) {
      contentBlocks.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: imageMediaType,
          data: imageBase64,
        },
      });
    }

    contentBlocks.push({
      type: 'text',
      text: `Analyze this civic report:
Location: ${address || 'Urban intersection'}
Category Cue: ${category || 'General civic issue'}
Citizen Description: ${description || 'Damaged municipal infrastructure'}`,
    });

    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: contentBlocks,
        },
      ],
    };

    const startTime = Date.now();
    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload),
    });

    const response = await bedrock.send(command);
    const latencyMs = Date.now() - startTime;

    const decoded = JSON.parse(new TextDecoder().decode(response.body));
    const responseText = decoded.content?.[0]?.text || '{}';

    // Parse JSON result from Bedrock model output
    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText.trim());
    } catch {
      // Fallback regex extraction if model returned wrapped text
      const match = responseText.match(/\{[\s\S]*\}/);
      parsedResult = match ? JSON.parse(match[0]) : {};
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ...parsedResult,
        inferenceLatencyMs: latencyMs,
        bedrockModel: MODEL_ID,
      }),
    };
  } catch (err: any) {
    console.error('Error invoking Bedrock model:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err.message || 'Bedrock inference failed',
        mode: 'DEMO_MODE_RECOMMENDED',
      }),
    };
  }
};
