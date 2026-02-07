'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Cpu, ArrowUpRight, Activity } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    title: "Olivia AI",
    subtitle: "Neural Agent",
    description: "Advanced multi-modal transformer orchestrating human intent through high-fidelity conversational synthesis.",
    tags: ["GenKit", "Next.js", "Transformers"],
    icon: <Brain className="w-6 h-6" />,
    image: PlaceHolderImages.find(img => img.id === 'olivia-ai'),
    accent: "bg-primary/20 text-primary",
    status: "Online",
    color: "#a855f7"
  },
  {
    title: "AI Test Lab",
    subtitle: "Validation Core",
    description: "Stress-testing generative models for reliability, safety, and production-grade performance metrics.",
    tags: ["MLOps", "QA", "Safety"],
    icon: <Zap className="w-6 h-6" />,
    image: PlaceHolderImages.find(img => img.id === 'ai-testing'),
    accent: "bg-accent/20 text-accent",
    status: "Processing",
    color: "#ec4899"
  },
  {
    title: "Robo-Core V2",
    subtitle: "Hardware OS",
    description: "Low-latency C++ kernels providing real-time motor coordination and visual processing for robotic platforms.",
    tags: ["ROS", "C++", "Hardware"],
    icon: <Cpu className="w-6 h-6" />,
    image: PlaceHolderImages.find(img => img.id === 'robotics-project'),
    accent: "bg-blue-500/20 text-blue-400",
    status: "Active",
    color: "#3b82f6"
  }
];

export default function ProjectShowcase() {
  return (
    <section id="projects" className="py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-24">
        <div className="flex items-center gap-6 mb-6">
          <div className="h-[2px] w-20 bg-primary shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
          <span className="text-sm font-black uppercase tracking-[0.5em] text-primary">Strategic Deployments</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <h2 className="text-6xl md:text-8xl font-headline font-black tracking-tighter leading-[0.85] hero-text-glow">
            ACTIVE <br /><span className="text-transparent bg-clip-text vibrant-gradient italic">PROTOCOLS.</span>
          </h2>
          <p className="text-slate-400 text-xl md:text-2xl max-w-lg leading-relaxed font-medium">
            A curated selection of experiments bridging the gap between algorithmic theory and physical application.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
        {projects.map((project, idx) => (
          <div key={idx} className="group relative">
            <Card className="h-full overflow-hidden border-white/5 bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] transition-all duration-700 hover:translate-y-[-1rem] hover:shadow-[0_40px_100px_-20px_rgba(168,85,247,0.2)] group-hover:border-primary/20">
              <div className="relative h-80 overflow-hidden">
                {project.image ? (
                  <Image 
                    src={project.image.imageUrl} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    data-ai-hint={project.image.imageHint}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <span className="text-slate-500 text-xs font-black tracking-widest uppercase">No Visual Found</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-8 left-8 flex items-center gap-3">
                  <Badge className="bg-black/60 backdrop-blur-xl border-white/10 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    <Activity className={`w-3 h-3 mr-2 ${project.status === 'Processing' ? 'animate-spin' : 'animate-pulse'}`} style={{ color: project.color }} />
                    {project.status}
                  </Badge>
                </div>

                <div className="absolute top-8 right-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 cursor-pointer hover:bg-primary hover:scale-110">
                    <ArrowUpRight className="w-8 h-8" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-10 pt-12 relative">
                <div className={`absolute -top-12 left-10 w-24 h-24 rounded-[2rem] ${project.accent} backdrop-blur-3xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                  {project.icon}
                </div>
                
                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 block opacity-70">
                    {project.subtitle}
                  </span>
                  <h3 className="text-4xl font-headline font-black mb-4 tracking-tight">{project.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-white/5 text-slate-300 border-none font-black uppercase text-[10px] px-4 py-1 rounded-lg">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}