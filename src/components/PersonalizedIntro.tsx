'use client';

import React, { useState, useEffect } from 'react';
import { generatePersonalizedIntro } from '@/ai/flows/generate-personalized-intro';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Layers, Cpu, Sparkles } from 'lucide-react';

export default function PersonalizedIntro() {
  const [intro, setIntro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchIntro = async () => {
    setLoading(true);
    try {
      const result = await generatePersonalizedIntro({
        name: 'Atharva Bhatnagar',
        interests: 'Coding, Robotics, Artificial Intelligence, High-Precision Engineering',
        projects: 'Olivia AI, Neural Link Systems, Advanced Robotics Frameworks'
      });
      setIntro(result.intro);
    } catch (error) {
      setIntro("Passionate engineer building the intersection of AI and robotics. Architecting Olivia AI and pushing limits with high-performance neural computing and robotic precision.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntro();
  }, []);

  return (
    <div className="max-w-4xl px-4 md:px-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
          <Cpu className="w-5 h-5 text-primary animate-pulse" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/80 flex items-center gap-2">
          <Sparkles className="w-3 h-3" /> Neural Synthesis Online
        </span>
      </div>
      
      <div className="relative min-h-[140px] md:min-h-[160px] flex items-center mb-16">
        {loading ? (
          <div className="space-y-6 w-full">
            <Skeleton className="h-10 w-full bg-primary/5" />
            <Skeleton className="h-10 w-[95%] bg-primary/5" />
            <Skeleton className="h-10 w-[80%] bg-primary/5" />
          </div>
        ) : (
          <p className="text-2xl md:text-4xl lg:text-5xl text-white leading-[1.15] font-headline font-bold animate-in fade-in slide-in-from-left-4 duration-1000 tracking-tight">
            {intro}
          </p>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-5">
        <Button 
          variant="default" 
          className="bg-primary hover:bg-primary/80 text-white rounded-2xl px-10 h-20 text-xl font-headline font-bold shadow-[0_20px_40px_-10px_rgba(168,85,247,0.4)] transition-all group"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View Deployments
          <Layers className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Button>
        <Button 
          variant="outline" 
          className="rounded-2xl px-10 h-20 text-xl font-headline font-bold border-2 border-primary/20 bg-white/5 backdrop-blur-md hover:bg-primary/10 text-primary transition-all group"
          onClick={fetchIntro}
          disabled={loading}
        >
          {loading ? "Syncing..." : "Regenerate Bio"}
          <RefreshCw className={`ml-3 w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
        </Button>
      </div>
    </div>
  );
}