'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, MessageSquareQuote, Fingerprint } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Contact() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-5">
          <Badge className="mb-6 bg-accent/10 text-accent border-none px-4 py-1 font-bold uppercase tracking-widest text-[10px]">Secure Channel</Badge>
          <h2 className="text-6xl md:text-7xl font-headline font-black mb-8 tracking-tighter leading-none">
            ESTABLISH <span className="text-primary italic">UPLINK.</span>
          </h2>
          <p className="text-slate-600 text-xl mb-12 leading-relaxed font-medium">
            Ready to collaborate on the next evolution of intelligent systems? Reach out directly via the primary protocol.
          </p>
          
          <div className="space-y-10">
            <div className="group cursor-pointer block">
              <div className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white shadow-2xl shadow-primary/5 border border-primary/5 transition-all duration-500 hover:-translate-y-2">
                <div className="p-5 rounded-2xl bg-primary text-white">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Direct Protocol</p>
                  <span className="text-xl md:text-2xl font-headline font-bold text-slate-800 break-all">atharva.orchild@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div className="pt-10 border-t border-primary/5">
              <div className="flex items-center gap-4 text-slate-400">
                <Fingerprint className="w-5 h-5" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Verified Identity: Atharva Bhatnagar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Card className="bg-white rounded-[3rem] border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] p-4 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <MessageSquareQuote className="w-32 h-32 text-primary" />
            </div>
            
            <CardContent className="pt-10">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-1">Origin Node / Name</label>
                    <Input placeholder="Identify yourself" className="bg-slate-50 border-none rounded-2xl h-16 focus-visible:ring-accent text-lg px-6" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-1">Return Path / Email</label>
                    <Input placeholder="your@endpoint.com" type="email" className="bg-slate-50 border-none rounded-2xl h-16 focus-visible:ring-accent text-lg px-6" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-1">Project Code / Subject</label>
                  <Input placeholder="Mission objective" className="bg-slate-50 border-none rounded-2xl h-16 focus-visible:ring-accent text-lg px-6" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-1">Data Stream / Message</label>
                  <Textarea placeholder="Transmit details..." className="min-h-[200px] bg-slate-50 border-none rounded-3xl focus-visible:ring-accent text-lg p-6" />
                </div>
                
                <Button className="w-full bg-primary hover:bg-slate-900 h-20 text-xl font-headline font-black rounded-full gap-4 group shadow-2xl shadow-primary/20 transition-all">
                  INITIALIZE TRANSMISSION 
                  <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
