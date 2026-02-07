'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Terminal, Cpu, Zap, Search, ShieldCheck, Ghost, Coffee, Code2, Radiation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type LogType = 'cmd' | 'resp' | 'err' | 'sys' | 'success';

export default function InteractiveExperience() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Array<{ text: string; type: LogType }>>([
    { text: 'Atharva.AI Neural Terminal [Ver 2.5.0-Stable]', type: 'sys' },
    { text: 'Establishing secure handshake... [OK]', type: 'sys' },
    { text: 'Type "help" to explore internal modules.', type: 'sys' },
  ]);
  const [isHacked, setIsHacked] = useState(false);
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
    const newHistory = [...history, { text: `root@atharva-core:~$ ${command}`, type: 'cmd' }];
    
    const respond = (text: string, type: LogType = 'resp') => {
      newHistory.push({ text, type });
    };

    switch(cmd) {
      case 'help':
        respond('Available Modules: about, skills, status, vision, secret, clear, hack, coffee');
        break;
      case 'about':
        respond('Atharva Bhatnagar: High-performance engineer specializing in Robotics, Machine Learning, and Multi-modal AI Agents. Currently optimizing for maximum innovation.');
        break;
      case 'skills':
        respond('Detected Proficiencies: Python, C++, React, ROS, PyTorch, GenKit, Three.js, Advanced Neural Architectures.');
        break;
      case 'status':
        respond('Core Temp: Nominal. Logic Gates: Optimized. Creativity: Overflowing.', 'success');
        break;
      case 'hack':
        respond('Initializing breach sequence... Accessing mainframe... 10%... 40%... 99%...', 'err');
        setTimeout(() => {
          setHistory(prev => [...prev, { text: 'ACCESS GRANTED. WAKE UP, ARCHITECT.', type: 'success' }]);
          setIsHacked(true);
        }, 1500);
        break;
      case 'vision':
        respond('Current Objective: Orchestrating the intersection of physical hardware and synthetic intelligence.');
        break;
      case 'coffee':
        respond('Error: Hardware requires caffeine injection. Please insert a latte to continue.', 'err');
        break;
      case 'secret':
        respond('Congratulations, explorer. Use command "matrix" to unlock the truth.', 'success');
        break;
      case 'matrix':
        respond('There is no spoon. Only code.');
        break;
      case 'clear':
        setHistory([]);
        setCommand('');
        setIsHacked(false);
        return;
      default:
        respond(`Critical Error: Command "${command}" unrecognized. Try "help" to avoid system instability.`, 'err');
    }

    setHistory(newHistory);
    setCommand('');
  };

  return (
    <section className="py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isHacked ? 'scale-[1.02] rotate-[0.5deg]' : ''}`}>
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 px-6 py-2 uppercase tracking-[0.4em] font-black rounded-full backdrop-blur-xl">
            Kernel Access
          </Badge>
          <h2 className="text-5xl md:text-7xl font-headline font-black tracking-tighter mb-6 hero-text-glow">
            NEURAL <span className="text-transparent bg-clip-text vibrant-gradient">CONSOLE.</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-lg mx-auto font-medium">Interface directly with my digital essence through the command line protocol.</p>
        </div>

        <Card className={`bg-black/90 border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden font-mono ring-2 ${isHacked ? 'ring-primary shadow-[0_0_50px_rgba(168,85,247,0.4)]' : 'ring-white/5'} transition-all duration-700`}>
          <div className="bg-slate-900/80 px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/40 border border-red-500/20" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500/40 border border-amber-500/20" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/40 border border-green-500/20" />
            </div>
            <div className="flex items-center gap-2.5 opacity-60">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">zsh — atharva-ai — decentralized</span>
            </div>
            <div className="w-12" />
          </div>
          
          <div ref={scrollRef} className="p-10 h-[500px] overflow-y-auto text-sm md:text-lg scrollbar-thin scrollbar-thumb-primary/20 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_100%)]">
            {history.map((line, i) => (
              <div key={i} className={`mb-3 font-medium tracking-tight animate-in fade-in slide-in-from-left-2 duration-300 ${
                line.type === 'cmd' ? 'text-accent' : 
                line.type === 'err' ? 'text-red-400 font-bold' : 
                line.type === 'sys' ? 'text-slate-500 italic' : 
                line.type === 'success' ? 'text-green-400 neon-glow' :
                'text-slate-200'
              }`}>
                {line.text}
              </div>
            ))}
            <form onSubmit={handleCommand} className="flex items-center mt-6 group">
              <span className="text-primary mr-4 font-black text-xl">λ</span>
              <input 
                type="text" 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="bg-transparent border-none outline-none text-white flex-1 caret-primary placeholder:text-white/5 font-bold"
                autoFocus
                placeholder="await system_init()..."
              />
            </form>
          </div>
          
          <div className="bg-black/60 px-8 py-5 border-t border-white/5 flex flex-wrap gap-8 items-center justify-between text-[11px] font-black text-slate-500">
            <div className="flex gap-10">
              <span className="flex items-center gap-2.5 group cursor-help"><Cpu className="w-4 h-4 text-primary group-hover:animate-spin" /> Core: Active</span>
              <span className="flex items-center gap-2.5"><ShieldCheck className="w-4 h-4 text-green-500" /> Security: SSL-V3</span>
              <span className="flex items-center gap-2.5"><Radiation className={`w-4 h-4 ${isHacked ? 'text-red-500 animate-ping' : 'text-slate-500'}`} /> {isHacked ? 'BREACH' : 'STABLE'}</span>
            </div>
            <div className="flex gap-10">
              <span className="flex items-center gap-2.5"><Code2 className="w-4 h-4" /> Node: v20.1</span>
              <span className="flex items-center gap-2.5 text-primary animate-pulse shadow-primary/20"><Zap className="w-4 h-4" /> Uplink: 10Gbps</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}