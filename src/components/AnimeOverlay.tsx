'use client';

import React, { useState, useEffect } from 'react';

interface LeafProps {
  left: string;
  delay: string;
  duration: string;
  scale: number;
}

export default function AnimeOverlay() {
  const [leaves, setLeaves] = useState<LeafProps[]>([]);

  useEffect(() => {
    // Generate leaf properties only on the client to avoid hydration mismatch
    const generatedLeaves = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 15}s`,
      scale: 0.5 + Math.random() * 0.8,
    }));
    setLeaves(generatedLeaves);
  }, []);

  return (
    <div className="anime-only fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Custom Animated Waving Mascot - Peeking from top right */}
      <div className="absolute top-0 right-4 md:right-12 w-32 h-32 md:w-48 md:h-48 flex flex-col items-center">
        <div className="relative w-full h-full">
          {/* Stylized SVG Anime Mascot */}
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-full filter drop-shadow-[0_0_15px_rgba(255,105,180,0.6)]"
          >
            {/* Head */}
            <circle cx="100" cy="80" r="50" fill="#fff" stroke="#ffb7c5" strokeWidth="4" />
            {/* Ears */}
            <path d="M60 40 L80 60 L40 60 Z" fill="#ffb7c5" />
            <path d="M140 40 L120 60 L160 60 Z" fill="#ffb7c5" />
            {/* Eyes */}
            <circle cx="85" cy="80" r="6" fill="#ff69b4" className="animate-pulse" />
            <circle cx="115" cy="80" r="6" fill="#ff69b4" className="animate-pulse" />
            {/* Blushing */}
            <circle cx="75" cy="95" r="8" fill="#ffb7c5" opacity="0.4" />
            <circle cx="125" cy="95" r="8" fill="#ffb7c5" opacity="0.4" />
            {/* Smile */}
            <path d="M90 100 Q100 110 110 100" fill="none" stroke="#ff69b4" strokeWidth="3" strokeLinecap="round" />
            
            {/* Waving Arm */}
            <g className="animate-wave" style={{ transformOrigin: '150px 140px' }}>
              <path 
                d="M150 140 Q170 110 180 80" 
                fill="none" 
                stroke="#fff" 
                strokeWidth="12" 
                strokeLinecap="round" 
              />
              <path 
                d="M150 140 Q170 110 180 80" 
                fill="none" 
                stroke="#ffb7c5" 
                strokeWidth="6" 
                strokeLinecap="round" 
              />
              {/* Paw/Hand */}
              <circle cx="180" cy="80" r="10" fill="#fff" stroke="#ffb7c5" strokeWidth="3" />
            </g>

            {/* Body (simplified) */}
            <path d="M70 130 Q100 170 130 130" fill="#fff" stroke="#ffb7c5" strokeWidth="4" />
          </svg>

          {/* Speech Bubble */}
          <div className="absolute top-0 -left-16 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border-2 border-pink-400 shadow-lg animate-bounce">
            <span className="text-pink-600 font-black text-[10px] tracking-tight whitespace-nowrap">HI THERE! ^_^</span>
          </div>
        </div>
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
