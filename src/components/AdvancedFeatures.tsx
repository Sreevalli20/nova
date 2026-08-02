import React, { useState } from 'react';
import {
  Sparkles,
  Target,
  TrendingUp,
  BrainCircuit,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  GraduationCap,
} from 'lucide-react';
import {
  runOpportunityDetector,
  runHabitTransformation,
  runSkillGapAnalyzer,
} from '../services/aiService';
import { OpportunityResult, HabitResult, SkillGapResult } from '../types';

export const OpportunityDetectorView: React.FC = () => {
  const [skills, setSkills] = useState('Python, Data Analysis, Critical Thinking, Project Management');
  const [interests, setInterests] = useState('AI Technology, AgriTech, SaaS Product Development');
  const [result, setResult] = useState<OpportunityResult | null>(null);

  const handleDetect = () => {
    const res = runOpportunityDetector(skills.split(','), interests.split(','));
    setResult(res);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-indigo-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">AI Opportunity Detector</h3>
          <p className="text-xs text-slate-400">Detect hidden high-leverage opportunities based on your skill stack</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Skill Stack</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interests & Domains</label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
          />
        </div>
      </div>

      <button
        onClick={handleDetect}
        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-500 shadow-md shadow-indigo-600/20"
      >
        Detect High-Leverage Opportunities
      </button>

      {result && (
        <div className="space-y-4 pt-4 border-t border-white/10 animate-in fade-in">
          <div className="text-xs text-indigo-300 font-bold">{result.synergyAnalysis}</div>
          <div className="space-y-3">
            {result.detectedOpportunities.map((opp, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{opp.title}</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[10px] font-bold">
                    {opp.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-300">{opp.leveragePoint}</p>
                <div className="text-[11px] text-emerald-400 font-semibold">Action: {opp.actionableStep}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const HabitTransformationView: React.FC = () => {
  const [habitsText, setHabitsText] = useState('Irregular study schedule, checking social media every 20 mins, late night coffee');
  const [result, setResult] = useState<HabitResult | null>(null);

  const handleTransform = () => {
    const res = runHabitTransformation(habitsText.split(','));
    setResult(res);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-indigo-400">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">AI Habit Transformation System</h3>
          <p className="text-xs text-slate-400">1% Daily Compounding Micro-Optimizations vs Negative Friction Trajectory</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Daily Habits</label>
        <textarea
          value={habitsText}
          onChange={(e) => setHabitsText(e.target.value)}
          rows={2}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500/50"
        />
      </div>

      <button
        onClick={handleTransform}
        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-500 shadow-md shadow-indigo-600/20"
      >
        Calculate Compounding Gains
      </button>

      {result && (
        <div className="space-y-4 pt-4 border-t border-white/10 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-bold">
              {result.compoundingGainYearly}
            </div>
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 font-bold">
              {result.negativeTrajectoryRisk}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-white">Atomic Habit Adjustments</div>
            {result.atomicAdjustments.map((adj, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                <div className="text-rose-400 line-through">Remove: {adj.badHabit}</div>
                <div className="text-emerald-300 font-semibold">Replace: {adj.preventiveReplacement}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const SkillGapAnalyzerView: React.FC = () => {
  const [role, setRole] = useState('Computer Science Student / Software Engineer');
  const [target, setTarget] = useState('Senior AI Systems Engineer / AI Product Specialist');
  const [result, setResult] = useState<SkillGapResult | null>(null);

  const handleAnalyze = () => {
    const res = runSkillGapAnalyzer(role, target);
    setResult(res);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-indigo-400">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">AI Skill Gap & Workforce Automation Analyzer</h3>
          <p className="text-xs text-slate-400">Compare current competency against 5-year future workforce requirements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Goal</label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
          />
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-500 shadow-md shadow-indigo-600/20"
      >
        Analyze Skill Gap & Automation Risk
      </button>

      {result && (
        <div className="space-y-4 pt-4 border-t border-white/10 animate-in fade-in">
          <div className="flex justify-between items-center text-xs font-bold text-indigo-300">
            <span>Readiness Index: {result.readinessScore}%</span>
            <span className="text-slate-400">{result.automationRiskMap}</span>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-white">Missing Critical Skills</div>
            {result.missingCriticalSkills.map((sk, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-indigo-300">
                  <span>{sk.skill}</span>
                  <span className="text-amber-400 text-[10px]">{sk.urgency}</span>
                </div>
                <div className="text-slate-400">Curve: {sk.learningCurve}</div>
                <div className="text-emerald-400">Resource: {sk.recommendedResource}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
