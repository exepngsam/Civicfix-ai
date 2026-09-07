import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, ArrowDownUp, AlertOctagon, AlertTriangle, AlertCircle, Info, RefreshCw } from 'lucide-react';

interface TriageItem {
  id: string;
  title: string;
  category: string;
  score: number;
  tier: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  time: string;
}

export const StorySectionPriority: React.FC = () => {
  const [isSorted, setIsSorted] = useState<boolean>(true);

  const initialItems: TriageItem[] = [
    { id: '1', title: 'Live 240V Cable Sparking on Sidewalk', category: 'Streetlights', score: 96, tier: 'CRITICAL', time: '2m ago' },
    { id: '2', title: 'Graffiti on Park Bench', category: 'Public Blight', score: 28, tier: 'LOW', time: '8m ago' },
    { id: '3', title: '14-inch Cavity on Market St Crossing', category: 'Road Damage', score: 94, tier: 'CRITICAL', time: '12m ago' },
    { id: '4', title: 'Clogged Grate Causing Minor Puddle', category: 'Water', score: 55, tier: 'MEDIUM', time: '15m ago' },
    { id: '5', title: 'Water Main Rupture Flooding 2 Lanes', category: 'Water', score: 92, tier: 'CRITICAL', time: '19m ago' },
    { id: '6', title: 'Commercial Waste Blocking Fire Exit', category: 'Sanitation', score: 82, tier: 'HIGH', time: '24m ago' },
    { id: '7', title: 'Faded Bike Lane Thermoplastic Paint', category: 'Roads', score: 62, tier: 'MEDIUM', time: '28m ago' },
    { id: '8', title: 'Broken Guardrail Over Electric Train Track', category: 'Infrastructure', score: 89, tier: 'HIGH', time: '35m ago' },
    { id: '9', title: 'Overgrown Grass Near Highway Sign', category: 'Landscaping', score: 32, tier: 'LOW', time: '40m ago' },
  ];

  const sortedItems = [...initialItems].sort((a, b) => b.score - a.score);
  const displayItems = isSorted ? sortedItems : initialItems;

  return (
    <section id="triage" className="py-24 relative border-t border-slate-800/80 bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-civic-orange uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4 text-civic-orange" />
              <span>SECTION 04 — INTELLIGENT TRIAGE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-white">
              PRIORITY, NOT NOISE.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl font-light">
              Cities receive thousands of complaints daily. CivicFix filters the static, using AI severity scoring to instantly bubble life-safety threats to the surface.
            </p>
          </div>

          <button
            onClick={() => setIsSorted(!isSorted)}
            className="mt-6 md:mt-0 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:border-civic-orange/50 text-center"
          >
            <ArrowDownUp className="w-4 h-4 text-civic-orange shrink-0" />
            <span>{isSorted ? 'SHOW UNFILTERED INTAKE CHAOS' : 'EXECUTE AI SEVERITY TRIAGE'}</span>
          </button>
        </div>

        {/* Priority Lanes Container */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6">
          <div className="p-3 sm:p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <AlertOctagon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-mono font-bold text-rose-300">CRITICAL</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
              3 Active
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-orange-950/30 border border-orange-500/30 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-mono font-bold text-orange-300">HIGH</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300">
              2 Active
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-300">MEDIUM</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
              2 Active
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-300">LOW</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
              2 Active
            </span>
          </div>
        </div>

        {/* Dynamic Re-ordering Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayItems.map((item, index) => {
            const isCritical = item.tier === 'CRITICAL';
            const isHigh = item.tier === 'HIGH';
            const isMedium = item.tier === 'MEDIUM';

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all duration-500 transform ${
                  isCritical
                    ? 'bg-rose-950/20 border-rose-500/40 shadow-glowCritical'
                    : isHigh
                    ? 'bg-orange-950/20 border-orange-500/40 shadow-glowOrange'
                    : isMedium
                    ? 'bg-amber-950/20 border-amber-500/30'
                    : 'bg-slate-900/40 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    RANK #{index + 1} • {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span
                      className={`text-xs font-black ${
                        isCritical
                          ? 'text-rose-400'
                          : isHigh
                          ? 'text-orange-400'
                          : isMedium
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      SCORE {item.score}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white mt-3 font-mono leading-snug">
                  {item.title}
                </h4>

                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{item.time}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-300'
                        : isHigh
                        ? 'bg-orange-500/20 text-orange-300'
                        : isMedium
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.tier}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
