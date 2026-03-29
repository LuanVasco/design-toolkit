import React from 'react';
import { Bookmark, Power, Computer } from 'lucide-react';
import { HookDef, HookRegistry } from '../../types/hookRegistry';

export const HookMockupLean: HookDef = {
  id: "HOOK_MOCKUP_LEAN",
  name: "Mockup (Produto/Curso)",
  
  // 🛡️ Blindagem TS: Garantimos que getProxyUrl seja sempre uma função válida
  render: ({ brandKit, getProxyUrl = (url: string) => url }) => (
    <div className="w-full h-full flex flex-col p-10 justify-between items-center transition-colors duration-500 relative overflow-hidden" style={{ backgroundColor: brandKit.hookBgColor }}>
      
      {/* Sombra de Fundo Minimalista */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

      {/* Título e Subtítulo (Sempre limpos no topo) */}
      <div className="text-center z-20 mb-10 mt-6 w-full">
        <h2 className="text-[30px] font-black uppercase leading-[1] tracking-tighter mb-3" 
            style={{ color: brandKit.hookTitleColor, fontFamily: 'var(--font-title)' }}>
          {brandKit.hookTitle || 'Essas dicas fizeram sentido?'}
        </h2>
        <p className="text-[12px] font-bold opacity-80 max-w-[85%] leading-relaxed uppercase tracking-wider mx-auto" 
           style={{ color: brandKit.hookSubtitleColor, fontFamily: 'var(--font-body)' }}>
          {brandKit.hookSubtitle || 'Se sim, salve este post para consultar quando for aplicar na prática!'}
        </p>
      </div>

      {/* O MOCKUP DE NOTEBOOK (Limpo e em CSS Puro) */}
      <div className="flex-1 flex flex-col justify-end w-full max-w-[280px] z-20">
        {/* Tela do Notebook */}
        <div className="aspect-[16/10] bg-zinc-950 border-[6px] border-zinc-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
          {/* Dynamic Island simulada no topo da tela */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-3 bg-zinc-800 rounded-full z-10" />
          
          {brandKit.bgImage ? (
            <img 
              src={getProxyUrl(brandKit.bgImage)} 
              className="w-full h-full object-cover object-top" 
              alt="Mockup Site" 
            />
          ) : (
            <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center p-4">
              <Computer size={28} className="text-zinc-700 mb-2" strokeWidth={1} />
              <div className="w-16 h-1 bg-zinc-700 rounded-full" />
              <div className="w-10 h-1 bg-zinc-700 rounded-full mt-1.5" />
            </div>
          )}
        </div>
        
        {/* Base do Notebook (CSS) */}
        <div className="w-full h-2.5 bg-zinc-800 rounded-b-xl relative z-0 border-x-4 border-b-4 border-zinc-700" style={{ boxShadow: '0 8px 12px rgba(0,0,0,0.25)' }}>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[3px] bg-black/40 rounded-t-[1px]" />
        </div>
      </div>

    </div>
  )
};

// Registra automaticamente no dicionário global de Hooks
HookRegistry[HookMockupLean.id] = HookMockupLean;