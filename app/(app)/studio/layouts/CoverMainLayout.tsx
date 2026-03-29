import React from 'react';
import { SmartLayoutDef, LayoutRegistry } from '../types/layoutRegistry';

export const CoverMainLayout: SmartLayoutDef = {
  id: "COVER_MAIN",
  category: "covers",
  name: "Impacto Máximo",
  hiddenWidgets: ["pagination", "swipe", "handle"],
  paddingClass: "p-12",
  
  render: ({ slide, brandKit }) => (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in z-20 relative">
      <h1 className="text-[38px] font-black uppercase leading-[0.95] font-serif-premium drop-shadow-2xl whitespace-pre-line" style={{ color: brandKit.textColor }}>
        {slide.title}
      </h1>
      {slide.desc && (
        <p className="mt-4 text-[12px] font-bold opacity-80 uppercase tracking-[0.2em] whitespace-pre-line" style={{ color: brandKit.brandColor }}>
          {slide.desc}
        </p>
      )}
    </div>
  ),

  thumbnail: ({ brandColor, isActive }) => (
    <div className={`w-16 h-20 rounded-md overflow-hidden bg-black flex flex-col items-center justify-center gap-1 relative border ${isActive ? 'border-[#d4af37]' : 'border-zinc-800'}`}>
      <div className="w-10 h-2 bg-white rounded-sm" />
      <div className="w-8 h-2 bg-white rounded-sm" />
      <div className="w-4 h-0.5 mt-1 rounded-full" style={{ backgroundColor: brandColor }} />
    </div>
  )
};

// Registra automaticamente
LayoutRegistry[CoverMainLayout.id] = CoverMainLayout;