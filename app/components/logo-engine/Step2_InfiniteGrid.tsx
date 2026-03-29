"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2, RefreshCcw, Type } from "lucide-react";
import { LogoConfig } from "../engine/combinator";
import { LogoRenderer } from "./LogoRenderer";
import { LOGO_FONTS } from "@/app/lib/logo-fonts"; // Puxando nosso banco de fontes

interface Step2Props {
  brandName: string;
  brandColor: string;
  currentFont: string;
  options: LogoConfig[];
  isProcessing: boolean;
  onSelectDesign: (c: LogoConfig) => void;
  onGenerateMore: () => void;
  onChangeFont: (font: string) => void; // Nova prop para mudar a fonte
}

export const Step2_InfiniteGrid = ({ 
  brandName, brandColor, currentFont, options, isProcessing, onSelectDesign, onGenerateMore, onChangeFont 
}: Step2Props) => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full flex flex-col items-center">
      
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tighter leading-tight">
          Explorando <span style={{ color: brandColor }} className="italic">Direções.</span>
        </h1>
        <p className="text-zinc-400 text-xs uppercase tracking-widest">O layout geométrico com a tipografia perfeita.</p>
      </div>

      {/* 🚀 MENU RÁPIDO DE TIPOGRAFIA */}
      <div className="w-full max-w-5xl mb-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">
          <Type size={12} /> Teste outras Tipografias
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {/* Pegamos 1 fonte chave de cada categoria para teste rápido */}
          {["Inter", "Playfair Display", "Bebas Neue", "Montserrat", "Outfit", "Space Grotesk"].map(font => (
            <button 
              key={font}
              onClick={() => onChangeFont(font)}
              className={`px-4 py-2 rounded-full text-[11px] transition-all border ${currentFont === font ? 'bg-white text-black font-black border-white' : 'bg-transparent text-zinc-400 font-bold border-white/10 hover:border-white/30'}`}
              style={{ fontFamily: `"${font}", sans-serif` }}
            >
              {font}
            </button>
          ))}
        </div>
      </div>

      {/* O GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {options.map((config) => (
          <button 
            key={config.id} onClick={() => onSelectDesign(config)} disabled={isProcessing}
            className="group flex flex-col items-center p-6 rounded-[2rem] bg-zinc-950/50 border border-white/5 hover:bg-white/[0.03] hover:border-white/20 transition-all h-64 relative overflow-hidden"
          >
            <LogoRenderer config={config} brandName={brandName} />
          </button>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button onClick={onGenerateMore} disabled={isProcessing} className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors">
          {isProcessing ? <Loader2 className="animate-spin" size={16} /> : <RefreshCcw size={16} />}
          Explorar Novos Shapes
        </button>
      </div>
    </motion.div>
  );
};