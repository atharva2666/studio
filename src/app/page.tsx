'use client';

import Navbar from '@/components/Navbar';
import ThreeBackground from '@/components/ThreeBackground';
import PersonalizedIntro from '@/components/PersonalizedIntro';
import ProjectShowcase from '@/components/ProjectShowcase';
import InteractiveExperience from '@/components/InteractiveExperience';
import Contact from '@/components/Contact';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Terminal, Cpu, Zap, Brain } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black transition-colors duration-500 overflow-x-hidden selection:bg-primary/30">
      <ThreeBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative pt-32 pb-24">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-primary/10 blur-[200px] -z-10 rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/10 blur-[200px] -z-10 rounded-full opacity-40" />
        
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 relative z-10">
          <Badge className="mb-8 bg-white/5 backdrop-blur-3xl shadow-2xl border-white/10 text-primary px-6 py-3 rounded-full font-black uppercase tracking-[0.4em] text-[10px] sm:text-[12px]">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-3 inline-block shadow-[0_0_15px_#22c55e]"></span>
            System Status: 100% Operational
          </Badge>
          
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] font-headline font-black leading-[0.8] tracking-tighter mb-10 hero-text-glow">
            ATHARVA<br />
            <span className="text-transparent bg-clip-text vibrant-gradient">BHATNAGAR</span>
          </h1>
          
          <div className="mt-12 sm:mt-16 relative z-10 max-w-5xl">
            <PersonalizedIntro />
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-0 bottom-1/4 hidden xl:block animate-float opacity-[0.03] pointer-events-none select-none">
          <span className="text-[35rem] font-black text-white leading-none">AI</span>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30 hover:opacity-100 transition-all cursor-pointer z-20 group" 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.8em] font-black text-primary group-hover:tracking-[1em] transition-all">Explore Systems</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-primary via-accent to-transparent rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-24 bg-black/40 backdrop-blur-2xl border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-20">
          {[
            { label: "Neural Nodes", val: "500K+", icon: <Brain className="w-5 h-5 text-primary" /> },
            { label: "Hardware Latency", val: "0.02ms", icon: <Zap className="w-5 h-5 text-accent" /> },
            { label: "Active Deployments", val: "12", icon: <Cpu className="w-5 h-5 text-blue-400" /> },
            { label: "System Uptime", val: "99.9%", icon: <Sparkles className="w-5 h-5 text-green-400" /> }
          ].map((stat, i) => (
            <div key={i} className="space-y-3 group cursor-default">
              <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                {stat.icon}
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{stat.label}</span>
              </div>
              <h4 className="text-4xl sm:text-6xl font-headline font-black tracking-tight neon-glow transition-all group-hover:scale-105">{stat.val}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects" className="relative z-10">
        <ProjectShowcase />
      </div>

      {/* Terminal Section */}
      <div id="terminal" className="relative z-10 py-12">
        <InteractiveExperience />
      </div>

      {/* Philosophy Section */}
      <section className="py-40 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-pulse opacity-50" />
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-headline font-black leading-[0.9] tracking-tighter relative hero-text-glow">
              LOGIC<br />
              <span className="text-accent italic">DEFINED.</span><br />
              <span className="text-primary">ART</span><br />
              <span className="text-white">REFINED.</span>
            </h2>
          </div>
          
          <div className="relative">
            <div className="glass-morphism p-12 sm:p-20 rounded-[4rem] border-white/5 shadow-2xl relative z-10 hover:shadow-primary/20 transition-all duration-700 group overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <p className="text-2xl sm:text-3xl leading-relaxed text-slate-300 mb-16 font-medium relative z-10">
                "I don&apos;t just build machines. I curate digital experiences where the barrier between human intent and robotic execution vanishes."
              </p>
              <div className="flex items-center gap-8 relative z-10">
                <div className="w-20 h-[2px] bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-primary">System Architect</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 text-center bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-10">
            <div className="text-4xl font-headline font-black tracking-tighter flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 vibrant-gradient rounded-2xl shadow-2xl rotate-12 group-hover:rotate-0 transition-all duration-500" />
              ATHARVA<span className="text-accent">.AI</span>
            </div>
            <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.6em]">
              Architected by Atharva Bhatnagar &copy; 2025 // Core Ver 2.5
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}