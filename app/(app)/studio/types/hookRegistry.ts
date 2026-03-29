import React from 'react';

export interface HookRenderProps {
  brandKit: any; // Mantendo simples para receber todo o estado
  getProxyUrl?: (url: string) => string;
}

export interface HookDef {
  id: string;
  name: string;
  icon?: React.ReactNode; // Opcional: para colocar um ícone no botão do menu
  render: React.FC<HookRenderProps>;
}

export const HookRegistry: Record<string, HookDef> = {};

// Função simplificada que retorna todos os hooks disponíveis
// src/app/studio/types/hookRegistry.ts

export const getAllHooks = () => {
    const hooks = Object.values(HookRegistry);
    return hooks;
  };