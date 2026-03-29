// src/app/studio/layouts/MediaBottomLayout.tsx
import React from 'react';
import { SmartLayoutDef, LayoutRegistry } from '../types/layoutRegistry';

const isDarkColor = (hex: string = "#FFFFFF") => {
  const c = hex.replace('#', '');
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128; 
};

export const MediaBottomLayout: SmartLayoutDef = {
  id: "MEDIA_BOTTOM",
  category: "media",
  name: "Base Colada Inteligente",
  hiddenWidgets: [], 
  paddingClass: "p-0", 
  
  render: ({ slide, brandKit, getProxyUrl }) => {
    const hasDesc = !!slide.desc;
    
    const imageStyle = slide.imageStyle || 'rounded';
    const radiusClass = imageStyle === 'rounded' ? 'rounded-t-[4rem]' : 'rounded-none';
    
    const textIsDark = isDarkColor(brandKit.textColor);

    // 🧠 O SEGREDO DO GRADIENTE CAMALEÃO:
    // Em vez de branco fixo, usamos a cor real do fundo do template.
    // Assim o gradiente se funde perfeitamente, seja no verde, rosa ou branco.
    const protectionGradient = textIsDark 
      ? `linear-gradient(to top, ${brandKit.bgColor1} 10%, transparent 100%)`
      : `linear-gradient(to top, rgba(0,0,0,0.9) 10%, transparent 100%)`;

    const fallbackBgClass = textIsDark ? "bg-black/5" : "bg-zinc-900";
    const fallbackTextClass = textIsDark ? "text-black/30" : "text-white/30";

    const titleLength = slide.title?.length || 0;
    let titleSizeClass = "text-[38px] leading-[1.05]";
    if (titleLength > 45) titleSizeClass = "text-[24px] leading-[1.15]";
    else if (titleLength > 20) titleSizeClass = "text-[32px] leading-[1.1]";

    return (
      <div className="flex flex-col h-full animate-fade-in relative w-full z-20 overflow-hidden">
        
        <div className={`px-10 ${hasDesc ? 'pt-16' : 'pt-24'} pb-6 relative z-30 text-center flex flex-col items-center shrink-0`}>
          <h2 
            className={`${titleSizeClass} font-black uppercase tracking-tighter whitespace-pre-line text-balance transition-all duration-300`} 
            style={{ 
              // 🛡️ Puxamos diretamente do brandKit por segurança, evitando falhas de var()
              color: brandKit.textColor, 
              fontFamily: 'var(--font-title)',
              textShadow: textIsDark ? 'none' : '0 2px 12px rgba(0,0,0,0.4)'
            }}
          >
            {slide.title}
          </h2>
          
          {hasDesc && (
            <p 
              className="mt-4 text-[14px] font-medium leading-relaxed opacity-85 max-w-[90%] whitespace-pre-line text-balance" 
              style={{ 
                color: brandKit.textColor, 
                fontFamily: 'var(--font-body)',
                textShadow: textIsDark ? 'none' : '0 1px 8px rgba(0,0,0,0.5)'
              }}
            >
              {slide.desc}
            </p>
          )}
        </div>

        <div className="relative flex-1 w-full mt-2 z-10 flex flex-col">
          <div 
            className={`absolute inset-x-0 bottom-0 h-full ${fallbackBgClass} overflow-hidden border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.2)] transition-all duration-300 ${radiusClass}`}
          >
            {slide.bgImage ? (
              <img 
                src={getProxyUrl(slide.bgImage)} 
                className="w-full h-full object-cover object-top" 
                alt="Mídia Base" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${fallbackTextClass}`}>
                  Aguardando Mídia
                </span>
              </div>
            )}
            
            {/* 🛡️ GRADIENTE DE PROTEÇÃO DINÂMICO APLICADO AQUI */}
            <div 
              className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" 
              style={{ background: protectionGradient }}
            />
          </div>
        </div>
      </div>
    );
  },

  // ... thumbnail mantido igual
  thumbnail: ({ brandColor, isActive }) => (
    <div className={`w-16 h-20 rounded-md overflow-hidden bg-black flex flex-col relative border ${isActive ? 'border-[#d4af37]' : 'border-zinc-800'}`}>
      <div className="h-6 w-full flex items-center justify-center pt-2">
        <div className="w-8 h-1 bg-white/60 rounded-full" />
      </div>
      <div className="absolute bottom-0 inset-x-0 h-10 bg-zinc-700 rounded-t-xl border-t border-white/20" />
    </div>
  )
};

LayoutRegistry[MediaBottomLayout.id] = MediaBottomLayout;