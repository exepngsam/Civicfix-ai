import React from 'react';
import { SeverityLevel } from '@/types';
import { AlertOctagon, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  score,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-semibold',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold',
  };

  switch (severity) {
    case 'CRITICAL':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/60 shadow-glowCritical ${sizeClasses[size]}`}
        >
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          CRITICAL {score ? `(${score})` : ''}
        </span>
      );
    case 'HIGH':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-orange-950/80 text-orange-300 border border-orange-500/50 shadow-glowOrange ${sizeClasses[size]}`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
          HIGH {score ? `(${score})` : ''}
        </span>
      );
    case 'MEDIUM':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-amber-950/70 text-amber-300 border border-amber-500/40 ${sizeClasses[size]}`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          MEDIUM {score ? `(${score})` : ''}
        </span>
      );
    case 'LOW':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 ${sizeClasses[size]}`}
        >
          <Info className="w-3.5 h-3.5 text-slate-400" />
          LOW {score ? `(${score})` : ''}
        </span>
      );
    default:
      return null;
  }
};
