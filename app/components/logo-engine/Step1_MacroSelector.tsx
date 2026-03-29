"use client";
import React from "react";
import { motion } from "framer-motion";
import { Layers, Zap, Type } from "lucide-react";

const ARCHITECTURES = [
  { 
    id: "geometrico", 
    title: "Geométrica", 
    desc: "Layouts construídos sobre grids matemáticos e formas puras.",
    icon: <Zap size={24} />,
    tag: "Moderna / SaaS"
  },
  { 
    id: "monograma", 
    title: "Monograma", 
    desc: "Foco na heráldica moderna. Suas iniciais como um símbolo de força.",
    icon: <Layers size={24} />,
    tag: "Luxo / Autoridade"
  },
  { 
    id: "tipografico", 
    title: "Tipográfica", 
    desc: "A pureza da letra. Foco total em legibilidade e wordmark.",
    icon: <Type size={24} />,
    tag: "Minimalista / Agência"
  }
];

export const Step1_MacroSelector = ({ onSelect, brandColor }: any) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter">Qual a arquitetura da sua Marca?</h2>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">Escolha a fundação. Nosso algoritmo construirá o layout a partir dela.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARCHITECTURES.map((arch) => (
          <button
            key={arch.id}
            onClick={() => onSelect(arch.id)}
            className="group relative p-10 rounded-[3rem] bg-zinc-900/20 border border-white/5 hover:border-white/20 transition-all text-left overflow-hidden"
          >
            {/* Efeito de hover com a cor da marca */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" 
              style={{ backgroundColor: brandColor }} 
            />
            
            <div className="mb-8 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
              {React.cloneElement(arch.icon as React.ReactElement, { color: brandColor })}
            </div>

            <div className="space-y-4">
              <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: brandColor }}>{arch.tag}</span>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{arch.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">{arch.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};