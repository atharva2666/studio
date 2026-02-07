'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Zap, Leaf, Sparkles } from 'lucide-react';

type Theme = 'dark' | 'light' | 'cyber' | 'nature' | 'anime';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('dark');

  const updateTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light', 'cyber', 'nature', 'anime');
    root.classList.add(newTheme);
    setTheme(newTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: newTheme }));
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-12 px-6">
      <div className="glass-morphism p-2 rounded-2xl flex flex-wrap gap-2 justify-center">
        <Button
          variant={theme === 'dark' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => updateTheme('dark')}
          className="rounded-xl gap-2 h-10 px-4"
        >
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline">Neural</span>
        </Button>
        <Button
          variant={theme === 'light' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => updateTheme('light')}
          className="rounded-xl gap-2 h-10 px-4"
        >
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline">Luminous</span>
        </Button>
        <Button
          variant={theme === 'cyber' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => updateTheme('cyber')}
          className="rounded-xl gap-2 h-10 px-4"
        >
          <Zap className="w-4 h-4" />
          <span className="hidden sm:inline">Cyber</span>
        </Button>
        <Button
          variant={theme === 'nature' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => updateTheme('nature')}
          className="rounded-xl gap-2 h-10 px-4"
        >
          <Leaf className="w-4 h-4" />
          <span className="hidden sm:inline">Nature</span>
        </Button>
        <Button
          variant={theme === 'anime' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => updateTheme('anime')}
          className="rounded-xl gap-2 h-10 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-none shadow-lg shadow-pink-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">Anime</span>
        </Button>
      </div>
    </div>
  );
}