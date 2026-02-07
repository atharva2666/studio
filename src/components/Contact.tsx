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
      title: "Signature Copied",
      description: "Email address stored in clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-4xl mx-auto relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse" />
      
      <div className="text-center space-y-10">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Badge className="mb-6 bg-primary/10 text-primary border-none px-6 py-2 font-bold uppercase tracking-widest text-[10px] rounded-full">
            Available for Collaboration
          </Badge>
          
          <h2 className="text-5xl md:text-8xl font-headline font-bold mb-8 tracking-tight">
            Let's build<br />
            <span className="text-primary/80">something real.</span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-medium mb-12">
            Currently looking for new challenges and partnerships in AI and Robotics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all group w-full sm:w-auto"
              asChild
            >
              <a href={`mailto:${email}`}>
                Send Email
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button 
              variant="outline"
              size="lg"
              onClick={copyToClipboard}
              className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-lg w-full sm:w-auto"
            >
              {copied ? <Check className="mr-3 w-5 h-5 text-green-400" /> : <Copy className="mr-3 w-5 h-5" />}
              {copied ? "Copied" : "Copy Email"}
            </Button>
          </div>
        </div>

        <div className="pt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: <Fingerprint className="w-6 h-6" />, label: "Response", val: "24-48h" },
            { icon: <Sparkles className="w-6 h-6" />, label: "Zone", val: "Global" },
            { icon: <Mail className="w-6 h-6" />, label: "Status", val: "Active" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
              <div className="text-primary/60">{item.icon}</div>
              <div className="text-center">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                <p className="text-lg font-bold text-white/90">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}