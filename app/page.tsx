'use client';

import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from '@/components/phases/WelcomeScreen';
import { InstructionsScreen } from '@/components/phases/InstructionsScreen';
import { CardSortingScreen } from '@/components/phases/CardSortingScreen';
import { ScenariosScreen } from '@/components/phases/ScenariosScreen';
import { LoadingScreen } from '@/components/phases/LoadingScreen';
import { ResultsScreen } from '@/components/phases/ResultsScreen';
import { useActivityStore } from '@/lib/store';
import { generatePDF } from '@/lib/pdf-generator';

export default function Home() {
  const {
    currentPhase,
    setCurrentPhase,
    sessionData,
    setStudentName,
    completePhase1,
    completePhase2,
    setAIProfile,
    resetSession,
  } = useActivityStore();

  const [studentNameInput, setStudentNameInput] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  const handleStart = () => {
    setShowNamePrompt(true);
  };

  const handleNameSubmit = () => {
    if (studentNameInput.trim()) {
      setStudentName(studentNameInput.trim());
    }
    setCurrentPhase('instructions');
    setShowNamePrompt(false);
  };

  const handleSkipName = () => {
    setStudentName('Student');
    setCurrentPhase('instructions');
    setShowNamePrompt(false);
  };

  const handleInstructionsContinue = () => {
    setCurrentPhase('cardSort');
  };

  const handlePhase1Complete = () => {
    completePhase1();
  };

  const handlePhase2Complete = () => {
    completePhase2();
  };

  const handleProfileGenerated = (profile: any) => {
    setAIProfile(profile);
  };

  const handleDownloadPDF = async () => {
    if (sessionData.phase1Data && sessionData.aiProfile) {
      await generatePDF(
        sessionData.studentName,
        sessionData.phase1Data,
        sessionData.aiProfile
      );
    }
  };

  const handleRestart = () => {
    if (confirm('Are you sure you want to restart? All progress will be lost.')) {
      resetSession();
    }
  };

  // Name prompt modal
  if (showNamePrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-ultra-light to-white p-4">
        <div className="bg-white rounded-card p-8 max-w-md w-full shadow-card">
          <h2 className="text-2xl font-bold text-blue-primary mb-4">
            What's your name?
          </h2>
          <p className="text-gray-dark mb-6">
            This will help personalize your report. (Optional)
          </p>
          <input
            type="text"
            value={studentNameInput}
            onChange={(e) => setStudentNameInput(e.target.value)}
            placeholder="Enter your name"
            className="w-full border-[3px] border-gray-medium rounded-card px-4 py-3 mb-4 text-gray-dark focus:border-blue-primary focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
            autoFocus
          />
          <div className="flex gap-3">
            <button
              onClick={handleNameSubmit}
              className="btn-primary flex-1"
              disabled={!studentNameInput.trim()}
            >
              Continue
            </button>
            <button onClick={handleSkipName} className="btn-secondary flex-1">
              Skip
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main phase rendering
  return (
    <main>
      {currentPhase === 'welcome' && <WelcomeScreen onStart={handleStart} />}

      {currentPhase === 'instructions' && (
        <InstructionsScreen onContinue={handleInstructionsContinue} />
      )}

      {currentPhase === 'cardSort' && (
        <CardSortingScreen onComplete={handlePhase1Complete} />
      )}

      {currentPhase === 'scenarios' && (
        <ScenariosScreen onComplete={handlePhase2Complete} />
      )}

      {currentPhase === 'loading' && (
        <LoadingScreen
          onComplete={handleProfileGenerated}
          sessionData={{
            phase1Data: sessionData.phase1Data,
            phase2Data: sessionData.phase2Data,
            sessionData: sessionData,
          }}
        />
      )}

      {currentPhase === 'results' && sessionData.aiProfile && (
        <ResultsScreen
          profile={sessionData.aiProfile}
          studentName={sessionData.studentName}
          onDownloadPDF={handleDownloadPDF}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}
