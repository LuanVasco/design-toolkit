// src/app/studio/layouts/FullImageLayout.tsx
import React from 'react';
import { SmartLayoutDef, LayoutRegistry } from '../types/layoutRegistry';

export const FullImageLayout: SmartLayoutDef = {
  id: "FULL_IMAGE",
  category: "media",
  name: "Sangria Total",
  hiddenWidgets: ["handle", "author", "pagination", "swipe"], 
  paddingClass: "p-0", 
  
  render: ({ slide, getProxyUrl }) => {
    const hasDesc = !!slide.desc;
    
    // 🧠 AUTO-FIT TIPOGRÁFICO
    // Calcula o tamanho da string para definir a escala da fonte
    const titleLength = slide.title?.length || 0;
    
    let titleSizeClass = "text-[38px] leading-[1.05]"; // Títulos de alto impacto (Até ~20 chars)
    if (titleLength > 45) {
      titleSizeClass = "text-[24px] leading-[1.15]"; // Títulos muito longos ou frases
    } else if (titleLength > 20) {
      titleSizeClass = "text-[30px] leading-[1.1]";  // Títulos médios
    }

    return (
      <div className="w-full h-full relative animate-fade-in flex flex-col z-20">
        
        {/* MÍDIA DE FUNDO */}
        {slide.bgImage ? (
          <img 
            src={getProxyUrl(slide.bgImage)} 
            className="absolute inset-0 w-full h-full object-cover z-0" 
            alt="Fundo Sangria Total" 
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-zinc-900 flex items-center justify-center z-0">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Sua Imagem</span>
          </div>
        )}
        
        {/* MÁSCARA DE PROTEÇÃO EDITORIAL */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10 pointer-events-none" />
        
        {/* BLOCO DE TEXTO (Safe Zones Otimizadas) */}
        <div className="relative z-20 px-10 pb-24 flex flex-col items-start w-full h-full justify-end">
          <div 
            className="w-12 h-1.5 mb-5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] flex-shrink-0" 
            style={{ backgroundColor: 'var(--brand-color)' }} 
          />
          
          {/* TÍTULO DINÂMICO: text-balance garante quebras harmônicas e o titleSizeClass ajusta o tamanho */}
          <h2 
            className={`${titleSizeClass} font-black uppercase tracking-tighter whitespace-pre-line text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] w-full text-balance transition-all duration-300`}
            style={{ fontFamily: 'var(--font-title)' }}
          >
            {slide.title}
          </h2>
          
          {hasDesc && (
            <p 
              className="mt-4 text-[15px] font-medium leading-relaxed whitespace-pre-line text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] w-full text-balance"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {slide.desc}
            </p>
          )}
        </div>
      </div>
    );
  },

  thumbnail: ({ brandColor, isActive }) => (
    <div className={`w-16 h-20 rounded-md overflow-hidden bg-zinc-800 flex flex-col justify-end px-2 pb-2 relative border ${isActive ? 'border-[#d4af37]' : 'border-zinc-800'}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
      <div className="relative z-10 w-full">
        <div className="w-4 h-0.5 rounded-full mb-1" style={{ backgroundColor: brandColor }} />
        <div className="w-full h-1 bg-white/90 rounded-sm mb-0.5" />
        <div className="w-2/3 h-0.5 bg-white/60 rounded-sm" />
      </div>
    </div>
  )
};

LayoutRegistry[FullImageLayout.id] = FullImageLayout;