"use client";

import React, { useEffect } from "react";
import { loadGoogleFont } from "@/app/lib/logo-fonts";
import { MonogramShapes, GeometricShapes } from "./Shapes";

// ============================================================================
// 🚀 TIPAGEM MESTRE DO LOGO (Resolve o erro "Cannot find name 'LogoConfig'")
// ============================================================================
export type MacroCategory = 'monograma' | 'geometrico' | 'tipografico';

export interface LogoConfig {
  id: string;
  category: MacroCategory;
  shapeKey: string;
  layout: 'inline' | 'stacked' | 'centered' | 'emblem' | 'spaced' | 'duotone' | 'focal' | 'badge' | 'fallback';
  primaryColor: string;
  secondaryColor: string;
  fontName: string;
  styleConfig?: {
    fontWeight?: string;
    letterSpacing?: string;
    textTransform?: string;
    scale?: number;
    inverted?: boolean;
    rationale?: string;
    iconStyle?: string;
  };
  fontUrl?: string;
}

interface LogoRendererProps {
  config: LogoConfig;
  brandName: string;
  className?: string;
}

// 🛠️ Função auxiliar para transformar o texto conforme a IA manda
const applyTextTransform = (text: string, transformType?: string) => {
  if (!text) return text;
  if (transformType === 'uppercase') return text.toUpperCase();
  if (transformType === 'lowercase') return text.toLowerCase();
  if (transformType === 'capitalize') return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  return text;
};

