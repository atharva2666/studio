'use client';

import Navbar from '@/components/Navbar';
import ThreeBackground from '@/components/ThreeBackground';
import PersonalizedIntro from '@/components/PersonalizedIntro';
import ProjectShowcase from '@/components/ProjectShowcase';
import InteractiveExperience from '@/components/InteractiveExperience';
import Contact from '@/components/Contact';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Badge } from '@/components/ui/badge';
import { Cpu, ArrowDown, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-primary/30 overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-12 relative z-10 pointer-events-none">
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 relative pointer-events-auto">
          
          <Badge className="mb-10 bg-primary/10 text-primary border-primary/20 px-6 py-2 rounded-full font-bold tracking-[0.4em] text-[10px] flex w-fit items-center gap-3 backdrop-blur-md animate-float">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <Sparkles className="w-3 h-3" />
            <span>NEURAL ENGINE ACTIVE</span>
          </Badge>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-16">
            <div className="flex-1">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-headline font-black leading-[0.85] tracking-tighter mb-14 text-gradient">
                Building<br />
                The Future<br />
                <span className="text-primary/70 italic">Today.</span>
              </h1>
            </div>
          </div>
          
          <div className="mt-12 max-w-4xl">
            <PersonalizedIntro />
          </div>
        </div>

        <div 
          className="absolute bottom-12 left-6 md:left-12 flex items-center gap-6 opacity-40 hover:opacity-100 transition-all cursor-pointer group pointer-events-auto"
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/5 group-hover:border-primary/40 transition-all duration-500">
            <ArrowDown className="w-5 h-5 text-foreground group-hover:translate-y-1 transition-transform" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-foreground/60 group-hover:text-primary transition-colors">Initialize Sequence</span>
        </div>
      </section>

      <div id="projects" className="py-24 relative z-10 bg-background/50 backdrop-blur-sm border-y border-foreground/[0.03]">
        <ProjectShowcase />
      </div>

      <div id="terminal" className="py-24 relative z-10">
        <InteractiveExperience />
      </div>

      <div className="relative z-10">
        <Contact />
      </div>

      <footer className="py-24 border-t border-foreground/[0.03] bg-background/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
          
          <div className="flex flex-col items-center gap-6">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Select Environment Protocol</span>
             <ThemeSwitcher />
          </div>

          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-headline font-black tracking-tighter">
              ATHARVA<span className="text-primary/70">.AI</span>
            </span>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-[11px] font-black uppercase tracking-[0.6em]">
              © 2025 // Production Alpha 5.0.0
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}