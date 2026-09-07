import React, { useState } from 'react';
import { SAMPLE_STEP_FUNCTION_EXECUTION } from '@/lib/mockData';
import { WorkflowStep } from '@/types';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  Network,
  CheckCircle2,
  Clock,
  ArrowDown,
  Server,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

export const WorkflowVisualizerView: React.FC = () => {
  const execution = SAMPLE_STEP_FUNCTION_EXECUTION;
  const [selectedStep, setSelectedStep] = useState<WorkflowStep>(execution.steps[2]); // Default to Bedrock step

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
            <Network className="w-4 h-4 text-emerald-400" />
            <span>AWS STEP FUNCTIONS STATE MACHINE</span>
          </div>
          <h2 className="text-3xl font-black font-mono text-white tracking-tight">
            WORKFLOW ORCHESTRATOR
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Automated intake, verification, Bedrock analysis, and municipal resolution pipeline
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            EXECUTION: RUNNING
          </span>
        </div>
      </div>

      {/* State Machine Info Bar */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 uppercase">EXECUTION ARN:</span>
          <span className="text-slate-300 truncate max-w-xs">{execution.executionArn}</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Started: {new Date(execution.startedAt).toLocaleTimeString()}</span>
          <span>•</span>
          <span>Target Report: {execution.reportId}</span>
          <span>•</span>
          <span className="text-emerald-400">8 Steps Orchestrated</span>
        </div>
      </div>

      {/* Main Workflow DAG Visualizer & Step Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Vertical State Machine Pipeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-3 relative">
            {execution.steps.map((step, index) => {
              const isSelected = selectedStep.id === step.id;
              const isRunning = step.status === 'RUNNING';
              const isCompleted = step.status === 'COMPLETED';

              return (
                <React.Fragment key={step.id}>
                  <div
                    onClick={() => setSelectedStep(step)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500 shadow-glowCyan scale-102 z-10'
                        : isRunning
                        ? 'bg-amber-950/20 border-amber-500/50 text-slate-200'
                        : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs border shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : isRunning
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : isRunning ? (
                          <Clock className="w-5 h-5 animate-spin" />
                        ) : (
                          `0${index + 1}`
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold font-mono text-white truncate">
                            {step.name}
                          </h4>
                        </div>
                        <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                          {step.service} • {step.timestamp}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-civic-cyan">
                        {step.durationMs}ms
                      </span>
                      <span
                        className={`block text-[10px] font-mono font-bold uppercase mt-0.5 ${
                          isCompleted
                            ? 'text-emerald-400'
                            : isRunning
                            ? 'text-amber-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {step.status}
                      </span>
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  {index < execution.steps.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown className="w-4 h-4 text-slate-700" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right 5 cols: Step Inspector */}
        <div className="lg:col-span-5">
          <GlassCard glow="cyan" className="p-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono text-civic-cyan uppercase tracking-wider">
                STEP STATE INSPECTOR
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                ASL TASK STATE
              </span>
            </div>

            <h3 className="text-lg font-bold font-mono text-white mt-4">
              {selectedStep.name}
            </h3>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">AWS Resource:</span>
                <span className="text-white font-bold">{selectedStep.service}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Execution Duration:</span>
                <span className="text-civic-cyan font-bold">{selectedStep.durationMs}ms</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Execution Status:</span>
                <span className="text-emerald-400 font-bold">{selectedStep.status}</span>
              </div>
            </div>

            <div className="mt-5">
              <span className="text-xs font-mono text-slate-400 uppercase block mb-1.5">
                EXECUTION TELEMETRY LOG
              </span>
              <p className="text-xs text-slate-200 leading-relaxed p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono">
                {selectedStep.details}
              </p>
            </div>

            {/* ASL Definition Snippet */}
            <div className="mt-5">
              <span className="text-xs font-mono text-slate-400 uppercase block mb-1.5">
                AMAZON STATES LANGUAGE (ASL)
              </span>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
{`"${selectedStep.name.replace(/\\s+/g, '')}": {
  "Type": "Task",
  "Resource": "arn:aws:lambda:...:${selectedStep.service}",
  "Next": "EvaluateNextState",
  "Retry": [{ "ErrorEquals": ["States.ALL"], "MaxAttempts": 3 }]
}`}
              </pre>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
