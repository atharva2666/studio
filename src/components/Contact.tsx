'use client';

import React from 'react';
import { Mail, ShieldCheck, ArrowRight, Fingerprint } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Contact() {
  const email = "atharva.orchild@gmail.com";

  return (
    <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
      <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <Badge className="mb-10 bg-primary/10 text-primary border-none px-6 py-2 font-bold uppercase tracking-[0.4em] text-[10px] rounded-full">
          Secure Communications Protocol
        </Badge>
        
        <h2 className="text-6xl md:text-8xl font-headline font-black mb-12 tracking-tighter leading-none">
          DIRECT <br /><span className="text-accent italic">UPLINK.</span>
        </h2>
        
        <p className="text-slate-600 text-xl md:text-3xl mb-20 leading-relaxed font-medium max-w-3xl mx-auto">
          For critical mission parameters or high-level collaboration, initiate a direct link.
        </p>
        
        <div className="relative group inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[3rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          
          <a 
            href={`mailto:${email}`}
            className="relative flex items-center gap-6 px-12 py-8 bg-white rounded-[3rem] border border-primary/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-95"
          >
            <div className="p-5 rounded-2xl bg-primary text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Mail className="w-8 h-8" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-1">Primary Endpoint</p>
              <span className="text-2xl md:text-4xl font-headline font-bold text-slate-800 break-all">
                {email}
              </span>
            </div>
            <ArrowRight className="w-8 h-8 text-primary ml-4 group-hover:translate-x-2 transition-transform hidden md:block" />
          </a>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-400">
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-100">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Signature: AB-24-SECURE</p>
          </div>
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-100">
            <Fingerprint className="w-5 h-5 text-primary" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Auth: Verified Human</p>
          </div>
        </div>
      </div>
    </section>
  );
}
