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

export interface CivicImpactBreakdown {
  safetyRisk: number; // e.g. 0 - 30
  affectedPopulation: number; // e.g. 0 - 25
  severity: number; // e.g. 0 - 25
  reportDensity: number; // e.g. 0 - 12
  issueAge: number; // e.g. 0 - 8
  totalScore: number; // 0 - 100
  level: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  modelName: string; // "CivicFix AI Priority Model"
  estimatedPopulationAffected?: number;
}

export type SlaStatus = 'ON_TRACK' | 'AT_RISK' | 'OVERDUE';

export interface SlaInfo {
  targetHours: number;
  elapsedHours: number;
  remainingHours: number;
  status: SlaStatus;
  escalationContact: string;
  recommendedEscalation?: string;
}

export interface PriorityRationale {
  rank: number;
  reasons: string[];
  recommendedAction: string;
  responsibleDepartment: string;
}

export interface MasterIncidentInfo {
  isMaster: boolean;
  masterId?: string;
  mergedCount: number;
  similarityScore: number;
  duplicateReportIds: string[];
}

export interface ResolutionProof {
  beforeImageUrl: string;
  afterImageUrl?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  notes?: string;
}

export interface TimelineMilestone {
  step: 'SUBMITTED' | 'AI_VERIFIED' | 'DEPARTMENT_ASSIGNED' | 'FIELD_NOTIFIED' | 'IN_PROGRESS' | 'RESOLVED';
  label: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
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
  zone: string;
  department: string;
  evidenceUrl: string;
  evidenceHash: string; // SHA-256
  duplicateScore: number; // 0 - 100
  similarReportsCount: number;
  aiAnalysis: AIAnalysisResult;
  civicImpact: CivicImpactBreakdown;
  sla: SlaInfo;
  priorityRationale: PriorityRationale;
  departmentConfidence: number;
  humanReviewRequired: boolean;
  timeline: TimelineMilestone[];
  masterIncident?: MasterIncidentInfo;
  resolutionProof?: ResolutionProof;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  stepFunctionExecutionArn?: string;
}

export interface CivicZone {
  id: string;
  name: string;
  healthScore: number; // 0 - 100 (Civic Health Score composite)
  trendWeeklyPercent: number; // e.g. +32, -12
  trendDirection: 'UP' | 'DOWN' | 'STABLE';
  activeReports: number;
  criticalCount: number;
  avgResolutionHours: number;
  density: string; // e.g. "14.2 reports/km²"
  topCategories: { category: ReportCategory; count: number; percentage: number }[];
  recommendedIntervention: string;
}

export interface PredictiveAlert {
  id: string;
  zoneName: string;
  category: ReportCategory;
  title: string;
  percentageIncrease: number;
  timeframe: string;
  recommendedAction: string;
  hasSufficientData: boolean;
  isSimulated: boolean;
}

export interface RootCauseInsight {
  id: string;
  title: string;
  incidentCount: number;
  primaryCategory: ReportCategory;
  corridor: string;
  symptomFlow: string[];
  hypothesis: string;
  recommendedAction: string;
  systemicSavingsHours: number;
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
  | 'Amazon API Gateway'
  | 'AWS Amplify';

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
  zone?: string;
  slaStatus?: string;
}

export type AppMode = 'DEMO' | 'REAL_AWS';

export type LanguageCode = 'en' | 'hi' | 'or';
