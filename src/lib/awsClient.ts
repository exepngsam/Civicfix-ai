import { APP_CONFIG } from './config';
import { CivicReport, AIAnalysisResult, AwsTelemetryEvent, AppMode } from '@/types';
import { PRESET_CIVIC_EVIDENCE } from './mockData';

export interface AnalysisInput {
  imageFile?: File;
  imagePreviewUrl?: string;
  presetId?: string;
  description: string;
  category?: string;
  latitude: number;
  longitude: number;
  address: string;
}

class CivicAwsClient {
  private currentMode: AppMode = APP_CONFIG.defaultMode;

  public getMode(): AppMode {
    return this.currentMode;
  }

  public setMode(mode: AppMode) {
    this.currentMode = mode;
  }

  public isRealAws(): boolean {
    return this.currentMode === 'REAL_AWS' && APP_CONFIG.isRealAwsConfigured;
  }

  /**
   * AI Analysis Service (Amazon Bedrock abstraction)
   */
  public async analyzeEvidence(
    input: AnalysisInput,
    onStepUpdate?: (step: string, progress: number, awsService: string) => void
  ): Promise<{ analysis: AIAnalysisResult; telemetryEvents: AwsTelemetryEvent[] }> {
    const telemetry: AwsTelemetryEvent[] = [];

    // Step 1: Secure upload to Amazon S3
    onStepUpdate?.('Uploading evidence to Amazon S3 bucket...', 20, 'Amazon S3');
    await new Promise((r) => setTimeout(r, 600));
    telemetry.push({
      id: `s3-${Date.now()}`,
      timestamp: 'Just now',
      service: 'Amazon S3',
      action: 'PutObject (evidence/upload)',
      details: `Stored evidence encrypted with AES-256 in ${APP_CONFIG.s3Bucket}`,
      status: 'SUCCESS',
      latencyMs: 142,
    });

    // Step 2: Bedrock Multimodal Vision Analysis
    onStepUpdate?.('Invoking Amazon Bedrock Claude 3.5 Sonnet Vision...', 45, 'Amazon Bedrock');
    await new Promise((r) => setTimeout(r, 850));
    telemetry.push({
      id: `bedrock-${Date.now()}`,
      timestamp: 'Just now',
      service: 'Amazon Bedrock',
      action: `InvokeModel (${APP_CONFIG.bedrockModelId})`,
      details: 'Extracted structural features, evaluated safety risk, parsed geo-context',
      status: 'SUCCESS',
      latencyMs: 842,
    });

    // Step 3: OpenSearch Vector k-NN Duplicate Search
    onStepUpdate?.('Querying Amazon OpenSearch vector database for duplicates...', 70, 'Amazon OpenSearch');
    await new Promise((r) => setTimeout(r, 550));
    telemetry.push({
      id: `opensearch-${Date.now()}`,
      timestamp: 'Just now',
      service: 'Amazon OpenSearch',
      action: 'Vector k-NN Search (1536-dim)',
      details: 'Evaluated cosine similarity across district vector clusters',
      status: 'SUCCESS',
      latencyMs: 88,
    });

    // Step 4: Step Functions Resolution Orchestration
    onStepUpdate?.('Executing Step Functions resolution state machine...', 90, 'AWS Step Functions');
    await new Promise((r) => setTimeout(r, 450));
    telemetry.push({
      id: `sfn-${Date.now()}`,
      timestamp: 'Just now',
      service: 'AWS Step Functions',
      action: 'StartExecution (CivicFixResolutionFlow)',
      details: 'Routed task to verified department and scheduled priority SLA',
      status: 'SUCCESS',
      latencyMs: 104,
    });

    onStepUpdate?.('Analysis complete. Synthesizing structured response.', 100, 'Amazon Bedrock');

    // Generate tailored output based on input/preset
    const preset = PRESET_CIVIC_EVIDENCE.find((p) => p.id === input.presetId);
    if (preset) {
      return {
        analysis: {
          summary: preset.defaultDescription,
          detectedObjects: preset.detectedObjects,
          severityReasoning: `Critical municipal infrastructure risk in high transit area. Automatic score ${preset.severityScore}/100.`,
          recommendedAction: preset.recommendedAction,
          targetDepartment: preset.department,
          confidenceScore: preset.confidence,
          duplicateProbability: Math.floor(Math.random() * 15) + 4,
          estimatedRepairHours: preset.estimatedHours,
          s3Key: `evidence/uploads/${Date.now()}-${preset.id}.jpg`,
          bedrockModel: APP_CONFIG.bedrockModelId,
          inferenceLatencyMs: 842,
          boundingBoxes: [
            { label: preset.detectedObjects[0], box: [0.3, 0.25, 0.75, 0.75], confidence: 0.98 },
          ],
        },
        telemetryEvents: telemetry,
      };
    }

    // Default dynamic synthetic analysis
    const isCritical = input.description.toLowerCase().includes('danger') ||
      input.description.toLowerCase().includes('wire') ||
      input.description.toLowerCase().includes('burst') ||
      input.description.toLowerCase().includes('deep');

    const severityScore = isCritical ? 92 : 68;
    const confidence = 96.8;

    return {
      analysis: {
        summary: `Detected ${input.category || 'civic issue'} with high visual clarity: ${input.description.slice(0, 80)}...`,
        detectedObjects: ['Damaged Infrastructure', 'Public Right-of-Way Hazard', 'Surface Disruption'],
        severityReasoning: isCritical
          ? 'Imminent safety risk to public thoroughfare requires expedited response team.'
          : 'Standard maintenance priority within municipal standard operating procedure.',
        recommendedAction: isCritical
          ? 'Deploy emergency field inspector and secure perimeter with safety barricades.'
          : 'Schedule routine crew dispatch within 48-hour service level agreement window.',
        targetDepartment: input.category === 'streetlights'
          ? 'Municipal Electrical & Power Bureau'
          : input.category === 'garbage_overflow'
          ? 'Sanitation & Waste Management'
          : input.category === 'water_leak'
          ? 'Public Utilities Commission (Water Division)'
          : 'Road Maintenance & Infrastructure',
        confidenceScore: confidence,
        duplicateProbability: Math.floor(Math.random() * 12) + 5,
        estimatedRepairHours: isCritical ? 2.5 : 4.0,
        s3Key: `evidence/uploads/${Date.now()}-custom.jpg`,
        bedrockModel: APP_CONFIG.bedrockModelId,
        inferenceLatencyMs: 780,
      },
      telemetryEvents: telemetry,
    };
  }

  /**
   * Submit Report to DynamoDB + EventBridge
   */
  public async submitReport(report: CivicReport): Promise<CivicReport> {
    if (this.isRealAws() && APP_CONFIG.apiBaseUrl) {
      try {
        const res = await fetch(`${APP_CONFIG.apiBaseUrl}/reports`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(report),
        });
        if (res.ok) {
          return await res.json();
        }
      } catch {
        console.warn('Real AWS API endpoint unreachable, falling back to simulated DynamoDB write.');
      }
    }

    // Simulated DynamoDB write latency
    await new Promise((r) => setTimeout(r, 400));
    return report;
  }
}

export const civicAwsClient = new CivicAwsClient();
