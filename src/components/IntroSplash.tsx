import React, { useState, useEffect } from 'react';
import { BrainCircuit, Sparkles, ShieldCheck, Zap, ArrowRight, Play, Eye, Activity, RefreshCw } from 'lucide-react';

interface IntroSplashProps {
  onComplete: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('Initializing Neural Mesh Diagnostic Core...');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const steps = [
      { p: 15, text: 'Initializing Neural Mesh Diagnostic Core...' },
      { p: 35, text: 'Calibrating Multi-Domain Risk Vectors (Academic, Career, Health, Financial)...' },
      { p: 60, text: 'Loading Predictive Simulation Engine (30-day, 90-day, 1-year trajectories)...' },
      { p: 85, text: 'Connecting Gemini 3.6 Flash Server-Side Reasoning Nodes...' },
      { p: 100, text: 'System Calibrated. Preventive Intelligence Guard Active.' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStepText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsReady(true);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#020408] text-slate-200 flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      
      {/* Background Animated Futuristic Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-xl w-full text-center space-y-8 animate-in fade-in duration-700">
        
        {/* Animated Brand Emblem */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 ring-1 ring-white/20 transform hover:rotate-6 transition-transform">
              <BrainCircuit className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-[#020408]">
              <ShieldCheck className="w-4 h-4 text-[#020408]" />
            </div>
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>IgniteX HackFest • Next-Gen Preventive AI System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            NOVA SENSE <span className="text-indigo-400">AI</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Predict personal, financial, and career risks before they manifest. Simulate future outcomes and execute proactive decision intelligence.
          </p>
        </div>

        {/* Progress & Diagnostic Status */}
        <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-4 text-left">
          
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 uppercase tracking-wider text-[10px]">Boot Sequence Status</span>
            <span className="text-indigo-400">{progress}%</span>
          </div>

          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
            <Activity className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span className="truncate">{stepText}</span>
          </div>

        </div>

        {/* Enter Dashboard Button */}
        <div>
          <button
            onClick={onComplete}
            disabled={!isReady}
            className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-xl ${
              isReady
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 cursor-pointer animate-bounce'
                : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
            }`}
          >
            {isReady ? (
              <>
                <Play className="w-4 h-4 text-white fill-white" />
                <span>Initialize Nova Sense Dashboard</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 text-slate-500 animate-spin" />
                <span>Calibrating Neural System ({progress}%)...</span>
              </>
            )}
          </button>
        </div>

        <div className="text-[10px] text-slate-500 font-mono">
          IGNITEX HACKFEST • SYSTEM REASONING: GEMINI-3.6-FLASH • ENCRYPTED PREVENTIVE DATA MESH
        </div>

      </div>

    </div>
  );
};
