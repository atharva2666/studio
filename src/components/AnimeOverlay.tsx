'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface LeafProps {
  left: string;
  delay: string;
  duration: string;
  scale: number;
}

export default function AnimeOverlay() {
  const [leaves, setLeaves] = useState<LeafProps[]>([]);
  const character1 = PlaceHolderImages.find(img => img.id === 'anime-character-1');
  const character2 = PlaceHolderImages.find(img => img.id === 'anime-character-2');

  useEffect(() => {
    // Generate leaf properties only on the client to avoid hydration mismatch
    const generatedLeaves = Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 20}s`,
      scale: 0.5 + Math.random(),
    }));
    setLeaves(generatedLeaves);
  }, []);

  return (
    <div className="anime-only fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Character Overlays */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[600px] opacity-80 animate-float hidden lg:block translate-y-20">
        {character1 && (
          <div className="relative w-full h-full">
            <Image 
              src={character1.imageUrl} 
              alt="Anime Guide" 
              fill 
              className="object-contain drop-shadow-[0_0_30px_rgba(255,105,180,0.5)]" 
              data-ai-hint={character1.imageHint}
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[600px] opacity-80 animate-float hidden lg:block translate-y-20" style={{ animationDelay: '3s' }}>
        {character2 && (
          <div className="relative w-full h-full">
            <Image 
              src={character2.imageUrl} 
              alt="Anime Tech Specialist" 
              fill 
              className="object-contain scale-x-[-1] drop-shadow-[0_0_30px_rgba(255,105,180,0.5)]" 
              data-ai-hint={character2.imageHint}
            />
          </div>
        )}
      </div>

      {/* Floating Sakura Petal Effects */}
      <div className="absolute inset-0">
        {leaves.map((leaf, i) => (
          <div 
            key={i} 
            className="sakura-leaf" 
            style={{
              left: leaf.left,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
              transform: `scale(${leaf.scale})`
            }}
          />
        ))}
      </div>
    </div>
  );
}
