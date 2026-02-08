'use client';

import Navbar from '@/components/Navbar';
import ThreeBackground from '@/components/ThreeBackground';
import PersonalizedIntro from '@/components/PersonalizedIntro';
import ProjectShowcase from '@/components/ProjectShowcase';
import InteractiveExperience from '@/components/InteractiveExperience';
import Contact from '@/components/Contact';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import TelemetryChart from '@/components/TelemetryChart';
import TechStack from '@/components/TechStack';
import Experience from '@/components/Experience';
import { Badge } from '@/components/ui/badge';
import { Cpu, ArrowDown, Activity, ShieldCheck, Layers } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-primary/20 overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      
      {/* Hero Section - Above the fold focus */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-24 pb-12 relative z-10">
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          
          <div className="flex items-center gap-4 mb-10">
            <Badge className="bg-primary/5 text-primary border-primary/20 px-5 py-2 rounded-full font-black tracking-[0.4em] text-[10px] flex items-center gap-3 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              CORE PROTOCOL v7.0.0
            </Badge>
            <div className="hidden sm:flex items-center gap-3 text-[10px] font-black tracking-widest text-muted-foreground/40">
              <ShieldCheck className="w-4 h-4" />
              ENVIRONMENT STABLE
            </div>
          </div>
          
          <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-20">
            <div className="flex-1 space-y-12">
              <div className="space-y-4">
                <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-headline font-black leading-[0.85] tracking-tighter text-gradient">
                  Design.<br />
                  Code.<br />
                  <span className="text-primary/40">Scale.</span>
                </h1>
              </div>
              
              <div className="max-w-4xl">
                <PersonalizedIntro />
              </div>
            </div>
            
            {/* Minimal Telemetry Widget */}
            <div className="hidden xl:block w-[420px] glass-morphism p-12 rounded-[3rem] border-none mt-12 scanline overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-3">
                    <Activity className="w-4 h-4" /> Logic Stream
                  </span>
                  <p className="text-[10px] text-muted-foreground/30 font-mono">NODE_CLUSTER_CORE_01</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline" className="text-[9px] border-primary/20 text-primary px-3 py-0.5 font-bold">READY</Badge>
                  <span className="text-[8px] font-mono text-muted-foreground/20">Uptime: 99.9%</span>
                </div>
              </div>
              <TelemetryChart />
              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">Throughput</p>
                  <p className="text-lg font-headline font-bold">4.2 TB/s</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40">Latency</p>
                  <p className="text-lg font-headline font-bold">12ms</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="absolute bottom-16 left-6 md:left-12 flex items-center gap-8 opacity-40 hover:opacity-100 transition-all cursor-pointer group"
          onClick={() => {
            document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-14 h-14 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
            <ArrowDown className="w-5 h-5 text-foreground group-hover:text-primary group-hover:translate-y-2 transition-all" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/40 group-hover:text-primary transition-colors block">Deployment Hub</span>
            <span className="text-[8px] font-mono text-muted-foreground/20">Scroll to Explore</span>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-40 relative z-10 bg-background/20 backdrop-blur-sm">
        <TechStack />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-40 relative z-10 bg-background/40 backdrop-blur-md border-y border-white/[0.03]">
        <ProjectShowcase />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-40 relative z-10">
        <Experience />
      </section>

      {/* Terminal Section */}
      <section id="terminal" className="py-40 relative z-10">
        <InteractiveExperience />
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/[0.03] bg-background/80 backdrop-blur-2xl relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10 translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-24">
          
          <div className="flex flex-col items-center gap-6">
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground/40">ENVIRONMENT OVERRIDE</span>
             <ThemeSwitcher />
          </div>

          <div className="flex flex-col items-center gap-10">
            <div className="flex items-center gap-5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-700">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-headline font-black tracking-tighter">
                ATHARVA<span className="text-primary/60">.AI</span>
              </span>
            </div>
            
            <div className="flex gap-12">
              {['Github', 'LinkedIn', 'Terminal', 'Core'].map(item => (
                <a key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 hover:text-primary transition-colors">{item}</a>
              ))}
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-muted-foreground/30 text-[10px] font-black uppercase tracking-[0.6em]">
              © 2025 // STABLE KERNEL v7.0.0_REL
            </p>
            <div className="flex items-center justify-center gap-3 text-[8px] font-mono text-muted-foreground/10">
              <Layers className="w-3 h-3" />
              BUILD_ID_0X42FA_A7
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
