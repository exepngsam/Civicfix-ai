import React from 'react';
import { DemoStepState } from '@/lib/demoRunner';
import { Sparkles, CheckCircle2, Cloud, ArrowRight, X, Radio } from 'lucide-react';

interface DemoProgressModalProps {
  state: DemoStepState | null;
  onClose: () => void;
}

export const DemoProgressModal: React.FC<DemoProgressModalProps> = ({ state, onClose }) => {
  if (!state || (!state.isRunning && !state.isComplete)) return null;

  const progressPercent = Math.round((state.currentStepIndex / state.totalSteps) * 100);

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-slide-up">
      <div className="bg-slate-900/95 border border-cyan-500/40 rounded-2xl p-5 shadow-2xl backdrop-blur-xl text-slate-100 space-y-3 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button if done */}
        {state.isComplete && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider">
              {state.isComplete ? 'DEMO COMPLETED' : 'HACKATHON DEMO RUNNER (13 STEPS)'}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-300">
            {state.currentStepIndex} / {state.totalSteps}
          </span>
        </div>

        {/* Title & Service */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              {state.isComplete ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Sparkles className="w-4 h-4 text-amber-400" />
              )}
              <span>{state.stepTitle}</span>
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
              {state.serviceBadge}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {state.stepDescription}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {state.isComplete && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
