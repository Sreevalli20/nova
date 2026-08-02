import React, { useState } from 'react';
import {
  FileSearch,
  Upload,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';
import { VisionAnalysisResult, DemoScenario } from '../types';
import { runVisionAnalysis } from '../services/aiService';

interface MultimodalVisionProps {
  demoScenario?: DemoScenario | null;
}

export const MultimodalVision: React.FC<MultimodalVisionProps> = ({ demoScenario }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(demoScenario?.sampleVisionImage || null);
  const [imageTitle, setImageTitle] = useState(demoScenario?.sampleVisionTitle || 'Sample Diagnostic Image');
  const [userNote, setUserNote] = useState('Scan image for anomalies, risks, and preventive recommendations.');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VisionAnalysisResult | null>(null);

  const sampleImages = [
    {
      title: 'Code Bug / Technical Error',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      note: 'Analyze syntax/logic bottleneck in code screenshot'
    },
    {
      title: 'Churn Analytics Dashboard',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      note: 'Detect downtrend anomalies in SaaS performance chart'
    },
    {
      title: 'Crop Agriculture Leaf Sample',
      url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80',
      note: 'Identify plant moisture stress and leaf yellowing causes'
    },
    {
      title: 'Biometric Wearable Sleep Data',
      url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
      note: 'Evaluate biometric fatigue and recovery indicators'
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setImageTitle(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await runVisionAnalysis(userNote, selectedImage || undefined);
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
              <FileSearch className="w-3.5 h-3.5 text-indigo-400" />
              <span>Feature 5: Multimodal AI Vision</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Visual Anomaly & Risk Diagnostic Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Upload documents, screenshots, diagrams, crop images, or biometric charts. AI extracts context, detects hidden structural issues, and returns preventive actions.
            </p>
          </div>

          {result && (
            <button
              onClick={() => setResult(null)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all flex items-center space-x-2 self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Analyze New Image</span>
            </button>
          )}
        </div>
      </div>

      {/* Input Form & Sample Selection */}
      {!result ? (
        <form onSubmit={handleAnalyze} className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-white/10 shadow-2xl space-y-6">
          
          {/* Sample Images Quick Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
              Select Sample Test Image (or Upload Custom)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sampleImages.map((sample, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedImage(sample.url);
                    setImageTitle(sample.title);
                    setUserNote(sample.note);
                  }}
                  className={`p-2 rounded-2xl border cursor-pointer transition-all group relative overflow-hidden ${
                    selectedImage === sample.url
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="h-24 w-full rounded-xl overflow-hidden bg-white/5 mb-2 relative">
                    <img src={sample.url} alt={sample.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-[11px] font-medium text-slate-200 line-clamp-1">{sample.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Drop Zone */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Custom Image Upload
            </label>
            <div className="relative border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-2xl p-6 text-center transition-all bg-white/5">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                <Upload className="w-6 h-6 text-indigo-400" />
                <span className="text-xs font-semibold text-slate-300">
                  {selectedImage ? `Selected: ${imageTitle}` : 'Click or Drag & Drop Image Here'}
                </span>
                <span className="text-[10px] text-slate-500">Supports PNG, JPG, WEBP, Charts, Code, Documents</span>
              </div>
            </div>
          </div>

          {/* User Instructions */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Diagnostic Focus / Notes
            </label>
            <input
              type="text"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading || !selectedImage}
              className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs tracking-wider uppercase hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all flex items-center space-x-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 text-white animate-spin" />
                  <span>Processing Visual Data Vectors...</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-white" />
                  <span>Execute Multimodal Vision Scan</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (

        /* Vision Results */
        <div className="space-y-6 animate-in fade-in duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Image Preview & Extracted Summary */}
            <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-4">
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                Scanned Source Image
              </div>

              {selectedImage && (
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-52">
                  <img src={selectedImage} alt="Scanned visual" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="text-xs font-bold text-white">{result.imageTitle}</div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">{result.detectedContext}</p>
            </div>

            {/* Extracted Info & Detected Issues */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="p-6 rounded-3xl bg-[#03060c] border border-white/10 shadow-xl space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Extracted Intelligence Features</span>
                </h4>
                <div className="space-y-2">
                  {result.extractedInfo.map((info, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300">
                      {info}
                    </div>
                  ))}
                </div>
              </div>

              {/* Detected Issues */}
              <div className="p-6 rounded-3xl bg-[#03060c] border border-amber-500/30 shadow-xl space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Detected Anomaly Vectors</span>
                </h4>
                <div className="space-y-2">
                  {result.detectedIssues.map((issue, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                        <span>{issue.issue}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[9px] font-bold uppercase tracking-wider">
                          {issue.severity} Severity
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{issue.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Preventive Recommendations */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#03060c] border border-emerald-500/30 shadow-2xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Vision-Guided Preventive Action Matrix</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.preventiveRecommendations.map((rec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20 text-xs text-slate-200 leading-relaxed font-normal">
                  {rec}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
