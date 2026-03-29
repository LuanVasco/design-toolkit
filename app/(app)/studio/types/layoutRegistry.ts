import React from 'react';

// Tipos base para as props que os layouts vão receber
export interface RenderProps {
  slide: any;
  brandKit: any;
  index: number;
  getProxyUrl: (url: string) => string;
}

export interface ThumbnailProps {
  brandColor: string;
  isActive: boolean;
}

// A interface rigorosa que obriga todo layout a ter um padrão
export interface SmartLayoutDef {
  id: string;
  category: "covers" | "content" | "media" | "social" | "hooks";
  name: string;
  hiddenWidgets: string[];
  paddingClass: string;
  render: React.FC<RenderProps>;
  thumbnail: React.FC<ThumbnailProps>;
}

// O REGISTRO CENTRAL (Você vai importar os arquivos individuais aqui)
export const LayoutRegistry: Record<string, SmartLayoutDef> = {};

// Helper para a UI (Barra lateral) ler as categorias
export const getLayoutsByCategory = (category: string) => {
  return Object.values(LayoutRegistry).filter(layout => layout.category === category);
};

export const LAYOUT_CATEGORIES = [
  { id: "covers", label: "Capas" },
  { id: "content", label: "Textos" },
  { id: "media", label: "Mídias" },
  { id: "social", label: "Social" },
];