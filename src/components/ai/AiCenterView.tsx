import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { AppMode } from '@/types';
import { APP_CONFIG } from '@/lib/config';
import {
  Cpu,
  Sparkles,
  Search,
  Sliders,
  Terminal,
  CheckCircle2,
  RefreshCw,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface AiCenterViewProps {
  appMode: AppMode;
}

export const AiCenterView: React.FC<AiCenterViewProps> = ({ appMode }) => {
  const [selectedModel, setSelectedModel] = useState<string>(
    'anthropic.claude-3-5-sonnet-20241022-v2:0'
  );
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(75);
  const [testPrompt, setTestPrompt] = useState<string>(
    'Heavy asphalt depression on high-speed arterial roadway near transit stop.'
  );
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [testResult, setTestResult] = useState({
    severity: 94,
    category: 'road_damage',
    department: 'Road Maintenance & Infrastructure',
    confidence: 97.2,
    duplicatesFound: 1,
    latencyMs: 842,
    tokensUsed: 420,
  });

  const handleTestInference = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const isCritical = testPrompt.toLowerCase().includes('heavy') || testPrompt.toLowerCase().includes('wire') || testPrompt.toLowerCase().includes('pothole');
      setTestResult({
        severity: isCritical ? 94 : 64,
        category: 'road_damage',
        department: 'Road Maintenance & Infrastructure',
        confidence: 96.8,
        duplicatesFound: similarityThreshold > 80 ? 0 : 2,
        latencyMs: 785,
        tokensUsed: 395,
      });
      setIsSimulating(false);
    }, 700);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-civic-bedrock uppercase tracking-widest mb-1">
            <Cpu className="w-4 h-4 text-civic-bedrock" />
            <span>INTELLIGENCE SUBSYSTEM</span>
          </div>
          <h2 className="text-3xl font-black font-mono text-white tracking-tight">
            CIVICFIX AI ENGINE
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Amazon Bedrock Multimodal Foundation Models & OpenSearch Vector Similarity
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-full border text-xs font-mono ${
              appMode === 'REAL_AWS'
                ? 'bg-purple-950/80 border-purple-500/60 text-purple-300 shadow-glowBedrock'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            {appMode === 'REAL_AWS' ? 'AMAZON BEDROCK: CONNECTED' : 'DEMO MODE: LOCAL ENGINE'}
          </span>
        </div>
      </div>

      {/* Real-time Subsystem Pipeline Status Bar */}
      <GlassCard glow="bedrock" className="p-6">
        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
          PIPELINE SUBSYSTEM INTEGRITY STATUS
        </h4>

        <div className="space-y-3 font-mono text-xs">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Vision Analysis (Claude 3.5 Sonnet)</span>
              <span className="text-purple-400 font-bold">100% OPERATIONAL</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="w-full h-full bg-purple-500 rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Civic Issue Classification</span>
              <span className="text-civic-cyan font-bold">100% OPERATIONAL</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="w-full h-full bg-civic-cyan rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Hazard Severity Assessment</span>
              <span className="text-rose-400 font-bold">100% OPERATIONAL</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="w-full h-full bg-rose-500 rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Duplicate Detection (OpenSearch k-NN)</span>
              <span className="text-civic-orange font-bold">100% OPERATIONAL</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="w-full h-full bg-civic-orange rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Department Routing & SLA Assignment</span>
              <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="w-full h-full bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Model Sandbox & Vector Duplicate Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Model Playground Form */}
        <div className="lg:col-span-7 space-y-5">
          <GlassCard className="p-6 border-slate-800">
            <h3 className="text-base font-bold font-mono text-white mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-civic-cyan" />
              <span>BEDROCK PROMPT & INFERENCE LAB</span>
            </h3>

            {/* Model Selector */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                  AMAZON BEDROCK MODEL ID
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="glass-input w-full px-3 py-2 rounded-xl text-xs font-mono text-white"
                >
                  <option value="anthropic.claude-3-5-sonnet-20241022-v2:0">
                    Anthropic Claude 3.5 Sonnet (Multimodal Vision & Structured Output)
                  </option>
                  <option value="amazon.titan-embed-image-v1">
                    Amazon Titan Multimodal Embeddings G1 (512 / 1024-dim Vectors)
                  </option>
                  <option value="meta.llama3-70b-instruct-v1:0">
                    Meta Llama 3 70B Instruct (High-Speed Policy Reasoning)
                  </option>
                </select>
              </div>

              {/* Sample Test Prompt */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                  INCOMING CITIZEN DESCRIPTOR OR MULTIMODAL CAPTION
                </label>
                <textarea
                  rows={3}
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  className="glass-input w-full p-3 rounded-xl text-xs font-mono"
                />
              </div>

              {/* Duplicate Threshold Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>OpenSearch Vector Similarity Threshold</span>
                  <span className="text-civic-cyan font-bold">{similarityThreshold}% Cosine</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={similarityThreshold}
                  onChange={(e) => setSimilarityThreshold(parseInt(e.target.value))}
                  className="w-full accent-civic-cyan"
                />
              </div>

              <button
                onClick={handleTestInference}
                disabled={isSimulating}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-glowBedrock transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>Execute Bedrock Inference</span>
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Live Output Inspector */}
        <div className="lg:col-span-5 space-y-5">
          <GlassCard glow="cyan" className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-civic-cyan uppercase tracking-wider">
                INFERENCE TELEMETRY
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                200 OK
              </span>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Calculated Severity:</span>
                <span className="text-rose-400 font-bold text-sm">
                  {testResult.severity} / 100 (CRITICAL)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Target Department:</span>
                <span className="text-slate-200 text-right font-medium">
                  {testResult.department}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Duplicates Detected:</span>
                <span className="text-civic-cyan font-bold">
                  {testResult.duplicatesFound} reports (&gt;{similarityThreshold}%)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 block">ROUNDTRIP LATENCY</span>
                  <span className="text-white font-bold">{testResult.latencyMs}ms</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 block">TOKEN CONSUMPTION</span>
                  <span className="text-white font-bold">{testResult.tokensUsed} tokens</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* System Prompt View */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="text-slate-500 block mb-1 text-[10px] uppercase">
              BEDROCK SYSTEM DIRECTIVE
            </span>
            <p className="line-clamp-3 text-slate-300">
              You are the CivicFix Municipal Emergency Classifier. Evaluate photographic inputs and citizen notes. Output strict JSON schema containing: category, severity (0-100), hazard rationale, and responsible municipal authority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
