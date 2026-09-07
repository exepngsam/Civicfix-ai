import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'warning' | 'info' | 'critical';
}

interface ToastContextType {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-xl shadow-2xl flex items-start gap-3 transition-all duration-300 animate-slide-up ${
              t.type === 'critical'
                ? 'bg-rose-950/90 border-rose-500/60 text-white shadow-glowCritical'
                : t.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/60 text-white shadow-glowEmerald'
                : t.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/60 text-white shadow-glowOrange'
                : 'bg-slate-900/90 border-cyan-500/40 text-white shadow-glowCyan'
            }`}
          >
            {t.type === 'critical' ? (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : t.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : t.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-civic-cyan shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold">{t.title}</h4>
              {t.description && <p className="text-xs text-slate-300 mt-1">{t.description}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
