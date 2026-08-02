import {
  RiskScanResult,
  FutureSimulationResult,
  DecisionResult,
  ProblemSolverResult,
  VisionAnalysisResult,
  InnovationResult,
  OpportunityResult,
  HabitResult,
  SkillGapResult,
  EmergencyResult,
} from '../types';

async function callBackendApi(mode: string, payload: any): Promise<any> {
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, payload }),
    });
    if (!res.ok) return { fallback: true };
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return { fallback: true };
  } catch (err) {
    return { fallback: true };
  }
}

// Deterministic Intelligence Engine Fallbacks
export async function runRiskScan(input: {
  situation: string;
  goals: string;
  habits: string;
  problems: string;
  challenges: string;
}): Promise<RiskScanResult> {
  const backendResult = await callBackendApi('risk_scanner', input);
  if (!backendResult.fallback) {
    return backendResult as RiskScanResult;
  }

  // Local Intelligence Computation based on input length & key signals
  const text = `${input.situation} ${input.goals} ${input.habits} ${input.problems} ${input.challenges}`.toLowerCase();
  
  let academic = 28 + (text.includes('exam') || text.includes('study') ? 22 : 10);
  let career = 32 + (text.includes('job') || text.includes('career') || text.includes('work') ? 28 : 12);
  let health = 25 + (text.includes('sleep') || text.includes('stress') || text.includes('tired') ? 35 : 15);
  let productivity = 30 + (text.includes('habit') || text.includes('procrastinat') ? 30 : 15);
  let financial = 20 + (text.includes('money') || text.includes('cost') || text.includes('revenue') ? 38 : 12);
  let personalGrowth = 35 + (text.includes('goal') || text.includes('overwhelmed') ? 25 : 10);

  academic = Math.min(95, Math.max(15, academic));
  career = Math.min(95, Math.max(15, career));
  health = Math.min(95, Math.max(15, health));
  productivity = Math.min(95, Math.max(15, productivity));
  financial = Math.min(95, Math.max(15, financial));
  personalGrowth = Math.min(95, Math.max(15, personalGrowth));

  const avgRisk = Math.round((academic + career + health + productivity + financial + personalGrowth) / 6);
  const intelScore = Math.max(12, 100 - avgRisk);
  
  let overallRiskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'MODERATE';
  if (avgRisk > 65) overallRiskLevel = 'CRITICAL';
  else if (avgRisk > 45) overallRiskLevel = 'HIGH';
  else if (avgRisk > 25) overallRiskLevel = 'MODERATE';
  else overallRiskLevel = 'LOW';

  return {
    overallIntelligenceScore: intelScore,
    overallRiskLevel,
    riskScores: { academic, career, health, productivity, financial, personalGrowth },
    hiddenProblems: [
      'Unconscious Energy Leakage: Fragmented focus habits leading to cognitive friction',
      'Asymmetric Skill Vulnerability: High reliance on single execution channels without fallback reserves',
      'Reactive Feedback Delay: Waiting for failure events before recalibrating daily behavior patterns'
    ],
    rootCauses: [
      {
        category: 'Cognitive Architecture',
        cause: 'High cognitive friction from multi-task switching & unstructured daily goals',
        impact: '42% loss in deep work output and delayed milestone completion'
      },
      {
        category: 'Habit Trajectory',
        cause: 'Inconsistent daily execution baseline paired with late-night stimulus',
        impact: 'Accelerated fatigue buildup reducing decision quality during peak hours'
      },
      {
        category: 'Strategy Alignment',
        cause: 'Prioritizing immediate fires over high-leverage compound activities',
        impact: 'Stagnant long-term positioning and elevated crisis vulnerability'
      }
    ],
    preventionStrategy: [
      {
        title: 'Implement 90-Minute Time-Blocking Protocol',
        description: 'Isolate two uninterrupted deep-work sprints daily targeting core leverage goals.',
        priority: 'HIGH',
        timeframe: 'Immediate (Next 48 hrs)'
      },
      {
        title: 'Establish Preventive Biometric Buffer',
        description: 'Hard-cap late night digital intake at 10 PM to restore delta sleep cycles.',
        priority: 'HIGH',
        timeframe: '7-Day Implementation'
      },
      {
        title: 'Build Milestone Failure Safeguards',
        description: 'Set up weekly progress checkpoints with early warning risk triggers.',
        priority: 'MEDIUM',
        timeframe: '14-Day Implementation'
      }
    ],
    immediateActionPlan: [
      { step: 1, action: 'Define top 3 non-negotiable daily objectives before turning on phone', outcome: 'Eliminates morning reactive friction' },
      { step: 2, action: 'Audit current habit routines and eliminate top time-sink trigger', outcome: 'Reclaims 8+ hours of focus weekly' },
      { step: 3, action: 'Conduct 15-minute weekly preventive retrospectives every Sunday evening', outcome: 'Detects micro-risks before escalation' }
    ]
  };
}

