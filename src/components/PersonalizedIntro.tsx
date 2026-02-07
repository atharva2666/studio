
'use client';

import React, { useState, useEffect } from 'react';
import { generatePersonalizedIntro } from '@/ai/flows/generate-personalized-intro';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function PersonalizedIntro() {
  const [intro, setIntro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchIntro = async () => {
    setLoading(true);
    try {
      const result = await generatePersonalizedIntro({
        name: 'Atharva Bhatnagar',
        interests: 'Coding, Robotics, Artificial Intelligence, 3D Animation',
        projects: 'Olivia AI, AI Testing Initiatives, Neural Network Experiments'
      });
      setIntro(result.intro);
    } catch (error) {
      console.error('Failed to generate intro', error);
      setIntro("Passionate creator focused on building the future of AI and Robotics. I specialize in developing intelligent systems like Olivia AI and pushing the boundaries of machine learning through rigorous testing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntro();
  }, []);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Neural Bio Synthesis</span>
      </div>
      
      <div className="relative min-h-[120px]">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-full bg-primary/5" />
            <Skeleton className="h-6 w-[90%] bg-primary/5" />
            <Skeleton className="h-6 w-[75%] bg-primary/5" />
          </div>
        ) : (
          <p className="text-2xl md:text-3xl lg:text-4xl text-slate-900 leading-tight font-headline font-medium animate-in fade-in slide-in-from-left-4 duration-700">
            {intro}
          </p>
        )}
      </div>
      
      <div className="mt-12 flex flex-wrap gap-4">
        <Button 
          variant="default" 
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-16 text-lg font-headline font-bold shadow-2xl shadow-primary/20 group transition-all"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Explore Work
          <Layers className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
        </Button>
        <Button 
          variant="outline" 
          className="rounded-full px-10 h-16 text-lg font-headline font-bold border-2 border-primary/10 bg-white/50 hover:bg-white hover:border-primary text-primary transition-all group"
          onClick={fetchIntro}
          disabled={loading}
        >
          {loading ? "Synthesizing..." : "Regenerate Bio"}
          <RefreshCw className={`ml-2 w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
        </Button>
      </div>
    </div>
  );
}
