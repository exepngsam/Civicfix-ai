import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { CivicReport, SeverityLevel, ReportStatus } from '@/types';
import { GlassCard } from '@/components/ui/GlassCard';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Layers, MapPin, Sparkles, X, ArrowUpRight, Cpu } from 'lucide-react';

interface LiveMapViewProps {
  reports: CivicReport[];
  onSelectReport: (report: CivicReport) => void;
}

export const LiveMapView: React.FC<LiveMapViewProps> = ({
  reports,
  onSelectReport,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [inspectedReport, setInspectedReport] = useState<CivicReport | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on San Francisco
    const map = L.map(mapContainerRef.current, {
      center: [37.7749, -122.4194],
      zoom: 13,
      zoomControl: true,
      attributionControl: true,
    });

    // Dark Matter CartoDB Basemap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://carto.com/">CARTO</a> | CivicFix AI Geospatial',
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers based on reports and activeFilter
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const filtered = reports.filter((r) => {
      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'CRITICAL') return r.severity === 'CRITICAL';
      if (activeFilter === 'HIGH') return r.severity === 'HIGH';
      if (activeFilter === 'MEDIUM') return r.severity === 'MEDIUM';
      if (activeFilter === 'RESOLVED') return r.status === 'RESOLVED';
      return true;
    });

    filtered.forEach((report) => {
      const isResolved = report.status === 'RESOLVED';
      const color = isResolved
        ? '#00e599'
        : report.severity === 'CRITICAL'
        ? '#ff3366'
        : report.severity === 'HIGH'
        ? '#ff6b35'
        : report.severity === 'MEDIUM'
        ? '#facc15'
        : '#94a3b8';

      // Custom pulsing SVG HTML icon
      const customIcon = L.divIcon({
        className: 'custom-civic-marker',
        html: `
          <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: ${color}35; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="width: 18px; height: 18px; border-radius: 50%; background-color: ${color}; border: 2.5px solid #050811; box-shadow: 0 0 15px ${color}; display: flex; align-items: center; justify-content: center;">
              <div style="width: 5px; height: 5px; border-radius: 50%; background-color: white;"></div>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([report.latitude, report.longitude], { icon: customIcon });

      marker.on('click', () => {
        setInspectedReport(report);
      });

      markersLayer.addLayer(marker);
    });
  }, [reports, activeFilter]);

  return (
    <div className="relative h-[calc(100vh-7rem)] sm:h-[calc(100vh-8rem)] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
      {/* Top Filter Floating Bar */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto sm:top-4 sm:left-4 z-[400] flex items-center gap-1.5 sm:gap-2 bg-slate-950/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl overflow-x-auto max-w-[calc(100%-1.5rem)] sm:max-w-none">
        <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 px-2 sm:px-3 uppercase shrink-0 hidden xs:inline">
          LAYERS:
        </span>
        {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'RESOLVED'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-semibold transition-all shrink-0 ${
              activeFilter === filter
                ? 'bg-cyan-500/20 text-civic-cyan border border-cyan-500/50 shadow-glowCyan'
                : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Map Legend (Desktop) */}
      <div className="absolute bottom-6 left-6 z-[400] bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-xs font-mono space-y-2 shadow-2xl hidden md:block">
        <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
          STATUS CODING
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff3366] shadow-glowCritical" />
          <span className="text-slate-300">Critical Hazard (Score 85+)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b35] shadow-glowOrange" />
          <span className="text-slate-300">High Priority (Score 70-84)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#facc15]" />
          <span className="text-slate-300">Medium Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00e599] shadow-glowEmerald" />
          <span className="text-slate-300">Resolved ✓</span>
        </div>
      </div>

      {/* Fullscreen Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Inspected Report Drawer / Card */}
      {inspectedReport && (
        <div className="absolute inset-x-3 bottom-3 top-auto sm:top-4 sm:right-4 sm:bottom-4 sm:left-auto sm:w-96 max-h-[75%] sm:max-h-none z-[400] animate-slide-up sm:animate-slide-left">
          <GlassCard glow="cyan" className="h-full flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                    {inspectedReport.id}
                  </span>
                  <SeverityBadge
                    severity={inspectedReport.severity}
                    score={inspectedReport.severityScore}
                    size="sm"
                  />
                </div>
                <button
                  onClick={() => setInspectedReport(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image */}
              <div className="mt-4 h-40 rounded-xl overflow-hidden border border-slate-800 relative">
                <img
                  src={inspectedReport.evidenceUrl}
                  alt={inspectedReport.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <StatusBadge status={inspectedReport.status} size="sm" />
                </div>
              </div>

              <h3 className="text-base font-bold font-mono text-white mt-4 leading-tight">
                {inspectedReport.title}
              </h3>

              <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-civic-orange shrink-0" />
                <span>{inspectedReport.address}</span>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs font-mono">
                <div className="flex items-center gap-1 text-purple-300 font-bold mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Bedrock Confidence: {inspectedReport.confidence}%</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {inspectedReport.aiAnalysis.summary}
                </p>
              </div>

              <div className="mt-4 space-y-1.5 text-xs font-mono text-slate-400">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Assigned Dept:</span>
                  <span className="text-slate-200">{inspectedReport.department.split('&')[0]}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span>Duplicates Nearby:</span>
                  <span className="text-civic-cyan font-bold">
                    {inspectedReport.similarReportsCount} reports ({inspectedReport.duplicateScore}%)
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Recommended Action:</span>
                  <span className="text-white text-right max-w-[180px] truncate">
                    {inspectedReport.aiAnalysis.recommendedAction}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 flex items-center gap-3">
              <button
                onClick={() => onSelectReport(inspectedReport)}
                className="w-full py-2.5 rounded-xl bg-civic-cyan hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <span>Full Investigation File</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
