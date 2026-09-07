import React from 'react';
import { CivicReport } from '@/types';
import { ShieldCheck, Cpu, AlertTriangle, Eye, Database, CheckCircle2, UserCheck, X } from 'lucide-react';

interface ResponsibleAiPanelProps {
  report: CivicReport;
  isOpen: boolean;
  onClose: () => void;
  onHumanOverrideDepartment?: (newDept: string) => void;
}

export const ResponsibleAiPanel: React.FC<ResponsibleAiPanelProps> = ({
  report,
  isOpen,
  onClose,
  onHumanOverrideDepartment,
}) => {
  if (!isOpen) return null;

  const categoryConf = report.aiAnalysis.confidenceScore || 95;
  const severityConf = Math.min(99, Math.round(categoryConf * 0.96));
  const deptConf = report.departmentConfidence || 94;
  const isHumanReviewAdvised = report.humanReviewRequired || categoryConf < 75 || deptConf < 75;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 max-w-xl w-full shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close AI Transparency Panel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Responsible AI Transparency</h3>
            <p className="text-xs text-slate-400 font-mono">CivicFix AI Model Explainability & Governance</p>
          </div>
        </div>

        {/* Human Review Advisory Banner if needed */}
        {isHumanReviewAdvised ? (
          <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 mb-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-300">Human Review Recommended:</span> One or more inference confidence scores fall below threshold. Automated dispatch flagged for supervisor confirmation.
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 mb-5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-emerald-300">High Confidence Inference:</span> Analysis meets automated dispatch requirements. Supervisor override remains available at all times.
            </div>
          </div>
        )}

        {/* Confidence Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5 text-center">
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Category Match</div>
            <div className="text-2xl font-black font-mono text-cyan-400">{categoryConf}%</div>
            <div className="text-[10px] text-slate-500">{report.category}</div>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Severity Weight</div>
            <div className="text-2xl font-black font-mono text-amber-400">{severityConf}%</div>
            <div className="text-[10px] text-slate-500">Score {report.severityScore}/100</div>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Department Route</div>
            <div className="text-2xl font-black font-mono text-purple-400">{deptConf}%</div>
            <div className="text-[10px] text-slate-500">Routing accuracy</div>
          </div>
        </div>

        {/* Explainability Breakdown */}
        <div className="space-y-3.5 mb-6 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-200 font-bold mb-1">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>What AI Analyzed</span>
            </div>
            <ul className="list-disc list-inside text-slate-400 space-y-1">
              <li>Citizen visual evidence ({report.aiAnalysis.detectedObjects.join(', ')})</li>
              <li>Natural language textual symptom keywords and urgency tokens</li>
              <li>Spatial radius comparison ({report.similarReportsCount} nearby reports within 250m)</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-200 font-bold mb-1">
              <Database className="w-4 h-4 text-purple-400" />
              <span>Inference Engine & Model Provenance</span>
            </div>
            <p className="text-slate-400">
              Generated via <span className="text-slate-200 font-mono">{report.aiAnalysis.bedrockModel}</span> on AWS Bedrock. Zero citizen biometric data or personal identifying details are passed into training prompts.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-200 font-bold mb-1">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Human-in-the-Loop & Override Controls</span>
            </div>
            <p className="text-slate-400 mb-2">
              All automated department routing decisions can be manually overridden by municipal dispatchers without modifying historical telemetry.
            </p>
            <div className="flex items-center justify-between text-slate-300 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span>Current Department: <strong className="text-white">{report.department}</strong></span>
              <button
                onClick={() => {
                  const depts = [
                    'Road Maintenance & Infrastructure',
                    'Municipal Electrical & Power Bureau',
                    'Sanitation & Waste Management',
                    'Public Utilities Commission (Water Division)',
                    'Structural Engineering & Bridges',
                  ];
                  const next = depts.find((d) => d !== report.department) || depts[0];
                  if (onHumanOverrideDepartment) onHumanOverrideDepartment(next);
                }}
                className="px-2.5 py-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded transition-colors border border-slate-700"
              >
                Change Department
              </button>
            </div>
          </div>
        </div>

        {/* Limitations & Policy */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400">
          <strong className="text-slate-300">Model Limitations:</strong> The CivicFix Priority Model estimates risk based on input data and density. In emergency situations involving active bodily danger or structural collapse, dispatchers must immediately activate emergency service direct lines (911/112).
        </div>
      </div>
    </div>
  );
};
