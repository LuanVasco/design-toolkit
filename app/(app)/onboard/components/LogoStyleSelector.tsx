"use client";

import React from "react";
import { motion } from "framer-motion";
import { Type, Layers, Zap, Hexagon, CircleDot, ShieldCheck } from "lucide-react";

// --- ARQUÉTIPOS DE MERCADO ---
const EXPANDED_LOGO_TYPES = [
  { 
    id: "tipografico", 
    label: "Wordmark", 
    desc: "Apenas texto estilizado. Ideal para nomes curtos e fortes.",
    icon: Type,
    mockup: "layout-text" // Representação visual da anatomia
  },
  { 
    id: "monograma", 
    label: "Lettermark", 
    desc: "Foco nas iniciais. Perfeito para marcas pessoais (Ex: L.S).",
    icon: Layers,
    mockup: "layout-initials"
  },
  { 
    id: "geometrico", 
    label: "Geométrico", 
    desc: "Símbolo abstrato + Texto. Passa inovação e tecnologia.",
    icon: Zap,
    mockup: "layout-icon-text"
  },
  { 
    id: "minimal", 
    label: "Minimalista", 
    desc: "Traços finos e muito respiro. Alto luxo e sofisticação.",
    icon: CircleDot,
    mockup: "layout-minimal"
  },
  { 
    id: "badge", 
    label: "Emblema / Selo", 
    desc: "Texto dentro do símbolo. Traz tradição e autoridade.",
    icon: Hexagon,
    mockup: "layout-badge"
  },
];

interface LogoStyleSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
  brandColor: string;
}

export const LogoStyleSelector = ({ selectedType, onSelect, brandColor }: LogoStyleSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
          Arquitetura Visual da Marca
        </label>
        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">
          Passo 1 de 3
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {EXPANDED_LOGO_TYPES.map((type) => {
          const isActive = selectedType === type.id;
          
          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(type.id)}
              className={`relative flex flex-col p-5 rounded-2xl border text-left transition-all duration-300 overflow-hidden group ${
                isActive 
                  ? 'bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
                  : 'bg-transparent border-white/5 hover:bg-white/[0.03] hover:border-white/10'
              }`}
              style={{
                borderColor: isActive ? `${brandColor}50` : undefined,
              }}
            >
              {/* Checkmark Ativo */}
              {isActive && (
                <div className="absolute top-4 right-4">
                  <ShieldCheck size={16} style={{ color: brandColor }} />
                </div>
              )}

              {/* Mockup Visual da Estrutura (Ilustração UI) */}
              <div className={`h-16 w-full mb-4 rounded-xl border border-white/5 flex items-center justify-center bg-zinc-950/50 transition-colors ${isActive ? 'border-white/10' : 'group-hover:border-white/10'}`}>
                {type.mockup === "layout-text" && (
                  <div className="w-16 h-3 rounded-full bg-zinc-700" style={{ backgroundColor: isActive ? brandColor : undefined }} />
                )}
                {type.mockup === "layout-initials" && (
                  <div className="w-8 h-8 rounded-md bg-zinc-700" style={{ backgroundColor: isActive ? brandColor : undefined }} />
                )}
                {type.mockup === "layout-icon-text" && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-sm bg-zinc-700" style={{ backgroundColor: isActive ? brandColor : undefined }} />
                    <div className="w-10 h-2.5 rounded-full bg-zinc-800" />
                  </div>
                )}
                {type.mockup === "layout-minimal" && (
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" style={{ backgroundColor: isActive ? brandColor : undefined }} />
                    <div className="w-8 h-1 rounded-full bg-zinc-800" />
                  </div>
                )}
                {type.mockup === "layout-badge" && (
                  <div className="w-10 h-10 rounded-full border-2 border-zinc-700 flex items-center justify-center" style={{ borderColor: isActive ? brandColor : undefined }}>
                    <div className="w-4 h-1 rounded-full bg-zinc-800" />
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="flex items-center gap-2 mb-1.5">
                <type.icon size={14} style={{ color: isActive ? brandColor : '#71717a' }} />
                <span className="text-sm font-black uppercase tracking-wider text-white">
                  {type.label}
                </span>
              </div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase leading-relaxed">
                {type.desc}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};