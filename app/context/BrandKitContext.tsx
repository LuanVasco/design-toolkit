"use client";

import React, { createContext, useContext, useState } from "react";

// 1. TIPAGEM CENTRALIZADA (O contrato do seu Studio)
export interface BrandKitState {
 // ==========================================
  // 🚀 DADOS DO BRAND HUB & ONBOARDING
  // ==========================================
  brandName?: string;
  niche?: string;
  titleFont?: string;
  subtitleFont?: string;
  logoUrl?: string;
  avatarUrl?: string;
  persona?: string;
  goal?: string;
  logoStrategy?: string; // "upload" | "ai"
  logoType?: string; // "monograma" | "geometrico" | "tipografico"
  config?: any; // Armazena a configuração do logo paramétrico da IA

  // ==========================================
  // 🎨 DADOS DO STUDIO (Cores e Fundo)
  // ==========================================
  textColor: string;
  brandColor: string;
  bgType: "solid" | "gradient";
  bgColor1: string;
  bgColor2: string;
  bgAngle: number;

  // Widgets do Post
  handleEnabled: boolean;
  handle: string;
  handlePos: string;
  paginationStyle: "numbers" | "dots" | "progress" | "none";
  paginationPos: string;
  swipeText: string;
  swipeStyle: "pill" | "minimal";
  swipePos: string;
  
  // Autor
  authorEnabled: boolean;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  authorPos: string;

  // Hook CTA (Slide Final)
  hookEnabled: boolean;
  hookLayout: string;
  hookTitle: string;
  hookSubtitle: string;
  hookBgColor: string;
  hookTitleColor: string;
  hookSubtitleColor: string;
  hookPosition: number;

  // Tipografia do Post
  fontPair: "modern" | "elegant" | "impact" | "creative";
  fontScale: number;
}

// 2. ESTADO INICIAL (Seus valores default)
const defaultBrandKit: BrandKitState = {
  // Defaults Hub
  brandName: "",
  niche: "",
  titleFont: "Inter",
  subtitleFont: "Inter",
  logoUrl: "",
  avatarUrl: "",
  persona: "premium",
  goal: "autoridade",
  logoStrategy: "ai",
  logoType: "geometrico",
  config: null,

  // Defaults Studio
  textColor: "#ffffff",
  brandColor: "#d4af37",
  bgType: "gradient",
  bgColor1: "#09090b",
  bgColor2: "#18181b",
  bgAngle: 135,

  handleEnabled: false,
  handle: "@designgen.os",
  handlePos: "top-right",
  paginationStyle: "progress",
  paginationPos: "bottom-center",
  swipeText: "arraste pro lado",
  swipeStyle: "minimal",
  swipePos: "bottom-right",

  authorEnabled: true,
  authorName: "Luan Vasco",
  authorRole: "Product Owner",
  authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200",
  authorPos: "top-left",

  hookEnabled: true,
  hookLayout: "CENTER",
  hookTitle: "SALVE PARA DEPOIS",
  hookSubtitle: "Conteúdo de alto valor para você aplicar na prática.",
  hookBgColor: "#d4af37",
  hookTitleColor: "#09090b",
  hookSubtitleColor: "#18181b",
  hookPosition: 99,
  
  fontPair: "modern",
  fontScale: 1
};

// 3. CRIAÇÃO DO CONTEXTO
const BrandKitContext = createContext<{
  brandKit: BrandKitState;
  updateBrandKit: (updates: Partial<BrandKitState>) => void;
} | undefined>(undefined);

// 4. PROVIDER
export function BrandKitProvider({ children }: { children: React.ReactNode }) {
  const [brandKit, setBrandKit] = useState<BrandKitState>(defaultBrandKit);

  // O Motor de Atualização
  const updateBrandKit = (updates: Partial<BrandKitState>) => {
    setBrandKit((prev) => ({ ...prev, ...updates }));
  };

  return (
    <BrandKitContext.Provider value={{ brandKit, updateBrandKit }}>
      {children}
    </BrandKitContext.Provider>
  );
}

// 5. HOOK CUSTOMIZADO
export function useBrandKit() {
  const context = useContext(BrandKitContext);
  if (!context) {
    throw new Error("useBrandKit deve ser usado dentro de um BrandKitProvider");
  }
  return context;
}