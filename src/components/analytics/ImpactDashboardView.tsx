import React from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  GitMerge,
  ShieldAlert,
  Building2,
  TrendingUp,
  Award,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const ImpactDashboardView: React.FC = () => {
  const stats = [
    {
      label: 'Reports Processed',
      value: '1,482',
      trend: '+24% this month',
      icon: ShieldCheck,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      label: 'Estimated Affected Population',
      value: '248,500',
      sublabel: 'Citizens protected by proactive fixes',
      icon: Users,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      disclaimer: 'Based on census footfall density model',
    },
    {
      label: 'Issues Resolved',
      value: '1,189',
      trend: '80.2% resolution rate',
      icon: CheckCircle2,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      label: 'Avg Resolution Time',
      value: '4.2 hrs',
      trend: '↓ 18% improvement vs last quarter',
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Duplicate Reports Prevented',
      value: '342',
      sublabel: 'Consolidated into unified dispatches',
      icon: GitMerge,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      label: 'Critical Escalations Handled',
      value: '142',
      trend: '100% within 4h SLA safety window',
      icon: ShieldAlert,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
  ];

  const topImprovements = [
    {
      title: 'Mission St Transit Lighting Corridor Rebuilt',
      zone: 'Sector 14',
      impact: '14,200 nighttime commuters protected',
      date: 'Completed 2 days ago',
      category: 'Streetlights & Electrical',
    },
    {
      title: '5th & Market St High-Velocity Cavity Sealed',
      zone: 'Sector 14',
      impact: 'Zero automotive axle damage incidents reported since closure',
      date: 'Completed yesterday',
      category: 'Road Maintenance',
    },
    {
      title: 'Shattuck Ave 12-inch Potable Main Sleeve Clamped',
      zone: 'Waterfront District',
      impact: '1.2M gallons of municipal treated water conserved',
      date: 'Completed 3 days ago',
      category: 'Public Utilities (Water)',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Civic ROI & Outcomes
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">Macro Impact Intelligence</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Municipal Impact & Performance Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Measurable city improvements delivered through automated triage, systemic root-cause elimination, and transparent citizen verification.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 shrink-0">
            <Award className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Citizen Trust Index</div>
              <div className="text-lg font-black font-mono text-white">4.8 / 5.0 ★</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">{s.label}</span>
                <div className={`p-2 rounded-xl border ${s.bg} ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-3xl font-mono font-black text-white mb-1">{s.value}</div>

              {s.trend && (
                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{s.trend}</span>
                </div>
              )}

              {s.sublabel && <div className="text-xs text-slate-400">{s.sublabel}</div>}

              {s.disclaimer && (
                <div className="text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-800/60 italic">
                  * {s.disclaimer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Top Civic Improvements Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">
              TOP CIVIC IMPROVEMENTS
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Verified Before/After Evidence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topImprovements.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-cyan-400 font-mono font-semibold">{item.zone}</span>
                <span>{item.date}</span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
              <p className="text-xs text-emerald-400 font-medium leading-relaxed">
                ✓ {item.impact}
              </p>
              <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800/80">
                Dept: {item.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
