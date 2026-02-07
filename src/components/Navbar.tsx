
'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${isScrolled ? 'md:py-4' : 'md:py-8'}`}>
      <div className={`max-w-6xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between px-6 py-3 ${isScrolled ? 'glass-morphism' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-headline font-black tracking-tighter">ATHARVA<span className="text-accent">.AI</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button variant="default" className="bg-primary rounded-full px-6 font-headline hover:bg-primary/90" asChild>
            <a href="#contact">Hire Me</a>
          </Button>
        </div>

        {/* Mobile Nav Trigger */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center gap-8 p-12">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-headline font-bold hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button variant="default" className="bg-primary rounded-full px-12 py-6 text-xl font-headline" asChild onClick={() => setIsMobileMenuOpen(false)}>
            <a href="#contact">Hire Me</a>
          </Button>
        </div>
      )}
    </nav>
  );
}
