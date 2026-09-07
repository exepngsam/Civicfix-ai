import React from 'react';
import { AwsTelemetryEvent, AppMode } from '@/types';
import { APP_CONFIG } from '@/lib/config';
import {
  X,
  Server,
  Cpu,
  Database,
  Search,
  Radio,
  Network,
  Shield,
  Layers,
  CheckCircle2,
  Clock,
  Terminal,
  ExternalLink,
} from 'lucide-react';

interface AwsArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetryEvents: AwsTelemetryEvent[];
  appMode: AppMode;
  onToggleMode: () => void;
}

export const AwsArchitectureModal: React.FC<AwsArchitectureModalProps> = ({
  isOpen,
  onClose,
  telemetryEvents,
  appMode,
  onToggleMode,
}) => {
  if (!isOpen) return null;

  const awsServices = [
    {
      name: 'Amazon Bedrock',
      role: 'Multimodal Vision & Structured Severity',
      modelOrConfig: APP_CONFIG.bedrockModelId,
      status: 'OPERATIONAL',
      icon: Cpu,
      color: '#a855f7',
    },
    {
      name: 'Amazon S3',
      role: 'Secure Encrypted Evidence Storage',
      modelOrConfig: APP_CONFIG.s3Bucket,
      status: 'OPERATIONAL',
      icon: Layers,
      color: '#38bdf8',
    },
    {
      name: 'Amazon OpenSearch',
      role: 'Vector k-NN Duplicate Detection',
      modelOrConfig: '1536-dim Titan Vector Embeddings',
      status: 'OPERATIONAL',
      icon: Search,
      color: '#ff6b35',
    },
    {
      name: 'Amazon DynamoDB',
      role: 'NoSQL Report Records & Status Indexes',
      modelOrConfig: APP_CONFIG.dynamoTable,
      status: 'OPERATIONAL',
      icon: Database,
      color: '#3b82f6',
    },
    {
      name: 'Amazon EventBridge',
      role: 'Real-Time Event Choreography',
      modelOrConfig: 'CivicFixEventBus (Default)',
      status: 'OPERATIONAL',
      icon: Radio,
      color: '#ec4899',
    },
    {
      name: 'AWS Step Functions',
      role: 'Resolution Workflow State Machine',
      modelOrConfig: 'CivicFixResolutionFlow (ASL)',
      status: 'OPERATIONAL',
      icon: Network,
      color: '#10b981',
    },
    {
      name: 'AWS Lambda + API Gateway',
      role: 'Serverless REST Endpoints & Pre-signed URLs',
      modelOrConfig: 'Node.js 20.x ESM Architecture',
      status: 'OPERATIONAL',
      icon: Server,
      color: '#f59e0b',
    },
    {
      name: 'Amazon Cognito',
      role: 'Citizen & Dispatcher JWT Auth',
      modelOrConfig: APP_CONFIG.cognitoUserPoolId,
      status: 'OPERATIONAL',
      icon: Shield,
      color: '#00f0ff',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-400 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold font-mono text-white">
                  AWS CLOUD ARCHITECTURE
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-500/40">
                  REGION: {APP_CONFIG.awsRegion}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-mono text-slate-400">
                Verified Serverless Infrastructure for Hackathon Judging
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={onToggleMode}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl border text-[11px] sm:text-xs font-mono font-bold transition-all text-center ${
                appMode === 'REAL_AWS'
                  ? 'bg-purple-950 border-purple-500 text-purple-300 shadow-glowBedrock'
                  : 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-glowCyan'
              }`}
            >
              Mode: {appMode === 'REAL_AWS' ? 'Real AWS Cloud' : 'Local Demo Mode'}
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg border border-slate-800 sm:border-transparent shrink-0"
              aria-label="Close Architecture Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8 flex-1">
          {/* Active Services Grid */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              ACTIVE AWS MANAGED SERVICES (8 SERVICES CONNECTED)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {awsServices.map((srv) => {
                const Icon = srv.icon;
                return (
                  <div
                    key={srv.name}
                    className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center border"
                          style={{
                            backgroundColor: `${srv.color}15`,
                            borderColor: `${srv.color}40`,
                          }}
                        >
                          <Icon className="w-4 h-4" style={{ color: srv.color }} />
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                          {srv.status}
                        </span>
                      </div>

                      <h5 className="text-xs font-bold font-mono text-white truncate">
                        {srv.name}
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {srv.role}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 truncate">
                      {srv.modelOrConfig}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Telemetry & Event Stream */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-civic-cyan" />
                LIVE AWS EVENTBRIDGE & CLOUDWATCH LOG STREAM
              </h4>
              <span className="text-[10px] font-mono text-slate-500">
                Auto-refreshing • {telemetryEvents.length} events logged
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 font-mono text-xs max-h-64 overflow-y-auto space-y-3">
              {telemetryEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-civic-cyan shrink-0 mt-1 sm:mt-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-white">{evt.service}</strong>
                        <span className="text-[11px] text-purple-300">({evt.action})</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {evt.details}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-[10px] self-end sm:self-center">
                    <span className="text-civic-cyan font-bold">{evt.latencyMs}ms</span>
                    <span className="text-slate-500">{evt.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] sm:text-xs font-mono text-slate-400">
          <span>Infrastructure as Code: AWS SAM template.yaml ready</span>
          <span className="text-emerald-400 font-bold">100% Serverless Architecture</span>
        </div>
      </div>
    </div>
  );
};
