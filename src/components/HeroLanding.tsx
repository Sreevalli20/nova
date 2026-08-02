import React from 'react';
import {
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  Activity,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Layers,
  GraduationCap,
  Building2,
  Briefcase,
  Sprout,
} from 'lucide-react';
import { ActiveTab, DemoScenario } from '../types';
import { DEMO_SCENARIOS } from '../data/demoScenarios';

interface HeroLandingProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectDemo: (demo: DemoScenario) => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({ setActiveTab, onSelectDemo }) => {
  return (
    <div className="relative overflow-hidden pt-4 pb-8 mb-6 border-b border-white/5">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-bold tracking-widest uppercase shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>IgniteX HackFest • Preventive Intelligence Engine</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Predict & Prevent Problems <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              Before They Impact Performance.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Traditional software reacts after failure occurs. <strong className="text-white font-semibold">NOVA SENSE AI</strong> predicts 
            risks early, decomposes root causes, simulates branching futures, and executes preventive intervention.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('scanner')}
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs tracking-wider uppercase hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all flex items-center space-x-2"
            >
              <BrainCircuit className="w-4 h-4 text-white" />
              <span>Launch Risk Scanner</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-200 font-bold text-xs tracking-wider uppercase hover:bg-white/10 hover:border-white/20 transition-all flex items-center space-x-2"
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Run Future Simulator</span>
            </button>
          </div>
        </div>

        {/* Built-in Demo Scenarios Quick Bar */}
        <div className="mt-8 p-5 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Instant Scenario Diagnostic Presets
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider hidden sm:inline">
              Pre-configured domain vectors
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {DEMO_SCENARIOS.map((demo) => (
              <button
                key={demo.id}
                onClick={() => onSelectDemo(demo)}
                className="group p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/40 hover:bg-white/10 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 flex items-center justify-between">
                    <span>{demo.name}</span>
                    <ArrowRight className="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[10px] text-indigo-400 font-medium mb-1">{demo.role}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {demo.tagline}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Core Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Pre-Emptive Risk Matrix</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Detects academic, career, financial, and health vulnerabilities before they compound into critical failures.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2.5">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Future Simulation Branching</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Projects 30-day, 90-day, and 1-year outcomes comparing unchanged trajectories vs preventive AI optimization.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2.5">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Actionable Prevention Playbook</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Delivers immediate 1-click execution checklists, root cause decomposition, and emergency triage protocols.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
