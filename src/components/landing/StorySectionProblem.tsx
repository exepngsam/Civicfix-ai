import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { AlertOctagon, Zap, Trash2, Droplets, MapPin, Eye, Radio } from 'lucide-react';

export const StorySectionProblem: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<number>(0);

  const issues = [
    {
      id: 0,
      name: 'ROAD DAMAGE',
      detail: 'Deep asphalt potholes, sub-base subsidence & wheel-impact hazards.',
      severity: 'CRITICAL',
      score: 94,
      icon: AlertOctagon,
      color: '#ff3366',
      coords: '37.7842° N, 122.4075° W',
      count: '428 Reports',
    },
    {
      id: 1,
      name: 'STREETLIGHTS',
      detail: 'Exposed live wiring, knocked utility poles & dark pedestrian corridors.',
      severity: 'CRITICAL',
      score: 96,
      icon: Zap,
      color: '#ff6b35',
      coords: '37.7735° N, 122.4172° W',
      count: '219 Reports',
    },
    {
      id: 2,
      name: 'GARBAGE OVERFLOW',
      detail: 'Alley refuse accumulation, hazardous chemical barrels & pest vectors.',
      severity: 'HIGH',
      score: 78,
      icon: Trash2,
      color: '#facc15',
      coords: '37.7884° N, 122.3989° W',
      count: '364 Reports',
    },
    {
      id: 3,
      name: 'WATER MAIN LEAKS',
      detail: 'Pressurized pipe fractures, pavement heave & drinking water loss.',
      severity: 'CRITICAL',
      score: 92,
      icon: Droplets,
      color: '#00f0ff',
      coords: '37.7712° N, 122.4285° W',
      count: '185 Reports',
    },
  ];

  return (
    <section id="problem" className="py-24 relative border-t border-slate-800/80 bg-civic-dark/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-civic-cyan uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-civic-cyan animate-ping" />
              <span>SECTION 01 — DETECTION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-white">
              SEE THE PROBLEM.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl font-light">
              Cities are constantly fracturing under strain. When citizens become sensors, invisible infrastructure failures become actionable data streams.
            </p>
          </div>

          {/* Real-time Ticker */}
          <div className="mt-8 md:mt-0 flex items-center gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
            <div>
              <p className="text-[11px] font-mono text-slate-400 uppercase">Live Citizen Sensor Feed</p>
              <p className="text-lg font-mono font-bold text-white">
                <AnimatedCounter value={1248} suffix=" ACTIVE MUNICIPAL PINGS" />
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Radar & Issue Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Circular Cyber Radar Display */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-950/90 border border-slate-800/90 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Top Status Header */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-4 border-b border-slate-800/70">
              <span className="flex items-center gap-2 text-civic-cyan font-bold tracking-wide">
                <Radio className="w-4 h-4 animate-pulse" />
                METROPOLITAN RADAR (SECTOR 4)
              </span>
              <span className="bg-slate-900 px-2.5 py-1 rounded-full border border-slate-700/80 text-[11px]">
                ACTIVE SECTORS: 4 PINS
              </span>
            </div>

            {/* Circular Radar Screen */}
            <div className="my-6 flex items-center justify-center relative">
              <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 rounded-full border border-cyan-500/30 bg-slate-950 flex items-center justify-center shadow-glowCyan overflow-hidden">
                {/* Concentric Distance Rings */}
                <div className="absolute w-3/4 h-3/4 rounded-full border border-slate-800/90" />
                <div className="absolute w-1/2 h-1/2 rounded-full border border-slate-800/90" />
                <div className="absolute w-1/4 h-1/4 rounded-full border border-cyan-500/20" />

                {/* Crosshairs & Cardinal Ticks */}
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-800/80" />
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-slate-800/80" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-400/60 font-bold">000° N</div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-400/60 font-bold">180° S</div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-cyan-400/60 font-bold">270° W</div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-cyan-400/60 font-bold">090° E</div>

                {/* True 360-Degree Circular Conic Sweep (No square clipping artifact) */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none animate-spin"
                  style={{
                    animationDuration: '5s',
                    background:
                      'conic-gradient(from 0deg at 50% 50%, rgba(0, 240, 255, 0.22) 0deg, rgba(0, 240, 255, 0.04) 40deg, transparent 55deg, transparent 360deg)',
                  }}
                />

                {/* Center Beacon Hub */}
                <div className="relative w-3 h-3 rounded-full bg-civic-cyan shadow-glowCyan animate-pulse z-10" />

                {/* Interactive Radar Pins placed at distinct quadrant coordinates */}
                {/* Pin 1: Road Damage (Top-Left Quadrant) */}
                <button
                  onClick={() => setSelectedIssue(0)}
                  className={`absolute top-[22%] left-[24%] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center transition-all duration-300 z-20 ${
                    selectedIssue === 0 ? 'scale-125 z-30' : 'opacity-80 hover:opacity-100 hover:scale-110'
                  }`}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border shadow-lg transition-all"
                    style={{
                      backgroundColor: `${issues[0].color}25`,
                      borderColor: issues[0].color,
                      boxShadow: selectedIssue === 0 ? `0 0 20px ${issues[0].color}` : 'none',
                    }}
                  >
                    <AlertOctagon className="w-5 h-5" style={{ color: issues[0].color }} />
                  </div>
                  {selectedIssue === 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  )}
                </button>

                {/* Pin 2: Streetlights (Top-Right Quadrant) */}
                <button
                  onClick={() => setSelectedIssue(1)}
                  className={`absolute top-[28%] right-[22%] translate-x-1/2 -translate-y-1/2 group flex flex-col items-center transition-all duration-300 z-20 ${
                    selectedIssue === 1 ? 'scale-125 z-30' : 'opacity-80 hover:opacity-100 hover:scale-110'
                  }`}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border shadow-lg transition-all"
                    style={{
                      backgroundColor: `${issues[1].color}25`,
                      borderColor: issues[1].color,
                      boxShadow: selectedIssue === 1 ? `0 0 20px ${issues[1].color}` : 'none',
                    }}
                  >
                    <Zap className="w-5 h-5" style={{ color: issues[1].color }} />
                  </div>
                  {selectedIssue === 1 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                  )}
                </button>

                {/* Pin 3: Garbage Overflow (Bottom-Left Quadrant) */}
                <button
                  onClick={() => setSelectedIssue(2)}
                  className={`absolute bottom-[24%] left-[26%] -translate-x-1/2 translate-y-1/2 group flex flex-col items-center transition-all duration-300 z-20 ${
                    selectedIssue === 2 ? 'scale-125 z-30' : 'opacity-80 hover:opacity-100 hover:scale-110'
                  }`}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border shadow-lg transition-all"
                    style={{
                      backgroundColor: `${issues[2].color}25`,
                      borderColor: issues[2].color,
                      boxShadow: selectedIssue === 2 ? `0 0 20px ${issues[2].color}` : 'none',
                    }}
                  >
                    <Trash2 className="w-5 h-5" style={{ color: issues[2].color }} />
                  </div>
                  {selectedIssue === 2 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  )}
                </button>

                {/* Pin 4: Water Main Leaks (Bottom-Right Quadrant) */}
                <button
                  onClick={() => setSelectedIssue(3)}
                  className={`absolute bottom-[22%] right-[24%] translate-x-1/2 translate-y-1/2 group flex flex-col items-center transition-all duration-300 z-20 ${
                    selectedIssue === 3 ? 'scale-125 z-30' : 'opacity-80 hover:opacity-100 hover:scale-110'
                  }`}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border shadow-lg transition-all"
                    style={{
                      backgroundColor: `${issues[3].color}25`,
                      borderColor: issues[3].color,
                      boxShadow: selectedIssue === 3 ? `0 0 20px ${issues[3].color}` : 'none',
                    }}
                  >
                    <Droplets className="w-5 h-5" style={{ color: issues[3].color }} />
                  </div>
                  {selectedIssue === 3 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick Sector Filter Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-800/80">
              {issues.map((iss, idx) => {
                const isSelected = selectedIssue === idx;
                const Icon = iss.icon;
                return (
                  <button
                    key={iss.id}
                    onClick={() => setSelectedIssue(idx)}
                    className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-slate-900 border text-white font-bold'
                        : 'bg-slate-950/60 border border-slate-800/60 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                    style={{
                      borderColor: isSelected ? iss.color : undefined,
                      boxShadow: isSelected ? `0 0 12px ${iss.color}40` : undefined,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: iss.color }} />
                    <span className="truncate">{iss.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Telemetry Detail Card on the right */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <GlassCard
              glow={selectedIssue === 0 || selectedIssue === 1 ? 'critical' : 'cyan'}
              className="p-6 sm:p-8 transition-all duration-300 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    SELECTED CIVIC HAZARD
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-mono font-bold"
                    style={{
                      backgroundColor: `${issues[selectedIssue].color}20`,
                      color: issues[selectedIssue].color,
                      border: `1px solid ${issues[selectedIssue].color}50`,
                    }}
                  >
                    SEVERITY {issues[selectedIssue].score}/100
                  </span>
                </div>

                <h3 className="text-2xl font-black font-mono text-white mt-5 tracking-tight">
                  {issues[selectedIssue].name}
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {issues[selectedIssue].detail}
                </p>

                <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">GEOLOCATION COORDS</span>
                    <span className="text-slate-200 mt-1 block font-semibold truncate">{issues[selectedIssue].coords}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">CITIZEN VOLUME</span>
                    <span className="text-civic-cyan mt-1 block font-bold">{issues[selectedIssue].count}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/70">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">Risk Escalation Index</span>
                  <span className="font-bold" style={{ color: issues[selectedIssue].color }}>
                    {issues[selectedIssue].score}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${issues[selectedIssue].score}%`,
                      backgroundColor: issues[selectedIssue].color,
                    }}
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
