import React from 'react';
import { ArrowRight, Server, Shield, Sparkles } from 'lucide-react';

interface LandingFooterProps {
  onEnterDashboard: () => void;
  onOpenAwsModal: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onEnterDashboard,
  onOpenAwsModal,
}) => {
  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 pt-20 pb-12 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-cyan-500/10 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-civic-orange" />
          <span>CIVIC INTELLIGENCE ARCHITECTURE</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-white leading-tight">
          MAKE YOUR CITY BETTER, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-civic-cyan via-white to-civic-orange">
            ONE REPORT AT A TIME.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-light">
          Built for the AWS Hackathon. Experience the next generation of civic governance powered by Amazon Bedrock and serverless cloud automation.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onEnterDashboard}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-civic-cyan via-teal-400 to-civic-cyan text-slate-950 font-black font-mono text-sm uppercase tracking-wider shadow-glowCyan hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>OPEN CIVICFIX COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenAwsModal}
            className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-mono text-sm uppercase tracking-wider hover:border-purple-500/50 hover:shadow-glowBedrock transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Server className="w-4 h-4 text-purple-400" />
            <span>INSPECT AWS ARCHITECTURE</span>
          </button>
        </div>

        {/* Footer Meta & Hackathon Transparency */}
        <div className="mt-20 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">CIVICFIX AI</span>
            <span>•</span>
            <span>The City That Listens</span>
            <span>•</span>
            <span className="text-emerald-400">AWS Hackathon Edition</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Amazon Bedrock</span>
            <span>•</span>
            <span>Amazon S3</span>
            <span>•</span>
            <span>DynamoDB</span>
            <span>•</span>
            <span>Step Functions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