export const LogoRenderer = ({ config, brandName, className = "w-full h-full" }: LogoRendererProps) => {
  
  // 🧠 Extrai os Design Tokens da IA
  const cfg = {
    weight: config.styleConfig?.fontWeight || "800",
    spacing: config.styleConfig?.letterSpacing || "normal",
    transform: config.styleConfig?.textTransform || "uppercase",
    scale: config.styleConfig?.scale || 1,
    inverted: config.styleConfig?.inverted || false,
  };

  const words = brandName.split(" ");
  const rawInitials = words.length > 1 ? (words[0].charAt(0) + words[1].charAt(0)) : brandName.substring(0, 2);
  
  // Aplica as regras de gramática visual
  const initials = applyTextTransform(rawInitials, cfg.transform);
  const formattedBrandName = applyTextTransform(brandName, cfg.transform);

  useEffect(() => {
    loadGoogleFont(config.fontName);
  }, [config.fontName]);

  const renderContainer = (content: React.ReactNode) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" className={className}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=${config.fontName.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800;900&display=swap');
        .brand-text { font-family: '${config.fontName}', sans-serif; }
      `}</style>
      {content}
    </svg>
  );

  const textColor = cfg.inverted ? config.secondaryColor : "#ffffff";

  // ==========================================
  // 🛡️ MONOGRAMAS
  // ==========================================
  if (config.category === 'monograma') {
    const Shape = MonogramShapes[config.shapeKey as keyof typeof MonogramShapes] || MonogramShapes.NeoShield;
    
    if (config.layout === 'emblem') {
      return renderContainer(
        <g transform={`translate(400, 400) scale(${cfg.scale})`}>
          <g transform="scale(5.5)"><Shape color={config.primaryColor} secondaryColor={config.secondaryColor} size={100} /></g>
          <text x="0" y="15" fontSize="220" fontWeight={cfg.weight} fill={textColor} textAnchor="middle" dominantBaseline="central" className="brand-text" style={{ letterSpacing: cfg.spacing === 'normal' ? '-10px' : cfg.spacing }}>
            {initials}
          </text>
        </g>
      );
    }
    if (config.layout === 'stacked') {
      return renderContainer(
        <g transform={`translate(400, 400) scale(${cfg.scale})`}>
          <rect x="-240" y="-240" width="480" height="480" rx="60" fill={config.primaryColor} />
          <text x="0" y="20" fontSize="220" fontWeight={cfg.weight} fill={cfg.inverted ? "#ffffff" : "#050505"} textAnchor="middle" dominantBaseline="central" className="brand-text" style={{ letterSpacing: cfg.spacing }}>
            {initials}
          </text>
        </g>
      );
    }
    return renderContainer(
      <g transform={`translate(400, 400) scale(${cfg.scale})`}>
        <path d="M-180,-120 L-220,-120 L-220,120 L-180,120" fill="none" stroke={config.primaryColor} strokeWidth="5" />
        <path d="M180,-120 L220,-120 L220,120 L180,120" fill="none" stroke={config.primaryColor} strokeWidth="5" />
        <text x="0" y="10" fontSize="200" fontWeight={cfg.weight} fill={textColor} textAnchor="middle" dominantBaseline="central" className="brand-text" style={{ letterSpacing: cfg.spacing === 'normal' ? '15px' : cfg.spacing }}>
          {initials}
        </text>
      </g>
    );
  }

  // ==========================================
  // 🌀 GEOMÉTRICOS
  // ==========================================
  if (config.category === 'geometrico') {
    const Shape = GeometricShapes[config.shapeKey as keyof typeof GeometricShapes] || GeometricShapes.PrecisionSpark;
    
    if (config.layout === 'stacked' || config.layout === 'centered' || config.layout === 'badge') {
      return renderContainer(
        <g transform={`translate(400, 400) scale(${cfg.scale})`}>
          <g transform="translate(-100, -200) scale(2)"><Shape color={config.primaryColor} secondaryColor={config.secondaryColor} size={100} /></g>
          <text x="0" y="130" fontSize="110" fontWeight={cfg.weight} fill={textColor} textAnchor="middle" dominantBaseline="central" className="brand-text" style={{ letterSpacing: cfg.spacing }}>
            {formattedBrandName}
          </text>
        </g>
      );
    }
    
    return renderContainer(
      <g transform={`translate(400, 400) scale(${cfg.scale})`}>
        <g transform="translate(-340, -60) scale(1.2)"><Shape color={config.primaryColor} secondaryColor={config.secondaryColor} size={100} /></g>
        <text x="-160" y="5" fontSize="115" fontWeight={cfg.weight} fill={textColor} textAnchor="start" dominantBaseline="central" className="brand-text" style={{ letterSpacing: cfg.spacing }}>
          {formattedBrandName}
        </text>
      </g>
    );
  }

  // ==========================================
  // ➖ TIPOGRÁFICOS
  // ==========================================
  if (config.category === 'tipografico') {
    if (config.layout === 'duotone') {
      return renderContainer(
        <g transform={`translate(400, 400) scale(${cfg.scale})`}>
          <text x="0" y="-75" fontSize="145" fontWeight={cfg.weight} fill={textColor} textAnchor="middle" dominantBaseline="central" className="brand-text" style={{ letterSpacing: cfg.spacing }}>
            {applyTextTransform(words[0], cfg.transform)}
          </text>
          <text x="0" y="85" fontSize="145" fontWeight={cfg.weight} fill={config.primaryColor} textAnchor="middle" dominantBaseline="central" className="brand-text" style={{ letterSpacing: cfg.spacing }}>
            {words.slice(1).join(" ") || applyTextTransform("Studio", cfg.transform)}
          </text>
        </g>
      );
    }
    if (config.layout === 'focal') {
      return renderContainer(
        <g transform={`translate(400, 400) scale(${cfg.scale})`}>
          <text x="-35" y="0" fontSize="140" fontWeight={cfg.weight} fill={textColor} textAnchor="middle" dominantBaseline="central" className="brand-text" style={{ letterSpacing: cfg.spacing }}>
            {formattedBrandName}
          </text>
          <circle cx={brandName.length * 35} cy="20" r="24" fill={config.primaryColor} />
        </g>
      );
    }
    return renderContainer(
      <g transform={`translate(400, 400) scale(${cfg.scale})`}>
        <text x="0" y="-30" fontSize="75" fontWeight={cfg.weight} fill={textColor} textAnchor="middle" dominantBaseline="central" className="brand-text" style={{ letterSpacing: cfg.spacing === 'normal' ? '25px' : cfg.spacing }}>
          {formattedBrandName}
        </text>
        <rect x="-100" y="50" width="200" height="3" fill={config.primaryColor} />
      </g>
    );
  }

  return null;
};