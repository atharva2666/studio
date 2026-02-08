'use client';

import Navbar from '@/components/Navbar';
import ThreeBackground from '@/components/ThreeBackground';
import PersonalizedIntro from '@/components/PersonalizedIntro';
import ProjectShowcase from '@/components/ProjectShowcase';
import InteractiveExperience from '@/components/InteractiveExperience';
import Contact from '@/components/Contact';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import TelemetryChart from '@/components/TelemetryChart';
import { Badge } from '@/components/ui/badge';
import { Cpu, ArrowDown, Activity, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-primary/20 overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-24 pb-12 relative z-10">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <div className="flex items-center gap-4 mb-8">
            <Badge className="bg-primary/5 text-primary border-primary/10 px-4 py-1.5 rounded-full font-bold tracking-[0.3em] text-[9px] flex items-center gap-2 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              CORE PROTOCOL v6.0.0
            </Badge>
            <div className="hidden sm:flex items-center gap-2 text-[9px] font-bold tracking-widest text-muted-foreground opacity-60">
              <ShieldCheck className="w-3 h-3" />
              SYSTEM SECURE
            </div>
          </div>
          
          <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-12">
            <div className="flex-1 space-y-10">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-headline font-black leading-[0.9] tracking-tighter text-gradient">
                Design.<br />
                Code.<br />
                <span className="text-primary/60">Scale.</span>
              </h1>
              
              <div className="max-w-3xl">
                <PersonalizedIntro />
              </div>
            </div>
            
            {/* Minimal Telemetry Widget */}
            <div className="hidden xl:block w-[380px] glass-morphism p-10 rounded-[2rem] border-none mt-8">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                    <Activity className="w-3 h-3 text-primary" /> Logic Engine
                  </span>
                  <p className="text-[9px] text-muted-foreground/40 font-mono">NODE_CLUSTER_01</p>
                </div>
                <Badge variant="outline" className="text-[9px] border-primary/10 text-primary/60 px-2 py-0">STABLE</Badge>
              </div>
              <TelemetryChart />
            </div>
          </div>
        </div>

        <div 
          className="absolute bottom-12 left-6 md:left-12 flex items-center gap-6 opacity-30 hover:opacity-100 transition-all cursor-pointer group"
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/5 transition-all duration-300">
            <ArrowDown className="w-4 h-4 text-foreground group-hover:translate-y-1 transition-transform" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/50 group-hover:text-primary transition-colors">Jump to Deployment</span>
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects" className="py-32 relative z-10 bg-background/30 backdrop-blur-sm border-y border-foreground/[0.02]">
        <ProjectShowcase />
      </div>

      {/* Terminal Section */}
      <div id="terminal" className="py-32 relative z-10">
        <InteractiveExperience />
      </div>

      {/* Contact Section */}
      <div className="relative z-10">
        <Contact />
      </div>

      {/* Footer */}
      <footer className="py-24 border-t border-foreground/[0.02] bg-background/60 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-16">
          
          <div className="flex flex-col items-center gap-4">
             <span className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/60">System Environment</span>
             <ThemeSwitcher />
          </div>

          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-headline font-black tracking-tighter">
              ATHARVA<span className="text-primary/60">.AI</span>
            </span>
          </div>
          
          <p className="text-muted-foreground/40 text-[10px] font-bold uppercase tracking-[0.5em]">
            © 2025 // Production Stable 6.0.0
          </p>
        </div>
      </footer>
    </main>
  );
}