export type ReportCategory =
  | 'road_damage'
  | 'streetlights'
  | 'garbage_overflow'
  | 'water_leak'
  | 'public_hazard'
  | 'infrastructure'
  | 'other';

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type ReportStatus =
  | 'REPORTED'
  | 'AI_VERIFIED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'RESOLVED';

export interface AIAnalysisResult {
  summary: string;
  detectedObjects: string[];
  severityReasoning: string;
  recommendedAction: string;
  targetDepartment: string;
  confidenceScore: number;
  duplicateProbability: number;
  estimatedRepairHours: number;
  s3Key: string;
  bedrockModel: string;
  inferenceLatencyMs: number;
  boundingBoxes?: {
    label: string;
    box: [number, number, number, number]; // [ymin, xmin, ymax, xmax] normalized
    confidence: number;
  }[];
}

export interface CivicReport {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: ReportCategory;
  severity: SeverityLevel;
  severityScore: number; // 0 - 100
  confidence: number; // percentage, e.g. 97.2
  status: ReportStatus;
  latitude: number;
  longitude: number;
  address: string;
  department: string;
  evidenceUrl: string;
  evidenceHash: string; // SHA-256
  duplicateScore: number; // 0 - 100
  similarReportsCount: number;
  aiAnalysis: AIAnalysisResult;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  stepFunctionExecutionArn?: string;
}

export type AwsService =
  | 'Amazon Bedrock'
  | 'Amazon S3'
  | 'Amazon DynamoDB'
  | 'Amazon OpenSearch'
  | 'Amazon EventBridge'
  | 'AWS Step Functions'
  | 'Amazon Cognito'
  | 'AWS Lambda'
  | 'Amazon API Gateway';

export interface AwsTelemetryEvent {
  id: string;
  timestamp: string;
  service: AwsService;
  action: string;
  details: string;
  status: 'SUCCESS' | 'IN_PROGRESS' | 'FAILED';
  latencyMs: number;
}

export interface WorkflowStep {
  id: string;
  name: string;
  service: AwsService;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  durationMs: number;
  timestamp: string;
  details: string;
}

export interface StepFunctionExecution {
  executionArn: string;
  reportId: string;
  status: 'RUNNING' | 'SUCCEEDED' | 'FAILED';
  startedAt: string;
  endedAt?: string;
  steps: WorkflowStep[];
}

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  role: 'CITIZEN' | 'CITY_DISPATCHER' | 'ADMIN';
  cognitoSub: string;
  isAuthenticated: boolean;
}

export interface FilterCriteria {
  searchQuery: string;
  category: string;
  severity: string;
  status: string;
  department: string;
}

export type AppMode = 'DEMO' | 'REAL_AWS';
