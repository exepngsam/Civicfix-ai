import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CivicReport, AIAnalysisResult, ReportCategory, SeverityLevel } from '@/types';
import { civicAwsClient } from '@/lib/awsClient';
import { PRESET_CIVIC_EVIDENCE } from '@/lib/mockData';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  X,
  Upload,
  Camera,
  MapPin,
  Sparkles,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Search,
  Layers,
  Database,
  ShieldCheck,
} from 'lucide-react';

interface ReportWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportCreated: (newReport: CivicReport) => void;
}

export const ReportWizardModal: React.FC<ReportWizardModalProps> = ({
  isOpen,
  onClose,
  onReportCreated,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  // Form State
  const [imagePreview, setImagePreview] = useState<string>(PRESET_CIVIC_EVIDENCE[0].imageUrl);
  const [description, setDescription] = useState<string>(PRESET_CIVIC_EVIDENCE[0].defaultDescription);
  const [category, setCategory] = useState<ReportCategory>('road_damage');
  const [address, setAddress] = useState<string>(PRESET_CIVIC_EVIDENCE[0].address);
  const [latitude, setLatitude] = useState<number>(PRESET_CIVIC_EVIDENCE[0].lat);
  const [longitude, setLongitude] = useState<number>(PRESET_CIVIC_EVIDENCE[0].lng);

  // AI Stepper Progress
  const [aiStepMessage, setAiStepMessage] = useState<string>('Initializing Bedrock Pipeline...');
  const [aiProgress, setAiProgress] = useState<number>(10);
  const [aiServiceLabel, setAiServiceLabel] = useState<string>('Amazon S3');
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof PRESET_CIVIC_EVIDENCE[0]) => {
    setSelectedPresetId(preset.id);
    setImagePreview(preset.imageUrl);
    setDescription(preset.defaultDescription);
    setCategory(preset.category);
    setAddress(preset.address);
    setLatitude(preset.lat);
    setLongitude(preset.lng);
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setSelectedPresetId(null);
    }
  };

  const runAiAnalysis = async () => {
    setStep(4);
    try {
      const result = await civicAwsClient.analyzeEvidence(
        {
          imagePreviewUrl: imagePreview,
          presetId: selectedPresetId || undefined,
          description,
          category,
          latitude,
          longitude,
          address,
        },
        (message, progress, service) => {
          setAiStepMessage(message);
          setAiProgress(progress);
          setAiServiceLabel(service);
        }
      );

      setAiResult(result.analysis);
      setStep(5);
    } catch (err) {
      console.error('AI Analysis failed:', err);
      setStep(3);
    }
  };

  const handleFinalSubmit = async () => {
    if (!aiResult) return;
    setIsSubmitting(true);

    const newId = `REP-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReport: CivicReport = {
      id: newId,
      userId: 'usr-cit-current',
      userName: 'Alex Mercer (You)',
      title: description.slice(0, 48) + '...',
      description,
      category,
      severity: (aiResult.confidenceScore > 90 && aiResult.estimatedRepairHours <= 4 ? 'CRITICAL' : 'HIGH') as SeverityLevel,
      severityScore: Math.min(100, Math.floor(aiResult.confidenceScore * 0.98)),
      confidence: aiResult.confidenceScore,
      status: 'AI_VERIFIED',
      latitude,
      longitude,
      address,
      department: aiResult.targetDepartment,
      evidenceUrl: imagePreview,
      evidenceHash: 'a7b8c9d0e1f23456789abcdef0123456789abcdef0123456789abcdef0123456',
      duplicateScore: aiResult.duplicateProbability,
      similarReportsCount: Math.floor(Math.random() * 3) + 1,
      aiAnalysis: aiResult,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stepFunctionExecutionArn: `arn:aws:states:us-east-1:123456789012:execution:CivicFixResolutionFlow:${newId}-exec`,
    };

    await civicAwsClient.submitReport(newReport);
    onReportCreated(newReport);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ff6b35', '#00e599', '#a855f7'],
      });
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-civic-orange bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/30">
              STEP {step} OF 5
            </span>
            <h3 className="text-sm font-bold font-mono text-white">
              {step === 1 && 'Upload Civic Evidence'}
              {step === 2 && 'Geospatial Location'}
              {step === 3 && 'Issue Description'}
              {step === 4 && 'Bedrock AI Multimodal Engine'}
              {step === 5 && 'AI Assessment Review'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: Upload Evidence */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold font-mono text-white">
                  Provide Photographic Evidence
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Upload an image from your device or test instantly with one of our pre-loaded civic hazards.
                </p>
              </div>

              {/* 1-Click Instant Test Presets */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  1-CLICK HACKATHON TEST PRESETS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PRESET_CIVIC_EVIDENCE.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        selectedPresetId === preset.id
                          ? 'bg-cyan-500/15 border-civic-cyan shadow-glowCyan scale-102'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="h-14 rounded-lg overflow-hidden mb-1.5">
                        <img
                          src={preset.imageUrl}
                          alt={preset.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[10px] font-mono font-bold text-white truncate">
                        {preset.title.split(' ')[0]} {preset.title.split(' ')[1]}
                      </p>
                      <span className="text-[9px] font-mono text-civic-orange">
                        {preset.severity} ({preset.severityScore})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-civic-cyan rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-900/40"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCustomFileUpload}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-civic-cyan mx-auto mb-2" />
                <p className="text-xs font-mono font-bold text-white">
                  Click or Drag & Drop image file
                </p>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  Supports JPEG, PNG, WEBP (Max 15MB) • Client-side SHA-256 validation
                </p>
              </div>

              {/* Active Image Preview */}
              {imagePreview && (
                <div className="relative h-48 rounded-xl overflow-hidden border border-slate-700">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Evidence Loaded
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Location */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold font-mono text-white">
                  Confirm Municipal Location
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Accurate coordinates allow automated department routing and duplicate search radius filtering.
                </p>
              </div>

              {/* Address input */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                  STREET ADDRESS OR CIVIC CROSSING
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="glass-input w-full px-4 py-2.5 rounded-xl text-xs font-mono"
                />
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    LATITUDE
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value))}
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    LONGITUDE
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value))}
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              {/* Visual simulated pin preview */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-orange-500/20 text-civic-orange border border-orange-500/40">
                  <MapPin className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-white">
                    GPS Sector Verified
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                    Municipal District 04 • San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Description */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold font-mono text-white">
                  Describe What Happened
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Amazon Bedrock will cross-validate your text description against the visual features in the photograph.
                </p>
              </div>

              {/* Category selector */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                  ESTIMATED CIVIC CATEGORY
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ReportCategory)}
                  className="glass-input w-full px-3 py-2.5 rounded-xl text-xs font-mono text-white"
                >
                  <option value="road_damage">Road Infrastructure & Asphalt Potholes</option>
                  <option value="streetlights">Electrical, Streetlights & Utility Poles</option>
                  <option value="garbage_overflow">Sanitation, Waste Overflow & Litter</option>
                  <option value="water_leak">Water Mains, Hydrants & Sewage</option>
                  <option value="infrastructure">Public Bridges, Guardrails & Railings</option>
                  <option value="public_hazard">Public Hazards & Vandalism Blight</option>
                </select>
              </div>

              {/* Description textarea */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                  INCIDENT DETAILS
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the hazard, depth, danger to traffic, or pedestrian risk..."
                  className="glass-input w-full p-3.5 rounded-xl text-xs font-mono text-slate-200"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Cinematic AI Processing */}
          {step === 4 && (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-6">
              {/* Radar pulse visual */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping" />
                <div className="absolute inset-2 rounded-full border border-cyan-500/40 animate-pulse" />
                <div className="w-16 h-16 rounded-2xl bg-purple-950/90 border border-purple-500 flex items-center justify-center shadow-glowBedrock">
                  <Cpu className="w-8 h-8 text-civic-bedrock animate-pulse" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-purple-500/40 text-purple-300 uppercase">
                  ACTIVE AWS SERVICE: {aiServiceLabel}
                </span>
                <h4 className="text-lg font-black font-mono text-white mt-3">
                  {aiStepMessage}
                </h4>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-civic-orange transition-all duration-300 rounded-full"
                  style={{ width: `${aiProgress}%` }}
                />
              </div>

              <div className="text-[10px] font-mono text-slate-500 space-y-1">
                <p>Amazon Bedrock Claude 3.5 Sonnet • Titan Embeddings</p>
                <p>OpenSearch Vector Similarity • Step Functions Execution</p>
              </div>
            </div>
          )}

          {/* STEP 5: AI Result Review */}
          {step === 5 && aiResult && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/50 shadow-glowBedrock">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-300 uppercase font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    AI ASSESSMENT COMPLETE
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    LATENCY: {aiResult.inferenceLatencyMs}ms
                  </span>
                </div>

                <h4 className="text-xl font-black font-mono text-white mt-2">
                  CRITICAL CIVIC HAZARD DETECTED
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {aiResult.summary}
                </p>
              </div>

              {/* Metric Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">SEVERITY SCORE</span>
                  <span className="text-xl font-black text-rose-400 mt-0.5 block">94 / 100</span>
                  <span className="text-[9px] text-rose-400/80">Life Safety Critical</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">AI CONFIDENCE</span>
                  <span className="text-xl font-black text-emerald-400 mt-0.5 block">
                    {aiResult.confidenceScore}%
                  </span>
                  <span className="text-[9px] text-emerald-400/80">Multimodal Validated</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">DUPLICATES</span>
                  <span className="text-xl font-black text-civic-cyan mt-0.5 block">
                    {aiResult.duplicateProbability}%
                  </span>
                  <span className="text-[9px] text-slate-400">OpenSearch Vector</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">REPAIR SLA</span>
                  <span className="text-xl font-black text-amber-400 mt-0.5 block">
                    {aiResult.estimatedRepairHours}h
                  </span>
                  <span className="text-[9px] text-slate-400">Priority Dispatch</span>
                </div>
              </div>

              {/* Recommended Action & Routing */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-2">
                <div>
                  <span className="text-slate-500 block">ASSIGNED DEPARTMENT</span>
                  <span className="text-white font-bold text-sm">{aiResult.targetDepartment}</span>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-500 block">RECOMMENDED PROTOCOL</span>
                  <span className="text-slate-200 mt-0.5 block">{aiResult.recommendedAction}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between sticky bottom-0 z-10">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 && (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-civic-cyan hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={runAiAnalysis}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-glowBedrock transition-all flex items-center gap-1.5"
            >
              <Cpu className="w-4 h-4" />
              <span>Run Bedrock AI Analysis</span>
            </button>
          )}

          {step === 5 && (
            <button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-civic-orange to-amber-500 text-slate-950 font-mono font-black text-xs uppercase tracking-wider shadow-glowOrange hover:scale-105 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting to DynamoDB...' : 'Confirm & Submit Report'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
