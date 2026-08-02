import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  Target,
  Layers,
  TrendingUp,
  Building2,
  ArrowRight,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { InnovationResult, DemoScenario } from '../types';
import { runInnovationGenerator } from '../services/aiService';

interface InnovationGeneratorProps {
  demoScenario?: DemoScenario | null;
}

export const InnovationGenerator: React.FC<InnovationGeneratorProps> = () => {
  const [industry, setIndustry] = useState('EdTech & AI University Learning');
  const [idea, setIdea] = useState('Preventing student dropout and study burnout using proactive learning risk scanners.');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InnovationResult | null>(null);

  const sampleIndustries = [
    'ClimateTech & Carbon Risk',
    'AgriTech Crop Disease Prevention',
    'FinTech Churn & Fraud Prevention',
    'Healthcare & Executive Burnout',
    'EdTech & University STEM Mastery',
  ];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await runInnovationGenerator(industry, idea);
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
              <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
              <span>Feature 7: AI Innovation Generator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Billion-Dollar Preventive Startup Blueprint Generator
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              For entrepreneurs, IgniteX HackFest participants, and students. Input an industry or problem area to engineer complete preventive AI product concepts.
            </p>
          </div>

          {result && (
            <button
              onClick={() => setResult(null)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all flex items-center space-x-2 self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate Another Innovation</span>
            </button>
          )}
        </div>
      </div>

      {/* Input Form */}
      {!result ? (
        <form onSubmit={handleGenerate} className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
          <div className="space-y-4">
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Industry / Domain Target
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. ClimateTech, FinTech, AgriTech, MedTech..."
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                required
              />
            </div>

            {/* Quick Sample Selector */}
            <div className="flex items-center space-x-2 overflow-x-auto py-1 no-scrollbar">
              <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">Sample Domains:</span>
              {sampleIndustries.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setIndustry(sample)}
                  className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-medium text-slate-400 hover:text-indigo-300 hover:border-indigo-500/40 whitespace-nowrap transition-all"
                >
                  {sample}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Initial Problem Seed / Vision (Optional)
              </label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="What failure point do you want to prevent in this industry?"
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
                  <span>Synthesizing Startup Architecture...</span>
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 text-white" />
                  <span>Engineer Preventive AI Startup Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (

        /* Innovation Results */
        <div className="space-y-6 animate-in fade-in duration-500">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Target Industry: {result.industry}</span>
            </div>
            
            <h3 className="text-base font-bold text-white">Problem Statement</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal p-4 rounded-2xl bg-white/5 border border-white/5">
              {result.problemStatement}
            </p>

            <h3 className="text-base font-bold text-white pt-2">AI Solution Architecture</h3>
            <p className="text-xs text-indigo-300 leading-relaxed font-medium p-4 rounded-2xl bg-white/5 border border-white/5">
              {result.aiSolution}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Target Users & Tech Stack */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Target className="w-4 h-4 text-indigo-400" />
                <span>Target Users & Tech Stack</span>
              </h4>
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Customers:</div>
                {result.targetUsers.map((usr, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
                    {usr}
                  </div>
                ))}

                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-2">Technology Approach:</div>
                {result.technologyApproach.map((tech, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-indigo-300 font-semibold">
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Impact & Business Model */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Social Impact & Scalability</span>
              </h4>
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Social & Economic Impact:</div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300">
                  {result.socialImpact}
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-2">Business Opportunity TAM:</div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-emerald-300 font-bold">
                  {result.businessOpportunity}
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-2">Future Scalability:</div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300">
                  {result.futureScalability}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
