'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AnimeOverlay() {
  const character1 = PlaceHolderImages.find(img => img.id === 'anime-character-1');
  const character2 = PlaceHolderImages.find(img => img.id === 'anime-character-2');

  return (
    <div className="anime-only fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Character Overlays */}
      <div className="absolute bottom-0 left-0 w-[450px] h-[650px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-float hidden lg:block">
        {character1 && (
          <div className="relative w-full h-full">
            <Image 
              src={character1.imageUrl} 
              alt="Anime Guide" 
              fill 
              className="object-contain drop-shadow-[0_0_30px_rgba(255,105,180,0.4)]" 
              data-ai-hint={character1.imageHint}
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 right-0 w-[450px] h-[650px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
        {character2 && (
          <div className="relative w-full h-full">
            <Image 
              src={character2.imageUrl} 
              alt="Anime Tech Specialist" 
              fill 
              className="object-contain scale-x-[-1] drop-shadow-[0_0_30px_rgba(255,105,180,0.4)]" 
              data-ai-hint={character2.imageHint}
            />
          </div>
        )}
      </div>

      {/* Anime Theme Floating Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
    </div>
  );
}
