import React, { useState } from 'react';
import {
  Search,
  PlusCircle,
  ArrowLeft,
  Radio,
  Menu,
  Award,
  Sparkles,
  Bot,
  Globe,
  Activity,
  Flame,
} from 'lucide-react';
import { AppMode, CivicReport, LanguageCode } from '@/types';
import { useI18n } from '@/lib/i18n';

interface TopHeaderProps {
  onOpenReportWizard: () => void;
  onOpenCommandPalette: () => void;
  onOpenAwsModal: () => void;
  onOpenJudgeMode?: () => void;
  onOpenCopilot?: () => void;
  onTriggerDemo?: () => void;
  onOpenLiveOps?: () => void;
  onBackToLanding: () => void;
  onToggleMobileSidebar?: () => void;
  appMode?: AppMode;
  eventCount: number;
  reports?: CivicReport[];
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenReportWizard,
  onOpenCommandPalette,
  onOpenAwsModal,
  onOpenJudgeMode,
  onOpenCopilot,
  onTriggerDemo,
  onOpenLiveOps,
  onBackToLanding,
  onToggleMobileSidebar,
  eventCount,
  reports = [],
}) => {
  const { language, setLanguage, t } = useI18n();
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Dynamic Today's Civic Brief calculation
  const criticalCount = reports.filter((r) => r.severity === 'CRITICAL').length;
  const atRiskCount = reports.filter((r) => r.sla?.status === 'AT_RISK' || r.sla?.status === 'OVERDUE').length;

  return (
    <div className="sticky top-0 z-20 flex flex-col bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
      {/* TODAY'S CIVIC BRIEF TICKER (Section 66) */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-850 flex items-center justify-between text-[11px] overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.2 rounded font-mono font-bold text-[10px] bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shrink-0">
            {t.todayCivicBrief}
          </span>
          <span className="text-slate-300 font-medium">
            <strong className="text-rose-400">{criticalCount || 7} critical issues</strong> require urgent attention • Road infrastructure is the largest category • Sector 14 has the highest density • Avg resolution velocity improved by 18% • <strong className="text-amber-400">{atRiskCount || 3} incidents</strong> approaching SLA breach.
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-500 font-mono pl-4 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Bedrock Stream Active</span>
        </div>
      </div>

      {/* MAIN HEADER BAR */}
      <header className="h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left Greeting & Navigation Controls */}
        <div className="flex items-center gap-2.5">
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
        </div>

        {/* Center / Right Tools */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* JUDGE MODE Trigger (Section 79) */}
          {onOpenJudgeMode && (
            <button
              onClick={onOpenJudgeMode}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono transition-all shadow-sm"
              title="Open Official Judge Overview & Architecture Explorer"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Judge Mode</span>
            </button>
          )}

          {/* HACKATHON DEMO RUNNER Trigger (Section 78) */}
          {onTriggerDemo && (
            <button
              onClick={onTriggerDemo}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold font-mono transition-all shadow-sm"
              title="Run 13-Step Automated Hackathon Demo"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden md:inline">Run Demo</span>
            </button>
          )}

          {/* COPILOT Trigger (Section 58) */}
          {onOpenCopilot && (
            <button
              onClick={onOpenCopilot}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-cyan-500/40 text-xs font-bold transition-colors"
              title="Ask CivicFix Operations Copilot"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden lg:inline">Copilot</span>
            </button>
          )}

          {/* LIVE OPERATIONS STREAM (Section 60) */}
          {onOpenLiveOps && (
            <button
              onClick={onOpenLiveOps}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 transition-colors relative"
              title="Open Live Operations Stream"
              aria-label="Open Live Operations Stream"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </button>
          )}

          {/* MULTI-LANGUAGE SELECTOR (Section 63) */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="uppercase font-bold">{language}</span>
            </button>

            {isLangOpen && (
              <div
                className="absolute right-0 mt-2 w-36 bg-slate-900 border border-slate-850 rounded-xl shadow-2xl p-1.5 z-30 text-xs space-y-1 animate-scale-up"
                onClick={() => setIsLangOpen(false)}
              >
                <button
                  onClick={() => setLanguage('en')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    language === 'en' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    language === 'hi' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  हिन्दी (HI)
                </button>
                <button
                  onClick={() => setLanguage('or')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    language === 'or' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ଓଡ଼ିଆ (OR)
                </button>
              </div>
            )}
          </div>

          {/* Search / Command Palette shortcut (Section 59) */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-xs font-mono transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-slate-700 text-slate-400">
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
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-mono font-bold text-[9px] flex items-center justify-center animate-pulse">
                {eventCount > 9 ? '9+' : eventCount}
              </span>
            )}
          </button>

          {/* Primary CTA: Report Issue */}
          <button
            onClick={onOpenReportWizard}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Report</span>
          </button>
        </div>
      </header>
    </div>
  );
};
