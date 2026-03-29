"use client";

import React from "react";
import { Lightbulb, TrendingUp, AlertCircle } from "lucide-react";
import { getStrategicInsights } from "@/app/lib/brand-logic";

export const StrategicPanel = ({ niche, color }: { niche: string, color: string }) => {
  const { score, tips } = getStrategicInsights(niche, color);

  return (
    <div className="bg-zinc-900/60 border border-[#d4af37]/30 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(212,175,55,0.05)] h-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-1">MBA Insight Engine</h3>
          <p className="text-xl font-black italic tracking-tighter uppercase">Brand Health Score</p>
        </div>
        <div className="relative flex items-center justify-center">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
            <circle 
              cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" 
              strokeDasharray={226} strokeDashoffset={226 - (226 * score) / 100}
              className="text-[#d4af37] transition-all duration-1000"
            />
          </svg>
          <span className="absolute text-sm font-black italic">{score}%</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-[#d4af37]">
          <TrendingUp size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Recomendações Estratégicas</span>
        </div>

        <ul className="space-y-4">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-4 group">
              <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                <Lightbulb size={10} className="text-zinc-500 group-hover:text-[#d4af37]" />
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors">
                {tip}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
          <AlertCircle size={14} className="text-zinc-600" />
          <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest leading-tight">
            Análise baseada em padrões de mercado de {niche}.
          </p>
        </div>
      </div>
    </div>
  );
};