import React from 'react';
import { UserPlus, Power, Bookmark } from 'lucide-react';
import { HookDef, HookRegistry } from '../../types/hookRegistry';

export const HookProfileCard: HookDef = {
  id: "HOOK_PROFILE_CARD",
  name: "Card de Perfil (Crescimento)",
  
  // 🛡️ Blindagem TS: Se getProxyUrl for undefined, usamos uma função que retorna a própria string
  render: ({ brandKit, getProxyUrl = (url: string) => url }) => (
    <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center transition-colors duration-500 relative overflow-hidden" style={{ backgroundColor: brandKit.hookBgColor }}>
      
      {/* Sombra de Fundo Minimalista */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center items-center z-20 w-full mb-8">
        
        {/* Tipografia Herdada (Lendo as variáveis globais injetadas no SlideUnit) */}
        <h2 className="text-[28px] font-black uppercase leading-[1] tracking-tighter mb-4" 
            style={{ color: brandKit.hookTitleColor, fontFamily: 'var(--font-title)' }}>
          {brandKit.hookTitle || 'Gostou dessas dicas?'}
        </h2>
        
        <p className="text-[12px] font-bold opacity-80 max-w-[85%] leading-relaxed uppercase tracking-wider" 
           style={{ color: brandKit.hookSubtitleColor, fontFamily: 'var(--font-body)' }}>
          {brandKit.hookSubtitle || 'Não esqueça de me seguir para receber mais conteúdos como esse!'}
        </p>
      </div>

      {/* O CARD DE PERFIL (Reprodução Premium do Instagram) */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-zinc-950 border border-zinc-100 z-20">
        <div className="flex items-center gap-4 mb-4">
          
          {/* Avatar do Autor */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-100 p-0.5" style={{ backgroundColor: brandKit.hookTitleColor }}>
             {brandKit.authorAvatar ? (
               <img 
                src={getProxyUrl(brandKit.authorAvatar)} 
                className="w-full h-full object-cover rounded-full" 
                alt="Avatar" 
               />
             ) : (
               <div className="w-full h-full flex items-center justify-center rounded-full" style={{ backgroundColor: brandKit.hookTitleColor }}>
                  <span style={{ color: brandKit.hookBgColor }} className="font-bold text-[16px]">@</span>
               </div>
             )}
          </div>
          
          {/* Estatísticas Simuladas (Gatilho de Autoridade) */}
          <div className="flex-1 grid grid-cols-3 gap-1.5 text-center">
             {[
               { val: "281", label: "Publicaç..." },
               { val: "44,4 mil", label: "Seguidores" },
               { val: "126", label: "Seguindo" }
             ].map(stat => (
               <div key={stat.label} className="flex flex-col">
                  <span className="text-[14px] font-bold leading-tight">{stat.val}</span>
                  <span className="text-[9px] text-zinc-500 font-medium uppercase tracking-tight">{stat.label}</span>
               </div>
             ))}
          </div>
        </div>
        
        {/* Info do Autor e CTA de Seguir */}
        <div className="w-full flex items-center justify-between border-t pt-3" style={{ borderColor: brandKit.hookTitleColor + '20' }}>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-black">{brandKit.authorName || "Nome do Autor"}</span>
            <span className="text-[9px] text-zinc-500">{brandKit.handle || "@usuario"}</span>
          </div>
          
          {/* Botão Seguir Visual */}
          <div className="px-5 py-2 rounded-lg flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider" 
               style={{ backgroundColor: brandKit.hookTitleColor, color: brandKit.hookBgColor }}>
            <UserPlus size={12} strokeWidth={3} /> Seguir
          </div>
        </div>
      </div>

    </div>
  )
};

// Registra automaticamente no dicionário global de Hooks
HookRegistry[HookProfileCard.id] = HookProfileCard;