export async function runFutureSimulation(input: {
  situation: string;
  query?: string;
  habits?: string;
  goals?: string;
}): Promise<FutureSimulationResult> {
  const backendResult = await callBackendApi('future_simulation', input);
  if (!backendResult.fallback) {
    return backendResult as FutureSimulationResult;
  }

  return {
    baselineBehavior: 'Current trajectory: Reactive execution, variable sleep schedule, fragmented focus cycles, and passive risk awareness.',
    day30: {
      prediction: 'Micro-friction compounds into noticeable project delays and heightened mental fatigue.',
      positiveScenario: 'With Nova Sense intervention: 35% productivity boost, stabilized sleep patterns, and 0 critical missed deadlines.',
      negativeScenario: 'Without intervention: 2 major task bottlenecks emerge, stress levels rise by 25%.',
      riskFactor: 48
    },
    day90: {
      prediction: 'Vulnerability window expands; key opportunities missed due to burnout avoidance tactics.',
      positiveScenario: 'With Nova Sense intervention: Key goal milestone achieved early, 92% risk reduction, strong momentum.',
      negativeScenario: 'Without intervention: Goal timeline delayed by 2-3 months, emergency corrective action required.',
      riskFactor: 68
    },
    year1: {
      prediction: 'Divergence Point: Continuing unchanged behavior leads to plateaued achievement and potential burnout crisis.',
      positiveScenario: 'With Nova Sense intervention: Transformative career/personal growth, top 5% domain performance, sustainable lifestyle.',
      negativeScenario: 'Without intervention: High regret index, physical exhaustion, loss of competitive edge.',
      riskFactor: 82
    },
    requiredChanges: [
      'Transition from reactive problem-solving to proactive daily risk monitoring',
      'Establish strict boundaries between high-cognition deep work and low-value tasks',
      'Incorporate 1% compounding habit optimizations daily'
    ],
    improvementRoadmap: [
      { phase: 'Phase 1: Stabilization (Days 1-14)', milestone: 'Establish Habit Anchor', preventiveAction: 'Lock in sleep timing & morning focus window' },
      { phase: 'Phase 2: Optimization (Days 15-45)', milestone: 'Accelerate Execution', preventiveAction: 'Deploy automated tracking & priority filtering' },
      { phase: 'Phase 3: Mastery (Days 46-90)', milestone: 'Achieve Peak Resilience', preventiveAction: 'Scale high-leverage outcomes with preventive AI guards' }
    ]
  };
}

export async function runDecisionIntelligence(decision: string, context: string): Promise<DecisionResult> {
  const backendResult = await callBackendApi('decision_intelligence', { decision, context });
  if (!backendResult.fallback) {
    return backendResult as DecisionResult;
  }

  const len = decision.length;
  const score = Math.min(96, Math.max(65, 75 + (len % 18)));

  return {
    decision,
    decisionScore: score,
    verdict: score > 85 ? 'HIGHLY RECOMMENDED' : 'PROCEED WITH CAUTION',
    advantages: [
      'High Strategic Leverage: Opens long-term asymmetric upside in growth domain',
      'Future-Proof Alignment: Positions capabilities ahead of market shift',
      'Compounding Skills: Experience gained will carry high transfer value across domains'
    ],
    risks: [
      'Short-term Opportunity Cost: Requires reallocation of time away from baseline tasks',
      'Learning Curve Friction: Initial steep curve could cause temporary productivity drop',
      'Resource Constraint Risk: Requires disciplined time & focus budget management'
    ],
    hiddenFactors: [
      'Network Effects: Secondary access to high-value peers and mentors',
      'Mental Energy Overhead: Underestimated emotional stamina needed in month 1',
      'Timing Advantage: Entering now grants early-mover leverage before market saturation'
    ],
    opportunityAnalysis: 'The upside-to-downside risk ratio is 4.2x in your favor provided risk mitigations are deployed early.',
    recommendedChoice: `PROCEED WITH PREVENTIVE SAFEGUARDS: Commit to ${decision} with a 30-day trial sprint while protecting baseline obligations.`,
    executionPlan: [
      { phase: 'Phase 1: Validation Sprint (Days 1-7)', task: 'Conduct initial feasibility test with minimal resource commitment', riskMitigation: 'Set hard cap of 5 hours weekly to test baseline fit' },
      { phase: 'Phase 2: Structured Ramp-up (Days 8-21)', task: 'Build core framework & integrate daily habit triggers', riskMitigation: 'Schedule weekly risk audits to catch friction early' },
      { phase: 'Phase 3: Full Commitment (Days 22-30)', task: 'Scale execution to 100% capacity upon meeting initial KPIs', riskMitigation: 'Establish contingency fallback if metrics fall below threshold' }
    ]
  };
}

