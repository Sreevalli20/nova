export type ActiveTab =
  | 'scanner'
  | 'simulator'
  | 'decision'
  | 'problem'
  | 'vision'
  | 'voice'
  | 'sensors'
  | 'innovation'
  | 'dashboard'
  | 'opportunities'
  | 'habits'
  | 'skills';

export interface RiskScores {
  academic: number;
  career: number;
  health: number;
  productivity: number;
  financial: number;
  personalGrowth: number;
}

export interface RiskScanResult {
  overallIntelligenceScore: number;
  overallRiskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  riskScores: RiskScores;
  hiddenProblems: string[];
  rootCauses: Array<{
    category: string;
    cause: string;
    impact: string;
  }>;
  preventionStrategy: Array<{
    title: string;
    description: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    timeframe: string;
  }>;
  immediateActionPlan: Array<{
    step: number;
    action: string;
    outcome: string;
    completed?: boolean;
  }>;
}

export interface FutureSimulationResult {
  baselineBehavior: string;
  day30: {
    prediction: string;
    positiveScenario: string;
    negativeScenario: string;
    riskFactor: number;
  };
  day90: {
    prediction: string;
    positiveScenario: string;
    negativeScenario: string;
    riskFactor: number;
  };
  year1: {
    prediction: string;
    positiveScenario: string;
    negativeScenario: string;
    riskFactor: number;
  };
  requiredChanges: string[];
  improvementRoadmap: Array<{
    phase: string;
    milestone: string;
    preventiveAction: string;
  }>;
}

export interface DecisionResult {
  decision: string;
  decisionScore: number;
  verdict: 'HIGHLY RECOMMENDED' | 'PROCEED WITH CAUTION' | 'NOT RECOMMENDED' | 'TRANSFORMATIVE OPPORTUNITY';
  advantages: string[];
  risks: string[];
  hiddenFactors: string[];
  opportunityAnalysis: string;
  recommendedChoice: string;
  executionPlan: Array<{
    phase: string;
    task: string;
    riskMitigation: string;
  }>;
}

export interface ProblemSolverResult {
  problem: string;
  understanding: string;
  rootCause: string;
  immediateSolution: string[];
  longTermSolution: string[];
  preventionStrategy: string[];
  actionChecklist: Array<{
    id: string;
    text: string;
    urgency: 'Immediate' | 'Short-term' | 'Long-term';
    done: boolean;
  }>;
}

export interface VisionAnalysisResult {
  imageTitle: string;
  detectedContext: string;
  extractedInfo: string[];
  detectedIssues: Array<{
    issue: string;
    severity: 'High' | 'Medium' | 'Low';
    description: string;
  }>;
  preventiveRecommendations: string[];
}

export interface InnovationResult {
  industry: string;
  problemStatement: string;
  aiSolution: string;
  targetUsers: string[];
  technologyApproach: string[];
  socialImpact: string;
  businessOpportunity: string;
  futureScalability: string;
}

export interface OpportunityResult {
  detectedOpportunities: Array<{
    title: string;
    domain: string;
    matchScore: number;
    leveragePoint: string;
    actionableStep: string;
  }>;
  synergyAnalysis: string;
}

export interface HabitResult {
  currentHabits: string[];
  compoundingGainYearly: string;
  negativeTrajectoryRisk: string;
  atomicAdjustments: Array<{
    badHabit: string;
    preventiveReplacement: string;
    impactScore: number;
  }>;
}

export interface SkillGapResult {
  currentRole: string;
  targetGoal: string;
  readinessScore: number;
  existingSkills: string[];
  missingCriticalSkills: Array<{
    skill: string;
    urgency: 'CRITICAL' | 'IMPORTANT' | 'FUTURE-PROOF';
    learningCurve: string;
    recommendedResource: string;
  }>;
  automationRiskMap: string;
}

export interface EmergencyResult {
  crisisType: string;
  urgencyLevel: 'EXTREME' | 'HIGH';
  immediateTriage: string[];
  containmentProtocol: string[];
  recoverySteps: string[];
  calmThought: string;
}

export interface DemoScenario {
  id: string;
  name: string;
  role: string;
  tagline: string;
  iconName: string;
  prompt: {
    situation: string;
    goals: string;
    habits: string;
    problems: string;
    challenges: string;
  };
  sampleVisionImage?: string;
  sampleVisionTitle?: string;
}

export interface InsightHistoryItem {
  id: string;
  timestamp: string;
  type: string;
  summary: string;
  score?: number;
}
