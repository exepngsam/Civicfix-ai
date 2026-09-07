import React from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { CivicImpactScore } from '@/components/ui/CivicImpactScore';
import { CivicReport } from '@/types';
import { CIVIC_ZONES } from '@/lib/mockData';
import {
  FileText,
  AlertOctagon,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
  MapPin,
  Flame,
  GitMerge,
  Building,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface OverviewViewProps {
  reports: CivicReport[];
  onSelectReport: (report: CivicReport) => void;
  onNavigateToMap: () => void;
  onNavigateToReports: () => void;
  onNavigateToPriority?: () => void;
  onNavigateToHotspots?: () => void;
  onOpenReportWizard: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  reports,
  onSelectReport,
  onNavigateToMap,
  onNavigateToReports,
  onNavigateToPriority,
  onNavigateToHotspots,
  onOpenReportWizard,
}) => {
  const totalCount = reports.length;
  const criticalReports = reports.filter(
    (r) => r.severity === 'CRITICAL' && r.status !== 'RESOLVED'
  );
  const inProgressCount = reports.filter((r) => r.status === 'IN_PROGRESS').length;
  const resolvedCount = reports.filter((r) => r.status === 'RESOLVED').length;

  return (
    <div className="space-y-8">
      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="TOTAL REPORTS"
          value={totalCount}
          subtitle="All Municipal Incidents"
          trend="+18% volume this month"
          icon={FileText}
          variant="cyan"
          onClick={onNavigateToReports}
        />
        <MetricCard
          title="CRITICAL HAZARDS"
          value={criticalReports.length}
          subtitle="Priority Impact Model"
          trend="Immediate action required"
          icon={AlertOctagon}
          variant="critical"
          onClick={onNavigateToPriority || onNavigateToReports}
        />
        <MetricCard
          title="ACTIVE IN DISPATCH"
          value={inProgressCount}
          subtitle="Field Crews Deployed"
          trend="Average 38m arrival"
          icon={Clock}
          variant="orange"
          onClick={onNavigateToReports}
        />
        <MetricCard
          title="RESOLVED & VERIFIED"
          value={resolvedCount}
          subtitle="Before/After Proof Verified"
          trend="82.4% resolution rate"
          icon={CheckCircle2}
          variant="emerald"
          onClick={onNavigateToReports}
        />
      </div>

      {/* Critical Life-Safety Alert Banner */}
      {criticalReports.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 shadow-glowCritical flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 shrink-0">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white font-mono uppercase">
                  HIGH SEVERITY ALERT: {criticalReports.length} Active Life-Safety Events
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/30 text-rose-300">
                  IMMEDIATE TRIAGE
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Top Priority: &ldquo;{criticalReports[0]?.title}&rdquo; at {criticalReports[0]?.address}.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectReport(criticalReports[0])}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 shadow-lg shadow-rose-600/30"
          >
            <span>Investigate Emergency</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Lightweight Digital Twin Sector Highlights */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold font-mono text-white tracking-wider uppercase">
              CIVIC DIGITAL TWIN • SECTOR HEALTH
            </h3>
          </div>
          {onNavigateToHotspots && (
            <button
              onClick={onNavigateToHotspots}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Explore Hotspots & Twin</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CIVIC_ZONES.map((zone) => {
            const isHealthy = zone.healthScore >= 80;
            const isModerate = zone.healthScore >= 70 && zone.healthScore < 80;
            const scoreColor = isHealthy ? 'text-emerald-400' : isModerate ? 'text-yellow-400' : 'text-rose-400';

            return (
              <div
                key={zone.id}
                onClick={onNavigateToHotspots}
                className="bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 p-3 rounded-xl cursor-pointer transition-all"
              >
                <div className="text-[11px] font-bold text-white truncate">{zone.name}</div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className={`text-lg font-black font-mono ${scoreColor}`}>
                    {zone.healthScore}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {zone.trendWeeklyPercent > 0 ? (
                      <span className="text-rose-400 flex items-center">
                        <TrendingUp className="w-2.5 h-2.5 mr-0.5" />+{zone.trendWeeklyPercent}%
                      </span>
                    ) : (
                      <span className="text-emerald-400 flex items-center">
                        <TrendingDown className="w-2.5 h-2.5 mr-0.5" />{zone.trendWeeklyPercent}%
                      </span>
                    )}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 truncate">
                  {zone.activeReports} reports
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Split: Active Feed & Department Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Active Feed */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-mono text-white tracking-tight">
                PRIORITY INCIDENT STREAM
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Multi-Factor Civic Impact Model (Safety, Density, Age)
              </p>
            </div>

            <button
              onClick={onNavigateToReports}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View All ({reports.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {reports.slice(0, 6).map((rep) => (
              <div
                key={rep.id}
                onClick={() => onSelectReport(rep)}
                className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 hover:shadow-lg rounded-2xl p-4 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center gap-4 group"
              >
                {/* Evidence Thumbnail */}
                <div className="w-full sm:w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-700/80 relative">
                  <img
                    src={rep.evidenceUrl}
                    alt={rep.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono text-white">
                    {rep.id}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <SeverityBadge severity={rep.severity} score={rep.severityScore} size="sm" />
                    <StatusBadge status={rep.status} size="sm" />
                    {rep.masterIncident?.isMaster && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                        <GitMerge className="w-2.5 h-2.5" />
                        <span>Master INC</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {rep.title}
                  </h4>

                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{rep.address}</span>
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-[10px] font-mono text-slate-500">
                    <span>Dept: {rep.department}</span>
                    <span>•</span>
                    <span className="text-slate-400">
                      SLA: <strong className={rep.sla?.status === 'OVERDUE' ? 'text-rose-400' : 'text-emerald-400'}>{rep.sla?.status ?? 'ON_TRACK'}</strong>
                    </span>
                  </div>
                </div>

                {/* Circular Civic Impact Score */}
                <div className="self-end sm:self-center shrink-0">
                  {rep.civicImpact && (
                    <CivicImpactScore impact={rep.civicImpact} size="sm" showDetailsOnClick={true} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 cols: Geospatial Radar & SLA Spotlight */}
        <div className="lg:col-span-4 space-y-5">
          {/* Map Spotlight */}
          <GlassCard glow="cyan" className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                GEOSPATIAL COMMAND
              </span>
              <span className="text-[10px] font-mono text-slate-400">{reports.length} PINS LIVE</span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Real-time interactive Leaflet map with CartoDB dark tiles, hotspot cluster analysis, and glowing civic status pins.
            </p>

            <button
              onClick={onNavigateToMap}
              className="mt-5 w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs uppercase tracking-wider hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Fullscreen Map</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </GlassCard>

          {/* Department Resolution Velocity SLA */}
          <GlassCard className="p-6 border-slate-800">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
              DEPARTMENT SLA PERFORMANCE
            </h4>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Road Infrastructure</span>
                  <span className="text-emerald-400 font-bold">96% on time</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-[96%] h-full bg-emerald-400 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Electrical & Streetlights</span>
                  <span className="text-cyan-400 font-bold">92% on time</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-[92%] h-full bg-cyan-400 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Water & Sewage</span>
                  <span className="text-amber-400 font-bold">88% on time</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-[88%] h-full bg-amber-400 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Sanitation & Blight</span>
                  <span className="text-emerald-400 font-bold">94% on time</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-[94%] h-full bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
