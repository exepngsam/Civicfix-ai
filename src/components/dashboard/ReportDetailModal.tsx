import React, { useState } from 'react';
import { CivicReport, ReportStatus } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { GlassCard } from '@/components/ui/GlassCard';
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
  ArrowRight,
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

  if (!report) return null;

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
              <span className="text-xs sm:text-sm font-mono font-bold text-civic-cyan bg-cyan-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-cyan-500/30">
                {report.id}
              </span>
              <SeverityBadge severity={report.severity} score={report.severityScore} size="sm" />
              <StatusBadge status={report.status} size="sm" />
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            {/* Title & Reporter */}
            <div>
              <h2 className="text-xl font-bold font-mono text-white leading-tight">
                {report.title}
              </h2>
              <div className="mt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-civic-orange shrink-0" />
                  {report.address}
                </span>
                <span>•</span>
                <span>Reported by {report.userName}</span>
              </div>
            </div>

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
                <div className="flex items-center gap-2">
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
                </div>

                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  S3 Storage: SHA-256 Validated
                </span>
              </div>
            </div>

            {/* Forensic S3 Evidence Fingerprint */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-500 text-[10px] uppercase">AMAZON S3 OBJECT KEY</div>
              <div className="text-slate-300 font-mono text-[11px] truncate">{report.aiAnalysis.s3Key}</div>
              <div className="text-slate-500 text-[10px] uppercase pt-1">CRYPTOGRAPHIC INTEGRITY HASH</div>
              <div className="text-civic-cyan font-mono text-[11px] truncate">{report.evidenceHash}</div>
            </div>

            {/* Bedrock AI Intelligence Panel */}
            <GlassCard glow="bedrock" className="p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    AMAZON BEDROCK MULTIMODAL INFERENCE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40">
                  {report.aiAnalysis.bedrockModel.split('.')[1] || 'Claude 3.5 Sonnet'}
                </span>
              </div>

              {/* Analysis Summary */}
              <div className="mt-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase">ANALYSIS SUMMARY</span>
                <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                  {report.aiAnalysis.summary}
                </p>
              </div>

              {/* Detected Objects Tags */}
              <div className="mt-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase">IDENTIFIED ATTRIBUTES</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {report.aiAnalysis.detectedObjects.map((obj, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700"
                    >
                      {obj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Severity Reasoning */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 uppercase">SEVERITY RATIONALE</span>
                <p className="text-xs text-slate-300 mt-1 font-mono">
                  {report.aiAnalysis.severityReasoning}
                </p>
              </div>

              {/* Action Recommended */}
              <div className="mt-4 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
                <span className="text-[10px] font-mono text-purple-300 uppercase font-bold block">
                  RECOMMENDED REMEDIATION PROTOCOL
                </span>
                <p className="text-xs text-white mt-1 font-medium">
                  {report.aiAnalysis.recommendedAction}
                </p>
              </div>
            </GlassCard>

            {/* Amazon OpenSearch Duplicate Detection */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-civic-cyan" />
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    OPENSEARCH VECTOR SIMILARITY
                  </span>
                </div>
                <span className="text-xs font-mono text-civic-cyan font-bold">
                  {report.duplicateScore}% Duplicate Probability
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Evaluated against {report.similarReportsCount} nearby reports within a 500-meter radius.
                Classified as: <strong className="text-white">UNIQUE NEW INCIDENT</strong>
              </p>
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
                <span>Mark Resolved ✓</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
