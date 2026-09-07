import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: 'cyan' | 'orange' | 'critical' | 'emerald' | 'bedrock' | 'none';
  hoverEffect?: boolean;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  glow = 'none',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  const glowClasses = {
    none: '',
    cyan: 'border-civic-cyan/30 shadow-glowCyan',
    orange: 'border-civic-orange/30 shadow-glowOrange',
    critical: 'border-civic-critical/30 shadow-glowCritical',
    emerald: 'border-civic-resolved/30 shadow-glowEmerald',
    bedrock: 'border-civic-bedrock/30 shadow-glowBedrock',
  };

  return (
    <div
      className={`glass-card rounded-2xl border border-slate-800/80 p-6 relative overflow-hidden backdrop-blur-xl ${
        hoverEffect ? 'glass-card-hover cursor-pointer' : ''
      } ${glowClasses[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