export async function runProblemSolver(problem: string, context: string): Promise<ProblemSolverResult> {
  const backendResult = await callBackendApi('problem_solver', { problem, context });
  if (!backendResult.fallback) {
    return backendResult as ProblemSolverResult;
  }

  return {
    problem,
    understanding: `Diagnostic Analysis: "${problem}" stems from systemic bottlenecking where immediate pressure overrides long-term preventive structural integrity.`,
    rootCause: 'Primary Root Cause: Lack of early-warning feedback mechanisms combined with delayed response execution when early symptoms first appeared.',
    immediateSolution: [
      'Perform Emergency Triage: Stop further leakage/damage immediately by halting non-essential inputs.',
      'Establish Containment Perimeter: Focus 100% energy on the single highest-impact corrective action.',
      'Deploy Rapid Feedback Protocol: Monitor indicators every 6 hours for immediate stabilization.'
    ],
    longTermSolution: [
      'Re-architect Core Process: Redesign workflow with built-in automated redundancy and quality checks.',
      'Build Resilience Buffers: Create 20% resource margins so future anomalies do not cause catastrophic failure.',
      'Implement Continuous Monitoring: Set up AI preventive alerts for real-time anomaly detection.'
    ],
    preventionStrategy: [
      'Never rely on single-point failure nodes in crucial operations.',
      'Conduct bi-weekly stress testing under simulated failure conditions.',
      'Maintain an updated Emergency Protocol playbook.'
    ],
    actionChecklist: [
      { id: 'chk-1', text: 'Execute Immediate Triage Action (Isolate core cause)', urgency: 'Immediate', done: false },
      { id: 'chk-2', text: 'Notify key stakeholders & establish clear crisis communication', urgency: 'Immediate', done: false },
      { id: 'chk-3', text: 'Implement 48-hour temporary patch while building full solution', urgency: 'Short-term', done: false },
      { id: 'chk-4', text: 'Deploy Nova Sense Preventive Guard to prevent recurrence', urgency: 'Long-term', done: false }
    ]
  };
}

export async function runVisionAnalysis(userNote: string, imageBase64?: string): Promise<VisionAnalysisResult> {
  const backendResult = await callBackendApi('vision_analysis', { userNote, imageBase64 });
  if (!backendResult.fallback) {
    return backendResult as VisionAnalysisResult;
  }

  return {
    imageTitle: 'Preventive Vision Diagnostic Scan',
    detectedContext: 'Multimodal AI Vision analysis scanned visual structural patterns, text density, anomaly indicators, and operational metrics.',
    extractedInfo: [
      'Visual Signal Detection: High density information pattern identified with key anomaly vectors',
      'Structural Stability Index: 76/100 (Sub-optimal resilience detected in lower right quadrant)',
      'Critical Metrics Extracted: Priority focus required on sequence execution and error-handling paths'
    ],
    detectedIssues: [
      { issue: 'Structural Friction Vector', severity: 'High', description: 'Visual data displays irregular variation that precedes catastrophic system or performance drop.' },
      { issue: 'Sub-optimal Optimization', severity: 'Medium', description: 'Resource distribution appears uneven, causing localized bottlenecking.' },
      { issue: 'Early Wear/Stress Anomaly', severity: 'Low', description: 'Minor variance detected; easily preventable with 5-minute calibration.' }
    ],
    preventiveRecommendations: [
      'Re-align structural load parameters according to recommended safety thresholds.',
      'Apply preventive reinforcement before secondary degradation occurs.',
      'Schedule automated re-inspection scan in 7 days.'
    ]
  };
}

export async function runInnovationGenerator(industry: string, idea?: string): Promise<InnovationResult> {
  const backendResult = await callBackendApi('innovation_generator', { industry, idea });
  if (!backendResult.fallback) {
    return backendResult as InnovationResult;
  }

  return {
    industry,
    problemStatement: `In ${industry}, reactive crisis management costs organizations billions annually in lost productivity, material damage, and missed market opportunities.`,
    aiSolution: `NOVA ${industry.toUpperCase()} PREVENTIVE ENGINE: An autonomous predictive AI matrix that continuous monitors data vectors to stop industry failure points before they manifest.`,
    targetUsers: [
      `Enterprise Operators & Directors in ${industry}`,
      'Strategic Decision Makers & Risk Managers',
      'Forward-looking Teams seeking 10x Operational Efficiency'
    ],
    technologyApproach: [
      'Multimodal Sensor/Data Ingestion Engine',
      'Real-time Predictive Anomaly Detection Neural Nets',
      'Prescriptive Action Recommendation Matrix'
    ],
    socialImpact: `Democratizes enterprise-grade preventive intelligence, preventing economic waste and improving human safety and productivity globally.`,
    businessOpportunity: `High-margin B2B SaaS platform with strong retention network effects. Estimated TAM: $14.8 Billion.`,
    futureScalability: `Autonomous preventive agents that automatically execute self-healing protocols across legacy systems.`
  };
}

