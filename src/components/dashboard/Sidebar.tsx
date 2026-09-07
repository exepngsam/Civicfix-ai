import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Cpu,
  Map,
  Network,
  BarChart3,
  ShieldCheck,
  Server,
  LogOut,
  X,
  Flame,
  MapPin,
  Award,
} from 'lucide-react';
import { AppMode, UserSession } from '@/types';
import { useI18n } from '@/lib/i18n';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  appMode: AppMode;
  onToggleMode: () => void;
  onOpenAwsModal: () => void;
  user: UserSession;
  onSignOut: () => void;
  onBackToLanding: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  appMode,
  onToggleMode,
  onOpenAwsModal,
  user,
  onSignOut,
  onBackToLanding,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { t } = useI18n();

  const menuItems = [
    { id: 'overview', label: t.overview || 'Overview', icon: LayoutDashboard },
    { id: 'priority', label: t.aiPriorityQueue || 'AI Priority Queue', icon: Flame, badge: 'URGENT', badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
    { id: 'hotspots', label: t.hotspotsAndTwin || 'Hotspots & Twin', icon: MapPin, badge: 'HOT', badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { id: 'reports', label: t.allReports || 'Reports Registry', icon: FileText, badge: '32' },
    { id: 'impact', label: t.impactDashboard || 'Impact & ROI', icon: Award },
    { id: 'map', label: t.liveMap || 'Geospatial Map', icon: Map },
    { id: 'ai', label: 'AI Center', icon: Cpu, highlight: true },
    { id: 'workflows', label: t.workflows || 'Workflows', icon: Network },
    { id: 'evidence', label: t.evidenceVault || 'Evidence', icon: ShieldCheck },
  ];

  const handleSelect = (id: string) => {
    onSelectView(id);
    onCloseMobile?.();
  };

  const sidebarContent = (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between h-full select-none">
      {/* Top Header */}
      <div className="overflow-y-auto">
        {/* Brand Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              onBackToLanding();
              onCloseMobile?.();
            }}
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-cyan-500/40 shadow-glowCyan">
              <svg
                className="w-4 h-4 text-civic-cyan"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" className="fill-civic-orange stroke-civic-orange" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-white font-mono">CIVICFIX</span>
                <span className="text-[10px] px-1 py-0.2 rounded font-mono font-bold bg-cyan-500 text-black">
                  2.0
                </span>
              </div>
              <p className="text-[9px] font-mono text-slate-400">INTELLIGENT RESPONSE</p>
            </div>
          </div>

          {/* Close button for mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all group duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/15 via-cyan-500/5 to-transparent text-white border-l-2 border-cyan-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 hover:translate-x-0.5 border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                      item.badgeColor || 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Live Municipal Pulse & Telemetry */}
        <div className="px-4 py-3 mx-3 my-2 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              CIVIC SYSTEM SLA
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">99.98%</span>
          </div>

          <div className="space-y-1.5 text-[10px] font-mono text-slate-400">
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span>Bedrock Vision</span>
              <span className="text-purple-400 font-medium">842ms avg</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span>Vector k-NN</span>
              <span className="text-cyan-400 font-medium">1536-dim Active</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span>Event Queue</span>
              <span className="text-emerald-400 font-medium">0 Backlog</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: AWS Status & User Session */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 shrink-0">
        {/* AWS Architecture & Mode Pill */}
        <div
          onClick={() => {
            onOpenAwsModal();
            onCloseMobile?.();
          }}
          className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-purple-400" />
              AWS Stack
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleMode();
              }}
              className="text-[10px] text-cyan-400 hover:underline"
            >
              Toggle
            </button>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                appMode === 'REAL_AWS' ? 'bg-purple-500 animate-ping' : 'bg-cyan-400 animate-pulse'
              }`}
            />
            <span className="text-xs font-mono font-semibold text-white">
              {appMode === 'REAL_AWS' ? 'AWS: Connected' : 'Demo Mode: Local'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            {appMode === 'REAL_AWS' ? 'Bedrock • DynamoDB • S3' : 'Deterministic 13-Step Flow'}
          </p>
        </div>

        {/* User Session */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-mono font-bold text-xs text-white">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.name}</p>
              <p className="text-[10px] font-mono text-slate-400 truncate">{user.role}</p>
            </div>
          </div>

          <button
            onClick={() => {
              onSignOut();
              onCloseMobile?.();
            }}
            title="Sign out / Switch account"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Static Sidebar */}
      <div className="hidden md:flex h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </div>

      {/* Mobile Overlay Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={onCloseMobile}
          />
          {/* Drawer content */}
          <div className="relative z-10 animate-slide-right h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
