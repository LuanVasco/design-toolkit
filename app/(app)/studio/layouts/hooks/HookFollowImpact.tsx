import React from 'react';
import { UserPlus } from 'lucide-react';
import { HookDef, HookRegistry } from '../../types/hookRegistry';

export const HookFollowImpact: HookDef = {
  id: "HOOK_FOLLOW_IMPACT",
  name: "Seguir Impacto",
  
  render: ({ brandKit }) => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 group transition-colors duration-500 relative overflow-hidden" style={{ backgroundColor: brandKit.hookBgColor }}>
      {/* Círculo decorativo de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full opacity-5 pointer-events-none" style={{ backgroundColor: brandKit.hookTitleColor }} />
      
      <div className="flex flex-col items-center text-center space-y-6 relative z-20 pointer-events-none w-full">
        <div className="p-4 rounded-full" style={{ backgroundColor: brandKit.hookTitleColor }}>
           <UserPlus size={40} style={{ color: brandKit.hookBgColor }} />
        </div>
        <div>
          <h2 style={{ color: brandKit.hookTitleColor }} className="text-[28px] font-black uppercase leading-none tracking-tighter mb-2">
            {brandKit.hookTitle}
          </h2>
          <div className="w-12 h-1 mx-auto rounded-full mb-4" style={{ backgroundColor: brandKit.hookTitleColor, opacity: 0.3 }} />
          <p style={{ color: brandKit.hookSubtitleColor }} className="text-[12px] font-bold opacity-90 uppercase tracking-widest max-w-[80%] mx-auto leading-relaxed">
            {brandKit.hookSubtitle}
          </p>
        </div>
      </div>
    </div>
  )
};

HookRegistry[HookFollowImpact.id] = HookFollowImpact;