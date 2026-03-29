"use client";

import React from "react";
import { useBrandKit } from "@/app/context/BrandKitContext";

export default function HooksSetupPage() {
  const brandKit = useBrandKit();

  // Função para aplicar presets de cores rápidos
  const applyPreset = (theme: "dark" | "gold" | "light") => {
    if (theme === "dark") {
      brandKit.setHookBgColor("#09090b");
      brandKit.setHookTitleColor("#d4af37");
      brandKit.setHookSubtitleColor("#ffffff");
    } else if (theme === "gold") {
      brandKit.setHookBgColor("#d4af37");
      brandKit.setHookTitleColor("#09090b");
      brandKit.setHookSubtitleColor("#18181b");
    } else {
      brandKit.setHookBgColor("#ffffff");
      brandKit.setHookTitleColor("#000000");
      brandKit.setHookSubtitleColor("#4b5563");
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto pt-16 animate-fade-in pb-24">
      
      {/* HEADER DINÂMICO */}
      <div className="flex justify-between items-end mb-10 border-b border-zinc-800 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 font-serif-premium italic tracking-tight">
            Finalizador de Impacto
          </h1>
          <p className="text-zinc-500 font-medium">
            O último slide é onde a conversão acontece. Escolha sua estratégia.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Status do Hook</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={brandKit.hookEnabled} onChange={(e) => brandKit.setHookEnabled(e.target.checked)} />
            <div className="w-14 h-7 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#d4af37] after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-6 after:transition-all shadow-inner"></div>
          </label>
        </div>
      </div>

      {!brandKit.hookEnabled ? (
        <div className="glass-panel p-20 rounded-[3rem] text-center border-dashed border-2 border-zinc-800">
           <span className="text-4xl mb-4 block">🔌</span>
           <h3 className="text-zinc-400 font-bold uppercase tracking-widest">O slide de fechamento está desativado</h3>
           <p className="text-zinc-600 text-sm mt-2">Ative no canto superior para configurar seu CTA.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUNA DE CONTROLES (LARGURA 7) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. ESTRATÉGIA DE CONVERSÃO */}
            <section>
              <label className="text-[11px] font-black text-[#d4af37] uppercase tracking-[0.3em] mb-6 block">1. Estratégia de Conversão</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { brandKit.setHookType("save"); brandKit.setHookTitle("SALVE PARA CONSULTAR"); }}
                  className={`group relative p-8 rounded-[2rem] border-2 transition-all text-left overflow-hidden ${brandKit.hookType === "save" ? "border-[#d4af37] bg-zinc-900 shadow-[0_0_30px_rgba(212,175,55,0.1)]" : "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"}`}
                >
                  <div className="relative z-10">
                    <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform">🔖</span>
                    <h4 className={`font-bold text-sm uppercase tracking-widest ${brandKit.hookType === "save" ? "text-white" : "text-zinc-500"}`}>Reter Autoridade</h4>
                    <p className="text-[10px] text-zinc-600 mt-1 leading-relaxed">Foca em salvamentos para aumentar o alcance orgânico.</p>
                  </div>
                  {brandKit.hookType === "save" && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></div>}
                </button>

                <button 
                  onClick={() => { brandKit.setHookType("follow"); brandKit.setHookTitle("SIGA PARA EVOLUIR"); }}
                  className={`group relative p-8 rounded-[2rem] border-2 transition-all text-left overflow-hidden ${brandKit.hookType === "follow" ? "border-[#d4af37] bg-zinc-900 shadow-[0_0_30px_rgba(212,175,55,0.1)]" : "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"}`}
                >
                  <div className="relative z-10">
                    <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform">👤</span>
                    <h4 className={`font-bold text-sm uppercase tracking-widest ${brandKit.hookType === "follow" ? "text-white" : "text-zinc-500"}`}>Crescer Base</h4>
                    <p className="text-[10px] text-zinc-600 mt-1 leading-relaxed">Convite direto para novos seguidores conhecerem seu perfil.</p>
                  </div>
                  {brandKit.hookType === "follow" && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></div>}
                </button>
              </div>
            </section>

            {/* 2. ATMOSFERA VISUAL */}
            <section className="glass-panel p-8 rounded-[2.5rem] border border-zinc-800/50">
              <div className="flex justify-between items-center mb-6">
                <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em]">2. Atmosfera Visual</label>
                <div className="flex gap-2">
                  <button onClick={() => applyPreset("dark")} className="w-6 h-6 rounded-full bg-black border border-zinc-700 hover:scale-110 transition shadow-lg"></button>
                  <button onClick={() => applyPreset("gold")} className="w-6 h-6 rounded-full bg-[#d4af37] border border-white/20 hover:scale-110 transition shadow-lg"></button>
                  <button onClick={() => applyPreset("light")} className="w-6 h-6 rounded-full bg-white border border-zinc-300 hover:scale-110 transition shadow-lg"></button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-zinc-600 uppercase">Fundo do Slide</span>
                  <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
                    <input type="color" value={brandKit.hookBgColor} onChange={(e) => brandKit.setHookBgColor(e.target.value)} className="w-8 h-8 rounded-lg border-0 bg-transparent cursor-pointer" />
                    <span className="text-xs font-mono text-zinc-500 uppercase">{brandKit.hookBgColor}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-zinc-600 uppercase">Cor dos Textos</span>
                  <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
                    <input type="color" value={brandKit.hookTitleColor} onChange={(e) => brandKit.setHookTitleColor(e.target.value)} className="w-8 h-8 rounded-lg border-0 bg-transparent cursor-pointer" />
                    <span className="text-xs font-mono text-zinc-500 uppercase">{brandKit.hookTitleColor}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4 pt-8 border-t border-zinc-800/50">
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-zinc-600 uppercase">Título da Chamada</span>
                  <input type="text" value={brandKit.hookTitle} onChange={(e) => brandKit.setHookTitle(e.target.value)} className="dark-input w-full p-4 rounded-2xl text-lg font-black uppercase tracking-tight" placeholder="Ex: SALVE PARA DEPOIS" />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-zinc-600 uppercase">Subtítulo Persuasivo</span>
                  <textarea rows={3} value={brandKit.hookSubtitle} onChange={(e) => brandKit.setHookSubtitle(e.target.value)} className="dark-input w-full p-4 rounded-2xl text-sm resize-none leading-relaxed" placeholder="Diga por que eles devem agir agora..."></textarea>
                </div>
              </div>
            </section>

            {/* Adicione este bloco dentro do setup/hooks/page.tsx, na parte de controles */}
            <section className="glass-panel p-8 rounded-[2.5rem] border border-zinc-800/50 mt-8">
                <div className="flex justify-between items-center mb-6">
                    <label className="text-[11px] font-black text-[#d4af37] uppercase tracking-[0.3em]">
                    3. Ordem no Carrossel
                    </label>
                    <span className="text-xs font-bold text-white bg-zinc-800 px-3 py-1 rounded-full">
                    Posição: {brandKit.hookPosition >= 99 ? "Final" : brandKit.hookPosition + 1 + "º Slide"}
                    </span>
                </div>

                <div className="space-y-6">
                    <input 
                    type="range" 
                    min="0" 
                    max="10" // Limitamos a 10 slides
                    value={brandKit.hookPosition > 10 ? 10 : brandKit.hookPosition} 
                    onChange={(e) => brandKit.setHookPosition(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                    />
                    <div className="flex justify-between text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                    <span>Início</span>
                    <span>Meio do Carrossel</span>
                    <span>Final</span>
                    </div>
                </div>
                </section>
          </div>

          {/* COLUNA DE PREVIEW FIXO (LARGURA 5) */}
          <div className="lg:col-span-5 sticky top-24">
            <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6 block text-center">Live Instagram Preview</label>
            <div className="relative group">
              {/* Efeito de Glow atrás do preview */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Card do Preview */}
              <div 
                className="relative aspect-[4/5] rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-12 text-center border border-white/5 overflow-hidden transition-all duration-700" 
                style={{ backgroundColor: brandKit.hookBgColor }}
              >
                {/* Texturas sutis no fundo */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                
                <div className="relative z-10">
                  <h2 className="text-4xl font-black uppercase mb-6 leading-[1.1] font-serif-premium tracking-tighter" style={{ color: brandKit.hookTitleColor }}>
                    {brandKit.hookTitle}
                  </h2>
                  
                  <p className="text-base font-bold leading-relaxed mb-10" style={{ color: brandKit.hookSubtitleColor || brandKit.hookTitleColor + 'CC' }}>
                    {brandKit.hookSubtitle}
                  </p>

                  <div 
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto transition-transform group-hover:scale-110 duration-500" 
                    style={{ borderColor: brandKit.hookTitleColor + '33' }}
                  >
                    {brandKit.hookType === "save" ? (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={brandKit.hookTitleColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={brandKit.hookTitleColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Dica de PO */}
              <div className="mt-6 glass-panel p-4 rounded-2xl flex items-center gap-3 border-zinc-800/50">
                <span className="text-xl">💡</span>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider leading-relaxed">
                  Dica: Use cores de alto contraste para o Hook. Se o seu carrossel foi escuro, tente um slide final <span className="text-[#d4af37]">Dourado</span> para "acordar" o usuário.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}