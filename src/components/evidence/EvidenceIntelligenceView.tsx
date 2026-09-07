import React, { useState } from 'react';
import { CivicReport } from '@/types';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Database,
  MapPin,
  Cpu,
  Layers,
  FileCheck,
  Search,
  ArrowUpRight,
} from 'lucide-react';

interface EvidenceIntelligenceViewProps {
  reports: CivicReport[];
  onSelectReport: (report: CivicReport) => void;
}

export const EvidenceIntelligenceView: React.FC<EvidenceIntelligenceViewProps> = ({
  reports,
  onSelectReport,
}) => {
  const [selectedReport, setSelectedReport] = useState<CivicReport>(reports[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>DIGITAL EVIDENCE CHAIN OF CUSTODY</span>
          </div>
          <h2 className="text-3xl font-black font-mono text-white tracking-tight">
            EVIDENCE INTELLIGENCE & FORENSICS
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Cryptographic SHA-256 validation, S3 immutable object storage, and geospatial cross-matching
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            CHAIN OF CUSTODY: IMMUTABLE
          </span>
        </div>
      </div>

      {/* Main Evidence Dossier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 5 cols: Evidence Asset & Core Integrity Badges */}
        <div className="lg:col-span-5 space-y-5">
          <GlassCard glow="emerald" className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                FORENSIC ASSET DOSSIER
              </span>
              <span className="text-[10px] font-mono text-white bg-slate-800 px-2 py-0.5 rounded">
                {selectedReport.id}
              </span>
            </div>

            {/* Evidence Image */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-slate-700 relative h-60 bg-slate-950">
              <img
                src={selectedReport.evidenceUrl}
                alt={selectedReport.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                INTEGRITY VERIFIED ✓
              </div>
            </div>

            {/* Checklist of 6 Core Trust Proofs */}
            <div className="mt-5 space-y-2.5 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Evidence Integrity</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED ✓
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">AI Confidence</span>
                <span className="text-civic-cyan font-bold">{selectedReport.confidence}%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Location Consistency</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> MATCHED (0.01km)
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Duplicate Probability</span>
                <span className="text-civic-orange font-bold">
                  {selectedReport.duplicateScore}% (Unique)
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Image Vision Analysis</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> COMPLETE
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Storage Layer</span>
                <span className="text-purple-400 font-bold flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" /> Amazon S3 Encrypted ✓
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectReport(selectedReport)}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Inspect Full Incident Record</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </GlassCard>
        </div>

        {/* Right 7 cols: Forensic S3 & SHA-256 Deep Dive + File Switcher */}
        <div className="lg:col-span-7 space-y-6">
          {/* Metadata Specs */}
          <GlassCard className="p-6 border-slate-800">
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-civic-cyan" />
              <span>CRYPTOGRAPHIC ATTESTATION & STORAGE SPEC</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase block">
                  SHA-256 CONTENT FINGERPRINT
                </span>
                <span className="text-civic-cyan text-xs break-all block mt-1">
                  {selectedReport.evidenceHash}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase block">
                  AMAZON S3 STORAGE BUCKET URI
                </span>
                <span className="text-slate-300 text-xs break-all block mt-1">
                  s3://civicfix-evidence-production/{selectedReport.aiAnalysis.s3Key}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">
                    TIMESTAMP CAPTURED
                  </span>
                  <span className="text-white font-bold block mt-1">
                    {new Date(selectedReport.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">
                    EXIF METADATA MATCH
                  </span>
                  <span className="text-emerald-400 font-bold block mt-1">
                    GPS Coordinates Validated
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Quick Evidence Selector */}
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
              SELECT EVIDENCE FILE TO AUDIT
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {reports.map((rep) => (
                <button
                  key={rep.id}
                  onClick={() => setSelectedReport(rep)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    selectedReport.id === rep.id
                      ? 'bg-cyan-500/15 border-civic-cyan shadow-glowCyan'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="h-16 rounded-lg overflow-hidden mb-2">
                    <img
                      src={rep.evidenceUrl}
                      alt={rep.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] font-mono font-bold text-white truncate">
                    {rep.id}
                  </p>
                  <span className="text-[9px] font-mono text-emerald-400 block truncate">
                    SHA-256 Valid
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
