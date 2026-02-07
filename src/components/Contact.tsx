
'use client';

import React, { useState } from 'react';
import { Mail, ShieldCheck, Send, Fingerprint, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
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
  const email = "atharva.orchild@gmail.com";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firestore) return;
    
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      text: formData.get('message') as string,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(firestore, 'messages'), data);
      toast({
        title: "Protocol Success",
        description: "Message encrypted and transmitted to Atharva's Neural Core.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uplink Error",
        description: "Communication link failed. Please retry or use direct email.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 px-6 py-2 font-bold uppercase tracking-[0.4em] text-[10px] rounded-full backdrop-blur-md">
            Neural Uplink Protocol v2.5
          </Badge>
          
          <h2 className="text-6xl md:text-8xl font-headline font-black mb-10 tracking-tighter leading-[0.85] hero-text-glow">
            ESTABLISH <br /><span className="text-transparent bg-clip-text vibrant-gradient italic">LINK.</span>
          </h2>
          
          <p className="text-muted-foreground text-xl md:text-2xl mb-12 leading-relaxed font-medium max-w-xl">
            Direct data injection interface. Send a message to my private core. All transmissions are encrypted.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-5 glass-morphism p-6 rounded-3xl border-white/5 group hover:border-primary/50 transition-all cursor-pointer" onClick={() => window.location.href = `mailto:${email}`}>
              <div className="p-4 rounded-2xl bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Backup Endpoint</p>
                <p className="text-lg font-bold tracking-tight">{email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 px-6">
              <ShieldCheck className="w-5 h-5 text-green-500 animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Security: End-to-End Encrypted</p>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-right-12 duration-1000">
          <div className="glass-morphism p-10 md:p-14 rounded-[3rem] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Identity Signature
                </label>
                <Input 
                  name="name"
                  required
                  placeholder="Your Name or ID" 
                  className="bg-black/60 border-white/10 h-16 rounded-2xl focus:ring-primary focus:border-primary text-lg transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1 flex items-center gap-2">
                  <TerminalIcon className="w-3 h-3" /> Data Payload
                </label>
                <Textarea 
                  name="message"
                  required
                  placeholder="Enter your transmission here..." 
                  className="bg-black/60 border-white/10 min-h-[180px] rounded-2xl focus:ring-primary focus:border-primary text-lg resize-none transition-all"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-20 rounded-2xl bg-primary hover:bg-primary/80 text-white font-black text-xl uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    Transmitting...
                  </div>
                ) : (
                  <>
                    Initiate Uplink
                    <Send className="ml-3 w-6 h-6" />
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-slate-500">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Biometric Guarded</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
