"use client";

import React from "react";
import { motion } from "framer-motion";
import { Type, ShieldCheck, AlignLeft } from "lucide-react";

// --- SISTEMAS TIPOGRÁFICOS DE ALTA CONVERSÃO ---
export const FONT_PAIRINGS = [
  { 
    id: "modern", 
    titleFont: "Inter", 
    subFont: "Inter", 
    label: "Moderno & Clean",
    desc: "Clareza absoluta. O padrão ouro para Startups e Tech."
  },
  { 
    id: "impact", 
    titleFont: "Bebas Neue", 
    subFont: "Montserrat", 
    label: "Editorial Impacto",
    desc: "Forte e imponente. Ideal para Marketing e Lançamentos."
  },
  { 
    id: "luxury", 
    titleFont: "Playfair Display", 
    subFont: "Lora", 
    label: "Luxo & Tradição",
    desc: "Elegância clássica. Excelente para Consultoria e Direito."
  },
  { 
    id: "tech", 
    titleFont: "Space Grotesk", 
    subFont: "Inter", 
    label: "Tech Vanguarda",
    desc: "Geometria futurista. A cara da inovação e Web3."
  },
];

interface FontPairingSelectorProps {
  activePairingId: string;
  onSelect: (pairing: typeof FONT_PAIRINGS[0]) => void;
  brandColor: string;
}

export const FontPairingSelector = ({ activePairingId, onSelect, brandColor }: FontPairingSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <Type size={14} /> Hierarquia Tipográfica
        </label>
        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">
          Passo 3 de 3
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FONT_PAIRINGS.map((pairing) => {
          const isActive = activePairingId === pairing.id;

          return (
            <motion.button
              key={pairing.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(pairing)}
              className={`relative flex flex-col p-6 rounded-[2rem] border text-left transition-all duration-300 overflow-hidden group ${
                isActive 
                  ? 'bg-white/5 border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.4)]' 
                  : 'bg-transparent border-white/5 hover:bg-white/[0.03] hover:border-white/10'
              }`}
              style={{
                borderColor: isActive ? `${brandColor}50` : undefined,
              }}
            >
              {/* Checkmark Ativo */}
              {isActive && (
                <div className="absolute top-5 right-5 z-20">
                  <ShieldCheck size={18} style={{ color: brandColor }} />
                </div>
              )}

              {/* 📖 O PULO DO GATO: Mini Artigo / Preview Real */}
              <div className="w-full mb-6 relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-2 opacity-50">
                  <AlignLeft size={12} />
                  <span className="text-[8px] font-bold uppercase tracking-widest" style={{ fontFamily: pairing.subFont }}>
                    Preview H1 + P
                  </span>
                </div>
                
                {/* Simulador de Título (H1) */}
                <span 
                  className="text-2xl sm:text-3xl font-black tracking-tight leading-[0.9] text-white" 
                  style={{ fontFamily: pairing.titleFont }}
                >
                  Design que <span style={{ color: isActive ? brandColor : undefined }} className="transition-colors">Vende.</span>
                </span>
                
                {/* Simulador de Corpo de Texto (Paragraph) */}
                <p 
                  className="text-[11px] text-zinc-400 font-medium leading-relaxed" 
                  style={{ fontFamily: pairing.subFont }}
                >
                  A tipografia certa não apenas embeleza, ela direciona o olhar e constrói autoridade instantânea.
                </p>
              </div>

              {/* Informações da Combinação */}
              <div className="mt-auto border-t border-white/5 pt-4 w-full">
                <span className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2 mb-1">
                  {pairing.label}
                </span>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider leading-relaxed">
                  {pairing.desc}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};