'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, showPercentage = false }) => {
  return (
    <div className="w-full">
      <div className="progress-container">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-dark text-center mt-2">
          {Math.round(progress)}% Complete
        </div>
      )}
    </div>
  );
};
