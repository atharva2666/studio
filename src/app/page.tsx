
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
    <main className="relative min-h-screen bg-background/90 transition-colors duration-500 overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto relative pt-32 pb-24">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/10 to-transparent blur-[120px] -z-10 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-accent/10 to-transparent blur-[120px] -z-10 rounded-full pointer-events-none" />
        
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">
          <Badge className="mb-8 bg-primary/10 backdrop-blur-sm shadow-lg border-primary/20 text-primary px-4 py-2 rounded-full font-bold uppercase tracking-[0.25em] text-[10px]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2 inline-block shadow-[0_0_10px_#22c55e]"></span>
            System Online: Atharva.AI Core
          </Badge>
          
          <h1 className="text-6xl md:text-9xl lg:text-[11rem] font-headline font-black leading-[0.85] tracking-tighter mb-10 hero-text-glow">
            ATHARVA<br />
            <span className="text-transparent bg-clip-text vibrant-gradient">BHATNAGAR</span>
          </h1>
          
          <div className="mt-12 relative z-10 max-w-4xl">
            <PersonalizedIntro />
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-0 bottom-1/4 hidden xl:block animate-float opacity-[0.03] pointer-events-none select-none">
          <span className="text-[20rem] font-black text-white leading-none">AI</span>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer z-20" 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[9px] uppercase tracking-[0.5em] font-black text-primary">Explore</span>
          <div className="w-[1.5px] h-16 bg-gradient-to-b from-primary via-accent to-transparent" />
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects" className="bg-black/30 backdrop-blur-sm border-y border-white/5 relative z-10">
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
            <div className="absolute -top-16 -left-16 w-80 h-80 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <h2 className="text-5xl md:text-8xl font-headline font-black leading-[1] tracking-tighter relative hero-text-glow">
              CODING<br />
              <span className="text-accent italic">AS ART.</span><br />
              <span className="text-primary">ROBOTS</span><br />
              <span className="text-white">AS REALITY.</span>
            </h2>
          </div>
          
          <div className="relative">
            <div className="glass-morphism p-12 rounded-[3rem] border-white/5 shadow-2xl relative z-10 hover:shadow-primary/10 transition-all duration-500">
              <p className="text-xl md:text-2xl leading-relaxed text-slate-300 mb-12 font-medium">
                My approach to engineering transcends traditional boundaries. I orchestrate complex systems where digital neurons meet physical actuators, creating life from logic.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="text-4xl md:text-5xl font-headline font-black text-primary neon-glow">99.9%</h4>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Model Precision</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-4xl md:text-5xl font-headline font-black text-accent neon-glow">0.05ms</h4>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Kernel Latency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 text-center bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-8">
            <div className="text-3xl font-headline font-black tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 vibrant-gradient rounded-lg shadow-lg" />
              ATHARVA<span className="text-accent">.AI</span>
            </div>
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
              Architected by Atharva Bhatnagar &copy; 2025
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
