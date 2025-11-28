'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { InterestCard as InterestCardType } from '@/lib/types';

interface InterestCardProps {
  card: InterestCardType;
  isPlaced?: boolean;
}

export const InterestCard: React.FC<InterestCardProps> = ({ card, isPlaced = false }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id.toString(),
    data: card,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`interest-card ${isDragging ? 'dragging' : ''} ${
        isPlaced ? 'opacity-50' : ''
      } flex flex-col items-center justify-center gap-2 select-none`}
      tabIndex={0}
      role="button"
      aria-label={`Interest card: ${card.label}. Press Enter to sort.`}
    >
      <div className="text-4xl">{card.emoji}</div>
      <div className="text-sm font-semibold text-center text-gray-dark leading-tight">
        {card.label}
      </div>
    </div>
  );
};