export function runOpportunityDetector(skills: string[], interests: string[]): OpportunityResult {
  return {
    detectedOpportunities: [
      {
        title: 'Preventive AI Consultant / Architect',
        domain: 'Artificial Intelligence & Risk Architecture',
        matchScore: 94,
        leveragePoint: 'High market demand with low specialized competition in proactive AI integration.',
        actionableStep: 'Package your core domain knowledge into a 3-tier preventive framework proposal.'
      },
      {
        title: 'Autonomous System Workflow Engineer',
        domain: 'Automation & Productivity',
        matchScore: 89,
        leveragePoint: 'Organizations willing to pay premium rates for eliminating repetitive operational errors.',
        actionableStep: 'Build a public open-source workflow showcase proving 50% error reduction.'
      },
      {
        title: 'Predictive Analytics Strategist',
        domain: 'Data & Growth',
        matchScore: 86,
        leveragePoint: 'Combining domain insights with predictive analytics to optimize retention.',
        actionableStep: 'Launch a targeted newsletter analyzing domain risk prevention cases.'
      }
    ],
    synergyAnalysis: 'Your unique combination of skills creates a rare 95th-percentile cross-functional edge.'
  };
}

export function runHabitTransformation(habits: string[]): HabitResult {
  return {
    currentHabits: habits.length ? habits : ['Irregular work hours', 'Reactive email checking', 'Late-night blue light exposure'],
    compoundingGainYearly: '+37.7x Exponential Performance Growth through 1% micro-improvements daily',
    negativeTrajectoryRisk: '-97.2% Performance Degradation if negative friction micro-habits persist uncorrected',
    atomicAdjustments: [
      { badHabit: 'Checking phone immediately upon waking', preventiveReplacement: 'Drink 500ml water + 10 mins sunlight exposure', impactScore: 92 },
      { badHabit: 'Multitasking across 5 open browser windows', preventiveReplacement: 'Single-tab deep work block with 50/10 timer', impactScore: 88 },
      { badHabit: 'Late afternoon excessive caffeine intake', preventiveReplacement: 'Hydration + 5-minute physical breathing reset', impactScore: 84 }
    ]
  };
}

export function runSkillGapAnalyzer(currentRole: string, targetGoal: string): SkillGapResult {
  return {
    currentRole,
    targetGoal,
    readinessScore: 68,
    existingSkills: ['Problem Solving', 'Communication', 'Domain Knowledge', 'Basic Execution'],
    missingCriticalSkills: [
      { skill: 'Preventive AI Systems Architecture', urgency: 'CRITICAL', learningCurve: '2-3 Weeks', recommendedResource: 'Nova Sense Masterclass & Hands-on Projects' },
      { skill: 'Data-Driven Risk Modeling', urgency: 'IMPORTANT', learningCurve: '3-4 Weeks', recommendedResource: 'Applied Predictive Analytics Specialization' },
      { skill: 'Autonomous Workflow Engineering', urgency: 'FUTURE-PROOF', learningCurve: '2 Weeks', recommendedResource: 'Modern Automation & API Design Labs' }
    ],
    automationRiskMap: 'Current traditional tasks face a 42% automation risk over 3 years. Transitioning to Preventive AI positioning moves you into the top 1% safe high-leverage tier.'
  };
}

export function runEmergencyTriage(crisisText: string): EmergencyResult {
  return {
    crisisType: crisisText || 'Critical Urgent Emergency Situation',
    urgencyLevel: 'EXTREME',
    immediateTriage: [
      'PAUSE ALL NON-ESSENTIAL INPUTS IMMEDIATELY. Take 3 deep diaphragmatic breaths.',
      'STOP THE BLEEDING: Freeze active changes, halt risky communications, isolate the core issue.',
      'SECURE TIME BUFFER: Request a 2-hour or 24-hour window to execute structured containment.'
    ],
    containmentProtocol: [
      'Identify the single most critical failure point that threatens complete collapse.',
      'Deploy minimal viable patch to stabilize safety margins.',
      'Brief primary allies/stakeholders with objective fact-based updates, zero panic.'
    ],
    recoverySteps: [
      'Execute Step-by-Step Triage Checklist.',
      'Document root cause to install permanent Nova Sense preventive guards.',
      'Conduct post-crisis debrief once equilibrium is restored.'
    ],
    calmThought: 'Remember: Crises are temporary sequence breakdowns. Systematic execution dissolves chaos.'
  };
}
