import React, { useState, useRef } from 'react';
import { ResolutionProof } from '@/types';
import { CheckCircle2, ShieldCheck, Clock, UserCheck, Sliders, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  proof?: ResolutionProof;
  issueTitle: string;
  onUploadAfterImage?: (url: string, notes: string) => void;
  canUpload?: boolean;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  proof,
  issueTitle,
  onUploadAfterImage,
  canUpload = true,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultBefore =
    proof?.beforeImageUrl ||
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1000&q=80';
  const defaultAfter =
    proof?.afterImageUrl ||
    'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80';

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const simulateResolutionProof = () => {
    if (onUploadAfterImage) {
      onUploadAfterImage(
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80',
        'Emergency rapid cold patch cured and roller-compacted. Traffic safety restored with verified inspection.'
      );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Evidence Layer
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400">Visual Verification</span>
          </div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            Before & After Resolution Proof
          </h3>
        </div>

        {proof?.verifiedAt ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Resolution Evidence ✓ Verified</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Awaiting Field Resolution Photo</span>
          </div>
        )}
      </div>

      {/* Interactive Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-800"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER Image (Background) */}
        <img
          src={defaultAfter}
          alt="After resolution"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-500/40 shadow-lg pointer-events-none">
          AFTER (RESOLVED)
        </div>

        {/* BEFORE Image (Clipped Foreground) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={defaultBefore}
            alt="Before resolution"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="absolute top-3 left-3 bg-rose-950/80 backdrop-blur-md text-rose-300 text-xs font-bold px-2.5 py-1 rounded-md border border-rose-500/40 shadow-lg pointer-events-none">
            BEFORE (REPORTED)
          </div>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-10 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center shadow-2xl text-white transform -translate-x-1/2">
            <Sliders className="w-3.5 h-3.5 rotate-90" />
          </div>
        </div>
      </div>

      {/* Slider Caption / Instruction */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
        <span>← Drag slider left/right to compare</span>
        <span>Split position: {Math.round(sliderPosition)}%</span>
      </div>

      {/* Verification Details */}
      {proof?.verifiedAt ? (
        <div className="mt-4 p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>{proof.verifiedBy || 'Authorized Field Inspector'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{new Date(proof.verifiedAt).toLocaleString()}</span>
            </div>
          </div>
          {proof.notes && (
            <p className="text-slate-400 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
              "{proof.notes}"
            </p>
          )}
        </div>
      ) : (
        canUpload && (
          <div className="mt-4 p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Authorized Field Verification:</span> An issue cannot be closed without verified before/after proof.
            </div>
            <button
              onClick={simulateResolutionProof}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-colors shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Submit Resolution Proof
            </button>
          </div>
        )
      )}
    </div>
  );
};
