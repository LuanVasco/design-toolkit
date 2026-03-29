"use client";

import React, { useState } from "react";
import { Download, ShieldCheck } from "lucide-react";
import { useBrandKit } from "@/app/context/BrandKitContext";

// Nossos Componentes Especializados
import { AssetsGallery } from "./components/AssetsGallery";
import { StrategicPanel } from "./components/StrategicPanel";

export default function BrandDashboard() {
  const { brandKit } = useBrandKit();
  const [copied, setCopied] = useState(false);

  const brandName = brandKit?.brandName || "Sua Marca";
  const brandColor = brandKit?.brandColor || "#d4af37";
  const brandNiche = brandKit?.niche || "Outro";

  const downloadLogo = () => {
    if (!brandKit?.logoUrl) return;
    const link = document.createElement("a");
    link.href = brandKit.logoUrl;
    link.download = `${brandName.toLowerCase()}-logo.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-10 font-sans selection:bg-[#d4af37]/30">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* HEADER DE COMANDO */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#d4af37]">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Brand Hub OS v1.0</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">
            {brandName}<span className="text-zinc-700 not-italic">.</span>
          </h1>
        </div>

        <button 
          onClick={downloadLogo}
          className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#d4af37] transition-all shadow-2xl shadow-white/5"
        >
          <Download size={14} /> Export Brand Kit
        </button>
      </header>

      <main className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* GRID SUPERIOR: VISUAL & ESTRATÉGIA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* IDENTIDADE VISUAL (Preview) */}
          <section className="lg:col-span-7 space-y-8">
            <div className="bg-zinc-900/40 border border-white/10 rounded-[3rem] p-12 flex items-center justify-center min-h-[450px] backdrop-blur-md relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_100%)]" />
               {brandKit?.logoUrl ? (
                 <img src={brandKit.logoUrl} alt="Logo" className="max-h-64 object-contain drop-shadow-2xl z-10" />
               ) : (
                 <p className="text-zinc-800 font-black text-4xl italic opacity-50">Preview Indisponível</p>
               )}
            </div>

            {/* ESPECIFICAÇÕES TÉCNICAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-8 flex items-center justify-between">
                <div>
                  <h3 className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">Primary Color</h3>
                  <p className="text-lg font-black tracking-tighter uppercase">{brandColor}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl shadow-xl" style={{ backgroundColor: brandColor }} />
              </div>

              <div className="bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-8">
                <h3 className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">Typography</h3>
                <p className="text-lg font-black tracking-tighter truncate" style={{ fontFamily: brandKit?.titleFont || 'sans-serif' }}>
                  {brandKit?.titleFont || 'Standard'}
                </p>
              </div>
            </div>
          </section>

          {/* PAINEL ESTRATÉGICO (O diferencial do seu MBA) */}
          <section className="lg:col-span-5">
            <StrategicPanel niche={brandNiche} color={brandColor} />
          </section>
        </div>

        {/* SEÇÃO DE ASSETS (Variações de Cor) */}
        {brandKit?.config && (
          <AssetsGallery 
            brandName={brandName} 
            config={brandKit.config} 
            niche={brandNiche} 
          />
        )}
      </main>

      <footer className="max-w-7xl mx-auto mt-20 pb-10 border-t border-white/5 pt-8 flex justify-between items-center text-zinc-600">
        <p className="text-[9px] font-black uppercase tracking-widest">© 2026 {brandName} Hub — All Rights Reserved</p>
        <p className="text-[9px] font-black uppercase tracking-widest">Powered by AI Strategic Engine</p>
      </footer>
    </div>
  );
}