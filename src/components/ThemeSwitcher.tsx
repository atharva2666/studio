
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Zap, Leaf, Sparkles, Binary, Gauge, Heart, Crown, Ghost } from 'lucide-react';

type Theme = 'dark' | 'light' | 'cyber' | 'nature' | 'nebula' | 'matrix' | 'turbo' | 'manga' | 'vogue' | 'phantom';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('turbo');

  const updateTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light', 'cyber', 'nature', 'nebula', 'matrix', 'turbo', 'manga', 'vogue', 'phantom');
    root.classList.add(newTheme);
    setTheme(newTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: newTheme }));
  };

  const themes = [
    { id: 'turbo', icon: <Gauge className="w-3.5 h-3.5" />, label: 'Turbo' },
    { id: 'dark', icon: <Moon className="w-3.5 h-3.5" />, label: 'Neural' },
    { id: 'light', icon: <Sun className="w-3.5 h-3.5" />, label: 'Luminous' },
    { id: 'cyber', icon: <Zap className="w-3.5 h-3.5" />, label: 'Cyber' },
    { id: 'nature', icon: <Leaf className="w-3.5 h-3.5" />, label: 'Nature' },
    { id: 'nebula', icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Nebula' },
    { id: 'matrix', icon: <Binary className="w-3.5 h-3.5" />, label: 'Matrix' },
    { id: 'manga', icon: <Heart className="w-3.5 h-3.5" />, label: 'Manga' },
    { id: 'vogue', icon: <Crown className="w-3.5 h-3.5" />, label: 'Vogue' },
    { id: 'phantom', icon: <Ghost className="w-3.5 h-3.5" />, label: 'Phantom' },
  ];

  return (
    <div className="flex justify-center">
      <div className="glass-morphism p-2 rounded-[2rem] flex flex-wrap gap-1.5 justify-center max-w-4xl border-white/[0.03]">
        {themes.map((t) => (
          <Button
            key={t.id}
            variant={theme === t.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => updateTheme(t.id as Theme)}
            className={`rounded-xl gap-2 h-10 px-4 transition-all duration-500 ${
              theme === t.id ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.icon}
            <span className="text-[10px] font-bold uppercase tracking-widest hidden lg:inline">{t.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
