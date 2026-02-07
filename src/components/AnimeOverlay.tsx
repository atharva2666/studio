
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
    const generatedLeaves = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 15}s`,
      scale: 0.4 + Math.random() * 0.8,
    }));
    setLeaves(generatedLeaves);
  }, []);

  return (
    <div className="anime-only fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Character Overlays - More prominent and stylized */}
      <div className="absolute bottom-0 left-[-50px] w-[500px] h-[750px] opacity-90 animate-float hidden xl:block translate-y-10">
        {character1 && (
          <div className="relative w-full h-full group">
            <Image 
              src={character1.imageUrl} 
              alt="Anime Guide" 
              fill 
              priority
              className="object-contain drop-shadow-[0_0_50px_rgba(255,105,180,0.6)] saturate-125" 
              data-ai-hint={character1.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent mix-blend-overlay" />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 right-[-50px] w-[500px] h-[750px] opacity-90 animate-float hidden xl:block translate-y-10" style={{ animationDelay: '2.5s' }}>
        {character2 && (
          <div className="relative w-full h-full group">
            <Image 
              src={character2.imageUrl} 
              alt="Anime Tech Specialist" 
              fill 
              priority
              className="object-contain scale-x-[-1] drop-shadow-[0_0_50px_rgba(255,105,180,0.6)] saturate-125" 
              data-ai-hint={character2.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent mix-blend-overlay" />
          </div>
        )}
      </div>

      {/* Floating Sakura Petal Effects - Increased count for better immersion */}
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
