
'use client';

import React, { useState, useEffect } from 'react';
import { generatePersonalizedIntro } from '@/ai/flows/generate-personalized-intro';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, RefreshCw, Layers, Cpu } from 'lucide-react';

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
      setIntro("Passionate creator focused on building the future of AI and Robotics. I specialize in developing intelligent systems like Olivia AI and pushing the boundaries of machine learning through rigorous testing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntro();
  }, []);

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
          <Cpu className="w-4 h-4 text-primary animate-pulse" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">Neural Synthesis Engine</span>
      </div>
      
      <div className="relative min-h-[160px] md:min-h-[140px] flex items-center">
        {loading ? (
          <div className="space-y-4 w-full">
            <Skeleton className="h-8 w-full bg-primary/5" />
            <Skeleton className="h-8 w-[92%] bg-primary/5" />
            <Skeleton className="h-8 w-[78%] bg-primary/5" />
          </div>
        ) : (
          <p className="text-xl md:text-3xl lg:text-4xl text-slate-800 leading-tight font-headline font-medium animate-in fade-in slide-in-from-left-2 duration-1000">
            {intro}
          </p>
        )}
      </div>
      
      <div className="mt-12 flex flex-wrap gap-4">
        <Button 
          variant="default" 
          className="bg-primary hover:bg-slate-900 text-white rounded-full px-8 h-16 text-lg font-headline font-bold shadow-2xl shadow-primary/10 group transition-all"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View Deployments
          <Layers className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
        </Button>
        <Button 
          variant="outline" 
          className="rounded-full px-8 h-16 text-lg font-headline font-bold border-2 border-primary/10 bg-white/40 hover:bg-white hover:border-primary text-primary transition-all group"
          onClick={fetchIntro}
          disabled={loading}
        >
          {loading ? "Processing..." : "Sync Bio"}
          <RefreshCw className={`ml-2 w-4 h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
        </Button>
      </div>
    </div>
  );
}
