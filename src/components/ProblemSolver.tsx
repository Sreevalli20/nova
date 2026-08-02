import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Layers,
  Zap,
} from 'lucide-react';
import { ProblemSolverResult, DemoScenario } from '../types';
import { runProblemSolver } from '../services/aiService';

interface ProblemSolverProps {
  demoScenario?: DemoScenario | null;
}

export const ProblemSolver: React.FC<ProblemSolverProps> = () => {
  const [problem, setProblem] = useState('My B2B SaaS product user retention dropped by 25% over the last 2 quarters.');
  const [context, setContext] = useState('Customers report onboarding complexity, slow support response times, and feature clutter.');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProblemSolverResult | null>(null);

  const sampleProblems = [
    'I failed my university computer science exam',
    'My business is losing 10% of customers every month',
    'My software project is 3 weeks delayed and over budget',
    'I feel completely stuck and don\'t know my career path',
    'My agricultural crop yield decreased by 20% due to unseasonable weather',
  ];

  const handleSolve = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await runProblemSolver(problem, context);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = (id: string) => {
    if (!result) return;
    const updated = { ...result };
    updated.actionChecklist = updated.actionChecklist.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setResult(updated);
  };

  return (
    <div className="space-y-6">
      
      {/* Feature Header */}
      <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
              <span>Feature 4: Universal AI Problem Solver</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Crisis Triage, Root Cause & Preventive Resolution
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Solve life, academic, technical, agricultural, or business crises with instant root cause breakdown, immediate triage, and permanent preventive strategies.
            </p>
          </div>

          {result && (
            <button
              onClick={() => setResult(null)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all flex items-center space-x-2 self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Solve Another Problem</span>
            </button>
          )}
        </div>
      </div>

      {/* Input Form */}
      {!result ? (
        <form onSubmit={handleSolve} className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
          <div className="space-y-4">
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Describe the Problem / Crisis
              </label>
              <input
                type="text"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="e.g. I failed my exam, or My project is delayed..."
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                required
              />
            </div>

            {/* Quick Sample Questions */}
            <div className="flex items-center space-x-2 overflow-x-auto py-1 no-scrollbar">
              <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">Sample Crises:</span>
              {sampleProblems.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setProblem(sample)}
                  className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-medium text-slate-400 hover:text-indigo-300 hover:border-indigo-500/40 whitespace-nowrap transition-all"
                >
                  {sample}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Additional Details / Symptoms
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="What happened before? What are the key consequences?"
                rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500/50"
              />
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
                  <span>Deconstructing Problem Vectors...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-white" />
                  <span>Execute Diagnostic & Preventive Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (

        /* Problem Solution Results */
        <div className="space-y-6 animate-in fade-in duration-500">
          
          {/* Understanding & Root Cause Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Diagnostic Breakdown</span>
            </div>
            
            <h3 className="text-lg font-bold text-white tracking-tight">"{result.problem}"</h3>
            
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-200 leading-relaxed font-normal">
              {result.understanding}
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed font-medium">
              {result.rootCause}
            </div>
          </div>

          {/* Solutions & Prevention Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Immediate Solution */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-rose-500/30 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>1. Immediate Emergency Triage</span>
              </h4>
              <div className="space-y-2">
                {result.immediateSolution.map((sol, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-rose-500/20 text-xs text-slate-300">
                    {sol}
                  </div>
                ))}
              </div>
            </div>

            {/* Long-term Solution */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-indigo-500/30 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>2. Long-Term Resolution</span>
              </h4>
              <div className="space-y-2">
                {result.longTermSolution.map((sol, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-indigo-500/20 text-xs text-slate-300">
                    {sol}
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention Strategy */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-emerald-500/30 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span>3. Preventive Safeguards</span>
              </h4>
              <div className="space-y-2">
                {result.preventionStrategy.map((sol, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-emerald-500/20 text-xs text-slate-300">
                    {sol}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Checklist */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Interactive Execution Checklist</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.actionChecklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 ${
                    item.done
                      ? 'bg-indigo-500/10 border-indigo-500/30 text-slate-400 line-through'
                      : 'bg-white/5 border-white/5 hover:border-indigo-500/30'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                    item.done ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                  }`}>
                    {item.done && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-slate-200">{item.text}</div>
                    <div className="text-[10px] text-indigo-400 font-bold">{item.urgency}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
