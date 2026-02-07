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
    <main className="relative min-h-screen bg-background/90 transition-colors duration-500 overflow-x-hidden selection:bg-accent/30">
      <ThreeBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative pt-32 pb-24">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/20 to-transparent blur-[150px] -z-10 rounded-full pointer-events-none opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-accent/20 to-transparent blur-[150px] -z-10 rounded-full pointer-events-none opacity-60" />
        
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">
          <Badge className="mb-8 bg-primary/20 backdrop-blur-md shadow-lg border-primary/30 text-primary-foreground px-5 py-2.5 rounded-full font-black uppercase tracking-[0.3em] text-[9px] sm:text-[11px]">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse mr-3 inline-block shadow-[0_0_15px_#4ade80]"></span>
            System Status: Overclocked
          </Badge>
          
          <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-headline font-black leading-[0.85] tracking-tighter mb-10 hero-text-glow">
            ATHARVA<br />
            <span className="text-transparent bg-clip-text vibrant-gradient">BHATNAGAR</span>
          </h1>
          
          <div className="mt-8 sm:mt-12 relative z-10 max-w-4xl">
            <PersonalizedIntro />
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-0 bottom-1/4 hidden xl:block animate-float opacity-[0.05] pointer-events-none select-none">
          <span className="text-[25rem] font-black text-white leading-none">AI</span>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-all cursor-pointer z-20" 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-primary">Initialize Sequence</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-primary via-accent to-transparent rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects" className="bg-black/40 backdrop-blur-md border-y border-white/10 relative z-10">
        <ProjectShowcase />
      </div>

      {/* Terminal Section */}
      <div id="terminal" className="relative z-10 py-12 px-4">
        <InteractiveExperience />
      </div>

      {/* Philosophy Section */}
      <section className="py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
          <div className="relative group">
            <div className="absolute -top-16 -left-16 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse opacity-50" />
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-headline font-black leading-[1] tracking-tighter relative hero-text-glow">
              CODING<br />
              <span className="text-accent italic">AS ART.</span><br />
              <span className="text-primary">ROBOTS</span><br />
              <span className="text-white">AS REALITY.</span>
            </h2>
          </div>
          
          <div className="relative">
            <div className="glass-morphism p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border-white/10 shadow-2xl relative z-10 hover:shadow-primary/20 transition-all duration-500 group">
              <div className="absolute inset-0 bg-primary/5 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-lg sm:text-2xl leading-relaxed text-slate-300 mb-12 font-medium relative z-10">
                Engineering isn&apos;t just about logic—it&apos;s about orchestration. I build systems where neural algorithms meet mechanical precision.
              </p>
              <div className="grid grid-cols-2 gap-6 sm:gap-8 relative z-10">
                <div className="space-y-2">
                  <h4 className="text-3xl sm:text-5xl font-headline font-black text-primary neon-glow">99.9%</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Precision Target</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-3xl sm:text-5xl font-headline font-black text-accent neon-glow">0.05ms</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Response Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-24 border-t border-white/10 text-center bg-black/60 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-8">
            <div className="text-3xl font-headline font-black tracking-tighter flex items-center gap-3">
              <div className="w-10 h-10 vibrant-gradient rounded-xl shadow-lg rotate-12 group hover:rotate-0 transition-transform cursor-pointer" />
              ATHARVA<span className="text-accent">.AI</span>
            </div>
            <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full" />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
              Architected by Atharva Bhatnagar &copy; 2025
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}