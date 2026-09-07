import React, { useState } from 'react';
import { CivicReport, ReportStatus, AppMode, UserSession, AwsTelemetryEvent } from '@/types';
import { INITIAL_CIVIC_REPORTS, INITIAL_AWS_TELEMETRY } from '@/lib/mockData';
import { APP_CONFIG } from '@/lib/config';
import { civicAwsClient } from '@/lib/awsClient';
import { ToastProvider, useToast } from '@/components/ui/Toast';

// Landing Page Components
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { StorySectionProblem } from '@/components/landing/StorySectionProblem';
import { StorySectionAiVision } from '@/components/landing/StorySectionAiVision';
import { StorySectionWorkflow } from '@/components/landing/StorySectionWorkflow';
import { StorySectionPriority } from '@/components/landing/StorySectionPriority';
import { StorySectionResolution } from '@/components/landing/StorySectionResolution';
import { LandingFooter } from '@/components/landing/LandingFooter';

// Dashboard Components
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopHeader } from '@/components/dashboard/TopHeader';
import { OverviewView } from '@/components/dashboard/OverviewView';
import { ReportsListView } from '@/components/dashboard/ReportsListView';
import { ReportDetailModal } from '@/components/dashboard/ReportDetailModal';

// Dedicated Subsystem Views
import { LiveMapView } from '@/components/map/LiveMapView';
import { AiCenterView } from '@/components/ai/AiCenterView';
import { WorkflowVisualizerView } from '@/components/workflow/WorkflowVisualizerView';
import { EvidenceIntelligenceView } from '@/components/evidence/EvidenceIntelligenceView';
import { AnalyticsView } from '@/components/analytics/AnalyticsView';

// Global Overlays
import { ReportWizardModal } from '@/components/report/ReportWizardModal';
import { AwsArchitectureModal } from '@/components/aws/AwsArchitectureModal';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { AuthModal } from '@/components/auth/AuthModal';

