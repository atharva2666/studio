'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 py-6 px-6 ${isScrolled ? 'py-3' : 'py-8'}`}>
      <div className={`max-w-6xl mx-auto flex items-center justify-between px-8 py-3.5 rounded-2xl transition-all duration-700 ${isScrolled ? 'glass-morphism shadow-2xl scale-[0.98]' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
            <Cpu className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-headline font-black tracking-tighter">
            ATHARVA<span className="text-primary/60">.AI</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/70 hover:text-primary transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <Button variant="default" className="bg-primary hover:bg-primary/90 rounded-xl px-6 h-9 font-bold text-[10px] uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-500" asChild>
            <a href="#contact">Uplink</a>
          </Button>
        </div>

        {/* Mobile Trigger */}
        <button className="md:hidden p-2 text-white/70" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background/98 backdrop-blur-3xl z-50 flex flex-col items-center justify-center gap-16 animate-in fade-in zoom-in-95 duration-500">
          <button className="absolute top-8 right-8 p-3 bg-white/5 rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-headline font-black tracking-tighter hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <Button size="lg" className="rounded-2xl px-12 h-16 text-lg font-bold bg-primary" asChild onClick={() => setIsMobileMenuOpen(false)}>
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      )}
    </nav>
  );
}