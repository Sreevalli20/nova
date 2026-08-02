import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  BrainCircuit,
  Sparkles,
  RefreshCw,
  Play,
  Square,
  ShieldCheck,
} from 'lucide-react';
import { runProblemSolver } from '../services/aiService';

export const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Speech Recognition Setup
  const handleStartListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported natively in this browser. Please type your query below.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const handleProcessVoiceQuery = async (textToProcess?: string) => {
    const query = textToProcess || transcript;
    if (!query.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await runProblemSolver(query, 'Spoken voice input via Nova Sense Assistant');
      const textSummary = `Diagnosis for "${query}": Root cause is ${result.rootCause}. Recommended immediate action: ${result.immediateSolution[0]}. Preventive safeguard: ${result.preventionStrategy[0]}`;
      setResponse(textSummary);
      speakText(textSummary);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
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
              <Mic className="w-3.5 h-3.5 text-indigo-400" />
              <span>Feature 6: Voice AI Assistant</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Real-Time Conversational Voice Intelligence
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Speak your problem directly. The voice assistant converts speech, performs real-time preventive analysis, and responds with audio voice synthesis.
            </p>
          </div>
        </div>
      </div>

      {/* Main Voice Interactive Studio */}
      <div className="p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-8 text-center max-w-3xl mx-auto">
        
        {/* Animated Mic Sphere */}
        <div className="flex flex-col items-center justify-center space-y-6">
          
          <button
            onClick={isListening ? () => setIsListening(false) : handleStartListening}
            className={`relative flex items-center justify-center w-28 h-28 rounded-full transition-all transform hover:scale-105 shadow-2xl ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-rose-500/50'
                : 'bg-indigo-600 text-white shadow-indigo-600/30'
            }`}
          >
            {isListening ? (
              <MicOff className="w-10 h-10 text-white animate-bounce" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </button>

          <div>
            <div className="text-sm font-bold text-white">
              {isListening ? 'Listening to your voice...' : 'Tap Mic to Speak Problem'}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {isListening ? 'Speak naturally...' : 'Or type below to trigger natural voice feedback'}
            </p>
          </div>

          {/* Audio Waveform Visualization */}
          {(isListening || isSpeaking) && (
            <div className="flex items-center space-x-1.5 h-10">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <span
                  key={i}
                  className="w-1.5 bg-indigo-400 rounded-full animate-pulse"
                  style={{
                    height: `${Math.max(20, (i * 9) % 40)}px`,
                    animationDuration: `${0.3 + (i % 5) * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}

        </div>

        {/* Spoken Text Display & Manual Input Fallback */}
        <div className="space-y-4 max-w-xl mx-auto">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Spoken Prompt Transcribed
            </label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder='e.g. "I am feeling overwhelmed with my engineering exam and project deadline"'
              rows={3}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 resize-none focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center space-x-2">
              {['I failed my exam', 'Startup retention is dropping', 'Crop yield decreased'].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(sample);
                    handleProcessVoiceQuery(sample);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[10px] text-slate-400 hover:text-indigo-300 transition-all"
                >
                  {sample}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleProcessVoiceQuery()}
              disabled={isAnalyzing || !transcript.trim()}
              className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs tracking-wider uppercase hover:bg-indigo-500 shadow-md shadow-indigo-600/20 disabled:opacity-50 shrink-0"
            >
              {isAnalyzing ? 'Analyzing Voice...' : 'Process Voice'}
            </button>
          </div>
        </div>

        {/* AI Voice Response Output */}
        {response && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center space-x-1.5">
                <BrainCircuit className="w-4 h-4" />
                <span>Nova Sense Voice Synthesis</span>
              </span>

              <div className="flex items-center space-x-2">
                {isSpeaking ? (
                  <button
                    onClick={stopSpeaking}
                    className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center space-x-1"
                  >
                    <Square className="w-3 h-3" />
                    <span>Stop Voice</span>
                  </button>
                ) : (
                  <button
                    onClick={() => speakText(response)}
                    className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center space-x-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Voice</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              {response}
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
