'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Zap, Leaf, Sparkles, Binary } from 'lucide-react';

type Theme = 'dark' | 'light' | 'cyber' | 'nature' | 'nebula' | 'matrix';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('dark');

  const updateTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light', 'cyber', 'nature', 'nebula', 'matrix');
    root.classList.add(newTheme);
    setTheme(newTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: newTheme }));
  };

  const themes = [
    { id: 'dark', icon: <Moon className="w-3.5 h-3.5" />, label: 'Neural' },
    { id: 'light', icon: <Sun className="w-3.5 h-3.5" />, label: 'Luminous' },
    { id: 'cyber', icon: <Zap className="w-3.5 h-3.5" />, label: 'Cyber' },
    { id: 'nature', icon: <Leaf className="w-3.5 h-3.5" />, label: 'Nature' },
    { id: 'nebula', icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Nebula' },
    { id: 'matrix', icon: <Binary className="w-3.5 h-3.5" />, label: 'Matrix' },
  ];

  return (
    <div className="flex justify-center">
      <div className="glass-morphism p-1.5 rounded-2xl flex flex-wrap gap-1 justify-center max-w-3xl border-white/[0.03]">
        {themes.map((t) => (
          <Button
            key={t.id}
            variant={theme === t.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => updateTheme(t.id as Theme)}
            className={`rounded-xl gap-2 h-9 px-4 transition-all duration-500 ${
              theme === t.id ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.icon}
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">{t.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}