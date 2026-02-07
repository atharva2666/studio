
'use client';

import React, { useState } from 'react';
import { Mail, ShieldCheck, Send, Fingerprint, Terminal as TerminalIcon } from 'lucide-react';
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
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      text: formData.get('message') as string,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(firestore, 'messages'), data);
      toast({
        title: "Transmission Received",
        description: "Your message has been encrypted and sent to my core processing unit.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Protocol Failure",
        description: "Communication link could not be established. Please try again or use direct email.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
          <Badge className="mb-8 bg-primary/20 text-primary border-primary/30 px-6 py-2 font-bold uppercase tracking-[0.4em] text-[10px] rounded-full">
            Neural Uplink Protocol
          </Badge>
          
          <h2 className="text-6xl md:text-8xl font-headline font-black mb-10 tracking-tighter leading-none hero-text-glow">
            ESTABLISH <br /><span className="text-accent italic">LINK.</span>
          </h2>
          
          <p className="text-slate-400 text-xl md:text-2xl mb-12 leading-relaxed font-medium max-w-xl">
            Initiate a direct data transfer. For high-priority missions, utilize the secure portal or primary endpoint.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 group hover:border-primary/50 transition-all">
              <div className="p-3 rounded-xl bg-primary/20 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Primary Endpoint</p>
                <p className="text-lg font-bold">{email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Signature: AB-25-NEURAL</p>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-right-12 duration-1000">
          <div className="glass-morphism p-8 md:p-12 rounded-[2.5rem] relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Identity</label>
                  <Input 
                    name="name"
                    required
                    placeholder="Full Name" 
                    className="bg-black/40 border-white/5 h-14 rounded-xl focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Response Path</label>
                  <Input 
                    name="email"
                    type="email"
                    required
                    placeholder="email@example.com" 
                    className="bg-black/40 border-white/5 h-14 rounded-xl focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Data Payload</label>
                <Textarea 
                  name="message"
                  required
                  placeholder="Initiate communication parameters..." 
                  className="bg-black/40 border-white/5 min-h-[150px] rounded-xl focus:ring-primary focus:border-primary resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 rounded-xl bg-primary hover:bg-primary/90 text-white font-black text-lg uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                {loading ? (
                  "Syncing..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <div className="mt-8 flex justify-center gap-8 text-slate-600">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Biometric Validated</span>
            </div>
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
