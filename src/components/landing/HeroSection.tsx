import React from 'react';
import { CityScene } from '@/components/ui/CityScene';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { PlusCircle, Compass, Cpu, ShieldAlert, Sparkles, CheckCircle, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenReportWizard: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReportWizard,
  onExploreClick,
}) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden pt-12 pb-8">
      {/* Background 3D Abstract City */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
        <CityScene interactive={true} className="w-full h-full" />
      </div>

      {/* Cyber Grid Texture Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-10" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 sm:pt-14">
        {/* Futuristic Sub-badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-cyan-500/40 bg-slate-900/80 backdrop-blur-md text-civic-cyan font-mono text-[10px] sm:text-xs tracking-widest uppercase mb-4 sm:mb-6 shadow-glowCyan animate-pulse-glow">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-civic-orange" />
          <span>AI-POWERED CIVIC INTELLIGENCE</span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white font-mono leading-[1.08] drop-shadow-2xl">
          THE CITY <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-civic-cyan via-white to-civic-orange">
            THAT LISTENS.
          </span>
        </h1>

        {/* Narrative Subtitle */}
        <p className="mt-4 sm:mt-6 text-base sm:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed px-2">
          Report a problem. Let AI understand it. <br className="hidden sm:inline" />
          Let the right people fix it.
        </p>

        {/* Dual Primary / Secondary CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenReportWizard}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-civic-orange via-amber-500 to-civic-orange bg-size-200 text-slate-950 font-black text-sm uppercase tracking-wider shadow-glowOrange hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <PlusCircle className="w-5 h-5 text-slate-950 stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
            <span>REPORT AN ISSUE</span>
          </button>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-mono text-sm uppercase tracking-wider hover:border-civic-cyan/50 hover:shadow-glowCyan transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-civic-cyan" />
            <span>EXPLORE HOW IT WORKS</span>
          </button>
        </div>

        {/* Interactive Feature Hints */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-civic-bedrock" />
            Amazon Bedrock Multimodal Vision
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-civic-critical" />
            Instant Severity Triage
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-civic-resolved" />
            Automated Step Functions Workflow
          </span>
        </div>
      </div>

      {/* Floating Ticker Bar */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 w-full mt-12">
        <div className="glass-card rounded-2xl border border-slate-800 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white flex items-baseline gap-1">
              <AnimatedCounter value={1248} />
              <span className="text-xs text-civic-cyan font-normal">+18 today</span>
            </div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
              CITIZEN REPORTS RECORDED
            </p>
          </div>

          <div className="flex flex-col items-center pt-4 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400 flex items-baseline gap-1">
              <AnimatedCounter value={31} />
              <span className="text-xs text-rose-400/80 font-normal">Active</span>
            </div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
              CRITICAL HAZARDS PRIORITIZED
            </p>
          </div>

          <div className="flex flex-col items-center pt-4 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 flex items-baseline gap-1">
              <AnimatedCounter value={87} suffix="%" />
              <span className="text-xs text-emerald-400/80 font-normal">SLA Met</span>
            </div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
              AUTOMATED RESOLUTION RATE
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-1 text-slate-500 hover:text-civic-cyan text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <span>SCROLL TO EXPLORE STORY</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
