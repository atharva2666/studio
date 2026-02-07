
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
  const characterTopLeft = PlaceHolderImages.find(img => img.id === 'anime-character-top-left');
  const characterTopRight = PlaceHolderImages.find(img => img.id === 'anime-character-top-right');

  useEffect(() => {
    // Generate leaf properties only on the client to avoid hydration mismatch
    const generatedLeaves = Array.from({ length: 25 }).map(() => ({
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 5}s`,
      duration: `${12 + Math.random() * 18}s`,
      scale: 0.3 + Math.random() * 0.7,
    }));
    setLeaves(generatedLeaves);
  }, []);

  return (
    <div className="anime-only fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Top Corner Peeking Characters */}
      <div className="absolute top-[-20px] left-[-30px] w-[300px] h-[450px] opacity-80 animate-float pointer-events-none transition-all duration-1000">
        {characterTopLeft && (
          <div className="relative w-full h-full rotate-12">
            <Image 
              src={characterTopLeft.imageUrl} 
              alt="Anime Top Left" 
              fill 
              priority
              className="object-contain drop-shadow-[0_0_30px_rgba(255,105,180,0.4)]" 
              data-ai-hint={characterTopLeft.imageHint}
            />
          </div>
        )}
      </div>

      <div className="absolute top-[-20px] right-[-30px] w-[300px] h-[450px] opacity-80 animate-float pointer-events-none transition-all duration-1000" style={{ animationDelay: '1.5s' }}>
        {characterTopRight && (
          <div className="relative w-full h-full -rotate-12">
            <Image 
              src={characterTopRight.imageUrl} 
              alt="Anime Top Right" 
              fill 
              priority
              className="object-contain scale-x-[-1] drop-shadow-[0_0_30px_rgba(255,105,180,0.4)]" 
              data-ai-hint={characterTopRight.imageHint}
            />
          </div>
        )}
      </div>

      {/* Bottom Side Overlays */}
      <div className="absolute bottom-[-100px] left-[-80px] w-[450px] h-[650px] opacity-90 animate-float hidden xl:block translate-y-10 transition-all duration-1000">
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
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent mix-blend-overlay" />
          </div>
        )}
      </div>

      <div className="absolute bottom-[-100px] right-[-80px] w-[450px] h-[650px] opacity-90 animate-float hidden xl:block translate-y-10 transition-all duration-1000" style={{ animationDelay: '3s' }}>
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
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent mix-blend-overlay" />
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
