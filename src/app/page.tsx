'use client';

import Navbar from '@/components/Navbar';
import ThreeBackground from '@/components/ThreeBackground';
import PersonalizedIntro from '@/components/PersonalizedIntro';
import ProjectShowcase from '@/components/ProjectShowcase';
import InteractiveExperience from '@/components/InteractiveExperience';
import Contact from '@/components/Contact';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background/40 selection:bg-accent selection:text-white transition-colors duration-500 overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto relative pt-32 pb-24">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-accent/5 to-transparent blur-[120px] -z-10 rounded-full pointer-events-none" />
        
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">
          <Badge className="mb-8 bg-white/50 backdrop-blur-sm shadow-sm border-primary/10 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.25em] text-[10px]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2 inline-block"></span>
            System Online: Intelligent Engineering
          </Badge>
          
          <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-headline font-black leading-[0.9] tracking-tighter mb-10 drop-shadow-sm">
            ATHARVA<br />
            <span className="text-primary">BHATNAGAR</span>
          </h1>
          
          <div className="mt-12 relative z-10 max-w-4xl">
            <PersonalizedIntro />
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-0 bottom-1/4 hidden xl:block animate-float opacity-5 pointer-events-none select-none">
          <span className="text-[18rem] font-black text-primary leading-none">CORE</span>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer z-20" 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[9px] uppercase tracking-[0.5em] font-black text-slate-500">Scroll</span>
          <div className="w-[1.5px] h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects" className="bg-white/40 backdrop-blur-md border-y border-primary/5 relative z-10">
        <ProjectShowcase />
      </div>

      {/* Terminal Section */}
      <div id="terminal" className="relative z-10 py-12">
        <InteractiveExperience />
      </div>

      {/* Philosophy Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -top-16 -left-16 w-80 h-80 bg-accent/5 rounded-full blur-[120px] animate-pulse" />
            <h2 className="text-5xl md:text-8xl font-headline font-black leading-[1] tracking-tighter relative">
              CODING<br />
              <span className="text-primary italic">AS ART.</span><br />
              <span className="text-accent">ROBOTS</span><br />
              <span className="text-foreground">AS REALITY.</span>
            </h2>
          </div>
          
          <div className="relative">
            <div className="glass-morphism p-12 rounded-[3rem] bg-white/50 border-white/40 shadow-2xl relative z-10 hover:shadow-primary/5 transition-all duration-500">
              <p className="text-xl md:text-2xl leading-relaxed text-slate-700 mb-12 font-medium">
                My approach to engineering transcends traditional boundaries. I orchestrate complex systems where digital neurons meet physical actuators, creating life from logic.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="text-4xl md:text-5xl font-headline font-black text-primary">99.9%</h4>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Model Precision</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl md:text-5xl font-headline font-black text-accent">0.05ms</h4>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Kernel Latency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact" className="relative bg-white/20 z-10">
        <div className="absolute inset-0 bg-primary/[0.01] pointer-events-none" />
        <Contact />
      </div>

      {/* Footer */}
      <footer className="py-24 border-t border-primary/5 text-center bg-white/60 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-8">
            <div className="text-3xl font-headline font-black tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg" />
              ATHARVA<span className="text-accent">.AI</span>
            </div>
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
              Architected by Atharva Bhatnagar &copy; 2024
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}