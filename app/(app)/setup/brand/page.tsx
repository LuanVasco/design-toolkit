"use client";

import { useBrandKit } from "@/app/context/BrandKitContext";
import React from "react";

export default function BrandSetupPage() {
  const {
    brandColor, setBrandColor,
    textColor, setTextColor,
    bgType, setBgType,
    bgColor1, setBgColor1,
    bgColor2, setBgColor2,
    bgAngle, setBgAngle,
  } = useBrandKit();

  // Helper para o preview visual do fundo
  const previewBackground = bgType === "solid" 
    ? { backgroundColor: bgColor1 } 
    : { background: `linear-gradient(${bgAngle}deg, ${bgColor1}, ${bgColor2})` };

  return (
    <div className="p-10 max-w-5xl mx-auto pt-16 animate-fade-in pb-20">
      
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2 font-serif-premium italic">Identidade & Atmosfera</h1>
        <p className="text-zinc-400">Configure as cores mestre e o ambiente visual do seu carrossel.</p>
      </header>
      
      {/* BLOCO 1: CORES DE MARCA E TEXTO */}
      <div className="glass-panel p-8 rounded-3xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Cor de Destaque (Dourado/Marca) */}
        <div className="space-y-4">
          <label className="block text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">Cor de Destaque (Marca)</label>
          <div className="flex items-center gap-4 bg-zinc-950 p-3 rounded-2xl border border-zinc-800 shadow-inner">
            <input 
              type="color" 
              value={brandColor} 
              onChange={(e) => setBrandColor(e.target.value)}
              className="w-10 h-10 rounded-lg border-0 bg-transparent cursor-pointer" 
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Destaque</span>
              <span className="text-sm font-bold text-zinc-100 uppercase">{brandColor}</span>
            </div>
          </div>
        </div>

        {/* Cor do Texto (Leitura) */}
        <div className="space-y-4">
          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Cor do Texto Base</label>
          <div className="flex items-center gap-4 bg-zinc-950 p-3 rounded-2xl border border-zinc-800 shadow-inner">
            <input 
              type="color" 
              value={textColor} 
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 rounded-lg border-0 bg-transparent cursor-pointer" 
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Tipografia</span>
              <span className="text-sm font-bold text-zinc-100 uppercase">{textColor}</span>
            </div>
          </div>
        </div>

      </div>

      {/* BLOCO 2: CONSTRUTOR DE BACKGROUND (FLUXO 360º) */}
      <div className="glass-panel p-8 rounded-3xl">
        <label className="block text-xs font-bold text-[#d4af37] uppercase tracking-widest mb-8 text-center">Configuração do Fundo Global</label>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            
            {/* Seletor de Tipo */}
            <div className="flex bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
              <button 
                onClick={() => setBgType("solid")} 
                className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${bgType === "solid" ? "bg-zinc-800 text-[#d4af37] shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                SÓLIDO
              </button>
              <button 
                onClick={() => setBgType("gradient")} 
                className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${bgType === "gradient" ? "bg-zinc-800 text-[#d4af37] shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                GRADIENTE
              </button>
            </div>

            {/* Pickers de Cores */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Cor Principal</label>
                <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 p-2.5 rounded-xl">
                  <input type="color" value={bgColor1} onChange={(e) => setBgColor1(e.target.value)} className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">{bgColor1}</span>
                </div>
              </div>

              {bgType === "gradient" && (
                <div className="space-y-2 animate-in fade-in duration-500">
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Cor Secundária</label>
                  <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 p-2.5 rounded-xl">
                    <input type="color" value={bgColor2} onChange={(e) => setBgColor2(e.target.value)} className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">{bgColor2}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Controle de Ângulo 360º */}
            {bgType === "gradient" && (
              <div className="space-y-4 pt-6 border-t border-zinc-800 animate-in slide-in-from-top-2 duration-500">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Direção do Fluxo (360º)</label>
                  <span className="text-xs font-bold text-[#d4af37] bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{bgAngle}º</span>
                </div>
                <input 
                  type="range" min="0" max="360" 
                  value={bgAngle} 
                  onChange={(e) => setBgAngle(Number(e.target.value))} 
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]" 
                />
              </div>
            )}
          </div>

          {/* PREVIEW DINÂMICO DE LEITURA */}
          <div className="space-y-6">
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Preview de Contraste</label>
            <div 
              className="h-64 rounded-3xl border border-zinc-800 shadow-2xl relative flex flex-col items-center justify-center p-10 text-center overflow-hidden transition-all duration-500"
              style={previewBackground}
            >
              {/* Overlay de brilho material */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
              
              {/* Elementos de Texto do Carrossel */}
              <div className="z-10 relative">
                <div className="w-12 h-1.5 mb-6 rounded-full mx-auto" style={{ backgroundColor: brandColor }}></div>
                <h3 className="text-3xl font-black font-serif-premium uppercase mb-4 leading-tight" style={{ color: textColor }}>
                  Mantenha o Foco no Conteúdo
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: brandColor }}>
                  Amostra de Estilo
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}