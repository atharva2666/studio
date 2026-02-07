
'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AnimeOverlay() {
  const character1 = PlaceHolderImages.find(img => img.id === 'anime-character-1');
  const character2 = PlaceHolderImages.find(img => img.id === 'anime-character-2');

  return (
    <div className="anime-only fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Floating Sakura Particles (CSS handled) */}
      <div className="sakura-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="sakura-petal" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }} />
        ))}
      </div>

      {/* Character Overlays */}
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[600px] opacity-40 hover:opacity-100 transition-opacity duration-700 animate-float hidden lg:block">
        {character1 && (
          <Image 
            src={character1.imageUrl} 
            alt="Anime Guide" 
            fill 
            className="object-contain" 
            data-ai-hint={character1.imageHint}
          />
        )}
      </div>

      <div className="absolute -bottom-20 -right-20 w-[400px] h-[600px] opacity-40 hover:opacity-100 transition-opacity duration-700 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
        {character2 && (
          <Image 
            src={character2.imageUrl} 
            alt="Anime Tech Specialist" 
            fill 
            className="object-contain scale-x-[-1]" 
            data-ai-hint={character2.imageHint}
          />
        )}
      </div>
    </div>
  );
}
