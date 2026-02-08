'use client';

import React, { useState, useEffect } from 'react';
import { generatePersonalizedIntro } from '@/ai/flows/generate-personalized-intro';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, LayoutGrid, Zap } from 'lucide-react';

export default function PersonalizedIntro() {
  const [intro, setIntro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchIntro = async () => {
    setLoading(true);
    try {
      const result = await generatePersonalizedIntro({
        name: 'Atharva Bhatnagar',
        interests: 'High-Performance Computing, AI Agents, Robotic Precision Engineering',
        projects: 'Olivia AI, Neural Systems, Advanced Robotics v6'
      });
      setIntro(result.intro);
    } catch (error) {
      setIntro("Specialized engineer architecting high-performance systems. Currently focused on the intersection of generative AI and precision robotics to build scalable future technologies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntro();
  }, []);

  return (
    <div className="w-full">
      <div className="relative min-h-[140px] flex items-center mb-12">
        {loading ? (
          <div className="space-y-4 w-full">
            <Skeleton className="h-8 w-full bg-primary/5" />
            <Skeleton className="h-8 w-[90%] bg-primary/5" />
            <Skeleton className="h-8 w-[70%] bg-primary/5" />
          </div>
        ) : (
          <p className="text-xl md:text-3xl lg:text-4xl text-foreground/80 leading-relaxed font-headline font-medium animate-in fade-in slide-in-from-left-4 duration-1000 tracking-tight">
            {intro}
          </p>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button 
          variant="default" 
          className="bg-primary hover:bg-primary/80 text-white rounded-xl px-8 h-14 text-sm font-bold tracking-widest uppercase transition-all duration-500 group"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Explore Work
          <LayoutGrid className="ml-3 w-4 h-4 opacity-70 group-hover:scale-110 transition-transform" />
        </Button>
        <Button 
          variant="outline" 
          className="rounded-xl px-8 h-14 text-sm font-bold tracking-widest uppercase border-primary/10 bg-white/5 hover:bg-primary/5 text-primary transition-all duration-500 group"
          onClick={fetchIntro}
          disabled={loading}
        >
          {loading ? "Optimizing..." : "Sync Bio"}
          <Zap className={`ml-3 w-4 h-4 ${loading ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
        </Button>
      </div>
    </div>
  );
}