import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Target,
  Layers,
} from 'lucide-react';
import { DecisionResult, DemoScenario } from '../types';
import { runDecisionIntelligence } from '../services/aiService';

interface DecisionIntelligenceProps {
  demoScenario?: DemoScenario | null;
}

export const DecisionIntelligence: React.FC<DecisionIntelligenceProps> = () => {
  const [decision, setDecision] = useState('Should I pivot my startup to build a specialized AI Preventive Engine?');
  const [context, setContext] = useState('Current SaaS has steady MRR but growth is slowing. Teams have technical Python & React capabilities.');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DecisionResult | null>(null);

  const sampleDecisions = [
    'Should I learn AI and Machine Learning full-time?',
    'Should I change my career from traditional management to AI Product Management?',
    'Should I start a B2B SaaS business right now?',
    'Should I accept a high-paying enterprise offer vs joining an early-stage AI startup?',
  ];

  const handleEvaluate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await runDecisionIntelligence(decision, context);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Feature Header */}
      <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>Feature 3: AI Decision Intelligence Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Preventive Decision Evaluator & Opportunity Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Evaluate any major life, career, or business decision. Analyze asymmetric upside, hidden pitfalls, opportunity score, and step-by-step execution.
            </p>
          </div>

          {result && (
            <button
              onClick={() => setResult(null)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all flex items-center space-x-2 self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Evaluate New Decision</span>
            </button>
          )}
        </div>
      </div>

      {/* Decision Input Form */}
      {!result ? (
        <form onSubmit={handleEvaluate} className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
          <div className="space-y-4">
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Decision Dilemma
              </label>
              <input
                type="text"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                placeholder="e.g. Should I change career to AI?"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                required
              />
            </div>

            {/* Quick Sample Questions */}
            <div className="flex items-center space-x-2 overflow-x-auto py-1 no-scrollbar">
              <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">Sample Dilemmas:</span>
              {sampleDecisions.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDecision(sample)}
                  className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-medium text-slate-400 hover:text-indigo-300 hover:border-indigo-500/40 whitespace-nowrap transition-all"
                >
                  {sample}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Background Context & Constraints
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Provide details on current resources, timeline, concerns..."
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
                  <span>Evaluating Decision Vectors...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4 text-white" />
                  <span>Analyze Decision Score & Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (

        /* Evaluation Results */
        <div className="space-y-6 animate-in fade-in duration-500">
          
          {/* Top Score & Recommendation Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Verdict: {result.verdict}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                "{result.decision}"
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {result.recommendedChoice}
              </p>
            </div>

            {/* Score Meter */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col justify-center items-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Decision Score</div>
              <div className="text-4xl font-extrabold text-indigo-300">{result.decisionScore}</div>
              <div className="text-[10px] text-slate-500 mt-1">Viability & Upside Rating</div>
            </div>

          </div>

          {/* Advantages vs Risks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Advantages */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-emerald-500/30 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Strategic Advantages</span>
              </h4>
              <div className="space-y-2.5">
                {result.advantages.map((adv, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
                    {adv}
                  </div>
                ))}
              </div>
            </div>

            {/* Risks */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-rose-500/30 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Risk Vectors & Costs</span>
              </h4>
              <div className="space-y-2.5">
                {result.risks.map((risk, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-rose-500/20 text-xs text-slate-300 leading-relaxed">
                    {risk}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Hidden Factors & Opportunity Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Hidden Factors */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Hidden Blindspots</span>
              </h4>
              <div className="space-y-2.5">
                {result.hiddenFactors.map((hf, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300 leading-relaxed">
                    {hf}
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunity Analysis */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Opportunity Ratio Analysis</span>
              </h4>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-indigo-300 leading-relaxed font-medium">
                {result.opportunityAnalysis}
              </div>
            </div>

          </div>

          {/* Step-by-Step Execution Plan */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-white flex items-center space-x-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Step-by-Step Execution Plan</span>
            </h4>
            <div className="space-y-3">
              {result.executionPlan.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                    <span>{step.phase}</span>
                    <span className="text-[10px] text-slate-500 font-medium">Preventive Guard Active</span>
                  </div>
                  <div className="text-xs font-semibold text-white">{step.task}</div>
                  <p className="text-[11px] text-amber-400/90 italic">Risk Mitigation: {step.riskMitigation}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
