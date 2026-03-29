// src/app/studio/layouts/NumberedStepLayout.tsx
import React from 'react';
import { SmartLayoutDef, LayoutRegistry } from '../types/layoutRegistry';

export const NumberedStepLayout: SmartLayoutDef = {
  id: "NUMBERED_STEP",
  category: "content",
  name: "Passos Numéricos",
  hiddenWidgets: [],
  paddingClass: "p-12", // Aumento do respiro lateral
  
  render: ({ slide, brandKit, index }) => {
    // Lógica: Se for o primeiro slide (capa), não mostra número.
    // A partir do segundo, o index 1 vira "01", index 2 vira "02".
    const isStep = index > 0;
    const stepDisplay = String(index).padStart(2, '0');

    return (
      <div className="flex flex-col justify-center h-full relative animate-fade-in z-20">
        
        {isStep && (
          <div className="absolute top-0 left-0 flex flex-col items-start">
            <span 
              className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2" 
              style={{ color: brandKit.textColor }}
            >
              Passo
            </span>
            <div 
              className="text-[80px] font-black leading-none tracking-tighter" 
              style={{ color: brandKit.brandColor }}
            >
              {stepDisplay}
            </div>
            {/* Linha decorativa sutil para separar o número do conteúdo */}
            <div className="w-12 h-1.5 mt-4 rounded-full" style={{ backgroundColor: brandKit.brandColor }} />
          </div>
        )}

        <div className={isStep ? "mt-24" : "mt-0"}>
          <h2 
            className="text-[32px] font-black uppercase leading-[1.1] tracking-tight whitespace-pre-line relative z-10" 
            style={{ color: brandKit.textColor, fontFamily: 'var(--font-title)' }}
          >
            {slide.title}
          </h2>
          <p 
            className="mt-6 text-[13px] font-medium leading-relaxed opacity-70 whitespace-pre-line relative z-10 max-w-[90%]" 
            style={{ color: brandKit.textColor, fontFamily: 'var(--font-body)' }}
          >
            {slide.desc}
          </p>
        </div>
      </div>
    );
  },

  thumbnail: ({ brandColor, isActive }) => (
    <div className={`w-16 h-20 rounded-md overflow-hidden bg-black flex flex-col justify-end p-2 gap-1 relative border ${isActive ? 'border-[#d4af37]' : 'border-zinc-800'}`}>
      {/* Miniatura do número no canto superior */}
      <div className="absolute top-1 left-2 text-[12px] font-black opacity-30" style={{ color: brandColor }}>01</div>
      <div className="w-8 h-1.5 bg-white rounded-sm mb-1" />
      <div className="w-10 h-1 bg-white/40 rounded-sm" />
    </div>
  )
};

LayoutRegistry[NumberedStepLayout.id] = NumberedStepLayout;