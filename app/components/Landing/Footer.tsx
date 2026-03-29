"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, Globe } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900/50 pt-24 pb-12 relative overflow-hidden">
      {/* Glow de Fundo Sutil */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[20vw] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- SEÇÃO DE CTA FINAL --- */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-8 font-serif-premium leading-tight"
          >
            Domine o Feed com <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fcd34d] to-[#b5952f] italic">Profundidade.</span>
          </motion.h2>
          
          <Link 
            href="/login" 
            className="group relative inline-flex items-center justify-center bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 overflow-hidden"
          >
            {/* Efeito Shimmer */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
            Abrir o Estúdio
          </Link>
        </div>

        {/* --- GRID DE LINKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20 border-t border-zinc-900/50 pt-16">
          
          {/* Logo e Bio */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#997a15] flex items-center justify-center text-black font-black text-xs">
                DG
              </div>
              <span className="text-xl font-bold tracking-tighter font-serif-premium italic text-white">DesignGen OS</span>
            </div>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed max-w-xs">
              A primeira engine de motion design panorâmico para empreendedores que não aceitam o comum.
            </p>
          </div>

          {/* Links: Produto */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Produto</h4>
            <ul className="space-y-3">
              <li><Link href="/studio" className="text-xs text-zinc-600 hover:text-[#d4af37] transition-colors font-bold">Estúdio</Link></li>
              <li><Link href="/upgrade" className="text-xs text-zinc-600 hover:text-[#d4af37] transition-colors font-bold">Planos</Link></li>
              <li><Link href="/setup/brand" className="text-xs text-zinc-600 hover:text-[#d4af37] transition-colors font-bold">BrandKits</Link></li>
            </ul>
          </div>

          {/* Links: Suporte */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-xs text-zinc-600 hover:text-[#d4af37] transition-colors font-bold">Termos</Link></li>
              <li><Link href="#" className="text-xs text-zinc-600 hover:text-[#d4af37] transition-colors font-bold">Privacidade</Link></li>
              <li><Link href="#" className="text-xs text-zinc-600 hover:text-[#d4af37] transition-colors font-bold">Cookies</Link></li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Social</h4>
            <div className="flex gap-4">
              <Link href="#" className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-700 transition-all"><Instagram size={14} /></Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-700 transition-all"><Linkedin size={14} /></Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-700 transition-all"><Twitter size={14} /></Link>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-zinc-900/50 pt-10">
          <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.2em]">
            © {currentYear} DesignGen OS. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-[9px] text-zinc-700 font-black uppercase tracking-[0.2em]">
            <Globe size={10} />
            <span>São Paulo, Brasil</span>
          </div>
        </div>

      </div>
    </footer>
  );
};