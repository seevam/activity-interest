import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActivityPhase, SessionData, Phase1Data, ScenarioResponse, AIProfile } from './types';

interface ActivityStore {
  // Session data
  sessionData: SessionData;

  // Current state
  currentPhase: ActivityPhase;
  progress: number;

  // Phase 1 state
  cardPlacements: Map<number, 'energizes' | 'curious' | 'notForMe'>;

  // Phase 2 state
  currentScenario: number;
  scenarioResponses: ScenarioResponse[];
  showingFollowUp: boolean;
  currentPrimaryChoice: string | null;

  // Actions
  setCurrentPhase: (phase: ActivityPhase) => void;
  setProgress: (progress: number) => void;
  setStudentName: (name: string) => void;

  // Phase 1 actions
  placeCard: (cardId: number, zone: 'energizes' | 'curious' | 'notForMe') => void;
  completePhase1: () => void;

  // Phase 2 actions
  answerScenario: (scenarioId: number, primaryChoice: string, followUpChoice: string, trait: string) => void;
  setShowingFollowUp: (showing: boolean) => void;
  setCurrentPrimaryChoice: (choice: string | null) => void;
  nextScenario: () => void;
  completePhase2: () => void;

  // Phase 3 actions
  setAIProfile: (profile: AIProfile) => void;

  // Utility
  resetSession: () => void;
  getPhase1Data: () => Phase1Data;
}

const initialSessionData: SessionData = {
  sessionId: '',
  studentName: '',
  timestamp: new Date().toISOString(),
  phase1Data: null,
  phase2Data: null,
  aiProfile: null,
  timeSpent: 0,
  currentPhase: 0,
};

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set, get) => ({
      sessionData: initialSessionData,
      currentPhase: 'welcome',
      progress: 0,
      cardPlacements: new Map(),
      currentScenario: 0,
      scenarioResponses: [],
      showingFollowUp: false,
      currentPrimaryChoice: null,

      setCurrentPhase: (phase) => set({ currentPhase: phase }),

      setProgress: (progress) => set({ progress }),

      setStudentName: (name) =>
        set((state) => ({
          sessionData: {
            ...state.sessionData,
            studentName: name,
            sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          },
        })),

      placeCard: (cardId, zone) =>
        set((state) => {
          const newPlacements = new Map(state.cardPlacements);
          newPlacements.set(cardId, zone);

          // Calculate progress based on cards sorted
          const totalCards = 25;
          const sortedCards = newPlacements.size;
          const progress = Math.round((sortedCards / totalCards) * 40); // Phase 1 is 40% of total

          return {
            cardPlacements: newPlacements,
            progress,
          };
        }),

      completePhase1: () =>
        set((state) => {
          const phase1Data = get().getPhase1Data();
          return {
            sessionData: {
              ...state.sessionData,
              phase1Data,
              currentPhase: 1,
            },
            currentPhase: 'scenarios',
            progress: 60,
          };
        }),

      answerScenario: (scenarioId, primaryChoice, followUpChoice, trait) =>
        set((state) => {
          const newResponses = [
            ...state.scenarioResponses,
            { scenarioId, primaryChoice, followUpChoice, trait },
          ];
          return {
            scenarioResponses: newResponses,
            showingFollowUp: false,
            currentPrimaryChoice: null,
          };
        }),

      setShowingFollowUp: (showing) => set({ showingFollowUp: showing }),

      setCurrentPrimaryChoice: (choice) => set({ currentPrimaryChoice: choice }),

      nextScenario: () =>
        set((state) => {
          const nextScenario = state.currentScenario + 1;
          const progress = 60 + (nextScenario / 4) * 30; // Scenarios are 30% of total
          return {
            currentScenario: nextScenario,
            progress: Math.round(progress),
          };
        }),

      completePhase2: () =>
        set((state) => ({
          sessionData: {
            ...state.sessionData,
            phase2Data: { scenarios: state.scenarioResponses },
            currentPhase: 2,
          },
          currentPhase: 'loading',
          progress: 90,
        })),

      setAIProfile: (profile) =>
        set((state) => ({
          sessionData: {
            ...state.sessionData,
            aiProfile: profile,
            currentPhase: 3,
          },
          currentPhase: 'results',
          progress: 100,
        })),

      resetSession: () =>
        set({
          sessionData: { ...initialSessionData, timestamp: new Date().toISOString() },
          currentPhase: 'welcome',
          progress: 0,
          cardPlacements: new Map(),
          currentScenario: 0,
          scenarioResponses: [],
          showingFollowUp: false,
          currentPrimaryChoice: null,
        }),

      getPhase1Data: () => {
        const { cardPlacements } = get();
        const phase1Data: Phase1Data = {
          energizesMe: [],
          curiousAbout: [],
          notForMe: [],
        };

        cardPlacements.forEach((zone, cardId) => {
          if (zone === 'energizes') phase1Data.energizesMe.push(cardId);
          else if (zone === 'curious') phase1Data.curiousAbout.push(cardId);
          else if (zone === 'notForMe') phase1Data.notForMe.push(cardId);
        });

        return phase1Data;
      },
    }),
    {
      name: 'interest-discovery-session',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          // Convert cardPlacements object back to Map
          if (state.cardPlacements && !(state.cardPlacements instanceof Map)) {
            state.cardPlacements = new Map(Object.entries(state.cardPlacements).map(([k, v]) => [Number(k), v]));
          }
          return { state };
        },
        setItem: (name, newValue) => {
          const { state } = newValue;
          // Convert Map to object for storage
          const storageState = {
            ...state,
            cardPlacements: state.cardPlacements instanceof Map
              ? Object.fromEntries(state.cardPlacements)
              : state.cardPlacements,
          };
          localStorage.setItem(name, JSON.stringify({ state: storageState }));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
