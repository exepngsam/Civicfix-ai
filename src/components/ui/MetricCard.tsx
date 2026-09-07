import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'cyan' | 'orange' | 'critical' | 'emerald' | 'bedrock';
  trend?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'cyan',
  trend,
  onClick,
}) => {
  const variantStyles = {
    cyan: {
      border: 'hover:border-civic-cyan/50 hover:shadow-glowCyan',
      iconBg: 'bg-cyan-500/10 text-civic-cyan border-cyan-500/30',
      accentText: 'text-civic-cyan',
      bar: 'bg-civic-cyan',
    },
    orange: {
      border: 'hover:border-civic-orange/50 hover:shadow-glowOrange',
      iconBg: 'bg-orange-500/10 text-civic-orange border-orange-500/30',
      accentText: 'text-civic-orange',
      bar: 'bg-civic-orange',
    },
    critical: {
      border: 'hover:border-rose-500/50 hover:shadow-glowCritical',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      accentText: 'text-rose-400',
      bar: 'bg-rose-500',
    },
    emerald: {
      border: 'hover:border-emerald-500/50 hover:shadow-glowEmerald',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      accentText: 'text-emerald-400',
      bar: 'bg-emerald-500',
    },
    bedrock: {
      border: 'hover:border-purple-500/50 hover:shadow-glowBedrock',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      accentText: 'text-purple-400',
      bar: 'bg-purple-500',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      onClick={onClick}
      className={`glass-card p-5 rounded-2xl border border-slate-800 transition-all duration-300 relative group overflow-hidden ${
        onClick ? 'cursor-pointer' : ''
      } ${style.border}`}
    >
      {/* Subtle top indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${style.bar} opacity-70 group-hover:opacity-100 transition-opacity`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400">{title}</p>
          <div className="text-3xl font-extrabold text-white mt-2 font-mono tracking-tight flex items-baseline gap-1">
            <AnimatedCounter value={value} />
          </div>
        </div>
        <div className={`p-3 rounded-xl border ${style.iconBg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-400">{subtitle}</span>}
          {trend && <span className={`font-mono font-medium ${style.accentText}`}>{trend}</span>}
        </div>
      )}
    </div>
  );
};
