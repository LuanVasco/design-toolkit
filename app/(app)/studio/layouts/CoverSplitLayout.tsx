// src/app/studio/layouts/CoverSplitLayout.tsx
import React from 'react';
import { SmartLayoutDef, LayoutRegistry } from '../types/layoutRegistry';

export const CoverSplitLayout: SmartLayoutDef = {
  id: "COVER_SPLIT",
  category: "covers",
  name: "Editorial",
  hiddenWidgets: ["pagination", "swipe"],
  paddingClass: "p-8",
  
  render: ({ slide, brandKit }) => (
    <div className="flex flex-col justify-center h-full animate-fade-in z-20 relative">
      <div className="w-12 h-1.5 mb-6 shadow-lg" style={{ backgroundColor: brandKit.brandColor }} />
      <h1 className="text-[34px] font-black uppercase leading-tight font-serif-premium drop-shadow-xl whitespace-pre-line" style={{ color: brandKit.textColor }}>
        {slide.title}
      </h1>
      <p className="mt-4 text-[11px] font-medium leading-relaxed opacity-80 whitespace-pre-line border-l-2 pl-3" style={{ color: brandKit.textColor, borderColor: brandKit.brandColor }}>
        {slide.desc}
      </p>
    </div>
  ),

  thumbnail: ({ brandColor, isActive }) => (
    <div className={`w-16 h-20 rounded-md overflow-hidden bg-black flex flex-col justify-center px-2 gap-1 relative border ${isActive ? 'border-[#d4af37]' : 'border-zinc-800'}`}>
      <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: brandColor }} />
      <div className="w-10 h-2 bg-white rounded-sm" />
      <div className="w-10 h-2 bg-white rounded-sm" />
    </div>
  )
};

LayoutRegistry[CoverSplitLayout.id] = CoverSplitLayout;