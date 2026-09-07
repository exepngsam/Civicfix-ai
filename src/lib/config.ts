import { AppMode } from '@/types';

export interface AppConfig {
  awsRegion: string;
  bedrockModelId: string;
  s3Bucket: string;
  dynamoTable: string;
  opensearchEndpoint: string;
  apiBaseUrl: string;
  cognitoUserPoolId: string;
  cognitoClientId: string;
  isRealAwsConfigured: boolean;
  defaultMode: AppMode;
}

const env = import.meta.env;

const isConfigured = Boolean(
  env.VITE_AWS_REGION &&
  (env.VITE_API_BASE_URL || (env.VITE_BEDROCK_MODEL_ID && env.VITE_DYNAMODB_TABLE))
);

export const APP_CONFIG: AppConfig = {
  awsRegion: env.VITE_AWS_REGION || 'us-east-1',
  bedrockModelId: env.VITE_BEDROCK_MODEL_ID || 'anthropic.claude-3-5-sonnet-20241022-v2:0',
  s3Bucket: env.VITE_S3_BUCKET || 'civicfix-evidence-production',
  dynamoTable: env.VITE_DYNAMODB_TABLE || 'CivicFixReports',
  opensearchEndpoint: env.VITE_OPENSEARCH_ENDPOINT || 'https://search-civicfix-vectors.us-east-1.es.amazonaws.com',
  apiBaseUrl: env.VITE_API_BASE_URL || '',
  cognitoUserPoolId: env.VITE_COGNITO_USER_POOL_ID || 'us-east-1_civicfix98x',
  cognitoClientId: env.VITE_COGNITO_CLIENT_ID || '7k89civicfixclient',
  isRealAwsConfigured: isConfigured,
  defaultMode: isConfigured ? 'REAL_AWS' : 'DEMO',
};
