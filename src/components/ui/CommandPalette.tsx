import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, LayoutDashboard, Cpu, Map, Network, ShieldCheck, Server, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
  onOpenReportWizard: () => void;
  onOpenAwsModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenReportWizard,
  onOpenAwsModal,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
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
      desc: 'City command center, KPIs, and critical alerts',
      icon: LayoutDashboard,
      action: () => {
        onNavigate('overview');
        onClose();
      },
      category: 'Navigation',
    },
    {
      id: 'live-map',
      title: 'Live Issues Map',
      desc: 'Interactive geospatial cluster map with filters',
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
      desc: 'Model playground, vector duplicate radar, inference metrics',
      icon: Cpu,
      action: () => {
        onNavigate('ai');
        onClose();
      },
      category: 'Intelligence',
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
      id: 'evidence',
      title: 'Evidence Intelligence & Forensics',
      desc: 'SHA-256 integrity hash & S3 archival proof',
      icon: ShieldCheck,
      action: () => {
        onNavigate('evidence');
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
      a.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-24 px-4">
      <div
        className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-civic-cyan mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to page... (e.g. Bedrock, Map, Report)"
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 text-left transition-colors group"
              >
                <div className="p-2 rounded-lg bg-slate-800 text-civic-cyan group-hover:bg-civic-cyan/10 group-hover:text-civic-cyan border border-slate-700/50">
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 group-hover:text-white flex items-center justify-between">
                    <span>{item.title}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{item.category}</span>
                  </div>
                  <div className="text-xs text-slate-400 truncate">{item.desc}</div>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Press ESC to close</span>
          <span>CIVICFIX AI v1.0 • AWS BEDROCK POWERED</span>
        </div>
      </div>
    </div>
  );
};
