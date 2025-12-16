'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';
import { ProgressBar } from '../ProgressBar';

interface InstructionsScreenProps {
  onContinue: () => void;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Progress bar header */}
      <div className="p-4 md:p-6 bg-white shadow-sm">
        <ProgressBar progress={10} />
      </div>

      {/* Main content */}
      <motion.div
        className="flex-1 flex items-center justify-center p-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl w-full">
          {/* Step indicator */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-primary mb-2">
              📍 STEP 1: BUILD Your Interest Map
            </h2>
          </div>

          {/* Icon/Visual demonstration */}
          <div className="mb-6 text-center">
            <div className="text-6xl mb-4">👆</div>
            <div className="text-gray-dark text-lg mb-4">Drag each card to show how you feel</div>
          </div>

          {/* Instructions */}
          <div className="bg-cyan-ultra-light rounded-card p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-dark mb-4">
              Drag each card to the zone that matches how you feel:
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🔥</div>
                <div>
                  <div className="font-bold text-gray-dark">Energizes Me</div>
                  <div className="text-gray-dark">This excites me!</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">🤔</div>
                <div>
                  <div className="font-bold text-gray-dark">Curious About</div>
                  <div className="text-gray-dark">Want to learn more</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">😐</div>
                <div>
                  <div className="font-bold text-gray-dark">Not For Me</div>
                  <div className="text-gray-dark">Doesn&apos;t interest me</div>
                </div>
              </div>
            </div>
          </div>

          {/* Encouragement */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-dark italic">
              Don&apos;t overthink it - go with your gut!
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <Button onClick={onContinue} variant="primary">
              Got It! →
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
