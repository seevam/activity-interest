'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProgressBar } from '../ProgressBar';

interface LoadingScreenProps {
  onComplete: (profile: any) => void;
  sessionData: any;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, sessionData }) => {
  const [loadingMessage, setLoadingMessage] = useState('Discovering patterns...');

  const messages = [
    'Discovering patterns...',
    'Mapping to careers...',
    'Creating your profile...',
    'Analyzing your interests...',
  ];

  useEffect(() => {
    // Cycle through loading messages
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      setLoadingMessage(messages[currentIndex]);
    }, 2000);

    // Generate AI profile
    const generateProfile = async () => {
      try {
        const response = await fetch('/api/generate-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sessionData),
        });

        const data = await response.json();

        if (data.error) {
          console.error('Error generating profile:', data.error);
          // Provide fallback profile
          onComplete(getFallbackProfile());
        } else {
          onComplete(data.profile);
        }
      } catch (error) {
        console.error('Error generating profile:', error);
        // Provide fallback profile
        onComplete(getFallbackProfile());
      }
    };

    // Start generation after minimum display time
    const timer = setTimeout(() => {
      generateProfile();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [sessionData]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-ultra-light to-white">
      {/* Progress bar */}
      <div className="p-4 md:p-6">
        <ProgressBar progress={90} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="text-6xl mb-6"
          >
            🤖
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-blue-primary mb-4">
            Analyzing Your Interests...
          </h2>

          <motion.div
            key={loadingMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg text-gray-dark mb-8"
          >
            ✨ {loadingMessage}
          </motion.div>

          {/* Loading animation */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-blue-primary rounded-full"
                animate={{
                  y: ['0%', '-50%', '0%'],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Fallback profile in case API fails
function getFallbackProfile() {
  return {
    narrative:
      "You have a wonderful mix of interests that show you're creative, curious, and eager to explore! Your responses suggest you enjoy both hands-on activities and deep thinking. You're drawn to activities where you can express yourself while also making a positive impact on others. This combination of creativity and compassion is valuable in many career paths. Keep exploring what excites you - your unique blend of interests will help guide you to meaningful opportunities!",
    topThemes: [
      {
        emoji: '🎨',
        title: 'Creative Explorer',
        description:
          "You love expressing yourself and trying new creative approaches. Whether it's art, design, or innovative problem-solving, you thrive when you can bring fresh ideas to life.",
      },
      {
        emoji: '🤝',
        title: 'Helper & Connector',
        description:
          'Making a positive difference matters to you. You find fulfillment in activities that help others or bring people together, showing your caring and collaborative nature.',
      },
      {
        emoji: '🧩',
        title: 'Problem Solver',
        description:
          "You enjoy figuring things out and tackling challenges. Whether it's puzzles, projects, or real-world problems, you like using your mind to find solutions.",
      },
    ],
    recommendedClusters: [
      {
        name: 'Arts, A/V Technology & Communications',
        reason:
          'Your creative interests and desire for self-expression align well with design, media, and creative technology roles.',
        sampleCareers: ['Graphic Designer', 'UX Designer', 'Content Creator', 'Animator'],
      },
      {
        name: 'Human Services',
        reason:
          'Your interest in helping others and making an impact suggests careers in counseling, social work, and community support.',
        sampleCareers: ['School Counselor', 'Social Worker', 'Youth Program Coordinator'],
      },
      {
        name: 'STEM (Science, Technology, Engineering & Mathematics)',
        reason:
          'Your problem-solving skills and curiosity about how things work make STEM careers a great fit.',
        sampleCareers: ['Software Developer', 'Data Analyst', 'Research Scientist'],
      },
    ],
  };
}
