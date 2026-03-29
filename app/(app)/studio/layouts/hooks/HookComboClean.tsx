import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { HookDef, HookRegistry } from '../../types/hookRegistry';

export const HookCommentClean: HookDef = {
  id: "HOOK_COMMENT_CLEAN",
  name: "Comente (Clean)",
  
  render: ({ brandKit }) => (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center transition-colors duration-500 relative" style={{ backgroundColor: brandKit.hookBgColor }}>
      
      {/* Moldura Clean Opcional */}
      <div className="absolute inset-4 border rounded-3xl pointer-events-none opacity-20" style={{ borderColor: brandKit.hookTitleColor }} />

      <div className="relative z-20 flex flex-col items-center w-full">
        <MessageSquareText size={40} strokeWidth={1.5} className="mb-8" style={{ color: brandKit.hookTitleColor }} />
        
        <h2 className="text-[28px] font-black uppercase leading-tight tracking-tight mb-4" style={{ color: brandKit.hookTitleColor, fontFamily: 'var(--font-title)' }}>
          Comente <br/>
          <span className="inline-block mt-2 border-b-2 pb-1" style={{ borderColor: brandKit.hookTitleColor }}>
            {brandKit.hookTitle || 'EU QUERO'}
          </span>
        </h2>
        
        <p className="text-[12px] font-medium leading-relaxed opacity-80" style={{ color: brandKit.hookSubtitleColor, fontFamily: 'var(--font-body)' }}>
          {brandKit.hookSubtitle || 'Enviarei o link completo e os materiais de apoio diretamente nas suas mensagens.'}
        </p>
      </div>

    </div>
  )
};

// Registra
HookRegistry[HookCommentClean.id] = HookCommentClean;