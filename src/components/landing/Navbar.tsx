import React, { useState } from 'react';
import { AppMode } from '@/types';
import { Server, PlusCircle, ArrowRight, Menu, X, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
  const { language, setLanguage, t } = useI18n();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-civic-dark/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer"
          onClick={() => {
            closeMobileMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-cyan-500/40 shadow-glowCyan">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-civic-cyan"
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
              <span className="text-base sm:text-lg font-black tracking-tight text-white font-mono">CIVICFIX</span>
              <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-mono font-bold bg-gradient-to-r from-civic-cyan to-civic-orange text-black">
                AI
              </span>
            </div>
            <p className="text-[8px] sm:text-[10px] font-mono text-slate-400 tracking-wider">THE CITY THAT LISTENS</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Pill Toggle (Desktop / Tablet) */}
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

          {/* Quick Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="uppercase font-bold">{language}</span>
            </button>

            {isLangOpen && (
              <div
                className="absolute right-0 mt-2 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 text-xs space-y-1 animate-scale-up"
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

          {/* Quick Report CTA */}
          <button
            onClick={() => {
              closeMobileMenu();
              onOpenReportWizard();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-civic-orange to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-glowOrange transition-all duration-200"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            <span className="inline">Report</span>
          </button>

          {/* Command Center CTA (Desktop) */}
          <button
            onClick={() => {
              closeMobileMenu();
              onEnterDashboard();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-xs font-mono transition-all"
          >
            <span>Command Center</span>
            <ArrowRight className="w-3.5 h-3.5 text-civic-cyan" />
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-5 py-6 space-y-4 animate-slide-down">
          {/* Mobile Mode Pill */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400">Environment Mode:</span>
            <button
              onClick={onToggleMode}
              className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold ${
                appMode === 'REAL_AWS'
                  ? 'bg-purple-950 border-purple-500 text-purple-300'
                  : 'bg-cyan-950 border-cyan-500 text-cyan-300'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  appMode === 'REAL_AWS' ? 'bg-civic-bedrock' : 'bg-civic-cyan'
                }`}
              />
              {appMode === 'REAL_AWS' ? 'AWS CONNECTED' : 'DEMO MODE: LOCAL'}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3 text-sm font-mono uppercase tracking-wider text-slate-200">
            <a
              href="#problem"
              onClick={closeMobileMenu}
              className="hover:text-civic-cyan py-1"
            >
              01 • Detection Radar
            </a>
            <a
              href="#ai-intelligence"
              onClick={closeMobileMenu}
              className="hover:text-civic-cyan py-1"
            >
              02 • Bedrock AI Vision
            </a>
            <a
              href="#workflow"
              onClick={closeMobileMenu}
              className="hover:text-civic-cyan py-1"
            >
              03 • Cloud Serverless Flow
            </a>
            <a
              href="#triage"
              onClick={closeMobileMenu}
              className="hover:text-civic-cyan py-1"
            >
              04 • Intelligent Triage
            </a>
            <a
              href="#resolution"
              onClick={closeMobileMenu}
              className="hover:text-civic-cyan py-1"
            >
              05 • Resolution Proof
            </a>
            <button
              onClick={() => {
                closeMobileMenu();
                onOpenAwsModal();
              }}
              className="flex items-center gap-2 text-civic-cyan py-1 text-left uppercase"
            >
              <Server className="w-4 h-4" />
              AWS Architecture Stack
            </button>
          </nav>

          {/* Mobile Launch Command Center CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                closeMobileMenu();
                onEnterDashboard();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-civic-cyan to-teal-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glowCyan"
            >
              <span>Launch Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
