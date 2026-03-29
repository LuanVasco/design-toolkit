"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layers, LayoutTemplate } from "lucide-react";
import { StudioTemplate } from "../../studio/utils/presetTemplates";

interface TemplateCardProps {
  tpl: StudioTemplate;
  onSelect: (id: string) => void; // 🚀 1. Atualizado para exigir o envio do ID
}

export const TemplateCard = ({ tpl, onSelect }: TemplateCardProps) => {
  // Puxamos as cores nativas do preset (se houver) para dar identidade ao card
  const bgColor = tpl.theme?.bgColor1 || "#0f0f11";
  const accentColor = tpl.theme?.brandColor || "#d4af37";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative"
    >
      <button
        onClick={() => onSelect(tpl.id)} // 🚀 2. Dispara enviando o ID específico do template
        className="w-full text-left bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md hover:border-white/20 transition-all duration-300 shadow-xl"
      >
        {/* ÁREA DE IMAGEM/PREVIEW (CORES DO PRESET) */}
        <div 
          className="h-56 w-full relative p-8 flex flex-col justify-between transition-colors duration-500"
          style={{ backgroundColor: bgColor }}
        >
          {/* Textura sutil */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.1] mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.2em] text-white/80">
              {tpl.category || "Carrossel"}
            </div>
            <LayoutTemplate size={16} className="text-white/40 group-hover:text-white/90 transition-opacity" />
          </div>

          <div className="relative z-10">
            {/* Tracinho de destaque usando a cor do preset */}
            <div 
              className="w-10 h-1.5 rounded-full mb-4 shadow-lg transition-all duration-500 group-hover:w-16"
              style={{ backgroundColor: accentColor }}
            />
            <h3 
              className="text-2xl font-black text-white leading-[1] tracking-tighter uppercase italic drop-shadow-lg"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              {tpl.name}
            </h3>
          </div>
        </div>

        {/* INFORMAÇÕES DE TEXTO */}
        <div className="p-8 bg-zinc-950/90 backdrop-blur-xl">
          <p className="text-zinc-500 text-xs font-medium leading-relaxed mb-6 line-clamp-2 min-h-[32px]">
            {tpl.description}
          </p>
          
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-white/5">
                  <Layers size={14} className="text-zinc-400" />
                </div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  {tpl.slides?.length || 0} Slides
                </span>
             </div>
             
             <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
};