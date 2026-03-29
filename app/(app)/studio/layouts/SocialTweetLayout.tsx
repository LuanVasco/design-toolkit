import React from 'react';
import { SmartLayoutDef, LayoutRegistry } from '../types/layoutRegistry';

export const SocialTweetLayout: SmartLayoutDef = {
  id: "SOCIAL_TWEET",
  category: "social",
  name: "Fake Tweet",
  hiddenWidgets: ["author", "handle"], // Esconde pq o tweet já tem
  paddingClass: "p-4",
  
  render: ({ slide, brandKit, getProxyUrl }) => (
    <div className="w-full h-full flex items-center justify-center animate-fade-in z-20 relative px-4">
      <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] w-full text-zinc-900 border border-zinc-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden shrink-0 border border-zinc-300">
            {brandKit.authorAvatar && <img src={getProxyUrl(brandKit.authorAvatar)} className="w-full h-full object-cover" alt="Avatar" />}
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-bold leading-tight">{brandKit.authorName || "Nome do Autor"}</span>
            <span className="text-[10px] text-zinc-500">{brandKit.handle || "@usuario"}</span>
          </div>
        </div>
        <h2 className="text-[14px] font-medium leading-relaxed whitespace-pre-line mb-3">
          {slide.title || "Escreva o seu tweet aqui..."}
        </h2>
        {slide.desc && (
          <p className="text-[9px] text-zinc-500 font-medium uppercase tracking-wide border-t border-zinc-100 pt-3">
            {slide.desc}
          </p>
        )}
      </div>
    </div>
  ),

  thumbnail: ({ brandColor, isActive }) => (
    <div className={`w-16 h-20 rounded-md overflow-hidden bg-black flex flex-col items-center justify-center relative border ${isActive ? 'border-[#d4af37]' : 'border-zinc-800'}`}>
      <div className="w-12 h-10 bg-white rounded-sm flex flex-col p-1 gap-1">
         <div className="flex items-center gap-1">
           <div className="w-3 h-3 bg-zinc-300 rounded-full" />
           <div className="flex flex-col gap-0.5">
             <div className="w-4 h-0.5 bg-zinc-400" />
             <div className="w-3 h-0.5 bg-zinc-300" />
           </div>
         </div>
         <div className="w-8 h-0.5 bg-zinc-600 mt-0.5" />
         <div className="w-6 h-0.5 bg-zinc-600" />
      </div>
    </div>
  )
};

LayoutRegistry[SocialTweetLayout.id] = SocialTweetLayout;