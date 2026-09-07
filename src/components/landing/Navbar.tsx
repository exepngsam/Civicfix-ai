import React from 'react';
import { AppMode } from '@/types';
import { Shield, Sparkles, Server, PlusCircle, ArrowRight } from 'lucide-react';

interface NavbarProps {
  appMode: AppMode;
  onToggleMode: () => void;
  onOpenReportWizard: () => void;
  onEnterDashboard: () => void;
  onOpenAwsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  appMode,
  onToggleMode,
  onOpenReportWizard,
  onEnterDashboard,
  onOpenAwsModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-civic-dark/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-cyan-500/40 shadow-glowCyan">
            {/* Custom Location & AI Signal Icon */}
            <svg
              className="w-5 h-5 text-civic-cyan"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" className="fill-civic-orange stroke-civic-orange" />
              <path d="M12 2v2" className="stroke-civic-cyan" />
              <path d="M12 20v2" className="stroke-civic-cyan" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-civic-cyan rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white font-mono">CIVICFIX</span>
              <span className="text-xs px-1.5 py-0.5 rounded font-mono font-bold bg-gradient-to-r from-civic-cyan to-civic-orange text-black">
                AI
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-wider">THE CITY THAT LISTENS</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-slate-300">
          <a href="#problem" className="hover:text-civic-cyan transition-colors">Problem</a>
          <a href="#ai-intelligence" className="hover:text-civic-cyan transition-colors">AI Vision</a>
          <a href="#workflow" className="hover:text-civic-cyan transition-colors">Cloud Flow</a>
          <a href="#triage" className="hover:text-civic-cyan transition-colors">Triage</a>
          <a href="#resolution" className="hover:text-civic-cyan transition-colors">Resolution</a>
          <button
            onClick={onOpenAwsModal}
            className="flex items-center gap-1.5 text-civic-cyan hover:text-white transition-colors"
          >
            <Server className="w-3.5 h-3.5" />
            AWS Stack
          </button>
        </nav>

        {/* Actions & Mode Badge */}
        <div className="flex items-center gap-3">
          {/* Mode Pill Toggle */}
          <button
            onClick={onToggleMode}
            title="Toggle between Real AWS & Zero-Config Demo Mode"
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
              appMode === 'REAL_AWS'
                ? 'bg-purple-950/70 border-purple-500/50 text-purple-300 shadow-glowBedrock'
                : 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300 shadow-glowCyan'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                appMode === 'REAL_AWS' ? 'bg-civic-bedrock animate-pulse' : 'bg-civic-cyan animate-pulse'
              }`}
            />
            <span>{appMode === 'REAL_AWS' ? 'AWS: CONNECTED' : 'DEMO MODE: LOCAL'}</span>
          </button>

          {/* Quick Report CTA */}
          <button
            onClick={onOpenReportWizard}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-civic-orange to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glowOrange transition-all duration-200"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            <span className="hidden sm:inline">Report Issue</span>
          </button>

          {/* Command Center CTA */}
          <button
            onClick={onEnterDashboard}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-xs font-mono transition-all"
          >
            <span>Command Center</span>
            <ArrowRight className="w-3.5 h-3.5 text-civic-cyan" />
          </button>
        </div>
      </div>
    </header>
  );
};
