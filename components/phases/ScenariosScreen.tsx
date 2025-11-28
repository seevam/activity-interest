'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button';
import { ProgressBar } from '../ProgressBar';
import { useActivityStore } from '@/lib/store';
import { scenarios } from '@/lib/data';
import { ScenarioOption, FollowUpOption } from '@/lib/types';

interface ScenariosScreenProps {
  onComplete: () => void;
}

export const ScenariosScreen: React.FC<ScenariosScreenProps> = ({ onComplete }) => {
  const {
    currentScenario,
    answerScenario,
    nextScenario,
    progress,
    scenarioResponses,
  } = useActivityStore();

  const [showFollowUp, setShowFollowUp] = useState(false);
  const [selectedPrimary, setSelectedPrimary] = useState<ScenarioOption | null>(null);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUpOption | null>(null);

  const scenario = scenarios[currentScenario];
  const isLastScenario = currentScenario === scenarios.length - 1;

  const handlePrimaryChoice = (option: ScenarioOption) => {
    setSelectedPrimary(option);
    // Wait a moment for visual feedback, then show follow-up
    setTimeout(() => {
      setShowFollowUp(true);
    }, 500);
  };

  const handleFollowUpChoice = (option: FollowUpOption) => {
    setSelectedFollowUp(option);

    // Save the response
    answerScenario(
      scenario.id,
      selectedPrimary!.id,
      option.id,
      option.trait
    );

    // Wait a moment, then move to next scenario or complete
    setTimeout(() => {
      if (isLastScenario) {
        onComplete();
      } else {
        nextScenario();
        setShowFollowUp(false);
        setSelectedPrimary(null);
        setSelectedFollowUp(null);
      }
    }, 500);
  };

  if (!scenario) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with progress */}
      <div className="p-4 md:p-6 bg-white shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <ProgressBar progress={progress} />
            </div>
            <div className="ml-4 text-sm font-semibold text-gray-dark">
              Question {currentScenario + 1} of {scenarios.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <AnimatePresence mode="wait">
            {!showFollowUp ? (
              <motion.div
                key="primary"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Scenario prompt */}
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-primary mb-4">
                    {scenario.prompt}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-dark font-semibold">
                    {scenario.question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  {scenario.options.map((option) => (
                    <motion.button
                      key={option.id}
                      className={`w-full border-[3px] rounded-card p-4 md:p-6 text-left transition-all ${
                        selectedPrimary?.id === option.id
                          ? 'border-blue-primary bg-blue-primary text-white'
                          : 'border-gray-medium bg-white hover:border-cyan-light hover:bg-cyan-ultra-light'
                      }`}
                      onClick={() => handlePrimaryChoice(option)}
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{option.emoji}</div>
                        <div className="flex-1">
                          <div className="font-bold text-lg mb-1">{option.text}</div>
                          {option.subtext && (
                            <div
                              className={`text-sm ${
                                selectedPrimary?.id === option.id
                                  ? 'text-cyan-ultra-light'
                                  : 'text-gray-dark'
                              }`}
                            >
                              {option.subtext}
                            </div>
                          )}
                        </div>
                        {selectedPrimary?.id === option.id && (
                          <div className="text-yellow-primary text-2xl">✓</div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="followup"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Follow-up question */}
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-primary mb-4">
                    💭 Tell us more...
                  </h2>
                  <p className="text-lg md:text-xl text-gray-dark font-semibold">
                    {selectedPrimary?.followUp?.question}
                  </p>
                </div>

                {/* Follow-up options */}
                <div className="space-y-4">
                  {selectedPrimary?.followUp?.options.map((option) => (
                    <motion.button
                      key={option.id}
                      className={`w-full border-[3px] rounded-card p-4 md:p-6 text-left transition-all ${
                        selectedFollowUp?.id === option.id
                          ? 'border-blue-primary bg-blue-primary text-white'
                          : 'border-gray-medium bg-white hover:border-cyan-light hover:bg-cyan-ultra-light'
                      }`}
                      onClick={() => handleFollowUpChoice(option)}
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{option.emoji}</div>
                        <div className="flex-1">
                          <div className="font-semibold">{option.text}</div>
                        </div>
                        {selectedFollowUp?.id === option.id && (
                          <div className="text-yellow-primary text-2xl">✓</div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
