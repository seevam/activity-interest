'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-ultra-light to-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Logo placeholder */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-primary mb-2">
              Ascend Now
            </h1>
            <div className="text-gray-medium text-lg">Career Exploration Platform</div>
          </div>

          {/* Main title with emoji */}
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
              🌟 Discover Your Interests!
            </h2>
            <p className="text-lg md:text-xl text-gray-dark mb-2">
              Let's explore what makes you excited about learning and life!
            </p>
          </div>

          {/* Time indicator */}
          <div className="mb-8 text-gray-medium">
            <p className="text-base md:text-lg">⏱️ Time needed: ~10 minutes</p>
          </div>

          {/* Start button */}
          <motion.div
            className="flex justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button onClick={onStart} variant="secondary" pulse>
              Let&apos;s Start! →
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
