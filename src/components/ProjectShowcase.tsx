'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Cpu, ArrowUpRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    title: "Olivia AI",
    subtitle: "Multi-Modal Agent",
    description: "A specialized AI orchestrator designed for human-centric conversational interfaces and task automation.",
    tags: ["GenKit", "Transformers", "React"],
    icon: <Brain className="w-5 h-5" />,
    image: PlaceHolderImages.find(img => img.id === 'olivia-ai'),
    color: "text-primary"
  },
  {
    title: "Neural Testing",
    subtitle: "Validation Suite",
    description: "Production-grade stress testing for large language models to ensure safety and reliability parameters.",
    tags: ["MLOps", "QA", "Safety"],
    icon: <Zap className="w-5 h-5" />,
    image: PlaceHolderImages.find(img => img.id === 'ai-testing'),
    color: "text-accent"
  },
  {
    title: "Robo-Core",
    subtitle: "Hardware Framework",
    description: "A low-latency C++ framework for synchronized motor control and computer vision processing in robotics.",
    tags: ["ROS", "C++", "Vision"],
    icon: <Cpu className="w-5 h-5" />,
    image: PlaceHolderImages.find(img => img.id === 'robotics-project'),
    color: "text-blue-400"
  }
];

export default function ProjectShowcase() {
  return (
    <section className="px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="h-px w-16 bg-primary/40" />
          <h2 className="text-5xl md:text-6xl font-headline font-bold tracking-tight">Recent Work.</h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-sm">
          A collection of experiments at the intersection of intelligence and design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <Card key={idx} className="group glass-morphism border-none hover:bg-white/[0.05] transition-all duration-500 cursor-pointer p-2 rounded-[2rem]">
            <div className="relative h-64 overflow-hidden rounded-[1.75rem]">
              {project.image && (
                <Image 
                  src={project.image.imageUrl} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint={project.image.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white/5 ${project.color}`}>
                    {project.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{project.subtitle}</span>
                </div>
                <h3 className="text-2xl font-headline font-bold">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-white/5 text-white/60 border-none font-bold text-[9px] uppercase px-3">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}