import React from 'react';
import { motion } from 'framer-motion';
import { SmartLayoutDef, LayoutRegistry } from '../types/layoutRegistry';

export const ClassicLayout: SmartLayoutDef = {
  id: "CLASSIC",
  category: "content",
  name: "Clássico",
  hiddenWidgets: [],
  paddingClass: "p-8",
  
  render: ({ slide, brandKit }) => (
    <div className="flex flex-col justify-center h-full animate-fade-in z-20 relative">
      <motion.div initial={{ width: 0 }} animate={{ width: 40 }} className="h-1.5 rounded-full mb-3" style={{ backgroundColor: brandKit.brandColor }} />
      <h2 className="text-[26px] font-black uppercase leading-[1.1] font-serif-premium drop-shadow-md whitespace-pre-line" style={{ color: brandKit.textColor }}>
        {slide.title}
      </h2>
      <p className="mt-3 text-[11px] font-medium leading-relaxed opacity-80 whitespace-pre-line" style={{ color: brandKit.textColor }}>
        {slide.desc}
      </p>
    </div>
  ),

  thumbnail: ({ brandColor, isActive }) => (
    <div className={`w-16 h-20 rounded-md overflow-hidden bg-black flex flex-col justify-center px-2 gap-1 relative border ${isActive ? 'border-[#d4af37]' : 'border-zinc-800'}`}>
      <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: brandColor }} />
      <div className="w-12 h-1.5 bg-white rounded-sm" />
      <div className="w-8 h-1 bg-white/50 rounded-sm mt-1" />
      <div className="w-10 h-1 bg-white/50 rounded-sm" />
    </div>
  )
};

// Registra automaticamente
LayoutRegistry[ClassicLayout.id] = ClassicLayout;