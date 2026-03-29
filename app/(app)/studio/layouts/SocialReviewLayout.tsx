import React from 'react';
import { SmartLayoutDef, LayoutRegistry } from '../types/layoutRegistry';

export const SocialReviewLayout: SmartLayoutDef = {
  id: "SOCIAL_REVIEW",
  category: "social",
  name: "5 Estrelas",
  hiddenWidgets: ["author"],
  paddingClass: "p-8",
  
  render: ({ slide, brandKit, getProxyUrl }) => (
    <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in z-20 relative text-center">
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4, 5].map(star => (
          <svg key={star} className="w-6 h-6 text-[#f9ce34]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-[16px] font-medium leading-relaxed italic whitespace-pre-line mb-8" style={{ color: brandKit.textColor }}>
        "{slide.desc || 'O depoimento do cliente vai aqui.'}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-white/10 overflow-hidden">
           {slide.bgImage ? <img src={getProxyUrl(slide.bgImage)} className="w-full h-full object-cover" alt="Cliente" /> : <div className="w-full h-full bg-zinc-700" />}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[14px] font-black uppercase tracking-wider" style={{ color: brandKit.textColor }}>{slide.title || 'Nome do Cliente'}</span>
          <span className="text-[10px] font-bold" style={{ color: brandKit.brandColor }}>Cliente Verificado</span>
        </div>
      </div>
    </div>
  ),

  thumbnail: ({ brandColor, isActive }) => (
    <div className={`w-16 h-20 rounded-md overflow-hidden bg-black flex flex-col items-center justify-center gap-1 relative border ${isActive ? 'border-[#d4af37]' : 'border-zinc-800'}`}>
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 bg-[#f9ce34] rounded-[1px]" />)}
      </div>
      <div className="w-12 h-1 bg-white/60 rounded-sm mt-1" />
      <div className="w-8 h-1 bg-white/60 rounded-sm" />
      <div className="flex items-center gap-1 mt-1">
         <div className="w-3 h-3 rounded-full bg-zinc-600" />
         <div className="w-6 h-0.5 bg-white rounded-sm" />
      </div>
    </div>
  )
};

LayoutRegistry[SocialReviewLayout.id] = SocialReviewLayout;