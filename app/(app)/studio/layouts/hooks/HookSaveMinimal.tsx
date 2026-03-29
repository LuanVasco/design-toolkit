import React from 'react';
import { Bookmark } from 'lucide-react';
import { HookDef, HookRegistry } from '../../types/hookRegistry';

export const HookSaveMinimal: HookDef = {
  id: "HOOK_SAVE_MINIMAL",
  name: "Salvar Minimalista",
  
  render: ({ brandKit }) => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 group transition-colors duration-500" style={{ backgroundColor: brandKit.hookBgColor }}>
      <div className="flex flex-col items-center text-center space-y-4 relative z-20 pointer-events-none">
        <Bookmark size={48} color={brandKit.hookTitleColor} />
        <h2 style={{ color: brandKit.hookTitleColor }} className="text-2xl font-black uppercase leading-tight tracking-tighter">
          {brandKit.hookTitle}
        </h2>
        <p style={{ color: brandKit.hookSubtitleColor }} className="text-sm font-medium opacity-70">
          {brandKit.hookSubtitle}
        </p>
      </div>
    </div>
  )
};

HookRegistry[HookSaveMinimal.id] = HookSaveMinimal;