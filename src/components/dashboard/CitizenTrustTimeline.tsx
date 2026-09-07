import React from 'react';
import { TimelineMilestone } from '@/types';
import { CheckCircle2, Clock, Circle, ArrowRight } from 'lucide-react';

interface CitizenTrustTimelineProps {
  timeline: TimelineMilestone[];
  className?: string;
}

export const CitizenTrustTimeline: React.FC<CitizenTrustTimelineProps> = ({
  timeline,
  className = '',
}) => {
  // Fallback default 6-stage trust timeline if not provided
  const steps: TimelineMilestone[] =
    timeline && timeline.length > 0
      ? timeline
      : [
          { step: 'SUBMITTED', label: 'Report Submitted', timestamp: '03:42:15', completed: true },
          { step: 'AI_VERIFIED', label: 'AI Verified & Impact Scored', timestamp: '03:42:18', completed: true },
          { step: 'DEPARTMENT_ASSIGNED', label: 'Department Assigned', timestamp: '03:42:22', completed: true },
          { step: 'FIELD_NOTIFIED', label: 'Field Team Notified', timestamp: '04:00:10', completed: true },
          { step: 'IN_PROGRESS', label: 'Repair in Progress', timestamp: '04:15:00', completed: true, current: true },
          { step: 'RESOLVED', label: 'Resolved & Evidence Verified', timestamp: 'Pending', completed: false },
        ];

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400">
            Public Transparency
          </span>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            Citizen Trust Timeline
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
          Live Citizen Tracking
        </span>
      </div>

      {/* Step Sequence */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {steps.map((item, index) => {
          const isDone = item.completed && !item.current;
          const isCurrent = item.current;
          const isPending = !item.completed;

          return (
            <div key={index} className="relative flex items-start gap-3.5 group">
              {/* Node Icon */}
              <div className="absolute -left-6 mt-0.5 flex items-center justify-center">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                ) : isCurrent ? (
                  <div className="relative w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.6)] animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-slate-950" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-800/60 text-slate-600 border border-slate-700 flex items-center justify-center">
                    <Circle className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span
                    className={`text-xs font-semibold ${
                      isDone
                        ? 'text-slate-200'
                        : isCurrent
                        ? 'text-cyan-400 font-bold'
                        : 'text-slate-500'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isCurrent && (
                    <span className="ml-2 text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/30">
                      ACTIVE
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Protected privacy layer (no internal staff PII exposed)</span>
        <span className="text-cyan-400 font-mono">Immutable audit log</span>
      </div>
    </div>
  );
};
