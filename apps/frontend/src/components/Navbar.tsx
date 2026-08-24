'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Menu, X, ChevronRight, HeartPulse, History, Info, Home } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/assessment', label: 'Skrining', icon: Activity },
  { href: '/history', label: 'Riwayat', icon: History },
  { href: '/about', label: 'Tentang', icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-panel border-b border-white/[0.07] shadow-xl shadow-black/30'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 opacity-80 group-hover:opacity-100 transition-opacity blur-[1px]" />
              <div className="relative h-full w-full rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg">
                <HeartPulse className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-black tracking-tight text-white">
                MediRisk <span className="health-gradient-text">AI</span>
              </span>
              <div className="text-[10px] text-slate-400 font-medium -mt-0.5 leading-none">
                Skrining Kesehatan Preventif
              </div>
            </div>
            <span className="sm:hidden text-lg font-black text-white">
              Medi<span className="health-gradient-text">Risk</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-sky-400 bg-sky-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* SDG Badge (desktop only) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/25 text-[11px]">
              <div className="h-5 w-5 rounded bg-emerald-600 flex items-center justify-center text-white font-black text-[10px]">
                3
              </div>
              <span className="text-emerald-400 font-semibold">SDG 3</span>
              <span className="text-slate-400">Kehidupan Sehat</span>
            </div>

            {/* CTA Button */}
            <Link
              href="/assessment"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)' }}
            >
              Mulai Skrining
              <ChevronRight className="h-4 w-4" />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 glass-panel border-l border-white/[0.07] shadow-2xl transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20 space-y-2">
            <div className="mb-6 pb-4 border-b border-white/[0.07]">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Navigasi</p>
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/assessment"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-sky-500/20"
              style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)' }}
            >
              <Activity className="h-4 w-4" />
              Mulai Skrining Sekarang
            </Link>

            <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center gap-2 px-2">
              <div className="h-6 w-6 rounded bg-emerald-600 flex items-center justify-center text-white font-black text-[10px]">
                3
              </div>
              <div>
                <p className="text-[11px] font-bold text-emerald-400">SDG 3</p>
                <p className="text-[10px] text-slate-400">Kehidupan Sehat & Sejahtera</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
