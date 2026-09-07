import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CheckCircle2, Clock, ShieldCheck, UserCheck, Cpu, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

export const StorySectionResolution: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(4); // Default to RESOLVED to show end state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const stages = [
    {
      id: 0,
      title: 'REPORTED',
      icon: Clock,
      color: '#94a3b8',
      desc: 'Citizen captured photo on Market St with GPS telemetry.',
      timestamp: '18:32:00',
      proof: 'Citizen Mobile App Intake',
    },
    {
      id: 1,
      title: 'AI VERIFIED',
      icon: Cpu,
      color: '#a855f7',
      desc: 'Amazon Bedrock validated damage: 94/100 severity, 97.2% confidence.',
      timestamp: '18:32:02',
      proof: 'Bedrock Multimodal Inference',
    },
    {
      id: 2,
      title: 'ASSIGNED',
      icon: UserCheck,
      color: '#00f0ff',
      desc: 'Routed to Road Maintenance & Infrastructure queue with priority 2h SLA.',
      timestamp: '18:32:04',
      proof: 'DynamoDB GSI Indexing & Routing',
    },
    {
      id: 3,
      title: 'IN PROGRESS',
      icon: Sparkles,
      color: '#f59e0b',
      desc: 'Field crew truck #42 en route with cold-patch asphalt and safety cones.',
      timestamp: '18:45:10',
      proof: 'Dispatch Telemetry Stream',
    },
    {
      id: 4,
      title: 'RESOLVED ✓',
      icon: CheckCircle2,
      color: '#00e599',
      desc: 'Post-repair photo verified by Bedrock. Thoroughfare restored to safety.',
      timestamp: '20:10:45',
      proof: 'Automated AI Closure Verification',
    },
  ];

  const playSequence = () => {
    setIsPlaying(true);
    setCurrentStage(0);
    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage < stages.length) {
        setCurrentStage(stage);
      } else {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 1100);
  };

  return (
    <section id="resolution" className="py-24 relative border-t border-slate-800/80 bg-civic-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SECTION 05 — FULL LIFECYCLE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-white">
              RESOLUTION YOU CAN SEE.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl font-light">
              Civic reports don&apos;t disappear into a bureaucratic black hole. Track live progression from citizen shutter click to AI-verified asphalt restoration.
            </p>
          </div>

          <button
            onClick={playSequence}
            disabled={isPlaying}
            className="mt-6 md:mt-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-glowEmerald disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
            <span>REPLAY LIFECYCLE PROGRESSION</span>
          </button>
        </div>

        {/* Progress Timeline Stepper */}
        <div className="relative mb-12">
          {/* Background Connecting Rail */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-slate-800 rounded-full z-0 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-slate-600 via-purple-500 to-emerald-400 transition-all duration-700"
              style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
            />
          </div>

          {/* Stepper Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {stages.map((stg, index) => {
              const isPast = currentStage > index;
              const isCurrent = currentStage === index;
              const IconComp = stg.icon;

              return (
                <div
                  key={stg.id}
                  onClick={() => setCurrentStage(index)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-slate-900 border-emerald-400 shadow-glowEmerald scale-105 z-20'
                      : isPast
                      ? 'bg-slate-950/90 border-slate-700 text-slate-300'
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-slate-400">STAGE 0{index + 1}</span>
                    <span className="text-[10px] font-mono text-slate-500">{stg.timestamp}</span>
                  </div>

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border transition-colors"
                    style={{
                      backgroundColor: `${stg.color}20`,
                      borderColor: `${stg.color}50`,
                    }}
                  >
                    <IconComp className="w-5 h-5" style={{ color: stg.color }} />
                  </div>

                  <h4 className="text-sm font-bold font-mono text-white tracking-tight">
                    {stg.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {stg.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Before / After Visual Proof Card */}
        <GlassCard glow="emerald" className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Images: Before vs After */}
            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-rose-500/40 relative group">
                <img
                  src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"
                  alt="Hazard Reported"
                  className="w-full h-44 object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/90 text-rose-300 border border-rose-500/50">
                  BEFORE: ASPHALT CAVITY
                </span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-emerald-500/40 relative group">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80"
                  alt="Hazard Repaired"
                  className="w-full h-44 object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/50">
                  AFTER: SEALED & RESTORED
                </span>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="md:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ISSUE RESOLVED ✓
              </div>

              <h3 className="text-2xl font-black font-mono text-white tracking-tight">
                REP-9042 Closes Under SLA
              </h3>

              <div className="mt-4 space-y-2.5 text-xs font-mono text-slate-300">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Total Response Time</span>
                  <span className="text-emerald-400 font-bold">1 Hour 38 Mins</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">AI Verification Match</span>
                  <span className="text-civic-cyan font-bold">98.9% (Surface Flatness)</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Dispatched Bureau</span>
                  <span className="text-slate-200">Road Maintenance & Infrastructure</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Citizen Notified</span>
                  <span className="text-emerald-400 font-bold">SMS & Push Sent</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
