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
  Settings,
  LogOut,
  Sparkles,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { AppMode, UserSession } from '@/types';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  appMode: AppMode;
  onToggleMode: () => void;
  onOpenAwsModal: () => void;
  user: UserSession;
  onSignOut: () => void;
  onBackToLanding: () => void;
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
}) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'reports', label: 'Reports', icon: FileText, badge: '8' },
    { id: 'ai', label: 'AI Center', icon: Cpu, highlight: true },
    { id: 'map', label: 'Live Map', icon: Map },
    { id: 'workflows', label: 'Workflows', icon: Network },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'evidence', label: 'Evidence', icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Top Header */}
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBackToLanding}>
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
                <span className="text-[10px] px-1 py-0.2 rounded font-mono font-bold bg-civic-cyan text-black">
                  AI
                </span>
              </div>
              <p className="text-[9px] font-mono text-slate-400">COMMAND CENTER</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all group ${
                  isActive
                    ? 'bg-cyan-500/10 text-civic-cyan border border-cyan-500/30 shadow-glowCyan font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-civic-cyan' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
                    {item.badge}
                  </span>
                )}
                {item.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-civic-bedrock animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: AWS Status & User Session */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        {/* AWS Architecture & Mode Pill */}
        <div
          onClick={onOpenAwsModal}
          className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-civic-bedrock" />
              AWS Stack
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleMode();
              }}
              className="text-[10px] text-civic-cyan hover:underline"
            >
              Toggle
            </button>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                appMode === 'REAL_AWS' ? 'bg-civic-bedrock animate-ping' : 'bg-civic-cyan animate-pulse'
              }`}
            />
            <span className="text-xs font-mono font-semibold text-white">
              {appMode === 'REAL_AWS' ? 'AWS: Connected' : 'Demo Mode: Local'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            {appMode === 'REAL_AWS' ? 'Bedrock • DynamoDB • S3' : 'Simulated Latency & Events'}
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
            onClick={onSignOut}
            title="Sign out / Switch account"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