const AppContent: React.FC = () => {
  const { showToast } = useToast();

  // Root View State: 'landing' | 'dashboard'
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'dashboard'>('landing');

  // Dashboard Sub-View State: 'overview' | 'reports' | 'ai' | 'map' | 'workflows' | 'analytics' | 'evidence'
  const [dashboardView, setDashboardView] = useState<string>('overview');

  // Application Mode: 'DEMO' | 'REAL_AWS'
  const [appMode, setAppMode] = useState<AppMode>(APP_CONFIG.defaultMode);

  // User Session (Amazon Cognito)
  const [user, setUser] = useState<UserSession>({
    userId: 'usr-cit-104',
    email: 'elena.rostova@civicfix.org',
    name: 'Elena Rostova',
    role: 'CITY_DISPATCHER',
    cognitoSub: 'us-east-1:c3b49f05-session',
    isAuthenticated: true,
  });

  // Main Reports Registry State
  const [reports, setReports] = useState<CivicReport[]>(INITIAL_CIVIC_REPORTS);

  // Selected Report for Inspection Drawer
  const [selectedReport, setSelectedReport] = useState<CivicReport | null>(null);

  // Telemetry Log State
  const [telemetryEvents, setTelemetryEvents] = useState<AwsTelemetryEvent[]>(INITIAL_AWS_TELEMETRY);

  // Modal Visibility States
  const [isReportWizardOpen, setIsReportWizardOpen] = useState<boolean>(false);
  const [isAwsModalOpen, setIsAwsModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Toggle Mode Handler
  const handleToggleMode = () => {
    const nextMode: AppMode = appMode === 'REAL_AWS' ? 'DEMO' : 'REAL_AWS';
    setAppMode(nextMode);
    civicAwsClient.setMode(nextMode);
    showToast({
      title: nextMode === 'REAL_AWS' ? 'Switched to Real AWS Cloud Mode' : 'Switched to Local Demo Mode',
      description:
        nextMode === 'REAL_AWS'
          ? 'Connecting to live Bedrock, S3, and DynamoDB endpoints.'
          : 'Operating in zero-config offline mode with simulated latency.',
      type: nextMode === 'REAL_AWS' ? 'info' : 'warning',
    });
  };

  // Report Submission Handler
  const handleReportCreated = (newReport: CivicReport) => {
    setReports((prev) => [newReport, ...prev]);

    // Add Telemetry Event
    const newEvent: AwsTelemetryEvent = {
      id: `evt-${Date.now()}`,
      timestamp: 'Just now',
      service: 'Amazon Bedrock',
      action: 'InvokeModel (Claude 3.5 Sonnet)',
      details: `New report ${newReport.id} parsed with score ${newReport.severityScore}/100`,
      status: 'SUCCESS',
      latencyMs: 842,
    };
    setTelemetryEvents((prev) => [newEvent, ...prev]);

    showToast({
      title: `Report ${newReport.id} Submitted Successfully`,
      description: `Dispatched to ${newReport.department}. EventBridge event emitted.`,
      type: 'success',
    });

    // If on landing, prompt to open dashboard
    if (currentScreen === 'landing') {
      setTimeout(() => {
        setCurrentScreen('dashboard');
        setDashboardView('reports');
        setSelectedReport(newReport);
      }, 1000);
    }
  };

  // Status Updater Handler
  const handleUpdateStatus = (reportId: string, newStatus: ReportStatus) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: newStatus,
              updatedAt: new Date().toISOString(),
              resolvedAt: newStatus === 'RESOLVED' ? new Date().toISOString() : r.resolvedAt,
            }
          : r
      )
    );

    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              updatedAt: new Date().toISOString(),
              resolvedAt: newStatus === 'RESOLVED' ? new Date().toISOString() : prev.resolvedAt,
            }
          : null
      );
    }

    // Telemetry
    const newEvent: AwsTelemetryEvent = {
      id: `evt-${Date.now()}`,
      timestamp: 'Just now',
      service: 'Amazon EventBridge',
      action: 'PutEvents (CivicFix.StatusUpdated)',
      details: `${reportId} transition to ${newStatus}`,
      status: 'SUCCESS',
      latencyMs: 44,
    };
    setTelemetryEvents((prev) => [newEvent, ...prev]);

    showToast({
      title: `Status Updated: ${newStatus}`,
      description: `${reportId} state updated in Amazon DynamoDB.`,
      type: 'info',
    });
  };

  return (
    <div className="min-h-screen bg-civic-dark text-slate-100 flex flex-col selection:bg-civic-cyan/30 selection:text-civic-cyan">
      {/* SCREEN 1: CINEMATIC LANDING PAGE */}
      {currentScreen === 'landing' && (
        <main className="flex-1 flex flex-col">
          <Navbar
            appMode={appMode}
            onToggleMode={handleToggleMode}
            onOpenReportWizard={() => setIsReportWizardOpen(true)}
            onEnterDashboard={() => setCurrentScreen('dashboard')}
            onOpenAwsModal={() => setIsAwsModalOpen(true)}
          />

          <HeroSection
            onOpenReportWizard={() => setIsReportWizardOpen(true)}
            onExploreClick={() => {
              const el = document.getElementById('problem');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <StorySectionProblem />
          <StorySectionAiVision />
          <StorySectionWorkflow />
          <StorySectionPriority />
          <StorySectionResolution />

          <LandingFooter
            onEnterDashboard={() => setCurrentScreen('dashboard')}
            onOpenAwsModal={() => setIsAwsModalOpen(true)}
          />
        </main>
      )}

      {/* SCREEN 2: COMMAND CENTER DASHBOARD */}
      {currentScreen === 'dashboard' && (
        <div className="flex flex-1 h-screen overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar
            currentView={dashboardView}
            onSelectView={setDashboardView}
            appMode={appMode}
            onToggleMode={handleToggleMode}
            onOpenAwsModal={() => setIsAwsModalOpen(true)}
            user={user}
            onSignOut={() => setIsAuthModalOpen(true)}
            onBackToLanding={() => setCurrentScreen('landing')}
          />

          {/* Main Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <TopHeader
              onOpenReportWizard={() => setIsReportWizardOpen(true)}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              onOpenAwsModal={() => setIsAwsModalOpen(true)}
              onBackToLanding={() => setCurrentScreen('landing')}
              appMode={appMode}
              eventCount={telemetryEvents.length}
            />

            <main className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
              {dashboardView === 'overview' && (
                <OverviewView
                  reports={reports}
                  onSelectReport={setSelectedReport}
                  onNavigateToMap={() => setDashboardView('map')}
                  onNavigateToReports={() => setDashboardView('reports')}
                  onOpenReportWizard={() => setIsReportWizardOpen(true)}
                />
              )}

              {dashboardView === 'reports' && (
                <ReportsListView
                  reports={reports}
                  onSelectReport={setSelectedReport}
                  onOpenReportWizard={() => setIsReportWizardOpen(true)}
                />
              )}

              {dashboardView === 'ai' && (
                <AiCenterView appMode={appMode} />
              )}

              {dashboardView === 'map' && (
                <LiveMapView
                  reports={reports}
                  onSelectReport={setSelectedReport}
                />
              )}

              {dashboardView === 'workflows' && (
                <WorkflowVisualizerView />
              )}

              {dashboardView === 'analytics' && (
                <AnalyticsView />
              )}

              {dashboardView === 'evidence' && (
                <EvidenceIntelligenceView
                  reports={reports}
                  onSelectReport={setSelectedReport}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* GLOBAL MODALS & OVERLAYS */}
      <ReportWizardModal
        isOpen={isReportWizardOpen}
        onClose={() => setIsReportWizardOpen(false)}
        onReportCreated={handleReportCreated}
      />

      <ReportDetailModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      <AwsArchitectureModal
        isOpen={isAwsModalOpen}
        onClose={() => setIsAwsModalOpen(false)}
        telemetryEvents={telemetryEvents}
        appMode={appMode}
        onToggleMode={handleToggleMode}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(view) => {
          setCurrentScreen('dashboard');
          setDashboardView(view);
        }}
        onOpenReportWizard={() => setIsReportWizardOpen(true)}
        onOpenAwsModal={() => setIsAwsModalOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(session) => {
          setUser(session);
          showToast({
            title: `Welcome, ${session.name}`,
            description: `Authenticated via Amazon Cognito as ${session.role}.`,
            type: 'success',
          });
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

export default App;
