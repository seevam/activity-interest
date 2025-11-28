'use client';

import React, { useEffect, useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { InterestCard } from '../InterestCard';
import { DropZone } from '../DropZone';
import { Button } from '../Button';
import { ProgressBar } from '../ProgressBar';
import { useActivityStore } from '@/lib/store';
import { interestCards } from '@/lib/data';
import { InterestCard as InterestCardType } from '@/lib/types';

interface CardSortingScreenProps {
  onComplete: () => void;
}

export const CardSortingScreen: React.FC<CardSortingScreenProps> = ({ onComplete }) => {
  const { cardPlacements, placeCard, progress } = useActivityStore();
  const [activeCard, setActiveCard] = useState<InterestCardType | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const unplacedCards = interestCards.filter((card) => !cardPlacements.has(card.id));
  const energizesCards = interestCards.filter(
    (card) => cardPlacements.get(card.id) === 'energizes'
  );
  const curiousCards = interestCards.filter((card) => cardPlacements.get(card.id) === 'curious');
  const notForMeCards = interestCards.filter(
    (card) => cardPlacements.get(card.id) === 'notForMe'
  );

  const totalCards = 25;
  const sortedCards = cardPlacements.size;
  const isComplete = sortedCards === totalCards;

  useEffect(() => {
    if (isComplete && !showCelebration) {
      setShowCelebration(true);
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFF100', '#006BFF', '#08C2FF'],
      });
    }
  }, [isComplete, showCelebration]);

  const handleDragStart = (event: DragStartEvent) => {
    const card = interestCards.find((c) => c.id.toString() === event.active.id);
    setActiveCard(card || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (over && (over.id === 'energizes' || over.id === 'curious' || over.id === 'notForMe')) {
      const cardId = parseInt(active.id.toString());
      placeCard(cardId, over.id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-light">
      {/* Header with progress */}
      <div className="bg-white p-4 md:p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <ProgressBar progress={progress} />
            </div>
            <div className="ml-4 text-sm font-semibold text-gray-dark">
              Sorted: {sortedCards}/{totalCards}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {/* Unplaced cards area */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-dark mb-4">
                YOUR INTEREST CARDS {unplacedCards.length > 0 && '(Drag to a zone below)'}
              </h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {unplacedCards.map((card) => (
                  <InterestCard key={card.id} card={card} />
                ))}
              </div>
              {unplacedCards.length === 0 && (
                <div className="text-center text-gray-medium text-lg py-8">
                  ✨ All cards sorted! Great job!
                </div>
              )}
            </div>

            {/* Drop zones */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-dark mb-4">DROP ZONES</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DropZone id="energizes" title="Energizes Me!" emoji="🔥" count={energizesCards.length}>
                  {energizesCards.map((card) => (
                    <InterestCard key={card.id} card={card} isPlaced />
                  ))}
                </DropZone>

                <DropZone id="curious" title="Curious About" emoji="🤔" count={curiousCards.length}>
                  {curiousCards.map((card) => (
                    <InterestCard key={card.id} card={card} isPlaced />
                  ))}
                </DropZone>

                <DropZone id="notForMe" title="Not For Me" emoji="😐" count={notForMeCards.length}>
                  {notForMeCards.map((card) => (
                    <InterestCard key={card.id} card={card} isPlaced />
                  ))}
                </DropZone>
              </div>
            </div>

            {/* Drag overlay */}
            <DragOverlay>
              {activeCard ? <InterestCard card={activeCard} /> : null}
            </DragOverlay>
          </DndContext>

          {/* Celebration and continue button */}
          {isComplete && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <p className="text-2xl font-bold text-green-success mb-2">
                  🎉 Amazing! You sorted all 25 interests!
                </p>
                <p className="text-lg text-gray-dark">Ready to dive deeper?</p>
              </div>
              <Button onClick={onComplete} variant="primary" pulse>
                Continue to Scenarios →
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
