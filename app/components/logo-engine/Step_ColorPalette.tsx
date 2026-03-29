"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Palette } from "lucide-react";

const PALETTES = [
  { id: "gold", name: "Luxury Gold", colors: ["#d4af37", "#1a1a1a"], desc: "Prestígio e Exclusividade" },
  { id: "tech", name: "Cyber Blue", colors: ["#3b82f6", "#020617"], desc: "Inovação e Confiança" },
  { id: "deep", name: "Deep Emerald", colors: ["#10b981", "#064e3b"], desc: "Crescimento e Vitalidade" },
  { id: "minimal", name: "Pure Stark", colors: ["#ffffff", "#000000"], desc: "Minimalismo Absoluto" },
];

export const Step_ColorPalette = ({ onSelect, selectedId }: any) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">Sua Assinatura Cromática.</h2>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">A cor define o impacto emocional imediato.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.colors[0])}
            className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group ${
              selectedId === p.colors[0] ? "bg-white/10 border-[#d4af37]" : "bg-zinc-900/30 border-white/5 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {p.colors.map((c) => (
                  <div key={c} className="w-10 h-10 rounded-full border-2 border-black shadow-xl" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div className="text-left">
                <span className="block text-sm font-black uppercase tracking-tight">{p.name}</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase">{p.desc}</span>
              </div>
            </div>
            {selectedId === p.colors[0] && <Check className="text-[#d4af37]" size={20} />}
          </button>
        ))}
      </div>
    </motion.div>
  );
};