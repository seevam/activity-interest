'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DropZoneProps {
  id: 'energizes' | 'curious' | 'notForMe';
  title: string;
  emoji: string;
  count: number;
  children?: React.ReactNode;
}

export const DropZone: React.FC<DropZoneProps> = ({ id, title, emoji, count, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const zoneClass = `drop-zone ${id} ${isOver ? 'drag-over' : ''}`;

  return (
    <div
      ref={setNodeRef}
      className={zoneClass}
      role="region"
      aria-label={`${title} zone. Drop cards here. Currently contains ${count} items.`}
    >
      <div className="text-center mb-4">
        <div className="text-3xl mb-2">{emoji}</div>
        <h3 className="text-xl font-bold text-white drop-shadow-lg">{title}</h3>
        <div className="text-white text-sm mt-2 font-semibold">{count} items</div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center min-h-[120px]">{children}</div>
    </div>
  );
};
