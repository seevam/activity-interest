'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';
import { ProgressBar } from '../ProgressBar';
import { AIProfile } from '@/lib/types';

interface ResultsScreenProps {
  profile: AIProfile;
  studentName: string;
  onDownloadPDF: () => void;
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  profile,
  studentName,
  onDownloadPDF,
  onRestart,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await onDownloadPDF();
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-light">
      {/* Header with progress */}
      <div className="bg-white p-4 md:p-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <ProgressBar progress={100} />
            <div className="ml-4 flex items-center gap-2 text-green-success font-bold">
              <span>✅</span>
              <span>Complete!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-primary mb-2">
              🌟 YOUR INTEREST PROFILE
            </h1>
            <p className="text-xl text-gray-dark">
              {studentName ? `${studentName}'s Discovery Journey` : 'Your Discovery Journey'}
            </p>
          </motion.div>

          {/* AI Narrative */}
          <motion.div
            className="profile-narrative mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="whitespace-pre-line leading-relaxed">{profile.narrative}</p>
          </motion.div>

          <hr className="border-t-2 border-gray-medium mb-8" />

          {/* Top 3 Interest Themes */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-dark mb-6 text-center">
              📊 YOUR TOP 3 INTEREST THEMES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profile.topThemes.map((theme, index) => (
                <div key={index} className="theme-card">
                  <div className="text-4xl mb-2">{theme.emoji}</div>
                  <h3 className="text-xl font-bold text-blue-primary mb-2">{theme.title}</h3>
                  <p className="text-gray-dark text-sm leading-relaxed">{theme.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <hr className="border-t-2 border-gray-medium mb-8" />

          {/* Career Clusters */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-dark mb-4 text-center">
              🎯 CAREER CLUSTERS TO EXPLORE
            </h2>
            <p className="text-center text-gray-dark mb-6 text-lg">
              Based on your interests, check out these career areas:
            </p>

            <div className="space-y-4">
              {profile.recommendedClusters.map((cluster, index) => (
                <motion.div
                  key={index}
                  className="cluster-card"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-blue-primary mb-2">{cluster.name}</h3>
                  <p className="text-gray-dark mb-3">{cluster.reason}</p>
                  <div className="flex flex-wrap gap-2">
                    {cluster.sampleCareers.map((career, idx) => (
                      <span
                        key={idx}
                        className="bg-cyan-ultra-light text-blue-primary px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-sm text-gray-medium">
                    → Learn more in Session 2
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <hr className="border-t-2 border-gray-medium mb-8" />

          {/* Questions for Mentor */}
          <motion.div
            className="mb-8 bg-cyan-ultra-light rounded-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-2xl font-bold text-gray-dark mb-4">💭 QUESTIONS FOR YOUR MENTOR</h2>
            <ul className="space-y-2 text-gray-dark">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>What surprised you most about your results?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Which interest theme feels most like "you"?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Do any career clusters sound exciting to explore?</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>What's one skill you'd like to develop next?</span>
              </li>
            </ul>
          </motion.div>

          <hr className="border-t-2 border-gray-medium mb-8" />

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Button
              onClick={handleDownload}
              variant="primary"
              disabled={isDownloading}
              icon={<span>📥</span>}
            >
              {isDownloading ? 'Generating PDF...' : 'Download Full Report'}
            </Button>
            <Button onClick={onRestart} variant="secondary" icon={<span>🔄</span>}>
              Revisit Activity
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
