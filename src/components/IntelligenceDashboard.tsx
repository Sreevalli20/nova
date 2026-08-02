import React from 'react';
import {
  Sliders,
  BrainCircuit,
  Gauge,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Activity,
  Target,
  Zap,
} from 'lucide-react';
import { RiskScanResult, ActiveTab } from '../types';

interface IntelligenceDashboardProps {
  scanResult: RiskScanResult | null;
  intelligenceScore: number;
  setActiveTab: (tab: ActiveTab) => void;
}

export const IntelligenceDashboard: React.FC<IntelligenceDashboardProps> = ({
  scanResult,
  intelligenceScore,
  setActiveTab,
}) => {
  const defaultScores = scanResult?.riskScores || {
    academic: 35,
    career: 28,
    health: 42,
    productivity: 38,
    financial: 25,
    personalGrowth: 30,
  };

  const recentHistory = [
    { type: 'Risk Scanner', summary: '3-Vector friction identified in deep work schedule', score: intelligenceScore, date: 'Today' },
    { type: 'Future Simulator', summary: '30-day projection verified: +35% resilience lift', score: 88, date: 'Yesterday' },
    { type: 'Decision AI', summary: 'Evaluated career transition to AI Product Management', score: 92, date: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Feature Header */}
      <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Feature 8: Personal Intelligence Dashboard</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Preventive Command Center & Metric Overview
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Monitor real-time intelligence scores, risk vectors across core dimensions, historical insights, and high-leverage growth areas.
            </p>
          </div>
        </div>
      </div>

      {/* Top Intelligence Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Card */}
        <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>Overall Intelligence Score</span>
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="my-3 flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold text-indigo-300 tracking-tight">{intelligenceScore}</span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>

          <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${intelligenceScore}%` }}
            />
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-400 flex justify-between">
            <span>Status:</span>
            <span className="font-bold text-indigo-300">Preventive Guard Active</span>
          </div>
        </div>

        {/* Risk Status */}
        <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>Overall Risk Rating</span>
            <Gauge className="w-5 h-5 text-amber-400" />
          </div>

          <div className="my-3">
            <div className="text-2xl font-bold text-amber-400 tracking-tight">
              {scanResult?.overallRiskLevel || 'MODERATE'} RISK
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active risk monitoring across 6 life & career dimensions.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-400 flex justify-between">
            <span>Triage Readiness:</span>
            <span className="font-bold text-emerald-400">100% Calibrated</span>
          </div>
        </div>

        {/* Growth Momentum */}
        <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>Growth Momentum</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="my-3">
            <div className="text-2xl font-bold text-emerald-300 tracking-tight">+37.7x</div>
            <p className="text-xs text-slate-400 mt-1">
              Compounding 1% daily micro-improvements trajectory.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-400 flex justify-between">
            <span>Preventive Guard:</span>
            <span className="font-bold text-indigo-300">Enabled</span>
          </div>
        </div>

      </div>

      {/* Risk Overview Grid & Quick Scanner CTA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>Current Risk Profile Vector</span>
            </h3>
            <p className="text-xs text-slate-400">Real-time risk scores from active diagnostic scan</p>
          </div>

          <button
            onClick={() => setActiveTab('scanner')}
            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-semibold hover:bg-white/10 transition-all"
          >
            Run New Risk Scan
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'Academic', val: defaultScores.academic },
            { name: 'Career', val: defaultScores.career },
            { name: 'Health', val: defaultScores.health },
            { name: 'Productivity', val: defaultScores.productivity },
            { name: 'Financial', val: defaultScores.financial },
            { name: 'Personal Growth', val: defaultScores.personalGrowth },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <span>{item.name} Risk</span>
                <span className={item.val > 50 ? 'text-amber-400' : 'text-indigo-300'}>{item.val}%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-400 h-full rounded-full transition-all"
                  style={{ width: `${item.val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Log */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>Historical Diagnostic Insights</span>
        </h3>

        <div className="space-y-3">
          {recentHistory.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-indigo-300">{item.type}</div>
                <div className="text-xs text-slate-200">{item.summary}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-white">{item.score}/100</div>
                <div className="text-[10px] text-slate-500">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
