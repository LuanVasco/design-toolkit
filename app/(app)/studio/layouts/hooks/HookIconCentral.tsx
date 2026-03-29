import React from 'react';
import { Bookmark, Power, Droplet } from 'lucide-react';
import { HookDef, HookRegistry } from '../../types/hookRegistry';

export const HookIconCentral: HookDef = {
  id: "HOOK_ICON_CENTRAL",
  name: "Ícone Central (Salvar)",
  
  render: ({ brandKit }) => (
    <div className="w-full h-full flex flex-col p-12 text-center transition-colors duration-500 relative" style={{ backgroundColor: brandKit.hookBgColor }}>
      
      {/* Círculo decorativo centralizado (Gatilho de foco) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square rounded-full opacity-5 pointer-events-none" style={{ backgroundColor: brandKit.hookTitleColor }} />

      <div className="flex-1 flex flex-col justify-center items-center z-20 w-full mb-10">
        {/* Tipografia Herdada (Limpa e em itálico para Elegância) */}
        <h2 className="text-[34px] font-black uppercase leading-[1] tracking-tighter mb-6 italic" style={{ color: brandKit.hookTitleColor, fontFamily: 'var(--font-title)' }}>
          {brandKit.hookTitle || 'Salve para depois'}
        </h2>
        
        <p className="text-[12px] font-bold opacity-80 max-w-[80%] leading-relaxed uppercase tracking-widest" style={{ color: brandKit.hookSubtitleColor, fontFamily: 'var(--font-body)' }}>
          {brandKit.hookSubtitle || 'Conteúdo de alto valor para você aplicar na prática sempre que precisar.'}
        </p>
      </div>

      <div className="relative z-20 flex flex-col items-center w-full">
        {/* Ícone de Bookmark centralizado e limpo */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center border-4" style={{ borderColor: brandKit.hookTitleColor + '40' }}>
            <Bookmark size={40} strokeWidth={1} style={{ color: brandKit.hookTitleColor }} className="opacity-80" />
        </div>
      </div>

    </div>
  )
};

// Registra automáticamente
HookRegistry[HookIconCentral.id] = HookIconCentral;