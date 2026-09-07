import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MetricCard } from '@/components/ui/MetricCard';
import { BarChart3, TrendingUp, PieChart, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  // Category distribution
  const categories = [
    { name: 'Road Damage & Potholes', count: 428, pct: 34, color: '#ff3366' },
    { name: 'Garbage & Blight Overflow', count: 364, pct: 29, color: '#ff6b35' },
    { name: 'Streetlights & Electrical', count: 219, pct: 18, color: '#facc15' },
    { name: 'Water Main & Sewage Leaks', count: 185, pct: 15, color: '#00f0ff' },
    { name: 'Structural Infrastructure', count: 52, pct: 4, color: '#a855f7' },
  ];

  // Resolution time trend (Days of the week)
  const timeline = [
    { day: 'Mon', reports: 34, resolved: 31 },
    { day: 'Tue', reports: 48, resolved: 42 },
    { day: 'Wed', reports: 56, resolved: 52 },
    { day: 'Thu', reports: 41, resolved: 39 },
    { day: 'Fri', reports: 62, resolved: 58 },
    { day: 'Sat', reports: 28, resolved: 27 },
    { day: 'Sun', reports: 19, resolved: 18 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-civic-cyan uppercase tracking-widest mb-1">
          <BarChart3 className="w-4 h-4 text-civic-cyan" />
          <span>MUNICIPAL PERFORMANCE METRICS</span>
        </div>
        <h2 className="text-3xl font-black font-mono text-white tracking-tight">
          CIVIC INTELLIGENCE ANALYTICS
        </h2>
        <p className="text-xs font-mono text-slate-400 mt-1">
          City-wide SLA tracking, category distribution, and resolution velocity
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="AVG RESOLUTION TIME"
          value={3}
          subtitle="Hours to Complete Repair"
          trend="-24% from last month"
          icon={Clock}
          variant="cyan"
        />
        <MetricCard
          title="FIRST-HOUR TRIAGE RATE"
          value={98}
          subtitle="Bedrock Instant Verification"
          trend="98.2% triaged in < 60s"
          icon={TrendingUp}
          variant="emerald"
        />
        <MetricCard
          title="DUPLICATE CLUSTER SAVINGS"
          value={342}
          subtitle="Dispatches Prevented"
          trend="OpenSearch Vector Deduplication"
          icon={ShieldCheck}
          variant="orange"
        />
        <MetricCard
          title="CITIZEN SATISFACTION"
          value={94}
          subtitle="Net Promoter Score"
          trend="Based on 850 citizen surveys"
          icon={CheckCircle2}
          variant="bedrock"
        />
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Trend Bar Chart */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6 border-slate-800 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  WEEKLY REPORT INTAKE VS AUTOMATED RESOLUTIONS
                </span>
                <div className="flex items-center gap-4 text-[10px] font-mono">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-2.5 h-2.5 bg-slate-600 rounded-sm" />
                    Intake
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" />
                    Resolved
                  </span>
                </div>
              </div>

              {/* Animated Bar Chart */}
              <div className="mt-8 h-60 flex items-end justify-between gap-1.5 sm:gap-4 px-1 sm:px-2">
                {timeline.map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1.5 h-48">
                      {/* Intake Bar */}
                      <div
                        className="w-full max-w-[20px] bg-slate-700/80 rounded-t-md transition-all duration-500 hover:bg-slate-600"
                        style={{ height: `${(item.reports / 70) * 100}%` }}
                      />
                      {/* Resolved Bar */}
                      <div
                        className="w-full max-w-[20px] bg-emerald-400 rounded-t-md transition-all duration-500 shadow-glowEmerald hover:brightness-110"
                        style={{ height: `${(item.resolved / 70) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-slate-400 mt-2">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Total Volume: 288 Reports</span>
              <span className="text-emerald-400">92.7% Overall Clearance Ratio</span>
            </div>
          </GlassCard>
        </div>

        {/* Issues by Category Breakdown */}
        <div className="lg:col-span-5">
          <GlassCard className="p-6 border-slate-800 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  ISSUES BY CATEGORY (30 DAYS)
                </span>
                <PieChart className="w-4 h-4 text-civic-cyan" />
              </div>

              <div className="mt-6 space-y-4">
                {categories.map((cat) => (
                  <div key={cat.name} className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        {cat.name}
                      </span>
                      <span className="text-white font-bold">{cat.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${cat.pct}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-500 flex justify-between">
              <span>Classified via Amazon Bedrock</span>
              <span className="text-civic-cyan">1,248 Total Samples</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
