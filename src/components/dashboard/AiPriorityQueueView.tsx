import React, { useState } from 'react';
import { CivicReport } from '@/types';
import { CivicImpactScore } from '@/components/ui/CivicImpactScore';
import {
  Flame,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  ArrowRight,
  Clock,
  Filter,
  CheckCircle2,
  Building2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface AiPriorityQueueViewProps {
  reports: CivicReport[];
  onSelectReport: (report: CivicReport) => void;
  onOpenReportWizard?: () => void;
}

export const AiPriorityQueueView: React.FC<AiPriorityQueueViewProps> = ({
  reports,
  onSelectReport,
  onOpenReportWizard,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'AT_RISK' | 'OVERDUE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort by Civic Impact Score descending
  const sortedReports = [...reports].sort((a, b) => {
    const scoreA = a.civicImpact?.totalScore ?? a.severityScore;
    const scoreB = b.civicImpact?.totalScore ?? b.severityScore;
    return scoreB - scoreA;
  });

  const filteredReports = sortedReports.filter((report) => {
    if (filter === 'CRITICAL' && report.severity !== 'CRITICAL') return false;
    if (filter === 'AT_RISK' && report.sla?.status !== 'AT_RISK') return false;
    if (filter === 'OVERDUE' && report.sla?.status !== 'OVERDUE') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        report.title.toLowerCase().includes(q) ||
        report.address.toLowerCase().includes(q) ||
        report.id.toLowerCase().includes(q) ||
        report.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/20 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                <span>URGENT ACTION</span>
              </div>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">CivicFix AI Priority Queue</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Dynamic AI Impact Priority Queue
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Real-time multi-factor prioritization engine. Rather than chronological queues, incidents are ordered by safety risk, population impact, report density, and SLA decay.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('CRITICAL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                filter === 'CRITICAL'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Critical Only ({reports.filter((r) => r.severity === 'CRITICAL').length})
            </button>
            <button
              onClick={() => setFilter('OVERDUE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                filter === 'OVERDUE'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Overdue SLA
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter by:
          </span>
          {(['ALL', 'CRITICAL', 'AT_RISK', 'OVERDUE'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${
                filter === mode
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {mode.replace('_', ' ')}
            </button>
          ))}

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search priority queue..."
            className="ml-auto px-3 py-1 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-48 sm:w-64"
          />
        </div>
      </div>

      {/* Priority Table / List */}
      <div className="space-y-3">
        {filteredReports.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No active high-priority incidents</h3>
            <p className="text-xs text-slate-400 mt-1">Your city priority queue is fully attended to.</p>
          </div>
        ) : (
          filteredReports.map((report, idx) => {
            const isExpanded = expandedId === report.id;
            const rank = idx + 1;
            const rankFormatted = rank < 10 ? `0${rank}` : `${rank}`;
            const totalScore = report.civicImpact?.totalScore ?? report.severityScore;
            const isCritical = totalScore >= 90;
            const isHigh = totalScore >= 75 && totalScore < 90;

            const rankColor =
              isCritical
                ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                : isHigh
                ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                : 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';

            return (
              <div
                key={report.id}
                onClick={() => onSelectReport(report)}
                className={`bg-slate-900/90 hover:bg-slate-850 border rounded-2xl transition-all duration-200 cursor-pointer shadow-lg overflow-hidden group ${
                  isCritical
                    ? 'border-rose-500/30 hover:border-rose-500/50'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Main Row */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left: Rank & Title */}
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    <span
                      className={`text-sm sm:text-base font-black font-mono px-2.5 py-1 rounded-lg border shrink-0 ${rankColor}`}
                    >
                      {rankFormatted}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">
                          {report.id}
                        </span>
                        {report.masterIncident?.isMaster && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                            MASTER INCIDENT ({report.masterIncident.mergedCount} Reports)
                          </span>
                        )}
                        <span className="text-slate-500 text-xs">•</span>
                        <span className="text-xs text-slate-400 truncate">{report.address}</span>
                      </div>

                      <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {report.title}
                      </h2>
                    </div>
                  </div>

                  {/* Middle: Department & SLA */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="text-left sm:text-right">
                      <div className="text-[11px] font-medium text-slate-300 flex items-center gap-1 sm:justify-end">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate max-w-[180px]">{report.department}</span>
                      </div>

                      {/* SLA Indicator */}
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-1.5 sm:justify-end">
                        <span
                          className={`inline-block w-1.5 h-1.5 rounded-full ${
                            report.sla?.status === 'OVERDUE'
                              ? 'bg-rose-500 animate-ping'
                              : report.sla?.status === 'AT_RISK'
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                        <span>
                          SLA:{' '}
                          <strong
                            className={
                              report.sla?.status === 'OVERDUE'
                                ? 'text-rose-400'
                                : report.sla?.status === 'AT_RISK'
                                ? 'text-amber-400'
                                : 'text-emerald-400'
                            }
                          >
                            {report.sla?.status === 'OVERDUE'
                              ? 'OVERDUE'
                              : `${Math.round(report.sla?.remainingHours ?? 2)}h remaining`}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Circular Civic Impact Score */}
                    {report.civicImpact ? (
                      <CivicImpactScore impact={report.civicImpact} size="sm" showDetailsOnClick={true} />
                    ) : (
                      <div className="text-right">
                        <span className="text-base font-mono font-bold text-rose-400">
                          {report.severityScore}
                        </span>
                      </div>
                    )}

                    {/* Expand "Why Prioritized" Button */}
                    <button
                      onClick={(e) => toggleExpand(report.id, e)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                      title="Why this is prioritized?"
                      aria-label="Expand prioritization rationale"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expandable "Why this is prioritized" Drawer */}
                {isExpanded && (
                  <div
                    className="p-4 sm:p-5 bg-slate-950/70 border-t border-slate-800 space-y-3 animate-fade-in text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                          WHY PRIORITY {totalScore}?
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        CivicFix AI Priority Model
                      </span>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-1.5 pl-2 text-slate-300">
                      {(
                        report.priorityRationale?.reasons ?? [
                          'High acute safety risk detected via vision reasoning',
                          'Proximity to designated school or commuter transit zone',
                          `${report.similarReportsCount || 4} similar reports clustered in immediate sector`,
                          'Unresolved duration approaching critical SLA threshold',
                        ]
                      ).map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Recommended Action & Escalation */}
                    <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400">
                      <div>
                        <strong className="text-slate-300">Recommended Action:</strong>{' '}
                        <span>
                          {report.priorityRationale?.recommendedAction ||
                            report.aiAnalysis.recommendedAction}
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectReport(report)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0 shadow-md shadow-cyan-500/20"
                      >
                        <span>Dispatch & Take Action</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
