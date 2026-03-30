"use client";

import React from "react";
import { useBrandKit } from "@/app/context/BrandKitContext";

export default function WidgetsFactoryPage() {
  // 👇 Desestruturação correta do nosso motor
  const { brandKit, updateBrandKit } = useBrandKit();

  const positionOptions = [
    { value: "top-left", label: "Topo Esquerda" },
    { value: "top-center", label: "Topo Centro" },
    { value: "top-right", label: "Topo Direita" },
    { value: "bottom-left", label: "Base Esquerda" },
    { value: "bottom-center", label: "Base Centro" },
    { value: "bottom-right", label: "Base Direita" }
  ];

  // Helper para mostrar o ponto de ancoragem no Mini Preview
  const getDotPos = (pos: string) => {
    const map: Record<string, string> = {
      "top-left": "top-2 left-2",
      "top-center": "top-2 left-1/2 -translate-x-1/2",
      "top-right": "top-2 right-2",
      "bottom-left": "bottom-2 left-2",
      "bottom-center": "bottom-2 left-1/2 -translate-x-1/2",
      "bottom-right": "bottom-2 right-2"
    };
    return map[pos] || "top-2 left-2";
  };

  return (
    <div className="p-10 max-w-6xl mx-auto pt-16 animate-fade-in pb-20">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2 font-serif-premium italic">Fábrica de Widgets</h1>
        <p className="text-zinc-400">Configure os elementos flutuantes que guiam a experiência do usuário.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        
        {/* WIDGET 1: PERFIL DE AUTORIDADE */}
        <section className="glass-panel p-8 rounded-3xl border-t-2" style={{ borderTopColor: brandKit.authorEnabled ? brandKit.brandColor : "#27272a" }}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-xl border border-zinc-800 shadow-inner">👤</div>
              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-tight">Widget de Autoridade</h2>
                <p className="text-xs text-zinc-500">Sua marca pessoal em destaque.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={brandKit.authorEnabled} 
                onChange={(e) => updateBrandKit({ authorEnabled: e.target.checked })} 
              />
              <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#d4af37] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          {brandKit.authorEnabled && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2">Nome</label>
                    <input 
                      type="text" 
                      value={brandKit.authorName} 
                      onChange={(e) => updateBrandKit({ authorName: e.target.value })} 
                      className="dark-input w-full p-3 rounded-xl text-sm font-bold" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2">Cargo</label>
                    <input 
                      type="text" 
                      value={brandKit.authorRole} 
                      onChange={(e) => updateBrandKit({ authorRole: e.target.value })} 
                      className="dark-input w-full p-3 rounded-xl text-sm" 
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2">Foto (URL)</label>
                    <input 
                      type="url" 
                      value={brandKit.authorAvatar} 
                      onChange={(e) => updateBrandKit({ authorAvatar: e.target.value })} 
                      className="dark-input w-full p-3 rounded-xl text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2">Posição</label>
                    <select 
                      value={brandKit.authorPos} 
                      onChange={(e) => updateBrandKit({ authorPos: e.target.value })} 
                      className="dark-input w-full p-3 rounded-xl text-sm font-semibold"
                    >
                      {positionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Mini Preview Dot */}
              <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800 relative h-32 lg:h-full flex items-center justify-center">
                <div className="w-full h-full border border-zinc-800/30 rounded relative bg-zinc-900/20">
                  <div className={`absolute w-3 h-3 rounded-full bg-[#d4af37] ${getDotPos(brandKit.authorPos)} animate-pulse`}></div>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* WIDGET 2: HANDLE (@) */}
          <section className="glass-panel p-6 rounded-3xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest">@ Handle</label>
              <input 
                type="checkbox" 
                checked={brandKit.handleEnabled} 
                onChange={(e) => updateBrandKit({ handleEnabled: e.target.checked })} 
                className="w-4 h-4 accent-[#d4af37]" 
              />
            </div>
            <div className={`space-y-4 mt-auto ${brandKit.handleEnabled ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
              <input 
                type="text" 
                value={brandKit.handle} 
                onChange={(e) => updateBrandKit({ handle: e.target.value })} 
                className="dark-input w-full p-3 rounded-xl text-xs font-mono" 
              />
              <select 
                value={brandKit.handlePos} 
                onChange={(e) => updateBrandKit({ handlePos: e.target.value })} 
                className="dark-input w-full p-3 rounded-xl text-xs"
              >
                {positionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </section>

          {/* WIDGET 3: PAGINAÇÃO */}
          <section className="glass-panel p-6 rounded-3xl flex flex-col">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest mb-6 block">🔢 Paginação</label>
            <div className="space-y-4 mt-auto">
              <select 
                value={brandKit.paginationStyle} 
                onChange={(e) => updateBrandKit({ paginationStyle: e.target.value as any })} 
                className="dark-input w-full p-3 rounded-xl text-xs font-bold"
              >
                <option value="numbers">Números</option>
                <option value="dots">Pontos</option>
                <option value="progress">Barra</option>
                <option value="none">Ocultar</option>
              </select>
              <select 
                value={brandKit.paginationPos} 
                onChange={(e) => updateBrandKit({ paginationPos: e.target.value })} 
                className="dark-input w-full p-3 rounded-xl text-xs"
              >
                {positionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </section>

          {/* WIDGET 4: SWIPE (ARRASTE PARA O LADO) */}
          <section className="glass-panel p-6 rounded-3xl flex flex-col border-t-2" style={{ borderTopColor: brandKit.swipeText ? brandKit.brandColor : 'transparent' }}>
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest mb-6 block">👉 Indicador Swipe</label>
            <div className="space-y-4 mt-auto">
              <input 
                type="text" 
                value={brandKit.swipeText} 
                onChange={(e) => updateBrandKit({ swipeText: e.target.value })} 
                className="dark-input w-full p-3 rounded-xl text-xs font-bold" 
                placeholder="Ex: Arraste para o lado" 
              />
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => updateBrandKit({ swipeStyle: "minimal" })} 
                  className={`py-2 rounded-lg text-[10px] font-bold uppercase border ${brandKit.swipeStyle === "minimal" ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]" : "border-zinc-800 text-zinc-500"}`}
                >
                  Minimal
                </button>
                <button 
                  onClick={() => updateBrandKit({ swipeStyle: "pill" })} 
                  className={`py-2 rounded-lg text-[10px] font-bold uppercase border ${brandKit.swipeStyle === "pill" ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]" : "border-zinc-800 text-zinc-500"}`}
                >
                  Pílula
                </button>
              </div>
              <select 
                value={brandKit.swipePos} 
                onChange={(e) => updateBrandKit({ swipePos: e.target.value })} 
                className="dark-input w-full p-3 rounded-xl text-xs"
              >
                {positionOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}