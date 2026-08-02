import React, { useState } from 'react';
import {
  Flame,
  X,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { runEmergencyTriage } from '../services/aiService';
import { EmergencyResult } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const [crisisText, setCrisisText] = useState('Exam in 12 hours and I haven\'t covered 60% of syllabus');
  const [result, setResult] = useState<EmergencyResult | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleTriage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const res = runEmergencyTriage(crisisText);
      setResult(res);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#03060c] border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm tracking-widest uppercase">
            <Flame className="w-5 h-5 animate-pulse" />
            <span>NOVA SENSE EMERGENCY MODE</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!result ? (
          <form onSubmit={handleTriage} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                Specify Immediate Crisis / Emergency
              </label>
              <textarea
                value={crisisText}
                onChange={(e) => setCrisisText(e.target.value)}
                placeholder="e.g., Critical server outage during product launch, Exam in 8 hours..."
                rows={3}
                required
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-rose-500/30 text-xs text-slate-200 resize-none focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-2xl bg-rose-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-rose-500 shadow-lg shadow-rose-950/80 flex items-center space-x-2"
              >
                {loading ? 'Executing Emergency Triage...' : 'Execute Immediate Triage Protocol'}
              </button>
            </div>
          </form>
        ) : (

          <div className="space-y-6 animate-in fade-in">
            
            {/* Calm Thought Banner */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-indigo-300 font-medium italic">
              "{result.calmThought}"
            </div>

            {/* Immediate Triage Steps */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-rose-400 uppercase tracking-widest flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Immediate 3-Step Triage</span>
              </div>
              <div className="space-y-2">
                {result.immediateTriage.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-rose-500/20 text-xs text-slate-200">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Containment Protocol */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Containment Perimeter Protocol</span>
              </div>
              <div className="space-y-2">
                {result.containmentProtocol.map((prot, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
                    {prot}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <button
                onClick={() => setResult(null)}
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Triage</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all"
              >
                Close Emergency Protocol
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
