'use client';

import Navbar from '@/components/Navbar';
import ThreeBackground from '@/components/ThreeBackground';
import PersonalizedIntro from '@/components/PersonalizedIntro';
import ProjectShowcase from '@/components/ProjectShowcase';
import InteractiveExperience from '@/components/InteractiveExperience';
import Contact from '@/components/Contact';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import AnimeOverlay from '@/components/AnimeOverlay';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Cpu, ArrowDown, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const animeMascot = PlaceHolderImages.find(img => img.id === 'anime-waving');

  return (
    <main className="relative min-h-screen selection:bg-primary/30 overflow-x-hidden">
      {/* Interactive Background */}
      <ThreeBackground />
      
      {/* Anime Theme Specialized Global Effects (Sakura) */}
      <AnimeOverlay />
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-12 relative z-10">
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 relative">
          
          <Badge className="mb-10 bg-primary/10 text-primary border-primary/20 px-6 py-2 rounded-full font-bold tracking-[0.4em] text-[10px] flex w-fit items-center gap-3 backdrop-blur-md animate-float">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <Sparkles className="w-3 h-3 hidden anime:inline-block" />
            <span className="anime:hidden">NEURAL ENGINE ACTIVE</span>
            <span className="hidden anime:inline">ANIME PROTOCOL ENGAGED</span>
          </Badge>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-16">
            <div className="flex-1">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-headline font-black leading-[0.85] tracking-tighter mb-14 text-gradient">
                Building<br />
                <span className="anime:text-accent transition-colors duration-700">The Future</span><br />
                <span className="text-primary/70 italic">Today.</span>
              </h1>
            </div>

            {/* Anime Theme Mascot - Integrated beside the Hero Text */}
            <div className="anime-mascot flex-col items-center justify-center animate-in zoom-in-75 fade-in duration-1000 delay-300">
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px]">
                {animeMascot && (
                  <div className="relative w-full h-full animate-float">
                    <Image
                      src={animeMascot.imageUrl}
                      alt="Anime Mascot Greeting"
                      fill
                      className="object-contain filter drop-shadow-[0_0_40px_rgba(255,105,180,0.6)]"
                      data-ai-hint={animeMascot.imageHint}
                      priority
                    />
                    {/* Speech Bubble */}
                    <div className="absolute top-0 -right-4 bg-white/95 backdrop-blur-md px-8 py-4 rounded-[2rem] rounded-bl-none border-4 border-pink-400 shadow-2xl animate-bounce">
                      <span className="text-pink-600 font-black text-sm tracking-tight whitespace-nowrap">HELLO MASTER! ^_^</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-12 max-w-4xl">
            <PersonalizedIntro />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-6 md:left-12 flex items-center gap-6 opacity-40 hover:opacity-100 transition-all cursor-pointer group"
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

      {/* Projects Section */}
      <div id="projects" className="py-24 relative z-10 bg-background/50 backdrop-blur-sm border-y border-foreground/[0.03]">
        <ProjectShowcase />
      </div>

      {/* Terminal Section */}
      <div id="terminal" className="py-24 relative z-10">
        <InteractiveExperience />
      </div>

      {/* Contact Section */}
      <div className="relative z-10">
        <Contact />
      </div>

      {/* Footer & Theme Switcher */}
      <footer className="py-24 border-t border-foreground/[0.03] bg-background/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
          
          <div className="flex flex-col items-center gap-6">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Select Environment Protocol</span>
             <ThemeSwitcher />
          </div>

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
              © 2025 // Production Alpha 5.0.0
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
