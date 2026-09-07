import React, { useState, useEffect } from 'react';
import { AwsTelemetryEvent } from '@/types';
import { Radio, Pause, Play, Filter, X, Server, CheckCircle2, Clock } from 'lucide-react';

interface LiveOperationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  events: AwsTelemetryEvent[];
}

export const LiveOperationsDrawer: React.FC<LiveOperationsDrawerProps> = ({
  isOpen,
  onClose,
  events,
}) => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [streamEvents, setStreamEvents] = useState<AwsTelemetryEvent[]>(events);
  const [filterService, setFilterService] = useState<string>('ALL');

  useEffect(() => {
    setStreamEvents(events);
  }, [events]);

  // Simulate incoming live telemetry ticks if stream is active
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const services = ['Amazon Bedrock', 'Amazon EventBridge', 'Amazon DynamoDB', 'AWS Step Functions'] as const;
      const s = services[Math.floor(Math.random() * services.length)];

      const sampleEvents: Record<string, { action: string; details: string; latency: number }> = {
        'Amazon Bedrock': {
          action: 'InvokeModel (Claude 3.5 Sonnet)',
          details: 'Vision classification completed for incoming mobile evidence chunk',
          latency: 780 + Math.floor(Math.random() * 80),
        },
        'Amazon EventBridge': {
          action: 'PutEvents (CivicFix.TelemetrySync)',
          details: 'Dispatched message to dispatcher MQTT queue',
          latency: 38 + Math.floor(Math.random() * 15),
        },
        'Amazon DynamoDB': {
          action: 'UpdateItem (CivicFixReports)',
          details: 'Updated SLA timestamp & telemetry status',
          latency: 18 + Math.floor(Math.random() * 10),
        },
        'AWS Step Functions': {
          action: 'SendTaskSuccess (ActivityHeartbeat)',
          details: 'State machine checkpoint acknowledged by worker daemon',
          latency: 65 + Math.floor(Math.random() * 20),
        },
      };

      const eventData = sampleEvents[s];
      const newEvt: AwsTelemetryEvent = {
        id: `live-${Date.now()}`,
        timestamp: timeStr,
        service: s,
        action: eventData.action,
        details: eventData.details,
        status: 'SUCCESS',
        latencyMs: eventData.latency,
      };

      setStreamEvents((prev) => [newEvt, ...prev.slice(0, 40)]);
    }, 6000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  if (!isOpen) return null;

  const filtered = filterService === 'ALL'
    ? streamEvents
    : streamEvents.filter((e) => e.service.toLowerCase().includes(filterService.toLowerCase()));

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full p-6 shadow-2xl flex flex-col text-slate-100 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <Radio className={`w-5 h-5 text-cyan-400 ${isStreaming ? 'animate-pulse' : ''}`} />
              {isStreaming && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                LIVE OPERATIONS STREAM
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Real-Time Event Stream (AWS EventBridge / Lambda)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title={isStreaming ? 'Pause stream' : 'Resume stream'}
              aria-label={isStreaming ? 'Pause stream' : 'Resume stream'}
            >
              {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Operations Stream"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 py-3 border-b border-slate-800 text-xs overflow-x-auto">
          <span className="text-slate-500 flex items-center gap-1 text-[11px]">
            <Filter className="w-3 h-3" />
            Filter:
          </span>
          {['ALL', 'Bedrock', 'OpenSearch', 'DynamoDB', 'EventBridge', 'Step Functions'].map((svc) => (
            <button
              key={svc}
              onClick={() => setFilterService(svc)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-colors shrink-0 ${
                filterService === svc
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              {svc}
            </button>
          ))}
        </div>

        {/* Event List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 py-4 pr-1">
          {filtered.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3 text-xs space-y-1 hover:border-slate-700 transition-colors font-mono"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-cyan-400 font-bold">{evt.timestamp}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {evt.latencyMs}ms
                </span>
              </div>

              <div className="text-slate-200 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{evt.action}</span>
              </div>

              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{evt.details}</p>

              <div className="text-[10px] text-slate-500 pt-1 flex items-center justify-between">
                <span>{evt.service}</span>
                <span className="text-emerald-400">STATUS 200 OK</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Connection healthy (WSS)</span>
          </span>
          <span className="font-mono text-slate-500">{filtered.length} buffered</span>
        </div>
      </div>
    </div>
  );
};
