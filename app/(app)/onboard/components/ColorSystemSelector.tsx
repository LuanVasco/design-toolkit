"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette, ShieldCheck } from "lucide-react";

// --- SISTEMAS DE CORES SEMÂNTICOS ---
// Indexação: [0] Background, [1] Surface (Cards), [2] Primary (Destaque/Logo), [3] Text
export const COLOR_SYSTEMS = [
  { 
    id: "p1", 
    name: "Midnight Gold", 
    desc: "Luxo, exclusividade e alto padrão.",
    colors: ["#020202", "#121212", "#d4af37", "#fef08a"] 
  },
  { 
    id: "p2", 
    name: "Cyber Blue", 
    desc: "Tecnologia, confiança e inovação.",
    colors: ["#020617", "#0f172a", "#3b82f6", "#93c5fd"] 
  },
  { 
    id: "p3", 
    name: "Crimson Noir", 
    desc: "Poder, impacto e energia pura.",
    colors: ["#1a0505", "#2e0909", "#ef4444", "#fca5a5"] 
  },
  { 
    id: "p4", 
    name: "Deep Emerald", 
    desc: "Saúde, crescimento e estabilidade.",
    colors: ["#022c22", "#064e3b", "#10b981", "#6ee7b7"] 
  },
  { 
    id: "p5", 
    name: "Pure Minimal", 
    desc: "Clareza, objetividade e sofisticação.",
    colors: ["#000000", "#171717", "#ffffff", "#a3a3a3"] 
  },
];

interface ColorSystemSelectorProps {
  activePaletteId: string;
  onSelect: (palette: typeof COLOR_SYSTEMS[0]) => void;
}

export const ColorSystemSelector = ({ activePaletteId, onSelect }: ColorSystemSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <Palette size={14} /> Sistema Cromático
        </label>
        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">
          Passo 2 de 3
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COLOR_SYSTEMS.map((sys) => {
          const isActive = activePaletteId === sys.id;
          const [bg, surface, primary, text] = sys.colors;

          return (
            <motion.button
              key={sys.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(sys)}
              className={`relative flex flex-col p-5 rounded-[2rem] border text-left transition-all duration-300 overflow-hidden group ${
                isActive 
                  ? 'bg-white/5 border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.4)]' 
                  : 'bg-transparent border-white/5 hover:bg-white/[0.03] hover:border-white/10'
              }`}
              style={{
                borderColor: isActive ? `${primary}50` : undefined,
              }}
            >
              {/* Checkmark Ativo */}
              {isActive && (
                <div className="absolute top-5 right-5 z-20">
                  <ShieldCheck size={18} style={{ color: primary }} />
                </div>
              )}

              {/* 🎨 O PULO DO GATO: Mini UI Mockup */}
              <div 
                className="w-full h-28 rounded-2xl mb-5 p-4 flex flex-col justify-between relative overflow-hidden border border-white/5"
                style={{ backgroundColor: bg }}
              >
                {/* Glow decorativo no mockup */}
                <div className="absolute -top-10 -right-10 w-20 h-20 blur-2xl opacity-40" style={{ backgroundColor: primary }} />
                
                {/* Header Fake */}
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md" style={{ backgroundColor: primary }} />
                    <div className="w-16 h-2 rounded-full" style={{ backgroundColor: text }} />
                  </div>
                </div>

                {/* Body Fake (Card de conteúdo) */}
                <div className="w-full p-3 rounded-xl flex flex-col gap-2 relative z-10" style={{ backgroundColor: surface }}>
                  <div className="w-3/4 h-1.5 rounded-full" style={{ backgroundColor: text }} />
                  <div className="w-1/2 h-1.5 rounded-full" style={{ backgroundColor: text, opacity: 0.5 }} />
                  <div className="mt-2 w-full h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: primary }}>
                    <div className="w-10 h-1 rounded-full" style={{ backgroundColor: bg }} />
                  </div>
                </div>
              </div>

              {/* Informações da Paleta */}
              <div className="space-y-1">
                <span className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  {sys.name}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: primary }} />}
                </span>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                  {sys.desc}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};