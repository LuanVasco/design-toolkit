"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MousePointer2, ShieldCheck, Sparkles } from "lucide-react";

interface DraftState {
  brandName: string;
  brandColor: string;
  titleFont: string;
  logoUrl: string;
  avatarUrl: string;
  persona: string;
  composition: "stacked" | "inline"; // 🚀 Nova Prop de Arquitetura
}

interface LivePreviewCardProps {
  draft: DraftState;
  step: number;
}

const PERSONA_DETAILS: Record<string, { label: string; tag: string }> = {
  premium: { label: "Estética Minimalista & Alta Conversão", tag: "Luxo Digital" },
  autoridade: { label: "Presença Técnica & Liderança de Mercado", tag: "Especialista" },
  amigavel: { label: "Conexão Humana & Narrativa Visual", tag: "Social-First" },
};

export const LivePreviewCard = ({ draft, step }: LivePreviewCardProps) => {
  const isInline = draft.composition === "inline";

  return (
    <section className="hidden lg:flex flex-1 items-center justify-center p-20 relative overflow-hidden bg-[#020202]">
      
      {/* 🌌 BACKGROUND REATIVO: Grid que "pulsa" com a cor da marca */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
          style={{ 
            background: `radial-gradient(circle at 50% 50%, ${draft.brandColor}15 0%, transparent 70%)` 
          }}
        />
      </div>

      {/* 🚀 O CARD: Glassmorphism High-End */}
      <motion.div 
        layout
        className="relative w-full max-w-[440px] aspect-[4/5] rounded-[4rem] bg-zinc-950/40 border border-white/5 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between p-12"
      >
        {/* Glow de Canto */}
        <motion.div 
          animate={{ backgroundColor: draft.brandColor }}
          className="absolute -top-20 -right-20 w-48 h-48 blur-[80px] opacity-10"
        />

        {/* ================= HEADER: LOGO ENGINE PREVIEW ================= */}
        <div className="relative z-10 flex flex-col gap-8">
          <div className={`flex ${isInline ? 'flex-row items-center gap-4' : 'flex-col items-center text-center'} transition-all duration-500`}>
            
            {/* Slot do Ícone/Logo */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={draft.logoUrl ? 'custom' : 'gen'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex-shrink-0 flex items-center justify-center rounded-2xl ${isInline ? 'w-12 h-12' : 'w-20 h-20'} bg-white/5 border border-white/10`}
              >
                {draft.logoUrl ? (
                  <img src={draft.logoUrl} className="w-full h-full object-contain p-2" alt="Logo" />
                ) : (
                  <Sparkles size={isInline ? 20 : 32} style={{ color: draft.brandColor }} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nome da Marca com Tipografia Dinâmica */}
            <motion.h1 
              layout
              className={`font-black uppercase tracking-tighter text-white transition-all ${isInline ? 'text-2xl' : 'text-3xl mt-4'}`}
              style={{ fontFamily: draft.titleFont }}
            >
              {draft.brandName || "Marca"}
            </motion.h1>
          </div>

          <motion.div 
            animate={{ width: isInline ? "40px" : "80px" }}
            className="h-1 rounded-full mx-auto" 
            style={{ backgroundColor: draft.brandColor }}
          />
        </div>

        {/* ================= BODY: PERSONA & VALUE PROP ================= */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <ShieldCheck size={12} style={{ color: draft.brandColor }} />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">
              {PERSONA_DETAILS[draft.persona]?.tag || "Ready for Launch"}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black italic tracking-tighter text-zinc-100 leading-[0.9]">
              Autoridade <br />
              <span style={{ color: draft.brandColor }}>Digital.</span>
            </h2>
            <AnimatePresence mode="wait">
              <motion.p 
                key={draft.persona}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[11px] font-bold text-zinc-500 leading-relaxed max-w-[260px] uppercase tracking-wider"
              >
                {PERSONA_DETAILS[draft.persona]?.label || PERSONA_DETAILS.premium.label}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* ================= FOOTER: USER CONTEXT ================= */}
        <div className="relative z-10 pt-8 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden shadow-inner">
               {draft.avatarUrl ? (
                 <img src={draft.avatarUrl} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center opacity-20"><User size={20} /></div>
               )}
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-white">
                @{draft.brandName ? draft.brandName.toLowerCase().replace(/\s/g, '') : "usuário"}
              </span>
              <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">Strategic Intelligence</span>
            </div>
          </div>

          <motion.div 
            animate={{ 
              y: [0, -4, 0],
              color: step >= 4 ? draft.brandColor : "#27272a" 
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <MousePointer2 size={24} className="rotate-[-15deg] drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
          </motion.div>
        </div>

        {/* Detalhe estético: Número do Passo no Background */}
        <span className="absolute -bottom-10 -left-10 text-[15rem] font-black text-white/[0.02] pointer-events-none select-none">
          0{step}
        </span>
      </motion.div>
    </section>
  );
};