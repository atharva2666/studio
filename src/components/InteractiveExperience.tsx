'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Terminal, Cpu, Zap, ShieldCheck, Code2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type LogType = 'cmd' | 'resp' | 'err' | 'sys' | 'success';

export default function InteractiveExperience() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Array<{ text: string; type: LogType }>>([
    { text: 'System Initialized. Protocol ATH-V2.8.0', type: 'sys' },
    { text: 'Type "help" to list available modules.', type: 'sys' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmd = command.toLowerCase().trim();
    const newHistory = [...history, { text: `user@core:~$ ${command}`, type: 'cmd' }];
    
    const respond = (text: string, type: LogType = 'resp') => {
      newHistory.push({ text, type });
    };

    switch(cmd) {
      case 'help':
        respond('Modules: about, skills, status, vision, clear');
        break;
      case 'about':
        respond('Atharva Bhatnagar: Specialized in AI Agents, Robotics, and high-performance engineering.');
        break;
      case 'skills':
        respond('Proficiencies: Python, C++, React, ROS, PyTorch, GenKit, Three.js.');
        break;
      case 'status':
        respond('Core: Operational. Latency: Minimal. Logic: Optimized.', 'success');
        break;
      case 'clear':
        setHistory([]);
        setCommand('');
        return;
      default:
        respond(`Unknown command: ${command}. Try "help".`, 'err');
    }

    setHistory(newHistory);
    setCommand('');
  };

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <div className="mb-12 text-center space-y-4">
        <Badge className="bg-primary/10 text-primary border-none px-4 py-1 font-bold uppercase tracking-widest text-[9px] rounded-full">
          Console Access
        </Badge>
        <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">System Console.</h2>
      </div>

      <Card className="glass-morphism border-none overflow-hidden shadow-2xl rounded-[2.5rem]">
        <div className="bg-white/5 px-8 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center gap-2 opacity-40">
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Neural Kernel</span>
          </div>
          <div className="w-10" />
        </div>
        
        <div ref={scrollRef} className="p-8 h-[400px] overflow-y-auto font-mono text-sm bg-black/20">
          {history.map((line, i) => (
            <div key={i} className={`mb-2 ${
              line.type === 'cmd' ? 'text-primary' : 
              line.type === 'err' ? 'text-rose-400' : 
              line.type === 'sys' ? 'text-muted-foreground italic' : 
              line.type === 'success' ? 'text-emerald-400' :
              'text-white/80'
            }`}>
              {line.text}
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex items-center mt-4">
            <span className="text-primary mr-3 font-bold">›</span>
            <input 
              type="text" 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="bg-transparent border-none outline-none text-white/90 flex-1 caret-primary placeholder:text-white/5"
              autoFocus
              placeholder="enter command..."
            />
          </form>
        </div>
        
        <div className="bg-white/5 px-8 py-4 flex items-center justify-between text-[10px] font-bold text-muted-foreground">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Cpu className="w-3 h-3" /> Core Active</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Encrypted</span>
          </div>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Code2 className="w-3 h-3" /> Node v20.x</span>
          </div>
        </div>
      </Card>
    </section>
  );
}
