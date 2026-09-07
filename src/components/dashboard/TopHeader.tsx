import React from 'react';
import { Search, PlusCircle, ArrowLeft, Radio, Menu } from 'lucide-react';
import { AppMode } from '@/types';

interface TopHeaderProps {
  onOpenReportWizard: () => void;
  onOpenCommandPalette: () => void;
  onOpenAwsModal: () => void;
  onBackToLanding: () => void;
  onToggleMobileSidebar?: () => void;
  appMode?: AppMode;
  eventCount: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenReportWizard,
  onOpenCommandPalette,
  onOpenAwsModal,
  onBackToLanding,
  onToggleMobileSidebar,
  eventCount,
}) => {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left Greeting & Navigation Controls */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Open Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-900 border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Landing Page</span>
        </button>

        <div className="hidden lg:block">
          <h2 className="text-sm font-bold text-white font-mono">
            Good morning. <span className="text-slate-400 font-normal">Here&apos;s what needs attention today.</span>
          </h2>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search / Command Palette shortcut */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-xs font-mono transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-civic-cyan" />
          <span className="hidden md:inline">Quick Search...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-slate-700 text-slate-400">
            Ctrl+K
          </kbd>
        </button>

        {/* Live EventBridge Telemetry Bell */}
        <button
          onClick={onOpenAwsModal}
          title="Open Live AWS EventBridge Telemetry"
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors"
        >
          <Radio className="w-4 h-4 text-purple-400" />
          {eventCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-civic-orange text-slate-950 font-mono font-bold text-[9px] flex items-center justify-center animate-pulse">
              {eventCount > 9 ? '9+' : eventCount}
            </span>
          )}
        </button>

        {/* Primary CTA: Report Issue */}
        <button
          onClick={onOpenReportWizard}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-civic-orange to-amber-500 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider shadow-glowOrange hover:scale-105 transition-all duration-200"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Report</span>
        </button>
      </div>
    </header>
  );
};
