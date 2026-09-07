import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { User, Server, Cpu, Search, Database, Radio, Network, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const StorySectionWorkflow: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(0);

  const nodes = [
    {
      id: 0,
      title: 'Citizen Report',
      service: 'Mobile Web / App',
      icon: User,
      color: '#38bdf8',
      latency: 'Instant',
      details: 'Submits GPS coordinates, description, and high-res evidence photo.',
    },
    {
      id: 1,
      title: 'CivicFix API Gateway',
      service: 'Amazon API Gateway',
      icon: Server,
      color: '#00f0ff',
      latency: '24ms',
      details: 'Validates request token, rate-limits, and dispatches to AWS Lambda.',
    },
    {
      id: 2,
      title: 'Multimodal Vision',
      service: 'Amazon Bedrock',
      icon: Cpu,
      color: '#a855f7',
      latency: '842ms',
      details: 'Claude 3.5 Sonnet extracts hazards, calculates severity, determines routing.',
    },
    {
      id: 3,
      title: 'Vector Duplicate Check',
      service: 'Amazon OpenSearch',
      icon: Search,
      color: '#ff6b35',
      latency: '88ms',
      details: 'Compares 1536-dim embeddings to prevent double-dispatch and group reports.',
    },
    {
      id: 4,
      title: 'State & Indexing',
      service: 'Amazon DynamoDB',
      icon: Database,
      color: '#3b82f6',
      latency: '18ms',
      details: 'Stores immutable report records with GSI on status and department.',
    },
    {
      id: 5,
      title: 'Event Choreography',
      service: 'Amazon EventBridge',
      icon: Radio,
      color: '#ec4899',
      latency: '36ms',
      details: 'Broadcasts "CivicFix.ReportCreated" event to subscribers and webhooks.',
    },
    {
      id: 6,
      title: 'Resolution Engine',
      service: 'AWS Step Functions',
      icon: Network,
      color: '#10b981',
      latency: 'State Machine',
      details: 'Coordinates SLA timers, crew assignments, photo verification, and status gates.',
    },
    {
      id: 7,
      title: 'Field Crew Dispatch',
      service: 'Municipal Fleet',
      icon: Truck,
      color: '#00e599',
      latency: '< 2 Hours',
      details: 'Work order received by department depot with turn-by-turn navigation.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <section id="workflow" className="py-24 relative border-t border-slate-800/80 bg-civic-dark/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SECTION 03 — SERVERLESS ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-white">
            FROM REPORT TO ACTION.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 font-light">
            No human bottleneck. Every civic issue cascades through a fully automated, event-driven AWS serverless architecture.
          </p>
        </div>

        {/* Interactive Architecture Flow Pipeline */}
        <div className="relative">
          {/* Connecting Cable Line */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 bg-slate-800 rounded-full z-0 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 transition-all duration-700"
              style={{ width: `${((activeNode + 1) / nodes.length) * 100}%` }}
            />
          </div>

          {/* Node Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
            {nodes.map((node, index) => {
              const isActive = activeNode === index;
              const isPast = activeNode > index;
              const IconComponent = node.icon;

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(index)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 flex flex-col items-center text-center ${
                    isActive
                      ? 'bg-slate-900 border-white shadow-2xl scale-110 z-20'
                      : isPast
                      ? 'bg-slate-950/80 border-slate-700 text-slate-300'
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: isActive ? node.color : undefined,
                    boxShadow: isActive ? `0 0 25px ${node.color}50` : undefined,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 border transition-transform duration-300"
                    style={{
                      backgroundColor: `${node.color}15`,
                      borderColor: `${node.color}40`,
                    }}
                  >
                    <IconComponent
                      className="w-5 h-5"
                      style={{ color: node.color }}
                    />
                  </div>

                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider">
                    STEP 0{index + 1}
                  </span>
                  <h4 className="text-xs font-mono font-bold text-white mt-1 line-clamp-1">
                    {node.title}
                  </h4>
                  <span className="text-[9px] font-mono text-slate-400 mt-1 line-clamp-1">
                    {node.service}
                  </span>

                  {/* Pulsing indicator */}
                  {isActive && (
                    <span
                      className="mt-2 w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: node.color }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Deep Dive Inspector */}
        <div className="mt-12 max-w-3xl mx-auto">
          <GlassCard className="p-6 border-slate-800/90 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${nodes[activeNode].color}20`,
                    borderColor: nodes[activeNode].color,
                  }}
                >
                  {React.createElement(nodes[activeNode].icon, {
                    className: 'w-5 h-5',
                    style: { color: nodes[activeNode].color },
                  })}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">
                    {nodes[activeNode].title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Service: {nodes[activeNode].service}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Execution Latency:</span>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-mono font-bold"
                  style={{
                    backgroundColor: `${nodes[activeNode].color}20`,
                    color: nodes[activeNode].color,
                    border: `1px solid ${nodes[activeNode].color}40`,
                  }}
                >
                  {nodes[activeNode].latency}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed font-light">
              {nodes[activeNode].details}
            </p>

            <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>AWS CloudFormation / SAM Stack Native</span>
              <span>Fully Automated • Zero Manual Dispatch</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
