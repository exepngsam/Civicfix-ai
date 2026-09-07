import React, { useState } from 'react';
import { CivicZone, PredictiveAlert, RootCauseInsight, CivicReport } from '@/types';
import { CIVIC_ZONES, PREDICTIVE_ALERTS, ROOT_CAUSE_INSIGHTS } from '@/lib/mockData';
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Building,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
  X,
} from 'lucide-react';

interface CivicHotspotsViewProps {
  reports: CivicReport[];
  onSelectReport?: (report: CivicReport) => void;
  onNavigateToMap?: () => void;
}

export const CivicHotspotsView: React.FC<CivicHotspotsViewProps> = ({
  reports,
  onSelectReport,
  onNavigateToMap,
}) => {
  const [selectedZone, setSelectedZone] = useState<CivicZone | null>(CIVIC_ZONES[0]);
  const [activeTab, setActiveTab] = useState<'HOTSPOTS' | 'PREDICTIVE' | 'ROOT_CAUSE'>('HOTSPOTS');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                Geographic Intelligence & Twin
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">Civic Health Composite Indicator</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Civic Hotspots & Digital Twin
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Topological spatial clustering and predictive failure analysis. Pinpoint systemic infrastructure decay before complaints cascade.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('HOTSPOTS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'HOTSPOTS'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Zone Health & Twin
            </button>
            <button
              onClick={() => setActiveTab('PREDICTIVE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'PREDICTIVE'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Predictive Alerts ({PREDICTIVE_ALERTS.length})
            </button>
            <button
              onClick={() => setActiveTab('ROOT_CAUSE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ROOT_CAUSE'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Root Cause Insights
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: HOTSPOTS & LIGHTWEIGHT DIGITAL TWIN */}
      {activeTab === 'HOTSPOTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Zone Grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Building className="w-4 h-4 text-cyan-400" />
                <span>Municipal Sectors & Health Status</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">6 monitored sectors</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CIVIC_ZONES.map((zone) => {
                const isSelected = selectedZone?.id === zone.id;
                const isHealthy = zone.healthScore >= 80;
                const isModerate = zone.healthScore >= 70 && zone.healthScore < 80;

                const healthColor = isHealthy
                  ? 'text-emerald-400'
                  : isModerate
                  ? 'text-yellow-400'
                  : 'text-rose-400';

                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`bg-slate-900 border rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-lg relative overflow-hidden group ${
                      isSelected
                        ? 'border-cyan-500 shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {zone.name}
                        </h3>
                        <span className="text-xs text-slate-400 font-mono">
                          {zone.activeReports} active reports
                        </span>
                      </div>

                      {/* Health Score Pill */}
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Civic Health</div>
                        <div className={`text-2xl font-black font-mono leading-none ${healthColor}`}>
                          {zone.healthScore}
                          <span className="text-xs text-slate-500 font-normal">/100</span>
                        </div>
                      </div>
                    </div>

                    {/* Trend & Density */}
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5">
                        {zone.trendWeeklyPercent > 0 ? (
                          <span className="flex items-center text-rose-400 font-bold">
                            <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                            +{zone.trendWeeklyPercent}% this week
                          </span>
                        ) : (
                          <span className="flex items-center text-emerald-400 font-bold">
                            <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                            {zone.trendWeeklyPercent}% this week
                          </span>
                        )}
                      </div>

                      <span className="text-slate-400 font-mono text-[11px]">{zone.density}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Col: Deep Zone Intelligence Panel */}
          {selectedZone && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl h-fit space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                    Sector Deep Dive
                  </span>
                  <h3 className="text-lg font-black text-white">{selectedZone.name}</h3>
                </div>
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Civic Health Card */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase">
                    CIVIC HEALTH SCORE
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {selectedZone.healthScore}/100
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      selectedZone.healthScore >= 80
                        ? 'bg-emerald-400'
                        : selectedZone.healthScore >= 70
                        ? 'bg-yellow-400'
                        : 'bg-rose-400'
                    }`}
                    style={{ width: `${selectedZone.healthScore}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Calculated from issue density, critical incident severity, report age, and resolution velocity. Labeled as a <strong className="text-slate-300">CivicFix Composite Indicator</strong>.
                </p>
              </div>

              {/* Stats Matrix */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400">Critical Incidents</div>
                  <div className="text-xl font-bold font-mono text-rose-400 mt-1">
                    {selectedZone.criticalCount}
                  </div>
                </div>
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400">Avg Resolution</div>
                  <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
                    {selectedZone.avgResolutionHours}h
                  </div>
                </div>
              </div>

              {/* Top Issue Types */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                  Top Issue Categories
                </h4>
                <div className="space-y-2">
                  {selectedZone.topCategories.map((cat, cIdx) => (
                    <div key={cIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="capitalize">{cat.category.replace('_', ' ')}</span>
                        <span className="font-mono text-slate-400">
                          {cat.count} ({cat.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-500 h-full rounded-full"
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Intervention */}
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300 mb-1">
                  <Lightbulb className="w-4 h-4" />
                  <span>Recommended Intervention</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedZone.recommendedIntervention}
                </p>
              </div>

              {onNavigateToMap && (
                <button
                  onClick={onNavigateToMap}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
                >
                  <span>Inspect On Geospatial Map</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PREDICTIVE ISSUE ALERTS */}
      {activeTab === 'PREDICTIVE' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">Experimental AI Forecasting:</strong> Predictive alerts identify areas and categories exhibiting statistical velocity anomalies based on historical report patterns.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PREDICTIVE_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider">
                      {alert.hasSufficientData ? '⚠ POSSIBLE EMERGING HOTSPOT' : 'INSUFFICIENT DATA'}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{alert.zoneName}</h3>
                  </div>

                  {alert.hasSufficientData ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-black font-mono bg-rose-500/15 border border-rose-500/30 text-rose-400">
                      +{alert.percentageIncrease}%
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                      Data Gap
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {alert.hasSufficientData ? (
                    <>
                      <strong className="text-white capitalize">
                        {alert.category.replace('_', ' ')}
                      </strong>{' '}
                      reports increased <strong className="text-rose-400">{alert.percentageIncrease}%</strong> {alert.timeframe}.
                    </>
                  ) : (
                    <span className="text-slate-400 italic">
                      "Insufficient data for prediction" — Historical report volume below confidence threshold. System does not fabricate predictions.
                    </span>
                  )}
                </p>

                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-cyan-400">Recommended:</strong> {alert.recommendedAction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ROOT CAUSE INSIGHTS */}
      {activeTab === 'ROOT_CAUSE' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-start gap-3 text-xs text-purple-200">
            <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-purple-300">Systemic vs Symptomatic AI:</strong> CivicFix clusters repetitive citizen tickets across corridors to identify underlying infrastructure failures rather than endlessly patching symptoms.
            </div>
          </div>

          <div className="space-y-4">
            {ROOT_CAUSE_INSIGHTS.map((rc) => (
              <div
                key={rc.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">
                      ROOT CAUSE INSIGHT
                    </div>
                    <h3 className="text-lg font-bold text-white">{rc.title}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{rc.corridor}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400">Potential Savings</span>
                    <div className="text-xl font-bold font-mono text-emerald-400">
                      ~{rc.systemicSavingsHours} hrs
                    </div>
                  </div>
                </div>

                {/* Symptom Flow Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {rc.symptomFlow.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex flex-col items-center justify-center"
                    >
                      <span className="text-[10px] text-cyan-400 font-mono font-bold mb-1">
                        Step 0{sIdx + 1}
                      </span>
                      <span className="text-slate-300 text-[11px]">{step}</span>
                    </div>
                  ))}
                </div>

                {/* AI Hypothesis & Recommended Action */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-800">
                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
                    <div className="font-bold text-purple-300 mb-1">AI Hypothesis:</div>
                    <p className="text-slate-300 leading-relaxed">{rc.hypothesis}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <div className="font-bold text-cyan-300 mb-1">Recommended Action:</div>
                    <p className="text-slate-300 leading-relaxed">{rc.recommendedAction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
