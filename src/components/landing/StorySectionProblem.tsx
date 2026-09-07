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
    <section id="problem" className="py-24 relative border-t border-slate-800/80 bg-civic-dark/60">
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
          <div className="mt-8 md:mt-0 flex items-center gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Simulated Radar City Grid */}
          <div className="lg:col-span-7 relative h-[420px] rounded-3xl bg-slate-950 border border-slate-800 p-6 overflow-hidden flex flex-col justify-between shadow-2xl">
            {/* Radar Scanline & Circles */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-cyan-500/20 animate-ping" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-slate-800" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-slate-800" />

            {/* Radar Sweep Line */}
            <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-full -translate-y-full origin-bottom-right bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none animate-spin [animation-duration:6s]" />

            {/* Header overlay */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-civic-cyan">
                <Radio className="w-4 h-4 animate-pulse" />
                METROPOLITAN RADAR (SECTOR 4)
              </span>
              <span className="bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700">
                ACTIVE CODES: 4
              </span>
            </div>

            {/* Interactive Issue Pins placed on the radar map */}
            <div className="relative z-10 my-auto h-48 w-full flex items-center justify-around">
              {issues.map((iss, index) => {
                const isSelected = selectedIssue === index;
                const IconComponent = iss.icon;
                return (
                  <button
                    key={iss.id}
                    onClick={() => setSelectedIssue(index)}
                    className={`group relative flex flex-col items-center transition-all duration-300 ${
                      isSelected ? 'scale-125 z-20' : 'opacity-70 hover:opacity-100 hover:scale-110'
                    }`}
                  >
                    {/* Glowing Beacon Pin */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg transition-all duration-300"
                      style={{
                        backgroundColor: `${iss.color}20`,
                        borderColor: iss.color,
                        boxShadow: isSelected ? `0 0 25px ${iss.color}60` : 'none',
                      }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: iss.color }} />
                    </div>

                    <span
                      className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full border bg-slate-900/90 whitespace-nowrap shadow-md"
                      style={{ borderColor: `${iss.color}40`, color: iss.color }}
                    >
                      {iss.name}
                    </span>

                    {/* Ping wave */}
                    {isSelected && (
                      <span
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping"
                        style={{ backgroundColor: iss.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Radar Coordinates Footer */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-civic-orange" />
                {issues[selectedIssue].coords}
              </span>
              <span className="text-slate-300">
                {issues[selectedIssue].count}
              </span>
            </div>
          </div>

          {/* Detail Card on the right */}
          <div className="lg:col-span-5">
            <GlassCard
              glow={selectedIssue === 0 || selectedIssue === 1 ? 'critical' : 'cyan'}
              className="p-8 transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  SELECTED CIVIC HAZARD
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
                  style={{
                    backgroundColor: `${issues[selectedIssue].color}20`,
                    color: issues[selectedIssue].color,
                    border: `1px solid ${issues[selectedIssue].color}50`,
                  }}
                >
                  SEVERITY {issues[selectedIssue].score}/100
                </span>
              </div>

              <h3 className="text-2xl font-black font-mono text-white mt-4 tracking-tight">
                {issues[selectedIssue].name}
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {issues[selectedIssue].detail}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block">COORDINATES</span>
                  <span className="text-slate-200 mt-1 block font-medium">{issues[selectedIssue].coords}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">CITIZEN REPORTS</span>
                  <span className="text-civic-cyan mt-1 block font-bold">{issues[selectedIssue].count}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Risk Escalation Index</span>
                  <span className="text-rose-400 font-bold">{issues[selectedIssue].score}%</span>
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
