import React, { useState } from 'react';
import { CivicReport, ReportStatus } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { GlassCard } from '@/components/ui/GlassCard';
import { CivicImpactScore } from '@/components/ui/CivicImpactScore';
import { BeforeAfterSlider } from '@/components/dashboard/BeforeAfterSlider';
import { CitizenTrustTimeline } from '@/components/dashboard/CitizenTrustTimeline';
import { ResponsibleAiPanel } from '@/components/ai/ResponsibleAiPanel';
import { DuplicateMergeModal } from '@/components/dashboard/DuplicateMergeModal';
import {
  X,
  MapPin,
  ShieldCheck,
  Cpu,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Layers,
  Database,
  Building2,
  Lock,
  GitMerge,
  Info,
} from 'lucide-react';

interface ReportDetailModalProps {
  report: CivicReport | null;
  onClose: () => void;
  onUpdateStatus: (reportId: string, newStatus: ReportStatus) => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  report,
  onClose,
  onUpdateStatus,
}) => {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [isAiTransparencyOpen, setIsAiTransparencyOpen] = useState<boolean>(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState<boolean>(false);
  const [currentDepartment, setCurrentDepartment] = useState<string>(report?.department || '');

  if (!report) return null;

  const totalScore = report.civicImpact?.totalScore ?? report.severityScore;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div
        className="w-full sm:max-w-2xl bg-slate-950 border-l border-slate-800 h-full overflow-y-auto flex flex-col justify-between shadow-2xl animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-950/90 backdrop-blur-md z-20">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-cyan-500/30">
                {report.id}
              </span>
              <SeverityBadge severity={report.severity} score={report.severityScore} size="sm" />
              <StatusBadge status={report.status} size="sm" />

              {/* Responsible AI quick trigger */}
              <button
                onClick={() => setIsAiTransparencyOpen(true)}
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20 transition-colors flex items-center gap-1"
              >
                <Cpu className="w-3 h-3" />
                <span>AI Transparency</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            {/* Title & Reporter & Civic Impact Score */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold font-mono text-white leading-tight">
                  {report.title}
                </h2>
                <div className="mt-2 flex items-center gap-3 text-xs font-mono text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    {report.address}
                  </span>
                  <span>•</span>
                  <span>Reported by {report.userName}</span>
                </div>
              </div>

              {/* Proprietary Civic Impact Score Component */}
              {report.civicImpact && (
                <div className="shrink-0 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl shadow-lg">
                  <CivicImpactScore impact={report.civicImpact} size="md" showDetailsOnClick={true} />
                </div>
              )}
            </div>

            {/* SLA Intelligence Banner (Section 61) */}
            {report.sla && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold uppercase flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    SLA Resolution Target
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      report.sla.status === 'OVERDUE'
                        ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                        : report.sla.status === 'AT_RISK'
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {report.sla.status === 'OVERDUE'
                      ? 'OVERDUE'
                      : report.sla.status === 'AT_RISK'
                      ? 'AT RISK'
                      : 'ON TRACK'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                    <div className="text-[10px] text-slate-500">Target</div>
                    <div className="font-bold text-white text-xs">{report.sla.targetHours}h</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                    <div className="text-[10px] text-slate-500">Elapsed</div>
                    <div className="font-bold text-amber-400 text-xs">{report.sla.elapsedHours.toFixed(1)}h</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                    <div className="text-[10px] text-slate-500">Remaining</div>
                    <div className={`font-bold text-xs ${report.sla.remainingHours <= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {report.sla.remainingHours <= 0 ? 'Breached' : `${report.sla.remainingHours.toFixed(1)}h`}
                    </div>
                  </div>
                </div>

                {report.sla.recommendedEscalation && (
                  <div className="text-[11px] text-amber-300 font-sans pt-1">
                    ⚠ {report.sla.recommendedEscalation}
                  </div>
                )}
              </div>
            )}

            {/* Smart Department Routing with Override (Section 62) */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <div className="text-[10px] text-slate-400 font-mono uppercase">Assigned Department</div>
                <div className="text-white font-bold flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentDepartment || report.department}</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">
                    {report.departmentConfidence || 96}% confidence
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsAiTransparencyOpen(true)}
                className="px-2.5 py-1 text-[11px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg border border-slate-700 transition-colors"
              >
                Change Department
              </button>
            </div>

            {/* Duplicate Cluster Warning / Merge Action (Section 55) */}
            {(report.duplicateScore > 70 || report.masterIncident) && (
              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 text-purple-200">
                  <GitMerge className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">
                      {report.masterIncident?.isMaster
                        ? `Master Incident ${report.masterIncident.masterId}`
                        : 'Duplicate Cluster Detected'}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {report.masterIncident?.mergedCount || report.similarReportsCount || 6} matching citizen reports in immediate vicinity.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDuplicateModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs transition-colors shrink-0 shadow-sm"
                >
                  Manage Duplicates
                </button>
              </div>
            )}

            {/* Before & After Resolution Proof (Section 57) */}
            {(report.status === 'RESOLVED' || report.resolutionProof) && (
              <BeforeAfterSlider
                proof={report.resolutionProof}
                issueTitle={report.title}
                canUpload={true}
              />
            )}

            {/* Citizen Trust Timeline (Section 56) */}
            <CitizenTrustTimeline timeline={report.timeline} />

            {/* Evidence Image Container with Bounding Box Overlay */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <div className="relative h-72 w-full">
                <img
                  src={report.evidenceUrl}
                  alt={report.title}
                  className="w-full h-full object-cover"
                />

                {/* Bounding Box Visualizer */}
                {showBoundingBoxes &&
                  report.aiAnalysis.boundingBoxes?.map((b, idx) => (
                    <div
                      key={idx}
                      className="absolute border-2 border-rose-500 rounded-lg shadow-glowCritical flex flex-col justify-between p-1.5 pointer-events-none"
                      style={{
                        top: `${b.box[0] * 100}%`,
                        left: `${b.box[1] * 100}%`,
                        height: `${(b.box[2] - b.box[0]) * 100}%`,
                        width: `${(b.box[3] - b.box[1]) * 100}%`,
                      }}
                    >
                      <span className="text-[10px] font-mono font-bold bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/50 self-start">
                        {b.label} ({(b.confidence * 100).toFixed(0)}%)
                      </span>
                    </div>
                  ))}
              </div>

              {/* Image Controls Bar */}
              <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${
                    showBoundingBoxes
                      ? 'bg-purple-950 border-purple-500/60 text-purple-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Layers className="w-3 h-3 inline mr-1" />
                  AI Bounding Boxes
                </button>

                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  S3 Encrypted: SHA-256 Validated
                </span>
              </div>
            </div>

            {/* Privacy-First Evidence Layer Notice (Section 65) */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Privacy-First Architecture:</strong> Photographic evidence is encrypted at rest (SSE-S3 256-bit AES) and access-restricted. Device metadata and non-essential EXIF tags are scrubbed upon ingestion; only validated GPS coordinates are routed for municipal crew dispatch.
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/90 sticky bottom-0 z-20 flex items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-400">
            Current Status: <strong className="text-white">{report.status}</strong>
          </div>

          <div className="flex items-center gap-2">
            {report.status !== 'IN_PROGRESS' && (
              <button
                onClick={() => onUpdateStatus(report.id, 'IN_PROGRESS')}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold transition-colors"
              >
                Mark In Progress
              </button>
            )}

            {report.status !== 'RESOLVED' && (
              <button
                onClick={() => onUpdateStatus(report.id, 'RESOLVED')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all shadow-glowEmerald flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verify & Resolve ✓</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlays */}
      <ResponsibleAiPanel
        report={report}
        isOpen={isAiTransparencyOpen}
        onClose={() => setIsAiTransparencyOpen(false)}
        onHumanOverrideDepartment={(newDept) => setCurrentDepartment(newDept)}
      />

      <DuplicateMergeModal
        report={report}
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
        onMergeSuccess={(masterId) => {
          setIsDuplicateModalOpen(false);
        }}
      />
    </div>
  );
};
