'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Cpu, ArrowUpRight, Database, Shield } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    title: "Olivia AI",
    id: "olivia-ai",
    subtitle: "MULTI-MODAL AGENT",
    description: "Architecting human-centric task automation using advanced transformer models and specialized neural kernels.",
    metrics: { stability: "99.8%", compute: "Low" },
    icon: <Brain className="w-5 h-5" />,
    color: "text-primary"
  },
  {
    title: "Neural Suite",
    id: "ai-testing",
    subtitle: "VALIDATION PROTOCOL",
    description: "Industrial stress testing environment for large language models ensuring safety, alignment, and performance.",
    metrics: { accuracy: "94.2%", speed: "Sub-10ms" },
    icon: <Shield className="w-5 h-5" />,
    color: "text-accent"
  },
  {
    title: "Robo-Core",
    id: "robotics-project",
    subtitle: "SYNCHRONIZED KERNEL",
    description: "Real-time C++ motor control framework utilizing computer vision for high-precision industrial robotics.",
    metrics: { precision: "0.01mm", latency: "Ultra" },
    icon: <Cpu className="w-5 h-5" />,
    color: "text-blue-400"
  }
];

export default function ProjectShowcase() {
  return (
    <section className="px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
        <div className="space-y-6">
          <div className="h-1 w-20 bg-primary/60 rounded-full" />
          <h2 className="text-6xl md:text-7xl font-headline font-bold tracking-tight">Deployment<br /><span className="text-primary/60">Registry.</span></h2>
        </div>
        <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
          <Database className="w-10 h-10 text-primary/40" />
          <p className="text-muted-foreground text-sm max-w-[240px] leading-relaxed">
            Live instances and production-ready architectures currently active in the logic engine.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, idx) => {
          const img = PlaceHolderImages.find(i => i.id === project.id);
          return (
            <Card key={idx} className="group glass-morphism border-none hover:bg-white/[0.06] transition-all duration-700 cursor-pointer overflow-hidden rounded-[2.5rem] flex flex-col">
              <div className="relative h-72 w-full overflow-hidden">
                {img && (
                  <Image 
                    src={img.imageUrl} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
                    data-ai-hint={img.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                   <div className={`p-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 ${project.color}`}>
                    {project.icon}
                  </div>
                  <Badge className="bg-primary/20 text-primary border-none text-[9px] font-black tracking-widest px-3 py-1">v.2.4.0</Badge>
                </div>
              </div>
              
              <CardContent className="p-10 space-y-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">{project.subtitle}</p>
                  <h3 className="text-3xl font-headline font-bold tracking-tight">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                  {Object.entries(project.metrics).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">{key}</p>
                      <p className="text-sm font-bold text-white/80">{val}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}