import { CivicReport, AwsTelemetryEvent } from '@/types';

export interface DemoStepState {
  currentStepIndex: number;
  totalSteps: number;
  stepTitle: string;
  stepDescription: string;
  serviceBadge: string;
  isRunning: boolean;
  isComplete: boolean;
}

export const DEMO_SCENARIO_STEPS = [
  {
    title: 'Citizen Incident Intake',
    description: 'Citizen Elena Rostova captures 14-inch asphalt fissure on Market St via mobile PWA.',
    service: 'Amazon API Gateway',
    delayMs: 1400,
  },
  {
    title: 'Secure Evidence Archival',
    description: 'Evidence image uploaded to S3 with SHA-256 integrity hash & SSE-S3 256-bit AES encryption.',
    service: 'Amazon S3',
    delayMs: 1500,
  },
  {
    title: 'Bedrock Vision Reasoning',
    description: 'Claude 3.5 Sonnet multimodal analysis detects asphalt cavity void, exposed gravel, and traffic deflection risk.',
    service: 'Amazon Bedrock',
    delayMs: 1800,
  },
  {
    title: 'Severity Scoring (94/100)',
    description: 'Severity escalated to 94/100 (CRITICAL) due to pedestrian crosswalk proximity and high bus volume.',
    service: 'Amazon Bedrock',
    delayMs: 1400,
  },
  {
    title: 'Vector Duplicate Clustering',
    description: 'OpenSearch kNN matches 6 citizen reports within 120m corridor; similarity computed at 91.4%.',
    service: 'Amazon OpenSearch',
    delayMs: 1600,
  },
  {
    title: 'Civic Impact Score: 92',
    description: 'Proprietary Priority Model evaluates Safety (+28), Population (+24), Severity (+22) -> 92/100 Priority.',
    service: 'AWS Lambda',
    delayMs: 1500,
  },
  {
    title: 'Smart Department Routing',
    description: 'AI routes incident to Road Maintenance & Infrastructure with 96% confidence.',
    service: 'Amazon DynamoDB',
    delayMs: 1400,
  },
  {
    title: 'EventBridge Bus Dispatch',
    description: 'Emitted event "CivicFix.UrgentActionTriggered" to dispatch webhooks and emergency SMS queue.',
    service: 'Amazon EventBridge',
    delayMs: 1400,
  },
  {
    title: 'Step Functions Orchestration',
    description: 'Resolution state machine execution initialized: arn:aws:states:...:2048-exec.',
    service: 'AWS Step Functions',
    delayMs: 1600,
  },
  {
    title: 'Urgent Action Queue Escalation',
    description: 'Incident flagged in AI Priority Queue as Rank #01 with active 4h SLA countdown.',
    service: 'CivicFix Dashboard',
    delayMs: 1500,
  },
  {
    title: 'Field Crew Dispatch & Repair',
    description: 'Road Maintenance Truck #4 arrives on scene; cold-patch roller compaction initiated.',
    service: 'Municipal Dispatch',
    delayMs: 1600,
  },
  {
    title: 'Before / After Proof Verified',
    description: 'Inspector David Rodriguez uploads post-repair photograph; before/after slider verifies restoration.',
    service: 'Amazon S3 & DynamoDB',
    delayMs: 1800,
  },
  {
    title: 'Civic Health Score Uplift',
    description: 'Sector 14 Civic Health Score increases from 72 to 78; Master Incident INC-2048 marked RESOLVED.',
    service: 'Civic Digital Twin',
    delayMs: 1400,
  },
];

export async function runDeterministicDemo(
  onStepUpdate: (state: DemoStepState) => void,
  onComplete: () => void
) {
  for (let i = 0; i < DEMO_SCENARIO_STEPS.length; i++) {
    const step = DEMO_SCENARIO_STEPS[i];
    onStepUpdate({
      currentStepIndex: i + 1,
      totalSteps: DEMO_SCENARIO_STEPS.length,
      stepTitle: step.title,
      stepDescription: step.description,
      serviceBadge: step.service,
      isRunning: true,
      isComplete: false,
    });
    await new Promise((resolve) => setTimeout(resolve, step.delayMs));
  }

  onStepUpdate({
    currentStepIndex: DEMO_SCENARIO_STEPS.length,
    totalSteps: DEMO_SCENARIO_STEPS.length,
    stepTitle: 'Demo Complete: Issue Successfully Resolved',
    stepDescription: 'End-to-end flow verified across 10 AWS services with verified before/after proof.',
    serviceBadge: 'CivicFix AI 2.0',
    isRunning: false,
    isComplete: true,
  });

  onComplete();
}
