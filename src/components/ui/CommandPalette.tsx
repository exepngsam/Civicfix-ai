import React, { useState, useEffect } from 'react';
import {
  Search,
  PlusCircle,
  LayoutDashboard,
  Cpu,
  Map,
  Network,
  ShieldCheck,
  Server,
  X,
  Flame,
  MapPin,
  Award,
  Sparkles,
  Bot,
  Activity,
  FileText,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
  onOpenReportWizard: () => void;
  onOpenAwsModal: () => void;
  onOpenJudgeMode?: () => void;
  onOpenCopilot?: () => void;
  onTriggerDemo?: () => void;
  onOpenLiveOps?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenReportWizard,
  onOpenAwsModal,
  onOpenJudgeMode,
  onOpenCopilot,
  onTriggerDemo,
  onOpenLiveOps,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'priority',
      title: 'Open AI Priority Queue',
      desc: 'View ranked urgent action queue with why-prioritized factor rationale',
      icon: Flame,
      action: () => {
        onNavigate('priority');
        onClose();
      },
      category: 'Intelligence',
    },
    {
      id: 'hotspots',
      title: 'Civic Hotspots & Digital Twin',
      desc: 'Geographic health scores, predictive failure alerts, and root cause insights',
      icon: MapPin,
      action: () => {
        onNavigate('hotspots');
        onClose();
      },
      category: 'Intelligence',
    },
    {
      id: 'copilot',
      title: 'Ask CivicFix Operations Copilot',
      desc: 'Grounded assistant for risk queries, SLA breaches, and department backlogs',
      icon: Bot,
      action: () => {
        onClose();
        onOpenCopilot?.();
      },
      category: 'Intelligence',
    },
    {
      id: 'judge',
      title: 'Open Judge Mode Overview',
      desc: '20s elevator pitch, live AWS service health dots, and Architecture Explorer',
      icon: Award,
      action: () => {
        onClose();
        onOpenJudgeMode?.();
      },
      category: 'Hackathon Tools',
    },
    {
      id: 'demo',
      title: 'Run Hackathon Demo Flow (13 Steps)',
      desc: 'Deterministic automated walkthrough from intake to verified before/after proof',
      icon: Sparkles,
      action: () => {
        onClose();
        onTriggerDemo?.();
      },
      category: 'Hackathon Tools',
    },
    {
      id: 'live-ops',
      title: 'Open Live Operations Stream',
      desc: 'Real-time timestamped event feed connecting EventBridge, Bedrock, and DynamoDB',
      icon: Activity,
      action: () => {
        onClose();
        onOpenLiveOps?.();
      },
      category: 'Operations',
    },
    {
      id: 'impact',
      title: 'Open Impact Dashboard',
      desc: 'Macro civic ROI, population protected, duplicates prevented, and top wins',
      icon: Award,
      action: () => {
        onNavigate('impact');
        onClose();
      },
      category: 'Analytics',
    },
    {
      id: 'report',
      title: 'Report New Civic Issue',
      desc: 'Launch multi-step AI vision intake wizard',
      icon: PlusCircle,
      action: () => {
        onClose();
        onOpenReportWizard();
      },
      category: 'Actions',
    },
    {
      id: 'overview',
      title: 'Dashboard Overview',
      desc: 'City command center, sector health mini-cards, and critical alerts',
      icon: LayoutDashboard,
      action: () => {
        onNavigate('overview');
        onClose();
      },
      category: 'Navigation',
    },
    {
      id: 'reports',
      title: 'All Reports Registry',
      desc: 'Filterable catalog with sector tags and duplicate merge flags',
      icon: FileText,
      action: () => {
        onNavigate('reports');
        onClose();
      },
      category: 'Navigation',
    },
    {
      id: 'live-map',
      title: 'Geospatial Live Map',
      desc: 'Interactive Leaflet map with CartoDB dark tiles and cluster analysis',
      icon: Map,
      action: () => {
        onNavigate('map');
        onClose();
      },
      category: 'Navigation',
    },
    {
      id: 'ai-center',
      title: 'CivicFix AI Center (Bedrock)',
      desc: 'Model playground, vector duplicate radar, and latency telemetry',
      icon: Cpu,
      action: () => {
        onNavigate('ai');
        onClose();
      },
      category: 'Cloud Services',
    },
    {
      id: 'workflows',
      title: 'AWS Step Functions Visualizer',
      desc: 'Inspect automated resolution state machine DAG',
      icon: Network,
      action: () => {
        onNavigate('workflows');
        onClose();
      },
      category: 'Cloud Services',
    },
    {
      id: 'architecture',
      title: 'AWS Architecture & Telemetry',
      desc: 'Bedrock, S3, DynamoDB, OpenSearch, EventBridge architecture',
      icon: Server,
      action: () => {
        onClose();
        onOpenAwsModal();
      },
      category: 'Cloud Services',
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to page... (e.g. Priority, Copilot, Demo, Hotspots, Map)"
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0 ml-2">
                  {item.category}
                </span>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              No commands found matching &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Navigate with mouse or keyboard</span>
          <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400">ESC to exit</kbd>
        </div>
      </div>
    </div>
  );
};
