import React from 'react';
import {
  BrainCircuit,
  ShieldAlert,
  Gauge,
  Sparkles,
  Zap,
  Activity,
  Compass,
  FileSearch,
  Mic,
  Lightbulb,
  Sliders,
  Flame,
  Radio,
  User,
  RotateCcw,
} from 'lucide-react';
import { ActiveTab, DemoScenario } from '../types';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { UserProfile } from './UserAccountsModal';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  intelligenceScore: number;
  onOpenEmergency: () => void;
  onSelectDemo: (demo: DemoScenario) => void;
  activeUser: UserProfile;
  onOpenAccountModal: () => void;
  onReplayIntro: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  intelligenceScore,
  onOpenEmergency,
  onSelectDemo,
  activeUser,
  onOpenAccountModal,
  onReplayIntro,
}) => {
  const [showDemoMenu, setShowDemoMenu] = React.useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'scanner', label: 'Risk Scanner', icon: <Gauge className="w-4 h-4" /> },
    { id: 'simulator', label: 'Future Simulator', icon: <Activity className="w-4 h-4" /> },
    { id: 'decision', label: 'Decision AI', icon: <Compass className="w-4 h-4" /> },
    { id: 'problem', label: 'Problem Solver', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'vision', label: 'AI Vision', icon: <FileSearch className="w-4 h-4" /> },
    { id: 'voice', label: 'Voice AI', icon: <Mic className="w-4 h-4" /> },
    { id: 'sensors', label: 'Live Sensors', icon: <Radio className="w-4 h-4" /> },
    { id: 'innovation', label: 'Innovation Engine', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Sliders className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#020408]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Vision Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-black text-white italic text-base">N</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white leading-none">
                  NOVA SENSE AI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-full uppercase">
                  IgniteX HackFest
                </span>
              </div>
              <p className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-semibold mt-0.5">
                Preventive Intelligence
              </p>
            </div>
          </div>

          {/* Right Header Status Controls & Accounts */}
          <div className="flex items-center space-x-3">
            
            {/* Replay Boot Intro Button */}
            <button
              onClick={onReplayIntro}
              title="Replay System Boot Intro Animation"
              className="p-1.5 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all hidden sm:flex items-center justify-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* User Account Switcher Button */}
            <button
              onClick={onOpenAccountModal}
              className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
            >
              <div className={`w-5 h-5 rounded-full ${activeUser.avatarColor} flex items-center justify-center text-[10px] text-white font-bold`}>
                {activeUser.name.charAt(0)}
              </div>
              <span className="hidden sm:inline font-bold">{activeUser.name}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 uppercase tracking-widest hidden lg:inline">
                {activeUser.badge}
              </span>
            </button>

            {/* Live Intelligence Score Indicator */}
            <div 
              onClick={() => setActiveTab('dashboard')}
              className="hidden md:flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="text-left flex items-baseline space-x-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  INTEL:
                </span>
                <span className="text-xs font-bold text-white">
                  {intelligenceScore}
                </span>
                <span className="text-[9px] font-bold text-indigo-400">+3.2%</span>
              </div>
            </div>

            {/* Built-in Demo Scenarios Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDemoMenu(!showDemoMenu)}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Demo Presets</span>
              </button>

              {showDemoMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-[#03060c] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5">
                    Select Test Scenario (Instant Demo)
                  </div>
                  <div className="py-1 space-y-1">
                    {DEMO_SCENARIOS.map((demo) => (
                      <button
                        key={demo.id}
                        onClick={() => {
                          onSelectDemo(demo);
                          setShowDemoMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 transition-all group flex items-start space-x-2.5"
                      >
                        <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-300">
                            {demo.name}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {demo.tagline}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Mode Button */}
            <button
              onClick={onOpenEmergency}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Flame className="w-3.5 h-3.5 text-white" />
              <span className="hidden md:inline tracking-wide">EMERGENCY MODE</span>
            </button>

          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar border-t border-white/5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-indigo-400 bg-white/5 border border-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
