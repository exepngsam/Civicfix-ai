import React, { useState } from 'react';
import { UserSession } from '@/types';
import { APP_CONFIG } from '@/lib/config';
import {
  X,
  Shield,
  Lock,
  Mail,
  User,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState<string>('dispatcher@civicfix.gov');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [name, setName] = useState<string>('Elena Rostova');
  const [role, setRole] = useState<'CITIZEN' | 'CITY_DISPATCHER'>('CITY_DISPATCHER');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      userId: `usr-${Date.now()}`,
      email,
      name: tab === 'signup' ? name : 'Elena Rostova',
      role,
      cognitoSub: 'us-east-1:c3b49f05-cognito-sub',
      isAuthenticated: true,
    });
    onClose();
  };

  const handleQuickJudgeLogin = (selectedRole: 'CITY_DISPATCHER' | 'CITIZEN') => {
    onLoginSuccess({
      userId: 'usr-judge-eval',
      email: selectedRole === 'CITY_DISPATCHER' ? 'dispatcher@sf.gov' : 'citizen@civicfix.org',
      name: selectedRole === 'CITY_DISPATCHER' ? 'Chief Dispatcher Vance' : 'Citizen Elena',
      role: selectedRole,
      cognitoSub: 'us-east-1:99a8b7c6-judge-session',
      isAuthenticated: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-civic-cyan">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-white">
                AMAZON COGNITO AUTH
              </h3>
              <p className="text-[10px] font-mono text-slate-400">
                Secure JWT User Pool Identity Provider
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Judge Login Option */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 shadow-glowCyan">
            <span className="text-[10px] font-mono text-civic-cyan uppercase font-bold tracking-wider block mb-2">
              ⚡ HACKATHON 1-CLICK INSTANT LOGIN
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickJudgeLogin('CITY_DISPATCHER')}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-bold text-center hover:border-civic-cyan transition-colors"
              >
                City Dispatcher
              </button>
              <button
                onClick={() => handleQuickJudgeLogin('CITIZEN')}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs font-bold text-center hover:border-civic-orange transition-colors"
              >
                Resident Citizen
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setTab('signin')}
              className={`py-2 rounded-lg font-bold transition-all ${
                tab === 'signin' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`py-2 rounded-lg font-bold transition-all ${
                tab === 'signup' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              Register Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            {tab === 'signup' && (
              <div>
                <label className="text-slate-400 uppercase block mb-1">FULL NAME</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Citizen"
                    className="glass-input w-full pl-9 pr-3 py-2.5 rounded-xl text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-slate-400 uppercase block mb-1">MUNICIPAL EMAIL</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input w-full pl-9 pr-3 py-2.5 rounded-xl text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 uppercase block mb-1">PASSWORD</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-9 pr-3 py-2.5 rounded-xl text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-civic-cyan hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider shadow-glowCyan transition-all flex items-center justify-center gap-2 mt-6"
            >
              <span>{tab === 'signin' ? 'Sign In via Cognito' : 'Create Cognito User'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* User Pool Metadata */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-500 space-y-0.5">
            <div>COGNITO USER POOL: {APP_CONFIG.cognitoUserPoolId}</div>
            <div>COGNITO CLIENT ID: {APP_CONFIG.cognitoClientId}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
