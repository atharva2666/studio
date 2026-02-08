'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const experiences = [
  {
    role: "AI Systems Lead",
    company: "Neural Kinetics",
    period: "2023 - PRESENT",
    description: "Orchestrating the deployment of multi-modal agents for industrial automation and high-precision robotics.",
    tags: ["GenAI", "Robotics", "Systems"]
  },
  {
    role: "Robotics Engineer",
    company: "Orchid Precision",
    period: "2021 - 2023",
    description: "Developed real-time C++ motor control frameworks and computer vision pipelines for industrial manufacturing.",
    tags: ["C++", "ROS", "OpenCV"]
  },
  {
    role: "Full Stack Architect",
    company: "Global Logic",
    period: "2019 - 2021",
    description: "Architected scalable cloud infrastructures and high-performance web applications for Fortune 500 clients.",
    tags: ["Next.js", "AWS", "Firebase"]
  }
];

export default function Experience() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-20">
        
        <div className="md:w-1/3 space-y-8 sticky top-32 h-fit">
          <Badge className="bg-primary/5 text-primary border-none px-6 py-2 rounded-full font-black tracking-[0.4em] text-[10px]">
            TIMELINE
          </Badge>
          <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tight">Industrial<br /><span className="text-primary/60">History.</span></h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A track record of high-performance deployments across multiple domains of technology.
          </p>
        </div>

        <div className="md:w-2/3 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="group relative pl-12 pb-12 border-l border-white/5 last:pb-0">
              <div className="absolute top-0 left-[-8px] w-4 h-4 rounded-full bg-primary border-4 border-background group-hover:scale-150 transition-transform duration-500" />
              
              <div className="glass-morphism rounded-[2.5rem] p-10 space-y-8 hover:bg-white/[0.04] transition-all duration-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-3">
                      <Briefcase className="w-3 h-3" /> {exp.company}
                    </p>
                    <h3 className="text-3xl font-bold font-headline">{exp.role}</h3>
                  </div>
                  <Badge variant="outline" className="w-fit h-10 px-6 rounded-xl border-white/10 text-muted-foreground flex items-center gap-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold tracking-widest">{exp.period}</span>
                  </Badge>
                </div>

                <p className="text-muted-foreground leading-relaxed text-lg">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {exp.tags.map(tag => (
                    <Badge key={tag} className="bg-white/5 hover:bg-white/10 text-white/60 border-none px-4 py-1.5 text-[9px] font-black tracking-widest uppercase">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
