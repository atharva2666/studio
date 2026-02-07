'use client';

import Navbar from '@/components/Navbar';
import ThreeBackground from '@/components/ThreeBackground';
import PersonalizedIntro from '@/components/PersonalizedIntro';
import ProjectShowcase from '@/components/ProjectShowcase';
import InteractiveExperience from '@/components/InteractiveExperience';
import Contact from '@/components/Contact';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Terminal, Cpu, Zap, Brain, ArrowDown } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ThreeBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-24 pb-12">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">
          <Badge className="mb-8 bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-semibold tracking-wider text-[11px] flex w-fit items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            NEURAL ENGINE ONLINE
          </Badge>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-headline font-bold leading-[0.95] tracking-tight mb-12 text-gradient">
            Digital<br />
            Intelligence<br />
            <span className="text-primary/80">Refined.</span>
          </h1>
          
          <div className="mt-8 max-w-3xl">
            <PersonalizedIntro />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer group"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/5 transition-all">
            <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Explore Work</span>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-20 px-6 border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Neural Nodes", val: "500K+", icon: <Brain className="w-4 h-4 text-primary/60" /> },
            { label: "Hardware Latency", val: "0.02ms", icon: <Zap className="w-4 h-4 text-accent/60" /> },
            { label: "Active Deployments", val: "12", icon: <Cpu className="w-4 h-4 text-blue-400/60" /> },
            { label: "System Uptime", val: "99.9%", icon: <Sparkles className="w-4 h-4 text-green-400/60" /> }
          ].map((stat, i) => (
            <div key={i} className="space-y-2 p-6 rounded-3xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5 group">
              <div className="flex items-center gap-3">
                {stat.icon}
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
              </div>
              <h4 className="text-3xl font-headline font-bold text-white/90">{stat.val}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects" className="py-12">
        <ProjectShowcase />
      </div>

      {/* Terminal Section */}
      <div id="terminal" className="py-12">
        <InteractiveExperience />
      </div>

      {/* Philosophy Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-headline font-bold leading-[1.1] tracking-tight">
              Logic meets<br />
              <span className="italic text-primary">Aesthetics.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Engineering is more than just code. It's about crafting experiences that feel intuitive, seamless, and intelligent.
            </p>
          </div>
          
          <div className="glass-morphism p-12 rounded-[2.5rem] relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700" />
            <p className="text-2xl font-medium text-white/80 leading-snug relative z-10 italic">
              "I build the bridges between human intent and machine execution, ensuring every interaction is precise and purposeful."
            </p>
            <div className="mt-12 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-primary/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">Core Philosophy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40" />
            <span className="text-xl font-headline font-bold tracking-tight">
              ATHARVA<span className="text-primary/60">.AI</span>
            </span>
          </div>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.5em]">
            © 2025 // Core Ver 2.8.0
          </p>
        </div>
      </footer>
    </main>
  );
}