/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, RiskScanResult, DemoScenario } from './types';
import { Header } from './components/Header';
import { HeroLanding } from './components/HeroLanding';
import { RiskScanner } from './components/RiskScanner';
import { FutureSimulator } from './components/FutureSimulator';
import { DecisionIntelligence } from './components/DecisionIntelligence';
import { ProblemSolver } from './components/ProblemSolver';
import { MultimodalVision } from './components/MultimodalVision';
import { VoiceAssistant } from './components/VoiceAssistant';
import { RealtimeSensors } from './components/RealtimeSensors';
import { InnovationGenerator } from './components/InnovationGenerator';
import { IntelligenceDashboard } from './components/IntelligenceDashboard';
import {
  OpportunityDetectorView,
  HabitTransformationView,
  SkillGapAnalyzerView,
} from './components/AdvancedFeatures';
import { EmergencyModal } from './components/EmergencyModal';
import { IntroSplash } from './components/IntroSplash';
import { UserAccountsModal, UserProfile, PRESET_ACCOUNTS } from './components/UserAccountsModal';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('scanner');
  const [intelligenceScore, setIntelligenceScore] = useState<number>(84);
  const [scanResult, setScanResult] = useState<RiskScanResult | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<DemoScenario | null>(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<UserProfile>(PRESET_ACCOUNTS[0]);

  const handleSelectDemo = (demo: DemoScenario) => {
    setSelectedDemo(demo);
    setActiveTab('scanner');
  };

  const handleScanCompleted = (result: RiskScanResult) => {
    setScanResult(result);
    setIntelligenceScore(result.overallIntelligenceScore);
  };

  return (
    <>
      {/* Intro Starting Sequence */}
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}

      <div className="min-h-screen bg-[#020408] text-slate-200 selection:bg-indigo-500 selection:text-white flex flex-col font-sans">
        
        {/* Top Header Navbar */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          intelligenceScore={intelligenceScore}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onSelectDemo={handleSelectDemo}
          activeUser={activeUser}
          onOpenAccountModal={() => setIsAccountModalOpen(true)}
          onReplayIntro={() => setShowIntro(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Top Hero Section */}
          <HeroLanding
            setActiveTab={setActiveTab}
            onSelectDemo={handleSelectDemo}
          />

          {/* Feature Navigation Tabs */}
          <div className="my-6 p-1.5 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 shrink-0">
              ADVANCED ENGINES:
            </span>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'opportunities' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              AI Opportunity Detector
            </button>
            <button
              onClick={() => setActiveTab('habits')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'habits' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              AI Habit Transformation
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'skills' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              AI Skill Gap Analyzer
            </button>
          </div>

          {/* Dynamic Feature Views */}
          <div className="pb-12">
            {activeTab === 'scanner' && (
              <RiskScanner
                demoScenario={selectedDemo}
                onAnalysisComplete={handleScanCompleted}
              />
            )}

            {activeTab === 'simulator' && (
              <FutureSimulator demoScenario={selectedDemo} />
            )}

            {activeTab === 'decision' && (
              <DecisionIntelligence demoScenario={selectedDemo} />
            )}

            {activeTab === 'problem' && (
              <ProblemSolver demoScenario={selectedDemo} />
            )}

            {activeTab === 'vision' && (
              <MultimodalVision demoScenario={selectedDemo} />
            )}

            {activeTab === 'voice' && <VoiceAssistant />}

            {activeTab === 'sensors' && <RealtimeSensors />}

            {activeTab === 'innovation' && (
              <InnovationGenerator demoScenario={selectedDemo} />
            )}

            {activeTab === 'dashboard' && (
              <IntelligenceDashboard
                scanResult={scanResult}
                intelligenceScore={intelligenceScore}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'opportunities' && <OpportunityDetectorView />}
            {activeTab === 'habits' && <HabitTransformationView />}
            {activeTab === 'skills' && <SkillGapAnalyzerView />}
          </div>

        </main>

        {/* Emergency Mode Modal */}
        <EmergencyModal
          isOpen={isEmergencyOpen}
          onClose={() => setIsEmergencyOpen(false)}
        />

        {/* User Account & Registration Modal */}
        <UserAccountsModal
          isOpen={isAccountModalOpen}
          onClose={() => setIsAccountModalOpen(false)}
          activeUser={activeUser}
          onSelectUser={(user) => {
            setActiveUser(user);
            setIntelligenceScore(user.intelligenceScore);
          }}
        />

        {/* Bottom Console Status & Footer */}
        <footer className="h-10 bg-[#010204] border-t border-white/5 px-6 flex items-center justify-between text-[9px] font-mono text-slate-500">
          <div className="flex items-center gap-4">
            <span className="text-indigo-400 font-bold">IGNITEX HACKFEST</span>
            <span className="hidden sm:inline">MODEL: GEMINI-3.6-FLASH</span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-indigo-400 animate-pulse font-semibold">LOG: Active User Profile: {activeUser.name} ({activeUser.role})</span>
            <span className="hidden md:inline text-slate-600 truncate">| Analyzing future node branches...</span>
          </div>
          <div className="text-slate-400 font-bold">NOVA-SENSE v3.6 • IgniteX HackFest</div>
        </footer>

      </div>
    </>
  );
}
