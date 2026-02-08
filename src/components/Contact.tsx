'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, Copy, Check, Fingerprint, Sparkles, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function Contact() {
  const db = useFirestore();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', text: '' });
  
  const email = "atharva.orchild@gmail.com";

  const handleUplink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) return;

    setLoading(true);
    const messagesRef = collection(db, 'messages');
    
    addDocumentNonBlocking(messagesRef, {
      ...form,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Uplink Successful",
      description: "Message transmitted to core systems.",
    });
    
    setForm({ name: '', text: '' });
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast({ title: "Address Secured", description: "Email stored in clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-6xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        <div className="space-y-12">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary border-none px-6 py-2 font-black uppercase tracking-widest text-[10px] rounded-full">
              SECURE UPLINK PROTOCOL
            </Badge>
            <h2 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter leading-none">
              Start<br />
              <span className="text-primary/60">Execution.</span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-md leading-relaxed font-medium">
              Architecting the next generation of industrial AI and high-precision robotics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <Button 
                variant="outline"
                size="lg"
                onClick={copyToClipboard}
                className="h-20 rounded-3xl border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-white font-bold text-lg justify-start px-8 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-primary" />}
                </div>
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Direct Access</p>
                  <p className="text-sm">Copy Endpoint</p>
                </div>
              </Button>

              <div className="h-20 rounded-3xl border border-white/5 bg-white/[0.02] px-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Zone</p>
                  <p className="text-sm font-bold">GMT+5:30</p>
                </div>
              </div>
          </div>
        </div>

        <div className="glass-morphism rounded-[2.5rem] p-10 lg:p-14 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -z-10" />
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-headline">Transmit Signal</h3>
            <p className="text-muted-foreground text-sm">Fill all parameters to initiate contact.</p>
          </div>

          <form onSubmit={handleUplink} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Identity</label>
              <Input 
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Name or Organization" 
                className="h-14 rounded-2xl bg-white/[0.03] border-white/5 focus:ring-primary/50 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Payload</label>
              <Textarea 
                value={form.text}
                onChange={e => setForm({...form, text: e.target.value})}
                placeholder="Protocol description..." 
                className="min-h-[160px] rounded-3xl bg-white/[0.03] border-white/5 focus:ring-primary/50 text-white"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg group shadow-2xl shadow-primary/20"
            >
              {loading ? "Transmitting..." : "Initiate Uplink"}
              <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </form>
        </div>

      </div>
    </section>
  );
}