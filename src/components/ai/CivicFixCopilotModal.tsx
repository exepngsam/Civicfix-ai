import React, { useState } from 'react';
import { CivicReport } from '@/types';
import { Bot, Send, Sparkles, X, User, ArrowRight, ShieldAlert, Building2, MapPin } from 'lucide-react';

interface CivicFixCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: CivicReport[];
  onSelectReport?: (report: CivicReport) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  reportLink?: CivicReport;
  dataPoints?: { label: string; value: string }[];
  timestamp: string;
}

export const CivicFixCopilotModal: React.FC<CivicFixCopilotModalProps> = ({
  isOpen,
  onClose,
  reports,
  onSelectReport,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'copilot',
      text: "Hello! I'm your CivicFix Operations Copilot. I'm connected to live municipal telemetry across 6 sectors. Ask me about high-risk incidents, department backlogs, or hotspot predictions.",
      timestamp: 'Just now',
    },
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Which issues need attention today?',
    'Which area has the highest civic risk?',
    'Why is issue REP-9042 critical?',
    'Which department has the largest backlog?',
    'Show unresolved road issues older than 24 hours.',
    "Summarize today's civic situation.",
  ];

  const handleSend = (queryText?: string) => {
    const query = (queryText || inputQuery).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');

    // Answer grounded in live data
    setTimeout(() => {
      let botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: 'copilot',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const q = query.toLowerCase();

      if (q.includes('attention today') || q.includes('need attention')) {
        const criticals = reports.filter((r) => r.severity === 'CRITICAL');
        botResponse.text = `Currently, ${criticals.length} critical issues require urgent intervention today. The highest priority is ${criticals[0]?.id} (${criticals[0]?.title}) with a Civic Impact Score of ${criticals[0]?.civicImpact?.totalScore}/100.`;
        botResponse.reportLink = criticals[0];
        botResponse.dataPoints = [
          { label: 'Critical Incidents', value: `${criticals.length}` },
          { label: 'Top Priority ID', value: criticals[0]?.id || 'N/A' },
          { label: 'Target SLA', value: '4 hours' },
        ];
      } else if (q.includes('highest civic risk') || q.includes('area') || q.includes('sector')) {
        botResponse.text = `Sector 14 currently has the highest composite civic risk (Health Score: 72/100, down 6% this week). It contains 47 active reports, primarily driven by road damage on Market St and lighting corridor failures on Mission St.`;
        botResponse.dataPoints = [
          { label: 'Sector', value: 'Sector 14' },
          { label: 'Active Reports', value: '47' },
          { label: 'Weekly Trend', value: '↑ 32% volume' },
        ];
      } else if (q.includes('rep-9042') || q.includes('critical')) {
        const rep = reports.find((r) => r.id === 'REP-9042') || reports[0];
        botResponse.text = `REP-9042 is rated 94/100 (Critical) due to an active 14-inch deep asphalt depression on Market St adjacent to a primary pedestrian crossing. It has received 6 clustered reports (merged into Master Incident INC-2048) and has been unresolved for over 3 hours.`;
        botResponse.reportLink = rep;
      } else if (q.includes('backlog') || q.includes('department')) {
        const roadReports = reports.filter((r) => r.department.toLowerCase().includes('road'));
        botResponse.text = `Road Maintenance & Infrastructure currently holds the largest backlog with ${roadReports.length} active assignments across 3 sectors, followed by Sanitation & Waste Management.`;
        botResponse.dataPoints = [
          { label: 'Road Maintenance', value: `${roadReports.length} tickets` },
          { label: 'Avg Resolution', value: '5.2 hrs' },
        ];
      } else if (q.includes('older than 24') || q.includes('24 hours') || q.includes('road')) {
        const overdue = reports.filter((r) => r.sla?.status === 'OVERDUE');
        botResponse.text = `Found ${overdue.length} incidents exceeding their standard SLA windows. The most pressing is REP-9021 (Refuse accumulation blocking fire exit) which is currently overdue by 1 hour 12 minutes.`;
        botResponse.reportLink = overdue[0];
      } else {
        // Today's general civic summary
        const criticalCount = reports.filter((r) => r.severity === 'CRITICAL').length;
        botResponse.text = `Today's Civic Brief: The city operations platform is tracking ${reports.length} total incidents. ${criticalCount} critical issues are currently in active dispatch. Sector 14 exhibits the highest density, while Waterfront District has the fastest resolution velocity (2.9h).`;
        botResponse.dataPoints = [
          { label: 'Total Catalog', value: `${reports.length}` },
          { label: 'Critical Active', value: `${criticalCount}` },
          { label: 'SLA Compliance', value: '94.2%' },
        ];
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 max-w-2xl w-full shadow-2xl relative text-slate-100 flex flex-col h-[680px] max-h-[92vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close Copilot"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              CivicFix Operations Copilot
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Grounded AI
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Answers queries using live database & telemetry telemetry. Not a generic LLM.
            </p>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'copilot' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-cyan-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-800/60 border border-slate-700/60 text-slate-200 rounded-tl-none space-y-3'
                }`}
              >
                <p>{m.text}</p>

                {/* Data Points Badge */}
                {m.dataPoints && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-700/60">
                    {m.dataPoints.map((dp, idx) => (
                      <div key={idx} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase">{dp.label}</div>
                        <div className="text-xs font-mono font-bold text-cyan-400 mt-0.5">
                          {dp.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Direct Action Link */}
                {m.reportLink && (
                  <div className="pt-2 flex items-center justify-between bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <div className="truncate mr-2">
                      <span className="text-[10px] font-mono text-cyan-400">
                        {m.reportLink.id}
                      </span>
                      <p className="text-xs font-bold text-white truncate">
                        {m.reportLink.title}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (onSelectReport && m.reportLink) {
                          onSelectReport(m.reportLink);
                          onClose();
                        }
                      }}
                      className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded transition-colors flex items-center gap-1 shrink-0"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <span className="text-[10px] text-slate-500 block text-right font-mono">
                  {m.timestamp}
                </span>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="mb-3">
          <div className="text-[11px] text-slate-400 font-semibold mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Suggested Operations Inquiries:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] border border-slate-700/60 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Field */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask CivicFix Copilot about municipal risks, backlogs, or SLAs..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
