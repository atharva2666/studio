'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, Copy, Check, Fingerprint, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "atharva.orchild@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast({
      title: "Signature Captured",
      description: "Email address copied to neural clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] bg-primary/5 rounded-full blur-[180px] -z-10 pointer-events-none animate-pulse" />
      
      <div className="text-center space-y-12">
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <Badge className="mb-8 bg-primary/20 text-primary-foreground border-primary/40 px-8 py-3 font-black uppercase tracking-[0.5em] text-[10px] rounded-full backdrop-blur-3xl shadow-2xl">
            Protocol: Direct Uplink
          </Badge>
          
          <h2 className="text-6xl sm:text-8xl md:text-[10rem] font-headline font-black mb-12 tracking-tighter leading-[0.8] hero-text-glow">
            ESTABLISH<br />
            <span className="text-transparent bg-clip-text vibrant-gradient italic">CONNECTION.</span>
          </h2>
          
          <p className="text-slate-400 text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed font-medium mb-16">
            Bypassing middleware for direct transmission. My neural core is synchronized and awaiting your signal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg"
              className="h-24 px-12 rounded-[2rem] bg-primary hover:bg-primary/80 text-white font-black text-2xl uppercase tracking-[0.2em] shadow-[0_25px_50px_-12px_rgba(168,85,247,0.5)] border-t border-white/20 transition-all hover:scale-[1.05] active:scale-[0.95] group w-full sm:w-auto"
              asChild
            >
              <a href={`mailto:${email}`}>
                Initiate Uplink
                <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </a>
            </Button>

            <Button 
              variant="outline"
              size="lg"
              onClick={copyToClipboard}
              className="h-24 px-12 rounded-[2rem] border-2 border-primary/20 bg-white/5 backdrop-blur-xl hover:bg-primary/10 text-primary font-black text-2xl uppercase tracking-[0.2em] transition-all hover:scale-[1.05] active:scale-[0.95] w-full sm:w-auto"
            >
              {copied ? <Check className="mr-4 w-8 h-8 text-green-400" /> : <Copy className="mr-4 w-8 h-8" />}
              {copied ? "Copied" : "Copy Signature"}
            </Button>
          </div>
        </div>

        <div className="pt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {[
            { icon: <Fingerprint className="w-10 h-10" />, label: "Identity", val: "Verified" },
            { icon: <Sparkles className="w-10 h-10" />, label: "Encryption", val: "Quantum" },
            { icon: <Mail className="w-10 h-10" />, label: "Channel", val: "Secured" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4 group cursor-default">
              <div className="p-6 rounded-3xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-xl border border-white/5">
                {item.icon}
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">{item.label}</p>
                <p className="text-xl font-bold text-white">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}