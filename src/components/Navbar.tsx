'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Deployments', href: '#projects', icon: <Cpu className="w-4 h-4" /> },
    { name: 'Interface', href: '#terminal', icon: <Terminal className="w-4 h-4" /> },
    { name: 'Uplink', href: '#contact', icon: null },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-4 sm:px-6 py-4 ${isScrolled ? 'md:py-4' : 'md:py-8'}`}>
      <div className={`max-w-6xl mx-auto rounded-full transition-all duration-700 flex items-center justify-between px-6 py-3 sm:py-4 ${isScrolled ? 'glass-morphism shadow-[0_0_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bg-primary p-2 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-headline font-black tracking-tighter">
            ATHARVA<span className="text-accent">.AI</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-colors flex items-center gap-2"
            >
              {link.icon}
              {link.name}
            </a>
          ))}
          <Button variant="default" className="bg-primary rounded-full px-8 h-12 font-headline font-bold text-white shadow-lg hover:shadow-primary/30 transition-all border-t border-white/20" asChild>
            <a href="#contact">Neural Uplink</a>
          </Button>
        </div>

        {/* Mobile Nav Trigger */}
        <button 
          className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background/98 backdrop-blur-2xl z-[70] md:hidden flex flex-col items-center justify-center gap-12 p-8 animate-in fade-in zoom-in duration-300">
          <button className="absolute top-8 right-8 p-2 text-primary" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-10 h-10" />
          </button>
          
          <div className="text-4xl font-headline font-black tracking-tighter mb-12">
            ATHARVA<span className="text-accent">.AI</span>
          </div>

          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-headline font-bold text-slate-200 hover:text-accent transition-all tracking-tight"
            >
              {link.name}
            </a>
          ))}
          
          <Button 
            variant="default" 
            className="bg-primary rounded-2xl px-16 py-10 text-2xl font-headline font-bold shadow-2xl mt-12 w-full max-w-sm" 
            asChild 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <a href="#contact">Contact Core</a>
          </Button>
        </div>
      )}
    </nav>
  );
}