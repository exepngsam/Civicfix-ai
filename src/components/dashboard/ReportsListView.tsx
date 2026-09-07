import React, { useState } from 'react';
import { CivicReport, FilterCriteria } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { Search, Filter, MapPin, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ReportsListViewProps {
  reports: CivicReport[];
  onSelectReport: (report: CivicReport) => void;
  onOpenReportWizard: () => void;
}

export const ReportsListView: React.FC<ReportsListViewProps> = ({
  reports,
  onSelectReport,
  onOpenReportWizard,
}) => {
  const [filters, setFilters] = useState<FilterCriteria>({
    searchQuery: '',
    category: 'ALL',
    severity: 'ALL',
    status: 'ALL',
    department: 'ALL',
  });

  const filteredReports = reports.filter((r) => {
    const matchesQuery =
      r.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      r.address.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesCategory =
      filters.category === 'ALL' || r.category === filters.category;

    const matchesSeverity =
      filters.severity === 'ALL' || r.severity === filters.severity;

    const matchesStatus =
      filters.status === 'ALL' || r.status === filters.status;

    return matchesQuery && matchesCategory && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black font-mono text-white tracking-tight">
            MUNICIPAL REPORTS REGISTRY
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Indexed in Amazon DynamoDB • {filteredReports.length} records matching current criteria
          </p>
        </div>

        <button
          onClick={onOpenReportWizard}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-civic-orange to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-glowOrange hover:scale-105 transition-all"
        >
          + Submit New Report
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, keyword, address, or category..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="glass-input w-full pl-10 pr-4 py-2 rounded-xl text-xs font-mono"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category */}
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="glass-input px-3 py-2 rounded-xl text-xs font-mono text-slate-200"
          >
            <option value="ALL">All Categories</option>
            <option value="road_damage">Road Damage</option>
            <option value="streetlights">Streetlights</option>
            <option value="garbage_overflow">Garbage Overflow</option>
            <option value="water_leak">Water Leaks</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="public_hazard">Public Hazards</option>
          </select>

          {/* Severity */}
          <select
            value={filters.severity}
            onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
            className="glass-input px-3 py-2 rounded-xl text-xs font-mono text-slate-200"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical (85-100)</option>
            <option value="HIGH">High (70-84)</option>
            <option value="MEDIUM">Medium (50-69)</option>
            <option value="LOW">Low (0-49)</option>
          </select>

          {/* Status */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="glass-input px-3 py-2 rounded-xl text-xs font-mono text-slate-200"
          >
            <option value="ALL">All Statuses</option>
            <option value="REPORTED">Reported</option>
            <option value="AI_VERIFIED">AI Verified</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            onClick={() => onSelectReport(report)}
            className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 hover:shadow-glowCyan cursor-pointer transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Thumbnail Header */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-950">
              <img
                src={report.evidenceUrl}
                alt={report.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/80 text-white backdrop-blur-md border border-slate-700">
                  {report.id}
                </span>
                <SeverityBadge severity={report.severity} score={report.severityScore} size="sm" />
              </div>

              <div className="absolute top-3 right-3">
                <StatusBadge status={report.status} size="sm" />
              </div>

              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-civic-orange shrink-0" />
                  <span className="truncate">{report.address}</span>
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold font-mono text-white group-hover:text-civic-cyan transition-colors line-clamp-1">
                  {report.title}
                </h4>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {report.description}
                </p>
              </div>

              {/* Footer Meta */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="text-slate-400">Dept: {report.department.split('&')[0]}</span>
                <span className="text-civic-cyan flex items-center gap-1">
                  Inspect File <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="p-12 text-center rounded-2xl glass-card border border-slate-800">
          <p className="text-sm font-mono text-slate-400">No reports found matching criteria.</p>
          <button
            onClick={() =>
              setFilters({
                searchQuery: '',
                category: 'ALL',
                severity: 'ALL',
                status: 'ALL',
                department: 'ALL',
              })
            }
            className="mt-3 px-4 py-2 rounded-xl bg-slate-800 text-white font-mono text-xs hover:bg-slate-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
