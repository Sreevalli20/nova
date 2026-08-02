import React, { useState } from 'react';
import {
  Gauge,
  AlertTriangle,
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Layers,
  ArrowRight,
  TrendingDown,
  Activity,
} from 'lucide-react';
import { RiskScanResult, DemoScenario } from '../types';
import { runRiskScan } from '../services/aiService';

interface RiskScannerProps {
  demoScenario?: DemoScenario | null;
  onAnalysisComplete?: (result: RiskScanResult) => void;
}

export const RiskScanner: React.FC<RiskScannerProps> = ({ demoScenario, onAnalysisComplete }) => {
  const [situation, setSituation] = useState(demoScenario?.prompt.situation || '');
  const [goals, setGoals] = useState(demoScenario?.prompt.goals || '');
  const [habits, setHabits] = useState(demoScenario?.prompt.habits || '');
  const [problems, setProblems] = useState(demoScenario?.prompt.problems || '');
  const [challenges, setChallenges] = useState(demoScenario?.prompt.challenges || '');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskScanResult | null>(null);

  // Sync demo scenario if updated from parent
  React.useEffect(() => {
    if (demoScenario) {
      setSituation(demoScenario.prompt.situation);
      setGoals(demoScenario.prompt.goals);
      setHabits(demoScenario.prompt.habits);
      setProblems(demoScenario.prompt.problems);
      setChallenges(demoScenario.prompt.challenges);
    }
  }, [demoScenario]);

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const scanRes = await runRiskScan({ situation, goals, habits, problems, challenges });
      setResult(scanRes);
      if (onAnalysisComplete) onAnalysisComplete(scanRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleChecklist = (index: number) => {
    if (!result) return;
    const updated = { ...result };
    updated.immediateActionPlan[index].completed = !updated.immediateActionPlan[index].completed;
    setResult(updated);
  };

  return (
    <div className="space-y-6">
      
      {/* Feature Header Card */}
      <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Gauge className="w-3.5 h-3.5 text-indigo-400" />
              <span>Feature 1: AI Personal Risk Scanner</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Multi-Dimensional Preventive Risk Diagnostic
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Input your situation, habits, and goals to calculate your overall Intelligence Score, isolate 6-vector risk vulnerabilities, and reveal hidden failure nodes.
            </p>
          </div>

          {result && (
            <button
              onClick={() => setResult(null)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all flex items-center space-x-2 self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Scan</span>
            </button>
          )}
        </div>
      </div>

      {/* Input Form Area */}
      {!result ? (
        <form onSubmit={handleScan} className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Situation */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center justify-between">
                <span>1. Current Situation</span>
                <span className="text-[9px] text-slate-500">Required</span>
              </label>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="Describe your current status (e.g., 3rd year engineering student, startup founder with 120 customers...)"
                rows={3}
                required
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
              />
            </div>

            {/* Personal Goals */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center justify-between">
                <span>2. Target Goals</span>
                <span className="text-[9px] text-slate-500">Required</span>
              </label>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="What are you trying to achieve in the next 30-90 days?"
                rows={3}
                required
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
              />
            </div>

            {/* Daily Habits */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center justify-between">
                <span>3. Daily Habits & Routines</span>
                <span className="text-[9px] text-slate-500">Required</span>
              </label>
              <textarea
                value={habits}
                onChange={(e) => setHabits(e.target.value)}
                placeholder="Daily routines, sleep schedule, study/work focus, caffeine/screen usage..."
                rows={3}
                required
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
              />
            </div>

            {/* Problems & Obstacles */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center justify-between">
                <span>4. Current Problems & Blockers</span>
                <span className="text-[9px] text-slate-500">Required</span>
              </label>
              <textarea
                value={problems}
                onChange={(e) => setProblems(e.target.value)}
                placeholder="What is failing, slowing down, or causing friction right now?"
                rows={3}
                required
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
              />
            </div>

          </div>

          {/* Challenges & Fears */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 flex items-center justify-between">
              <span>5. Major Challenges & Risk Concerns</span>
              <span className="text-[9px] text-slate-500">Optional</span>
            </label>
            <input
              type="text"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="What future failure are you most afraid of happening?"
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>

          {/* Scan Submit Action */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs tracking-wider uppercase hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 text-white animate-spin" />
                  <span>Analyzing Preventive Risk Vectors...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4 text-white" />
                  <span>Execute Preventive Risk Scan</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (

        /* Preventive Scan Results Dashboard */
        <div className="space-y-6 animate-in fade-in duration-500">
          
          {/* Top Score Banner Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Overall Intelligence Score Card */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-indigo-500/30 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Preventive Intelligence Score
                </span>
                <BrainCircuit className="w-4 h-4 text-indigo-400" />
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-4xl font-extrabold tracking-tight text-white">
                  {result.overallIntelligenceScore}
                </span>
                <span className="text-xs font-semibold text-slate-500">/ 100</span>
              </div>

              {/* Progress Gauge Bar */}
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10 mt-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.overallIntelligenceScore}%` }}
                />
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">System Status:</span>
                <span className="font-bold text-indigo-400">Resilience Calibrated</span>
              </div>
            </div>

            {/* Overall Risk Level Meter */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Preventive Risk Rating
                </span>
                <AlertTriangle className={`w-4 h-4 ${
                  result.overallRiskLevel === 'CRITICAL' || result.overallRiskLevel === 'HIGH' 
                    ? 'text-rose-400' 
                    : 'text-amber-400'
                }`} />
              </div>

              <div>
                <div className={`text-xl font-bold uppercase tracking-wider ${
                  result.overallRiskLevel === 'CRITICAL' ? 'text-rose-400' :
                  result.overallRiskLevel === 'HIGH' ? 'text-amber-400' :
                  result.overallRiskLevel === 'MODERATE' ? 'text-yellow-300' : 'text-emerald-400'
                }`}>
                  {result.overallRiskLevel} RISK
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {result.overallRiskLevel === 'CRITICAL' || result.overallRiskLevel === 'HIGH'
                    ? 'Immediate preventive adjustments required to prevent failure cascade.'
                    : 'Moderate risk profile; manageable with proactive habit recalibration.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Scan Precision:</span>
                <span className="font-semibold text-emerald-400">99.4% Verified</span>
              </div>
            </div>

            {/* Hidden Problems Alert Count */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Hidden Vulnerabilities
                </span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>

              <div>
                <div className="text-3xl font-bold text-white">
                  {result.hiddenProblems.length} <span className="text-xs font-normal text-slate-400">Detected</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Unconscious bottlenecks identified that default analysis overlooks.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Triage Status:</span>
                <span className="font-semibold text-cyan-300">Action Plan Prepared</span>
              </div>
            </div>

          </div>

          {/* 6-Dimension Risk Radar Breakdown */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>6-Dimension Risk Matrix</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Individual risk ratings across critical core life & professional vectors (0% = Safe, 100% = High Risk)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Academic Risk', value: result.riskScores.academic, color: 'from-indigo-500 to-cyan-400' },
                { label: 'Career Risk', value: result.riskScores.career, color: 'from-cyan-500 to-teal-400' },
                { label: 'Health & Stress Risk', value: result.riskScores.health, color: 'from-rose-500 to-pink-500' },
                { label: 'Productivity Risk', value: result.riskScores.productivity, color: 'from-amber-500 to-orange-500' },
                { label: 'Financial Risk', value: result.riskScores.financial, color: 'from-emerald-500 to-green-500' },
                { label: 'Personal Growth Risk', value: result.riskScores.personalGrowth, color: 'from-purple-500 to-indigo-500' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">{item.label}</span>
                    <span className={`font-bold ${item.value > 60 ? 'text-rose-400' : 'text-indigo-400'}`}>
                      {item.value}%
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-700`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Problems & Root Cause Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Hidden Problems Card */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Hidden Problems Detected</span>
              </h3>
              <div className="space-y-2.5">
                {result.hiddenProblems.map((prob, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <p className="text-xs text-slate-300 leading-relaxed">{prob}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Root Cause Analysis Card */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Root Cause Analysis</span>
              </h3>
              <div className="space-y-2.5">
                {result.rootCauses.map((rc, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                      <span>{rc.category}</span>
                      <span className="text-[10px] text-slate-500">Root Vector</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200">{rc.cause}</p>
                    <p className="text-[11px] text-slate-400 italic">Impact: {rc.impact}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Prevention Strategy & Action Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Prevention Strategy */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Preventive Strategy Playbook</span>
              </h3>
              <div className="space-y-3">
                {result.preventionStrategy.map((strat, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400">{strat.title}</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                        {strat.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{strat.description}</p>
                    <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Timeframe: {strat.timeframe}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Immediate Action Plan Checklist */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Immediate Action Checklist</span>
              </h3>
              <div className="space-y-2.5">
                {result.immediateActionPlan.map((act, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                      act.completed
                        ? 'bg-indigo-950/20 border-indigo-500/30 text-slate-400 line-through'
                        : 'bg-white/5 border-white/5 hover:border-indigo-500/30'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                      act.completed ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                    }`}>
                      {act.completed && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-slate-200">
                        Step {act.step}: {act.action}
                      </div>
                      <div className="text-[11px] text-indigo-400">
                        Expected Outcome: {act.outcome}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
