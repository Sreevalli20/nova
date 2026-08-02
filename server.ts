import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Server-side API Route for Nova Sense Preventive Intelligence Analysis
app.post('/api/analyze', async (req, res) => {
  try {
    const { mode, payload } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback: indicate client will process deterministic preventive intelligence response
      return res.json({ fallback: true, mode });
    }

    let systemInstruction = `You are NOVA SENSE AI - a world-class Preventive Intelligence System. 
Your purpose is to PREVENT problems before they happen by analyzing situations, predicting multi-dimensional risks, uncovering hidden root causes, and creating actionable preventive strategies.
Always return response ONLY in valid raw JSON without markdown formatting backticks.`;

    let promptText = '';

    if (mode === 'risk_scanner') {
      systemInstruction += ` Return JSON with:
{
  "overallIntelligenceScore": number (0-100),
  "overallRiskLevel": "LOW" | "MODERATE" | "HIGH" | "CRITICAL",
  "riskScores": { "academic": number, "career": number, "health": number, "productivity": number, "financial": number, "personalGrowth": number },
  "hiddenProblems": [string, string, string],
  "rootCauses": [ { "category": string, "cause": string, "impact": string } ],
  "preventionStrategy": [ { "title": string, "description": string, "priority": "HIGH"|"MEDIUM"|"LOW", "timeframe": string } ],
  "immediateActionPlan": [ { "step": 1, "action": string, "outcome": string } ]
}`;
      promptText = `Analyze user situation for Preventive Risk Scan:
Situation: ${payload.situation}
Goals: ${payload.goals}
Daily Habits: ${payload.habits}
Problems: ${payload.problems}
Challenges: ${payload.challenges}`;
    } else if (mode === 'future_simulation') {
      systemInstruction += ` Return JSON with:
{
  "baselineBehavior": string,
  "day30": { "prediction": string, "positiveScenario": string, "negativeScenario": string, "riskFactor": number },
  "day90": { "prediction": string, "positiveScenario": string, "negativeScenario": string, "riskFactor": number },
  "year1": { "prediction": string, "positiveScenario": string, "negativeScenario": string, "riskFactor": number },
  "requiredChanges": [string, string, string],
  "improvementRoadmap": [ { "phase": string, "milestone": string, "preventiveAction": string } ]
}`;
      promptText = `Simulate 30-day, 90-day, and 1-year future scenarios based on:
User query: ${payload.query || payload.situation}
Current Habits: ${payload.habits || ''}
Goals: ${payload.goals || ''}`;
    } else if (mode === 'decision_intelligence') {
      systemInstruction += ` Return JSON with:
{
  "decision": string,
  "decisionScore": number (0-100),
  "verdict": "HIGHLY RECOMMENDED" | "PROCEED WITH CAUTION" | "NOT RECOMMENDED" | "TRANSFORMATIVE OPPORTUNITY",
  "advantages": [string],
  "risks": [string],
  "hiddenFactors": [string],
  "opportunityAnalysis": string,
  "recommendedChoice": string,
  "executionPlan": [ { "phase": string, "task": string, "riskMitigation": string } ]
}`;
      promptText = `Evaluate decision: "${payload.decision}". Context: ${payload.context || ''}`;
    } else if (mode === 'problem_solver') {
      systemInstruction += ` Return JSON with:
{
  "problem": string,
  "understanding": string,
  "rootCause": string,
  "immediateSolution": [string],
  "longTermSolution": [string],
  "preventionStrategy": [string],
  "actionChecklist": [ { "id": string, "text": string, "urgency": "Immediate"|"Short-term"|"Long-term", "done": false } ]
}`;
      promptText = `Solve life/business problem: "${payload.problem}". Additional context: ${payload.context || ''}`;
    } else if (mode === 'vision_analysis') {
      systemInstruction += ` Return JSON with:
{
  "imageTitle": string,
  "detectedContext": string,
  "extractedInfo": [string],
  "detectedIssues": [ { "issue": string, "severity": "High"|"Medium"|"Low", "description": string } ],
  "preventiveRecommendations": [string]
}`;
      promptText = `Analyze uploaded image and context: ${payload.userNote || 'Scan image for risk detection and preventive action'}`;
    } else if (mode === 'innovation_generator') {
      systemInstruction += ` Return JSON with:
{
  "industry": string,
  "problemStatement": string,
  "aiSolution": string,
  "targetUsers": [string],
  "technologyApproach": [string],
  "socialImpact": string,
  "businessOpportunity": string,
  "futureScalability": string
}`;
      promptText = `Generate AI innovation for domain: "${payload.industry}". User ideas: ${payload.idea || ''}`;
    } else {
      promptText = `Provide preventive analysis for: ${JSON.stringify(payload)}`;
    }

    let contentsPayload: any = promptText;
    if (mode === 'vision_analysis' && payload.imageBase64) {
      const mime = payload.mimeType || 'image/jpeg';
      const cleanBase64 = payload.imageBase64.replace(/^data:image\/\w+;base64,/, '');
      contentsPayload = {
        parts: [
          { inlineData: { mimeType: mime, data: cleanBase64 } },
          { text: promptText },
        ],
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contentsPayload,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    });

    const textOutput = response.text || '';
    const cleanJson = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJson);
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Gemini API execution error:', error);
    return res.json({ fallback: true, error: error?.message || 'Gemini processing error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nova Sense AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
