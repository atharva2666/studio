
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
  const [isAnime, setIsAnime] = useState(false);

  useEffect(() => {
    // Check theme status and listen for changes
    const checkTheme = () => {
      setIsAnime(document.documentElement.classList.contains('anime'));
    };
    
    checkTheme();
    window.addEventListener('theme-change', checkTheme);

    // Generate leaf properties
    const generatedLeaves = Array.from({ length: 25 }).map(() => ({
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 8}s`,
      duration: `${12 + Math.random() * 18}s`,
      scale: 0.6 + Math.random() * 1.2,
    }));
    setLeaves(generatedLeaves);

    return () => window.removeEventListener('theme-change', checkTheme);
  }, []);

  if (!isAnime) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
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
