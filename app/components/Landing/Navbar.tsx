"use client";

import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-black font-serif-premium italic tracking-tight flex items-center gap-2">
          Estúdio Carrossel <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <a href="#como-funciona" className="hover:text-[#d4af37] transition-colors">A Ferramenta</a>
          <a href="#comparativo" className="hover:text-[#d4af37] transition-colors">Por que nós?</a>
          <a href="#pricing" className="hover:text-[#d4af37] transition-colors">Planos</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Login</Link>
          <Link href="/studio" className="bg-[#d4af37] text-black px-5 py-2.5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#e5c158] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105">
            Criar Grátis
          </Link>
        </div>
      </div>
    </nav>
  );
};