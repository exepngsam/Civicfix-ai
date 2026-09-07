import React, { useState } from 'react';
import { CivicImpactBreakdown } from '@/types';
import { ShieldAlert, Users, AlertTriangle, MapPin, Clock, Info, X } from 'lucide-react';

interface CivicImpactScoreProps {
  impact: CivicImpactBreakdown;
  size?: 'sm' | 'md' | 'lg';
  showDetailsOnClick?: boolean;
  className?: string;
}

export const CivicImpactScore: React.FC<CivicImpactScoreProps> = ({
  impact,
  size = 'md',
  showDetailsOnClick = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const score = Math.round(impact?.totalScore ?? 0);
  const strokeColor =
    score >= 90
      ? 'text-rose-500'
      : score >= 75
      ? 'text-amber-500'
      : score >= 50
      ? 'text-yellow-400'
      : 'text-emerald-400';

  const badgeBg =
    score >= 90
      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
      : score >= 75
      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
      : score >= 50
      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

  const radius = size === 'sm' ? 18 : size === 'lg' ? 46 : 30;
  const strokeWidth = size === 'sm' ? 3.5 : size === 'lg' ? 6 : 4.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const svgSize = (radius + strokeWidth) * 2;

  const handleScoreClick = (e: React.MouseEvent) => {
    if (showDetailsOnClick) {
      e.stopPropagation();
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={handleScoreClick}
        className={`inline-flex items-center gap-2.5 ${showDetailsOnClick ? 'cursor-pointer group' : ''} ${className}`}
        title="CivicFix AI Priority Model (Click for factor breakdown)"
      >
        <div className="relative flex items-center justify-center">
          <svg width={svgSize} height={svgSize} className="transform -rotate-90">
            {/* Background ring */}
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="text-slate-800/80"
            />
            {/* Animated progress ring */}
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`${strokeColor} transition-all duration-700 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span
              className={`font-black tracking-tight leading-none ${
                size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-2xl font-mono' : 'text-sm font-mono'
              } text-white group-hover:scale-105 transition-transform`}
            >
              {score}
            </span>
          </div>
        </div>

        {size !== 'sm' && (
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Civic Impact
            </span>
            <span className={`text-[11px] font-black uppercase tracking-wide border px-1.5 py-0.5 rounded w-fit ${badgeBg}`}>
              {impact.level}
            </span>
          </div>
        )}
      </div>

      {/* Factor Breakdown Modal / Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 max-w-md w-full shadow-2xl relative text-slate-100 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close factor breakdown"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-xl border ${badgeBg}`}>
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Civic Impact Breakdown</h3>
                <p className="text-xs text-slate-400 font-mono">CivicFix AI Priority Model</p>
              </div>
            </div>

            {/* Score Showcase */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-medium">TOTAL PRIORITY SCORE</div>
                <div className="text-3xl font-mono font-black text-white flex items-baseline gap-2">
                  <span>{score}</span>
                  <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeBg}`}>
                {impact.level} PRIORITY
              </div>
            </div>

            {/* Factor Breakdown List */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span className="text-sm text-slate-200">Safety Risk</span>
                </div>
                <span className="font-mono text-sm font-bold text-rose-400">+{impact.safetyRisk.toString().padStart(2, '0')}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-200">Affected Population</span>
                    {impact.estimatedPopulationAffected && (
                      <span className="text-[10px] text-slate-400">
                        ~{impact.estimatedPopulationAffected.toLocaleString()} citizens estimated
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-cyan-400">+{impact.affectedPopulation.toString().padStart(2, '0')}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-slate-200">Severity</span>
                </div>
                <span className="font-mono text-sm font-bold text-amber-400">+{impact.severity.toString().padStart(2, '0')}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm text-slate-200">Report Density (Clusters)</span>
                </div>
                <span className="font-mono text-sm font-bold text-indigo-400">+{impact.reportDensity.toString().padStart(2, '0')}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-200">Issue Age / Unresolved Duration</span>
                </div>
                <span className="font-mono text-sm font-bold text-purple-400">+{impact.issueAge.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Disclaimer / Model tag */}
            <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-800/30 p-3 rounded-lg border border-slate-800">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p>
                Calculated dynamically via the <span className="text-slate-200 font-semibold">CivicFix AI Priority Model</span> to rank municipal resource dispatch. Not an official government metric.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
