'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X, Terminal } from 'lucide-react';
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
    { name: 'Console', href: '#terminal' },
    { name: 'Uplink', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-6 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-6xl mx-auto flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 ${isScrolled ? 'glass-morphism shadow-xl' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-headline font-bold tracking-tight">
            ATHARVA<span className="text-primary/60">.AI</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button variant="default" className="bg-primary hover:bg-primary/90 rounded-full px-6 h-10 font-bold text-[11px] uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/10" asChild>
            <a href="#contact">Contact</a>
          </Button>
        </div>

        {/* Mobile Trigger */}
        <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center gap-12 animate-in fade-in duration-300">
          <button className="absolute top-8 right-8 p-2" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-headline font-bold hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button size="lg" className="rounded-2xl px-12 h-16 text-xl font-bold bg-primary" asChild onClick={() => setIsMobileMenuOpen(false)}>
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      )}
    </nav>
  );
}