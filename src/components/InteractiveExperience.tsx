
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Terminal, Cpu, Zap, Search, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function InteractiveExperience() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Array<{ text: string; type: 'cmd' | 'resp' | 'err' | 'sys' }>>([
    { text: 'Atharva.AI Terminal [Version 2.4.0]', type: 'sys' },
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
    const newHistory = [...history, { text: `user@atharva:~$ ${command}`, type: 'cmd' }];
    
    const respond = (text: string, type: 'resp' | 'err' | 'sys' = 'resp') => {
      newHistory.push({ text, type });
    };

    switch(cmd) {
      case 'help':
        respond('Available modules: about, projects, contact, clear, status, matrix, scan');
        break;
      case 'about':
        respond('Atharva Bhatnagar: Engineer specializing in Robotics, Machine Learning, and Multi-modal AI agents.');
        break;
      case 'projects':
        respond('Active deployments: Olivia AI (GPT-based agent), VisionTest (Model evaluation framework), RoverCore (ROS project).');
        break;
      case 'status':
        respond('All systems operational. Brain: 100% capacity. Creativity: Overclocked.');
        break;
      case 'clear':
        setHistory([]);
        setCommand('');
        return;
      case 'matrix':
        respond('Wake up, Atharva... The white rabbit is waiting.');
        break;
      case 'scan':
        respond('Scanning local network... [Found 1 high-value talent: Atharva Bhatnagar]');
        break;
      default:
        respond(`Error: Module "${command}" not found. Try "help".`, 'err');
    }

    setHistory(newHistory);
    setCommand('');
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white/50 border-y border-primary/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 px-4 py-1.5 uppercase tracking-widest font-bold">Terminal Access</Badge>
          <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tight mb-4">Interactive <span className="text-primary">Console</span></h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">Interface directly with my digital presence through the command line.</p>
        </div>

        <Card className="bg-[#0c0c0e] border-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden font-mono ring-1 ring-white/10">
          <div className="bg-[#1a1a1c] px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/20" />
            </div>
            <div className="flex items-center gap-2 opacity-40">
              <Terminal className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">sh — atharva-dev — 80x24</span>
            </div>
            <div className="w-12" /> {/* spacer */}
          </div>
          
          <div ref={scrollRef} className="p-8 h-[450px] overflow-y-auto text-sm md:text-base scrollbar-thin scrollbar-thumb-white/10">
            {history.map((line, i) => (
              <div key={i} className={`mb-2 font-medium tracking-tight ${
                line.type === 'cmd' ? 'text-accent' : 
                line.type === 'err' ? 'text-red-400' : 
                line.type === 'sys' ? 'text-slate-500 italic' : 
                'text-slate-300'
              }`}>
                {line.text}
              </div>
            ))}
            <form onSubmit={handleCommand} className="flex items-center mt-4 group">
              <span className="text-primary mr-3 font-bold">λ</span>
              <input 
                type="text" 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="bg-transparent border-none outline-none text-white flex-1 caret-accent placeholder:text-white/10"
                autoFocus
                placeholder="system_init..."
              />
            </form>
          </div>
          
          <div className="bg-[#121214] px-6 py-3 border-t border-white/5 flex items-center justify-between text-[11px] font-bold text-slate-500">
            <div className="flex gap-6">
              <span className="flex items-center gap-1.5"><Cpu className="w-3 h-3" /> Core: Active</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Security: SSL</span>
            </div>
            <div className="flex gap-6">
              <span className="flex items-center gap-1.5"><Search className="w-3 h-3" /> Search: Indexing</span>
              <span className="flex items-center gap-1.5 text-accent animate-pulse"><Zap className="w-3 h-3" /> Connected</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
