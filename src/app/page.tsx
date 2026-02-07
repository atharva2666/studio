
import Navbar from '@/components/Navbar';
import ThreeBackground from '@/components/ThreeBackground';
import PersonalizedIntro from '@/components/PersonalizedIntro';
import ProjectShowcase from '@/components/ProjectShowcase';
import InteractiveExperience from '@/components/InteractiveExperience';
import Contact from '@/components/Contact';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#F5F5F5] selection:bg-accent selection:text-white">
      <ThreeBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto relative pt-24 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-accent/10 to-transparent blur-[120px] -z-10 rounded-full" />
        
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <Badge className="mb-10 bg-white shadow-sm border-primary/10 text-primary px-5 py-2 rounded-full font-bold uppercase tracking-[0.3em] text-[10px]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2 inline-block"></span>
            Building the Intelligent Web
          </Badge>
          
          <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-headline font-black leading-[0.8] tracking-tighter mb-12 drop-shadow-sm">
            ATHARVA<br />
            <span className="text-primary">BHATNAGAR</span>
          </h1>
          
          <div className="mt-16 relative z-10">
            <PersonalizedIntro />
          </div>
        </div>

        {/* Floating elements decoration */}
        <div className="absolute right-0 bottom-1/4 hidden xl:block animate-float opacity-10 pointer-events-none">
          <span className="text-[20rem] font-black text-primary leading-none">AI</span>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-30">
          <span className="text-[9px] uppercase tracking-[0.4em] font-black">Explore</span>
          <div className="w-[2px] h-14 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects" className="bg-white/30 backdrop-blur-sm">
        <ProjectShowcase />
      </div>

      {/* Terminal Section */}
      <div id="terminal" className="relative z-10">
        <InteractiveExperience />
      </div>

      {/* Philosophy Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
            <h2 className="text-6xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter relative">
              CODING<br />
              <span className="text-primary italic">AS AN ART.</span><br />
              <span className="text-accent underline decoration-8 underline-offset-[12px]">ROBOTS</span><br />
              AS REALITY.
            </h2>
          </div>
          
          <div className="relative">
            <div className="glass-morphism p-14 rounded-[3.5rem] bg-white/40 border-white/50 shadow-2xl relative z-10">
              <p className="text-2xl leading-relaxed text-slate-700 mb-10 font-medium">
                My approach to engineering transcends traditional boundaries. I don't just write code; I orchestrate complex systems where digital neurons meet physical actuators.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div className="group">
                  <h4 className="text-5xl font-headline font-black text-primary mb-3 transition-transform group-hover:scale-110 duration-300">99.9%</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Inference Precision</p>
                </div>
                <div className="group">
                  <h4 className="text-5xl font-headline font-black text-accent mb-3 transition-transform group-hover:scale-110 duration-300">0.05ms</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Servo Response</p>
                </div>
              </div>
            </div>
            {/* Background design element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-8 border-r-8 border-primary/10 rounded-br-[4rem] -z-10" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact" className="relative">
        <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
        <Contact />
      </div>

      {/* Footer */}
      <footer className="py-20 border-t border-primary/5 text-center bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <div className="text-3xl font-headline font-black tracking-tighter">
              ATHARVA<span className="text-accent">.AI</span>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.4em]">
              Designed & Developed by Atharva Bhatnagar &copy; 2024
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
