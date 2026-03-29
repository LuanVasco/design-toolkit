// src/app/studio/layouts/SocialNotificationLayout.tsx
import React from 'react';
import { SmartLayoutDef, LayoutRegistry } from '../types/layoutRegistry';

export const SocialNotificationLayout: SmartLayoutDef = {
  id: "SOCIAL_NOTIFICATION",
  category: "social",
  name: "Lembrete iOS",
  hiddenWidgets: ["author"],
  paddingClass: "p-6",
  
  render: ({ slide, brandKit, getProxyUrl }) => (
    <div className="w-full h-full flex items-center justify-center animate-fade-in z-20 relative">
       <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-5 shadow-2xl w-full border border-white/50 text-center">
          <div className="w-12 h-12 bg-zinc-900 rounded-[14px] mx-auto mb-4 flex items-center justify-center overflow-hidden shadow-inner">
             {brandKit.authorAvatar ? (
               <img src={getProxyUrl(brandKit.authorAvatar)} className="w-full h-full object-cover" alt="Icon" />
             ) : (
               <div className="text-white font-bold text-[10px]">App</div>
             )}
          </div>
          <h2 className="text-[14px] font-bold text-zinc-900 leading-tight whitespace-pre-line">
            {slide.title || "Notificação do Sistema"}
          </h2>
          {slide.desc && (
            <p className="text-[11px] text-zinc-600 mt-1.5 whitespace-pre-line leading-relaxed">
              {slide.desc}
            </p>
          )}
       </div>
    </div>
  ),

  thumbnail: ({ brandColor, isActive }) => (
    <div className={`w-16 h-20 rounded-md overflow-hidden bg-zinc-900 flex items-center justify-center relative border ${isActive ? 'border-[#d4af37]' : 'border-zinc-800'}`}>
      <div className="w-10 h-12 bg-white/90 rounded-md flex flex-col items-center p-1 border border-zinc-500">
         <div className="w-4 h-4 bg-zinc-800 rounded-sm mb-1" />
         <div className="w-6 h-1 bg-zinc-900 rounded-full mb-0.5" />
         <div className="w-8 h-0.5 bg-zinc-500 rounded-full" />
      </div>
    </div>
  )
};

LayoutRegistry[SocialNotificationLayout.id] = SocialNotificationLayout;