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
      {/* Floating Sakura Petal Effects - Background Atmosphere */}
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
