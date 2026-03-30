"use client";

import React from "react";
// Importe a inteligência
import '../../layouts/hooks/index'; // Carrega os layouts
import { HookRegistry } from "../../types/hookRegistry";

interface HookContentProps {
  brandKit: any; // Mantenha a tipagem completa aqui se preferir
}

export const HookContent = ({ brandKit }: HookContentProps) => {
  // Busca o layout no registro. Fallback para um padrão se não encontrar.
  // IMPORTANTE: Adicione a propriedade hookLayout no seu estado BrandKitState!
  const layoutId = brandKit.hookLayout || (brandKit.hookType === "save" ? "HOOK_SAVE_MINIMAL" : "HOOK_FOLLOW_IMPACT");
  const layoutDef = HookRegistry[layoutId] || HookRegistry["HOOK_SAVE_MINIMAL"];

  return (
    <div className="w-full h-full relative group">
      
      {/* A MÁGICA: O plugin renderiza aqui */}
      {(layoutDef.render({ brandKit }) as React.ReactElement)}

      {/* Overlay de Proteção Global (Aplica-se a qualquer hook) */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm z-50 pointer-events-none">
        <span className="text-white text-[10px] font-bold uppercase tracking-widest border border-[#d4af37] px-4 py-2 rounded-full">
          CTA Protegido
        </span>
      </div>
    </div>
  );
};