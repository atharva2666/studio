'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Code2, Cpu, Brain, Database, Globe, Layers, Shield, Terminal } from 'lucide-react';

const skills = [
  { name: 'AI Engineering', icon: <Brain className="w-5 h-5" />, level: 'Expert', color: 'text-primary' },
  { name: 'Robotics Control', icon: <Cpu className="w-5 h-5" />, level: 'Advanced', color: 'text-accent' },
  { name: 'Full Stack Dev', icon: <Globe className="w-5 h-5" />, level: 'Senior', color: 'text-blue-400' },
  { name: 'Data Pipeline', icon: <Database className="w-5 h-5" />, level: 'Advanced', color: 'text-emerald-400' },
  { name: 'Systems Architecture', icon: <Layers className="w-5 h-5" />, level: 'Specialist', color: 'text-rose-400' },
  { name: 'Secure Protocols', icon: <Shield className="w-5 h-5" />, level: 'Verified', color: 'text-amber-400' },
  { name: 'Low-Level Opt', icon: <Terminal className="w-5 h-5" />, level: 'Expert', color: 'text-purple-400' },
  { name: 'Algorithm Design', icon: <Code2 className="w-5 h-5" />, level: 'Senior', color: 'text-cyan-400' },
];

export default function TechStack() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center text-center mb-24 space-y-6">
        <Badge className="bg-primary/5 text-primary border-none px-6 py-2 rounded-full font-black tracking-[0.4em] text-[10px]">
          LOGIC EXPERTISE
        </Badge>
        <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tight">Core Competencies.</h2>
        <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
          Synthesizing high-performance engineering with advanced artificial intelligence to architect the future.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {skills.map((skill, idx) => (
          <Card key={idx} className="group glass-morphism border-none p-10 rounded-[2.5rem] hover:bg-white/[0.05] transition-all duration-700 cursor-default">
            <div className={`w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-8 ${skill.color} group-hover:scale-110 transition-transform duration-500`}>
              {skill.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-headline">{skill.name}</h3>
              <div className="flex items-center justify-between pt-4">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Status</span>
                 <Badge variant="outline" className="text-[9px] border-primary/20 text-primary px-3 py-0.5">{skill.level}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
