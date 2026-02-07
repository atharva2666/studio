'use client';

import React, { useState } from 'react';
import { Send, Fingerprint, ShieldCheck, Sparkles, Terminal as TerminalIcon, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { toast } from '@/hooks/use-toast';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const firestore = useFirestore();
  const ownerEmail = "atharva.orchild@gmail.com";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firestore) {
      toast({
        variant: "destructive",
        title: "System Error",
        description: "Firebase service is unavailable. Please try again later.",
      });
      return;
    }
    
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const text = formData.get('message') as string;

    const payload = {
      name,
      text,
      timestamp: serverTimestamp(),
    };

    try {
      // 1. Record in Firestore for logs
      await addDoc(collection(firestore, 'messages'), payload);
      
      // 2. Trigger the automated email uplink for immediate notification
      const subject = encodeURIComponent(`Neural Uplink from ${name}`);
      const body = encodeURIComponent(`Uplink Signature: ${name}\n\nData Payload:\n${text}`);
      const mailtoUrl = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
      
      toast({
        title: "Uplink Recorded",
        description: "Data synchronized. Redirecting to final transmission portal...",
      });

      // Give the user a moment to read the toast before opening mail client
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1500);

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Transmission Failed",
        description: "Could not establish uplink. Please use direct email: " + ownerEmail,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-16 sm:gap-24 items-center">
        <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
          <Badge className="mb-8 bg-primary/20 text-primary-foreground border-primary/40 px-6 py-2.5 font-black uppercase tracking-[0.4em] text-[10px] rounded-full backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            Neural Feedback Protocol
          </Badge>
          
          <h2 className="text-6xl sm:text-8xl font-headline font-black mb-10 tracking-tighter leading-[0.85] hero-text-glow">
            DIRECT <br /><span className="text-transparent bg-clip-text vibrant-gradient italic">UPLINK.</span>
          </h2>
          
          <p className="text-slate-300 text-lg sm:text-2xl mb-12 leading-relaxed font-medium max-w-xl">
            Input your signature and data payload. This portal establishes a direct link to my core processing unit.
          </p>

          <div className="hidden sm:block space-y-6">
            <div 
              className="flex items-center gap-6 glass-morphism p-8 rounded-[2rem] border-white/10 group hover:border-primary/50 transition-all cursor-pointer overflow-hidden relative"
              onClick={() => window.location.href = `mailto:${ownerEmail}`}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-4 rounded-2xl bg-primary/20 text-primary group-hover:scale-110 transition-transform relative z-10 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <Mail className="w-8 h-8" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Backup Endpoint</p>
                <p className="text-xl font-bold tracking-tight text-white">{ownerEmail}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-right-12 duration-1000">
          <div className="glass-morphism p-8 sm:p-14 rounded-[3rem] relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/30 rounded-full blur-3xl opacity-50" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-1 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> Identity Signature
                </label>
                <Input 
                  name="name"
                  required
                  placeholder="Enter your name..." 
                  className="bg-black/60 border-white/10 h-16 rounded-2xl focus:ring-primary focus:border-primary text-lg transition-all placeholder:text-slate-600 px-6"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-1 flex items-center gap-2">
                  <TerminalIcon className="w-3.5 h-3.5" /> Data Payload
                </label>
                <Textarea 
                  name="message"
                  required
                  placeholder="Transmit your message here..." 
                  className="bg-black/60 border-white/10 min-h-[200px] rounded-2xl focus:ring-primary focus:border-primary text-lg resize-none transition-all placeholder:text-slate-600 p-6"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-20 rounded-2xl bg-primary hover:bg-primary/80 text-white font-black text-xl uppercase tracking-[0.25em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_-10px_rgba(168,85,247,0.5)] border-t border-white/20"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    Synchronizing...
                  </div>
                ) : (
                  <>
                    Initiate Transmission
                    <Send className="ml-4 w-6 h-6 animate-pulse" />
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-10 text-slate-500">
            <div className="flex items-center gap-2.5">
              <Fingerprint className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Identity Verified</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Encryption active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}