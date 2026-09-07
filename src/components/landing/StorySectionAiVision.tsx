import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Cpu, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, RefreshCw, Zap } from 'lucide-react';

export const StorySectionAiVision: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const steps = [
    { id: 0, label: 'IMAGE INTAKE', desc: 'Secure S3 upload & hash verification', service: 'Amazon S3' },
    { id: 1, label: 'AI VISION', desc: 'Bedrock Claude 3.5 Sonnet feature extraction', service: 'Amazon Bedrock' },
    { id: 2, label: 'CLASSIFICATION', desc: 'Identified: Asphalt Cavity & Sub-base Failure', service: 'Amazon Bedrock' },
    { id: 3, label: 'SEVERITY SCORING', desc: 'Calculated impact: 94 / 100 (CRITICAL)', service: 'AWS Lambda' },
    { id: 4, label: 'DUPLICATE SEARCH', desc: 'OpenSearch k-NN cosine comparison (8% duplicate)', service: 'Amazon OpenSearch' },
    { id: 5, label: 'DEPARTMENT ROUTING', desc: 'Dispatched to Road Maintenance & Infrastructure', service: 'Amazon EventBridge' },
  ];

  const triggerAnimation = () => {
    setIsSimulating(true);
    setActiveStep(0);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setActiveStep(current);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 900);
  };

  useEffect(() => {
    // Auto start once on mount
    triggerAnimation();
  }, []);

  return (
    <section id="ai-intelligence" className="py-24 relative border-t border-slate-800/80 bg-slate-950/80 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-civic-bedrock uppercase tracking-widest mb-3">
              <Cpu className="w-4 h-4 text-civic-bedrock" />
              <span>SECTION 02 — MULTIMODAL INFERENCE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-white">
              AI UNDERSTANDS.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl font-light">
              Raw citizen photos and vague descriptions are instantly deconstructed by Amazon Bedrock into structured, actionable municipal intelligence.
            </p>
          </div>

          <button
            onClick={triggerAnimation}
            disabled={isSimulating}
            className="mt-6 md:mt-0 self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/50 text-purple-200 text-xs font-mono font-semibold transition-all shadow-glowBedrock disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>RE-RUN INFERENCE PIPELINE</span>
          </button>
        </div>

        {/* Live Complaint Card Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Evidence Card with Scan Overlay */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex flex-col justify-between">
            {/* Image Preview */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1000&q=80"
                alt="Civic Pothole Hazard"
                className="w-full h-full object-cover"
              />

              {/* Laser Scan line during simulation */}
              {isSimulating && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-civic-cyan to-transparent shadow-glowCyan animate-scan pointer-events-none" />
              )}

              {/* Bounding Box Simulation */}
              <div className="absolute top-[32%] left-[28%] w-[45%] h-[42%] border-2 border-rose-500/90 rounded-lg shadow-glowCritical flex flex-col justify-between p-1.5 pointer-events-none">
                <span className="text-[10px] font-mono font-bold bg-rose-950/90 text-rose-300 px-1.5 py-0.5 rounded self-start border border-rose-500/50">
                  Target: Asphalt Cavity (98.4%)
                </span>
                <span className="text-[9px] font-mono text-slate-300 self-end bg-black/70 px-1 rounded">
                  BoundingBox [0.32, 0.28, 0.74, 0.73]
                </span>
              </div>

              {/* Bedrock Badge */}
              <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/50 text-[11px] font-mono text-purple-300 flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Bedrock Claude 3.5 Sonnet Vision</span>
              </div>
            </div>

            {/* Evidence Metadata bar */}
            <div className="p-5 border-t border-slate-800 bg-slate-950/80">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>EVIDENCE INTEGRITY</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  SHA-256 VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                &ldquo;Dangerous 14-inch deep pothole near pedestrian crossing on Market St. Vehicles swerving into oncoming traffic to avoid rim damage.&rdquo;
              </p>
            </div>
          </div>

          {/* Stepper Pipeline and Revealed Structured Output */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Step Progress Line */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {steps.map((s, idx) => {
                const isPassed = activeStep >= idx;
                const isCurrent = activeStep === idx;
                return (
                  <div
                    key={s.id}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      isCurrent
                        ? 'bg-purple-950/80 border-purple-500 text-white shadow-glowBedrock scale-105'
                        : isPassed
                        ? 'bg-slate-900/90 border-slate-700 text-slate-200'
                        : 'bg-slate-950/50 border-slate-800/60 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                      {isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-700" />
                      )}
                    </div>
                    <p className="text-xs font-mono font-bold mt-1 tracking-tight truncate">{s.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{s.service}</p>
                  </div>
                );
              })}
            </div>

            {/* Revealed Structured Results Card */}
            <GlassCard glow="bedrock" className="p-4 sm:p-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                    STRUCTURED AI DECISION
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    OUTPUT SCHEMA v2.1
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">LATENCY: 842ms</span>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category & Department */}
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase">CLASSIFIED CATEGORY</span>
                  <div className="text-xl font-black font-mono text-white mt-1">ROAD DAMAGE</div>
                  <span className="text-xs text-civic-cyan font-mono mt-1 block">
                    Assigned Dept: Road Maintenance & Infrastructure
                  </span>
                </div>

                {/* Severity Metric */}
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase">SEVERITY CALCULATION</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black font-mono text-rose-400">94</span>
                    <span className="text-xs font-mono text-slate-400">/ 100</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                      CRITICAL
                    </span>
                  </div>
                </div>

                {/* AI Confidence */}
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase">MODEL CONFIDENCE</span>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">97.2%</div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Multimodal cross-validation</span>
                </div>

                {/* OpenSearch Duplicate Check */}
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase">DUPLICATE PROBABILITY</span>
                  <div className="text-xl font-bold font-mono text-civic-cyan mt-1">8.4% (Unique)</div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">OpenSearch vector search radius 200m</span>
                </div>
              </div>

              {/* Recommended Action */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase">RECOMMENDED ACTION</span>
                <p className="text-sm font-medium text-slate-200 mt-1">
                  &ldquo;Emergency cold-patch asphalt deployment and traffic safety cone perimeter within 2 hours.&rdquo;
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
