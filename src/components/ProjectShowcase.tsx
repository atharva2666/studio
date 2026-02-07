'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Cpu, Brain, Zap, ArrowUpRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    title: "Olivia AI",
    subtitle: "Conversational Agent",
    description: "Multi-modal transformer-based AI that interprets intent and context with high precision. Optimized for human-like conversational flow.",
    tags: ["LLMs", "GenKit", "Next.js", "Python"],
    icon: <Brain className="w-5 h-5" />,
    image: PlaceHolderImages.find(img => img.id === 'olivia-ai'),
    accent: "bg-accent/10 text-accent",
  },
  {
    title: "AI Test Lab",
    subtitle: "Benchmarking Engine",
    description: "Automated reliability testing for generative models. Stress tests prompts, outputs, and edge cases to ensure production readiness.",
    tags: ["MLOps", "Safety", "Validation"],
    icon: <Zap className="w-5 h-5" />,
    image: PlaceHolderImages.find(img => img.id === 'ai-testing'),
    accent: "bg-primary/10 text-primary",
  },
  {
    title: "Robo-Core V2",
    subtitle: "Hardware Controller",
    description: "A real-time robotics control system utilizing low-latency C++ kernels for high-precision motor coordination and visual feedback loops.",
    tags: ["C++", "ROS", "Hardware", "Vision"],
    icon: <Cpu className="w-5 h-5" />,
    image: PlaceHolderImages.find(img => img.id === 'robotics-project'),
    accent: "bg-indigo-600/10 text-indigo-600",
  }
];

export default function ProjectShowcase() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-sm font-bold uppercase tracking-[0.4em] text-primary">Portfolio</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-5xl md:text-7xl font-headline font-black tracking-tight leading-none">
            ENGINEERED <br /><span className="text-accent italic">EXCELLENCE.</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-md leading-relaxed">
            A selection of experimental projects at the intersection of machine intelligence and hardware reality.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, idx) => (
          <div key={idx} className="group relative">
            <Card className="h-full overflow-hidden border-none shadow-none bg-white rounded-[2rem] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(75,0,130,0.15)] group-hover:-translate-y-3">
              <div className="relative h-72 overflow-hidden">
                {project.image ? (
                  <Image 
                    src={project.image.imageUrl} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    data-ai-hint={project.image.imageHint}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Image Unavailable</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-primary/40 transition-colors duration-500" />
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 cursor-pointer hover:bg-white hover:text-primary">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-8 pt-10 relative">
                <div className={`absolute -top-10 left-8 w-20 h-20 rounded-[1.5rem] ${project.accent} backdrop-blur-xl flex items-center justify-center shadow-xl border border-white/20`}>
                  {project.icon}
                </div>
                
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 block">
                    {project.subtitle}
                  </span>
                  <h3 className="text-3xl font-headline font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-gray-50 text-slate-500 border-none font-bold uppercase text-[10px] px-3">
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
