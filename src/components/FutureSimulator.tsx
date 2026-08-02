import React, { useState } from 'react';
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Clock,
  Compass,
  CheckCircle2,
  RefreshCw,
  GitBranch,
} from 'lucide-react';
import { FutureSimulationResult, DemoScenario } from '../types';
import { runFutureSimulation } from '../services/aiService';

interface FutureSimulatorProps {
  demoScenario?: DemoScenario | null;
}

export const FutureSimulator: React.FC<FutureSimulatorProps> = ({ demoScenario }) => {
  const [query, setQuery] = useState('What happens if I continue my current path for the next 12 months?');
  const [habits, setHabits] = useState(demoScenario?.prompt.habits || 'Current routines, sleep times, focus hours');
  const [goals, setGoals] = useState(demoScenario?.prompt.goals || 'Target growth and career milestones');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FutureSimulationResult | null>(null);
  const [activeTimeframe, setActiveTimeframe] = useState<'day30' | 'day90' | 'year1'>('day30');
  const [viewBranch, setViewBranch] = useState<'both' | 'positive' | 'negative'>('both');

  React.useEffect(() => {
    if (demoScenario) {
      setHabits(demoScenario.prompt.habits);
      setGoals(demoScenario.prompt.goals);
    }
  }, [demoScenario]);

  const handleSimulate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await runFutureSimulation({ situation: query, query, habits, goals });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Feature Header Card */}
      <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>Feature 2: Future Simulation Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Predictive Timeline & Dual-Branch Simulator
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Simulate 30-day, 90-day, and 1-year future trajectories. Compare unchanged behaviors against Nova Sense preventive optimizations.
            </p>
          </div>

          {result && (
            <button
              onClick={() => setResult(null)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all flex items-center space-x-2 self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Simulation</span>
            </button>
          )}
        </div>
      </div>

      {/* Simulator Control Inputs */}
      {!result ? (
        <form onSubmit={handleSimulate} className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
          <div className="space-y-4">
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Primary Simulation Query
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What happens if I continue my current path?"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Current Habits Baseline
                </label>
                <textarea
                  value={habits}
                  onChange={(e) => setHabits(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Target Objectives
                </label>
                <textarea
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500/50"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs tracking-wider uppercase hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all flex items-center space-x-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 text-white animate-spin" />
                  <span>Calculating Quantum Future Nodes...</span>
                </>
              ) : (
                <>
                  <GitBranch className="w-4 h-4 text-white" />
                  <span>Generate Future Timeline Simulation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (

        /* Future Simulation Results Visualizer */
        <div className="space-y-6 animate-in fade-in duration-500">
          
          {/* Baseline Summary Card */}
          <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl flex items-start space-x-4">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Behavioral Baseline Analysis
              </div>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed font-medium">
                {result.baselineBehavior}
              </p>
            </div>
          </div>

          {/* Timeframe Node Selector Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center space-x-2">
              {(['day30', 'day90', 'year1'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 ${
                    activeTimeframe === tf
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : 'bg-white/5 text-slate-400 border border-white/5 hover:text-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {tf === 'day30' ? '30-Day Projection' : tf === 'day90' ? '90-Day Projection' : '1-Year Projection'}
                  </span>
                </button>
              ))}
            </div>

            {/* View Branch Toggle */}
            <div className="flex items-center space-x-1 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
              <button
                onClick={() => setViewBranch('both')}
                className={`px-3 py-1 rounded-lg font-medium text-[11px] ${viewBranch === 'both' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
              >
                Dual Comparison
              </button>
              <button
                onClick={() => setViewBranch('positive')}
                className={`px-3 py-1 rounded-lg font-medium text-[11px] ${viewBranch === 'positive' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'}`}
              >
                Preventive AI Branch
              </button>
              <button
                onClick={() => setViewBranch('negative')}
                className={`px-3 py-1 rounded-lg font-medium text-[11px] ${viewBranch === 'negative' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'}`}
              >
                Unchanged Branch
              </button>
            </div>
          </div>

          {/* Active Timeframe Detailed Branch Cards */}
          {(() => {
            const currentData = result[activeTimeframe];
            return (
              <div className="space-y-6">
                
                {/* Node Overview Header */}
                <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                      Primary Horizon Prediction
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {currentData.prediction}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-center shrink-0">
                    <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Risk Accumulation</div>
                    <div className="text-base font-bold text-rose-400">{currentData.riskFactor}%</div>
                  </div>
                </div>

                {/* Side-by-Side Dual Branch Visualizer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Positive Branch (With Nova Sense) */}
                  {(viewBranch === 'both' || viewBranch === 'positive') && (
                    <div className="p-6 rounded-3xl bg-[#03060c] border border-emerald-500/30 shadow-xl space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/10 border-b border-l border-emerald-500/30 rounded-bl-2xl text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                        OPTIMIZED PATH
                      </div>
                      
                      <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                        <TrendingUp className="w-4 h-4" />
                        <span>With Nova Sense Preventive AI</span>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed font-normal">
                        {currentData.positiveScenario}
                      </p>

                      <div className="pt-3 border-t border-emerald-500/20 text-xs text-emerald-300 flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px]">High Resilience & 90%+ Success Probability</span>
                      </div>
                    </div>
                  )}

                  {/* Negative Branch (Unchanged Behavior) */}
                  {(viewBranch === 'both' || viewBranch === 'negative') && (
                    <div className="p-6 rounded-3xl bg-[#03060c] border border-rose-500/30 shadow-xl space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 px-3 py-1 bg-rose-500/10 border-b border-l border-rose-500/30 rounded-bl-2xl text-[9px] font-bold text-rose-400 uppercase tracking-widest">
                        UNCHANGED PATH
                      </div>

                      <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Default Trajectory (No Changes)</span>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed font-normal">
                        {currentData.negativeScenario}
                      </p>

                      <div className="pt-3 border-t border-rose-500/20 text-xs text-rose-300 flex items-center space-x-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        <span className="text-[11px]">High Vulnerability to Failure & Burnout</span>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            );
          })()}

          {/* Required Behavioral Changes & Improvement Roadmap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Required Changes */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Required Critical Changes</span>
              </h3>
              <div className="space-y-2.5">
                {result.requiredChanges.map((req, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed pt-0.5">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Roadmap */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>Personal Improvement Roadmap</span>
              </h3>
              <div className="space-y-2.5">
                {result.improvementRoadmap.map((road, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="text-xs font-bold text-indigo-400">{road.phase}</div>
                    <div className="text-xs font-semibold text-white">{road.milestone}</div>
                    <p className="text-[11px] text-slate-400 italic">Action: {road.preventiveAction}</p>
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
