// src/app/studio/layouts/MediaMockupLayout.tsx
import React from 'react';
import { SmartLayoutDef, LayoutRegistry } from '../types/layoutRegistry';

export const MediaMockupLayout: SmartLayoutDef = {
  id: "MEDIA_MOCKUP",
  category: "media",
  name: "Mockup Premium",
  hiddenWidgets: [],
  // Removi o p-8 agressivo para controlarmos as margens internamente
  paddingClass: "p-0", 
  
  render: ({ slide, getProxyUrl }) => {
    const hasDesc = !!slide.desc;

    return (
      <div className="flex flex-col h-full items-center animate-fade-in z-20 relative w-full overflow-hidden">
        
        {/* 1. HEADER EDITORIAL (Protegido e Compacto) */}
        {/* Usamos pt-14 para não bater no topo do post do Instagram */}
        <div className={`relative flex flex-col items-center z-30 w-full px-10 ${hasDesc ? 'pt-14 mb-6' : 'pt-16 mb-8'}`}>
          
          {/* Sombra de Proteção: Garante leitura sem "caixa preta" */}
          <div className="absolute inset-0 bg-black/20 blur-2xl rounded-full -z-10" />

          <h2 
            className="text-[32px] font-black uppercase leading-[1.05] tracking-tighter whitespace-pre-line text-center" 
            style={{ 
              color: 'var(--text-color)',
              fontFamily: 'var(--font-title)',
              textShadow: '0 2px 16px rgba(0,0,0,0.4)' 
            }}
          >
            {slide.title}
          </h2>
          
          {hasDesc && (
            <p 
              className="mt-3 text-[14px] font-medium leading-relaxed max-w-[90%] whitespace-pre-line text-center" 
              style={{ 
                color: 'var(--text-color)',
                fontFamily: 'var(--font-body)',
                opacity: 0.85, 
                textShadow: '0 1px 10px rgba(0,0,0,0.5)'
              }}
            >
              {slide.desc}
            </p>
          )}
        </div>

        {/* 2. DEVICE MOCKUP (Proporção Controlada) */}
        {/* Tamanho fixo menor (210x420) para deixar margem nas bordas */}
        <div className="relative flex-1 w-full flex items-center justify-center z-20 pb-10">
          
          {/* Brilho de fundo reduzido para não ofuscar */}
          <div 
            className="absolute inset-0 blur-[40px] opacity-15 rounded-[2rem] transform scale-90 translate-y-2 pointer-events-none"
            style={{ backgroundColor: 'var(--brand-color)' }}
          />
          
          {/* Chassi do Celular */}
          <div className="w-[210px] h-[420px] bg-zinc-950 border-[6px] border-zinc-800/80 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col ring-1 ring-white/5 z-10">
            
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-20 flex items-center justify-between px-2 shadow-[inset_0_-1px_1px_rgba(255,255,255,0.1)]">
               <div className="w-1.5 h-1.5 rounded-full bg-[#112255] shadow-[0_0_2px_rgba(255,255,255,0.3)]" />
            </div>

            {/* Tela / Conteúdo */}
            {slide.bgImage ? (
              <img 
                src={getProxyUrl(slide.bgImage)} 
                className="w-full h-full object-cover object-top" 
                alt="App Interface" 
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center gap-2">
                 <div className="w-8 h-8 border-2 border-dashed border-zinc-700 rounded-xl animate-pulse" />
                 <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Tela</span>
              </div>
            )}

            {/* Reflexo Sutil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
          </div>
        </div>
      </div>
    );
  },

  thumbnail: ({ brandColor, isActive }) => (
    <div className={`w-16 h-20 rounded-md overflow-hidden bg-black flex flex-col items-center pt-2 px-2 gap-1 relative border ${isActive ? 'border-[#d4af37]' : 'border-zinc-800'}`}>
       <div className="w-8 h-1 bg-white/80 rounded-sm" />
       <div className="w-8 flex-1 bg-zinc-800 rounded-t-md border-t border-x border-zinc-600 flex justify-center pt-1 mt-1 shadow-inner relative">
         <div className="w-2 h-0.5 bg-zinc-950 rounded-full" />
       </div>
    </div>
  )
};

LayoutRegistry[MediaMockupLayout.id] = MediaMockupLayout;