// Interest Card Types
export interface InterestCard {
  id: number;
  emoji: string;
  label: string;
  category: 'creative' | 'investigative' | 'realistic' | 'artistic' | 'social' | 'enterprising' | 'conventional';
}

export type Zone = 'energizes' | 'curious' | 'notForMe' | null;

// Scenario Types
export interface ScenarioOption {
  id: string;
  emoji: string;
  text: string;
  subtext?: string;
  trait?: string;
  followUp?: FollowUpQuestion;
}

export interface FollowUpQuestion {
  question: string;
  options: FollowUpOption[];
}

export interface FollowUpOption {
  id: string;
  emoji: string;
  text: string;
  trait: string;
}

export interface Scenario {
  id: number;
  prompt: string;
  question: string;
  options: ScenarioOption[];
}

// Session Data Types
export interface Phase1Data {
  energizesMe: number[];
  curiousAbout: number[];
  notForMe: number[];
}

export interface ScenarioResponse {
  scenarioId: number;
  primaryChoice: string;
  followUpChoice: string;
  trait: string;
}

export interface Phase2Data {
  scenarios: ScenarioResponse[];
}

export interface InterestTheme {
  title: string;
  description: string;
  emoji: string;
}

export interface CareerCluster {
  name: string;
  reason: string;
  sampleCareers: string[];
}

export interface AIProfile {
  narrative: string;
  topThemes: InterestTheme[];
  recommendedClusters: CareerCluster[];
}

export interface SessionData {
  sessionId: string;
  studentName: string;
  timestamp: string;
  phase1Data: Phase1Data | null;
  phase2Data: Phase2Data | null;
  aiProfile: AIProfile | null;
  timeSpent: number;
  currentPhase: number;
}

// Activity Phase
export type ActivityPhase = 'welcome' | 'instructions' | 'cardSort' | 'scenarios' | 'loading' | 'results';
