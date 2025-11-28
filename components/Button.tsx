'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  pulse?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  icon,
  pulse = false,
}) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const pulseClass = pulse ? 'pulse-animation' : '';

  return (
    <motion.button
      className={`${baseClass} ${pulseClass} ${className} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};
