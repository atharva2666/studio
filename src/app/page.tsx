'use client';

import Navbar from '@/components/Navbar';
import ThreeBackground from '@/components/ThreeBackground';
import PersonalizedIntro from '@/components/PersonalizedIntro';
import ProjectShowcase from '@/components/ProjectShowcase';
import InteractiveExperience from '@/components/InteractiveExperience';
import Contact from '@/components/Contact';
import TelemetryChart from '@/components/TelemetryChart';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Terminal, Cpu, Zap, Brain, ArrowDown, Activity } from 'lucide-react';

export default function Home() {
  const triggerPulse = () => {
    window.dispatchEvent(new CustomEvent('neural-pulse'));
  };

  return (
    <main className="relative min-h-screen bg-background/40 selection:bg-primary/30 transition-colors duration-700 overflow-x-hidden">
      {/* Interactive Background */}
      <ThreeBackground />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-24 pb-12 relative z-10">
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <Badge className="mb-10 bg-primary/10 text-primary border-primary/20 px-6 py-2 rounded-full font-bold tracking-[0.4em] text-[10px] flex w-fit items-center gap-3 backdrop-blur-md cursor-help hover:bg-primary/20 transition-all">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
            NEURAL ENGINE ACTIVE
          </Badge>
          
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-headline font-black leading-[0.85] tracking-tighter mb-14 text-gradient drop-shadow-2xl">
            Building<br />
            The Future<br />
            <span className="text-primary/70 italic">Today.</span>
          </h1>
          
          <div className="mt-12 max-w-4xl">
            <PersonalizedIntro />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-6 md:left-12 flex items-center gap-6 opacity-40 hover:opacity-100 transition-all cursor-pointer group"
          onClick={() => {
            triggerPulse();
            document.getElementById('telemetry')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 group-hover:border-primary/40 transition-all duration-500">
            <ArrowDown className="w-5 h-5 text-white group-hover:translate-y-1 transition-transform" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/60 group-hover:text-primary transition-colors">Initialize Sequence</span>
        </div>
      </section>

      {/* Telemetry Dashboard */}
      <section id="telemetry" className="py-32 px-6 relative z-10 border-y border-white/[0.03] bg-black/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-1 space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-headline font-bold">Core Telemetry</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">Live Neural Monitoring</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Observing real-time synchronization between hardware controllers and high-level AI orchestration layers.
              </p>
              <div className="space-y-6 pt-6">
                {[
                  { label: "Neural Nodes", val: "850K+", color: "bg-primary" },
                  { label: "Hardware Latency", val: "0.01ms", color: "bg-accent" },
                  { label: "Core Sync Rate", val: "99.99%", color: "bg-emerald-500" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                    <span className={`text-sm font-bold ${stat.color.replace('bg-', 'text-')}`}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2 glass-morphism p-10 rounded-[3rem] border-white/5 shadow-inner">
              <div className="flex items-center justify-between mb-8">
                <Badge variant="outline" className="px-4 py-1 border-white/10 text-white/40 text-[9px] uppercase tracking-[0.2em] font-black">
                  Frequency Analysis // Node 0xAF
                </Badge>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-primary" />
                     <span className="text-[9px] font-black uppercase text-white/30 tracking-widest">Stability</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-accent" />
                     <span className="text-[9px] font-black uppercase text-white/30 tracking-widest">Throughput</span>
                   </div>
                </div>
              </div>
              <TelemetryChart />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects" className="py-24 relative z-10">
        <ProjectShowcase />
      </div>

      {/* Terminal Section */}
      <div id="terminal" className="py-24 relative z-10">
        <InteractiveExperience />
      </div>

      {/* Philosophy Section */}
      <section className="py-40 px-6 max-w-7xl mx-auto relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] -z-10 animate-pulse" />
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-8xl font-headline font-black leading-[0.95] tracking-tight">
              Logic Meets<br />
              <span className="italic text-primary">Aesthetics.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg font-medium">
              Engineering is more than just code. It's about crafting experiences that feel intuitive, seamless, and intelligent.
            </p>
          </div>
          
          <div className="glass-morphism p-16 rounded-[3.5rem] relative group overflow-hidden border-white/[0.05] shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
            <p className="text-3xl font-medium text-white/90 leading-tight relative z-10 italic">
              "I build the bridges between human intent and machine execution, ensuring every interaction is precise and purposeful."
            </p>
            <div className="mt-16 flex items-center gap-6">
              <div className="w-16 h-[2px] bg-primary/40" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary/60">Core Philosophy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="relative z-10">
        <Contact />
      </div>

      {/* Footer */}
      <footer className="py-24 border-t border-white/[0.03] bg-black/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-headline font-black tracking-tighter">
              ATHARVA<span className="text-primary/70">.AI</span>
            </span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-[11px] font-black uppercase tracking-[0.6em]">
              © 2025 // Production Alpha 4.0.0
            </p>
            <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
              <span className="hover:text-primary cursor-pointer transition-colors">Security Protokol</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Neural Core</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Uplink Alpha</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
