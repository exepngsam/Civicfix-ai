import React from 'react';
import { ReportStatus } from '@/types';
import { CheckCircle2, Clock, Cpu, UserCheck, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: ReportStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  switch (status) {
    case 'REPORTED':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 ${sizeClasses[size]}`}
        >
          <AlertTriangle className="w-3 h-3 text-slate-400" />
          Reported
        </span>
      );
    case 'AI_VERIFIED':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/40 shadow-sm ${sizeClasses[size]}`}
        >
          <Cpu className="w-3 h-3 text-civic-bedrock animate-pulse" />
          AI Verified
        </span>
      );
    case 'ASSIGNED':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 ${sizeClasses[size]}`}
        >
          <UserCheck className="w-3 h-3 text-civic-cyan" />
          Assigned
        </span>
      );
    case 'IN_PROGRESS':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/40 ${sizeClasses[size]}`}
        >
          <Clock className="w-3 h-3 text-amber-400 animate-spin" />
          In Progress
        </span>
      );
    case 'RESOLVED':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 shadow-sm ${sizeClasses[size]}`}
        >
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          Resolved ✓
        </span>
      );
    default:
      return null;
  }
};
