"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Minus, Sparkles } from "lucide-react";

export const ComparisonTable = () => {
  const rows = [
    { label: "Custo de Entrada", d: "R$ 2.000+", c: "Tempo/Foco", n: "Acessível", status: "success" },
    { label: "Velocidade", d: "7-15 dias", c: "3-5 horas", n: "Segundos", status: "success" },
    { label: "Efeito 3D (Z-Axis)", d: <Check className="text-emerald-500 mx-auto" />, c: <X className="text-red-500 mx-auto" />, n: <Sparkles className="text-[#d4af37] mx-auto" />, status: "success" },
    { label: "Foco em Conversão", d: <Minus className="text-zinc-600 mx-auto" />, c: <X className="text-red-500 mx-auto" />, n: <Check className="text-[#d4af37] mx-auto" />, status: "success" },
    { label: "Padronização (Brand)", d: <Minus className="text-zinc-600 mx-auto" />, c: <Minus className="text-zinc-600 mx-auto" />, n: <Check className="text-[#d4af37] mx-auto" />, status: "success" },
  ];

  return (
    <section id="comparativo" className="py-24 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black font-serif-premium mb-4 italic">
            Por que o <span className="text-[#d4af37]">DesignGen OS?</span>
          </h2>
          <p className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-black">A comparação definitiva de ROI</p>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800/50 bg-zinc-900/10 backdrop-blur-sm">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[700px] text-center border-collapse">
              <thead>
                <tr className="border-b border-zinc-800/50">
                  <th className="py-10 px-6 text-left text-zinc-500 uppercase tracking-widest text-[10px] font-black w-1/4">Feature</th>
                  <th className="py-10 px-6 w-1/4">
                    <span className="text-zinc-400 font-bold block mb-1">Freelancer</span>
                    <span className="text-[9px] text-zinc-600 uppercase font-black">Caro e Lento</span>
                  </th>
                  <th className="py-10 px-6 w-1/4">
                    <span className="text-zinc-400 font-bold block mb-1">Canva / Figma</span>
                    <span className="text-[9px] text-zinc-600 uppercase font-black">Trabalho Manual</span>
                  </th>
                  <th className="py-10 px-6 w-1/4 relative">
                    {/* Glow de destaque na coluna */}
                    <div className="absolute inset-0 bg-[#d4af37]/5 z-0"></div>
                    <div className="relative z-10">
                      <span className="text-[#d4af37] font-black block mb-1">DesignGen OS</span>
                      <span className="text-[9px] bg-[#d4af37] text-black px-2 py-0.5 rounded font-black uppercase">Automático</span>
                    </div>
                  </th>
                </tr>
              </thead>
              
              <tbody className="text-sm font-bold">
                {rows.map((row, i) => (
                  <tr key={i} className="group border-b border-zinc-900/50 hover:bg-white/5 transition-colors">
                    <td className="py-8 px-6 text-left text-zinc-300 font-medium border-r border-zinc-900/50">{row.label}</td>
                    <td className="py-8 px-6 text-zinc-500">{row.d}</td>
                    <td className="py-8 px-6 text-zinc-500">{row.c}</td>
                    <td className="py-8 px-6 bg-[#d4af37]/5 text-white relative">
                      {/* Se for a última linha, arredonda o fundo do destaque */}
                      {i === rows.length - 1 && <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#d4af37]/5 rounded-b-[2.5rem]"></div>}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {row.n}
                      </motion.div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumo visual rápido abaixo da tabela */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 text-center">
            <p className="text-2xl font-black text-white mb-1">10x</p>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Mais Rápido</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-[#d4af37]/20 text-center shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            <p className="text-2xl font-black text-[#d4af37] mb-1">95%</p>
            <p className="text-[10px] text-[#d4af37] uppercase font-bold tracking-widest">Mais Barato</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 text-center">
            <p className="text-2xl font-black text-white mb-1">3x</p>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Mais Retenção</p>
          </div>
        </div>
      </div>
    </section>
  );
};