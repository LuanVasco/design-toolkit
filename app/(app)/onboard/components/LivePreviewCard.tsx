"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MousePointer2 } from "lucide-react";

interface DraftState {
  brandName: string;
  brandColor: string;
  titleFont: string;
  logoUrl: string;
  avatarUrl: string;
  persona: string;
}

interface LivePreviewCardProps {
  draft: DraftState;
  step: number;
}

// Dicionário de tons baseados na persona
const PERSONA_TEXTS: Record<string, string> = {
  premium: "Design que comunica valor e sofisticação extrema.",
  autoridade: "Resultados sólidos para quem busca liderança.",
  amigavel: "Conexões reais com seu público ideal.",
};

export const LivePreviewCard = ({ draft, step }: LivePreviewCardProps) => {
  return (
    <section className="hidden lg:flex flex-1 items-center justify-center p-20 relative overflow-hidden bg-[#020202]">
      {/* Grid de fundo reativo */}
      <motion.div 
        animate={{ opacity: step === 4 ? 0.8 : 0.3 }}
        className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] transition-opacity duration-1000" 
      />
      
      {/* Card Flutuante Mágico */}
      <motion.div 
        layout // 🚀 Magia do Framer: redimensiona suavemente se o conteúdo mudar
        className="relative w-full max-w-[420px] aspect-[4/5] rounded-[3.5rem] bg-zinc-950 border border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-between p-14"
        style={{ 
          // O fundo recebe um tom muito escuro da cor da marca
          backgroundColor: draft.brandColor ? `${draft.brandColor}08` : '#0a0a0a' 
        }}
      >
        {/* Glow animado no topo */}
        <motion.div 
          animate={{ backgroundColor: draft.brandColor }}
          transition={{ duration: 0.8 }}
          className="absolute -top-32 -right-32 w-64 h-64 blur-[100px] opacity-20 pointer-events-none"
        />

        {/* ================= HEADER DO CARD ================= */}
        <div className="flex justify-between items-start mt-4 relative z-10">
          <div className="h-10 w-24 flex items-center">
            <AnimatePresence mode="wait">
              {draft.logoUrl ? (
                <motion.img 
                  key="logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  src={draft.logoUrl} 
                  className="max-h-full object-contain" 
                  alt="Sua Logo"
                />
              ) : (
                <motion.span 
                  key="text-logo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl font-black uppercase tracking-tighter" 
                  style={{ fontFamily: draft.titleFont, color: draft.brandColor }}
                >
                  {draft.brandName ? draft.brandName.substring(0, 3) : "GEN"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <motion.div 
            layout
            className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {draft.avatarUrl ? (
                <motion.img 
                  key="avatar"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  src={draft.avatarUrl} 
                  className="w-full h-full object-cover" 
                  alt="Seu Perfil"
                />
              ) : (
                <motion.div key="avatar-placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <User size={24} className="text-zinc-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ================= CORPO DO CARD ================= */}
        <div className="space-y-8 relative z-10">
          <motion.div 
            animate={{ backgroundColor: draft.brandColor }}
            className="w-14 h-2 rounded-full" 
          />
          
          <motion.h2 
            layout="position"
            className="text-[2.8rem] font-black uppercase tracking-tighter leading-[0.85] text-white" 
            style={{ fontFamily: draft.titleFont }}
          >
            {draft.brandName || "Marca"} <br />
            <motion.span 
              animate={{ color: draft.brandColor }}
              transition={{ duration: 0.5 }}
            >
              Transformada.
            </motion.span>
          </motion.h2>
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={draft.persona}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-zinc-400 text-[11px] font-black uppercase tracking-[0.3em] leading-relaxed max-w-[280px]"
            >
               {PERSONA_TEXTS[draft.persona] || PERSONA_TEXTS.premium}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ================= RODAPÉ DO CARD ================= */}
        <div className="pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
               {draft.avatarUrl ? <img src={draft.avatarUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-white/10" />}
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-white leading-none">
                @ {draft.brandName ? draft.brandName.toLowerCase().replace(/\s/g, '') : "seuuser"}
              </span>
              <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1">DesignGen Intelligence</span>
            </div>
          </div>
          
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              color: step === 4 ? draft.brandColor : "#3f3f46"
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <MousePointer2 size={24} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};