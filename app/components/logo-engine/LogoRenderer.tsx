"use client";

import React, { useEffect } from "react";
import { loadGoogleFont } from "@/app/lib/logo-fonts";
import { LogoConfig } from "../../(app)/logo-helper/engine/combinator";
import { MonogramShapes, GeometricShapes } from "./Shapes";

interface LogoRendererProps {
  config: LogoConfig;
  brandName: string;
  className?: string;
}

export const LogoRenderer = ({ config, brandName, className = "w-full h-full" }: LogoRendererProps) => {
  const words = brandName.split(" ");
  const initials = words.length > 1 ? (words[0].charAt(0) + words[1].charAt(0)).toUpperCase() : brandName.substring(0, 2).toUpperCase();

  useEffect(() => {
    loadGoogleFont(config.fontName);
  }, [config.fontName]);

  const renderContainer = (content: React.ReactNode) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" className={className}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=${config.fontName.replace(/\s+/g, '+')}:wght@400;600;800;900&display=swap');
        .brand-text { font-family: '${config.fontName}', sans-serif; }
      `}</style>
      {content}
    </svg>
  );

  // ==========================================
  // 🛡️ MONOGRAMAS (Arquitetura de Espaço)
  // ==========================================
  if (config.category === 'monograma') {
    const Shape = MonogramShapes[config.shapeKey as keyof typeof MonogramShapes];
    
    // Estilo 1: INTERLOCK (Letras coladas com shape de fundo)
    if (config.layout === 'emblem') {
      return renderContainer(
        <g transform="translate(400, 400)">
          <g transform="scale(5.5)">
            {Shape && <Shape color={config.primaryColor} secondaryColor={config.secondaryColor} size={100} />}
          </g>
          <text x="0" y="15" fontSize="240" fontWeight="900" fill="#ffffff" textAnchor="middle" dominantBaseline="central" className="brand-text" style={{ letterSpacing: '-20px' }}>
            {initials}
          </text>
        </g>
      );
    }

    // Estilo 2: NEGATIVE CUTOUT (Texto vazado no shape sólido)
    if (config.layout === 'stacked') {
      return renderContainer(
        <g transform="translate(400, 400)">
          <rect x="-240" y="-240" width="480" height="480" rx="40" fill={config.primaryColor} />
          <text x="0" y="20" fontSize="220" fontWeight="900" fill="#050505" textAnchor="middle" dominantBaseline="central" className="brand-text">
            {initials}
          </text>
        </g>
      );
    }

    // Estilo 3: MINIMALIST FRAME (Moldura lateral fina)
    return renderContainer(
      <g transform="translate(400, 400)">
        <path d="M-180,-120 L-220,-120 L-220,120 L-180,120" fill="none" stroke={config.primaryColor} strokeWidth="3" />
        <path d="M180,-120 L220,-120 L220,120 L180,120" fill="none" stroke={config.primaryColor} strokeWidth="3" />
        <text x="0" y="10" fontSize="180" fontWeight="800" fill="#ffffff" textAnchor="middle" dominantBaseline="central" className="brand-text" style={{ letterSpacing: '15px' }}>
          {initials}
        </text>
      </g>
    );
  }

  // ==========================================
  // 🌀 GEOMÉTRICOS (Equilíbrio e Peso Visual)
  // ==========================================
  if (config.category === 'geometrico') {
    const Shape = GeometricShapes[config.shapeKey as keyof typeof GeometricShapes];
    
    if (config.layout === 'stacked') {
      return renderContainer(
        <g transform="translate(400, 400)">
          <g transform="translate(-100, -200) scale(2)">
            {Shape && <Shape color={config.primaryColor} secondaryColor={config.secondaryColor} size={100} />}
          </g>
          <text x="0" y="130" fontSize="110" fontWeight="800" fill="#ffffff" textAnchor="middle" dominantBaseline="central" className="brand-text tracking-tighter">
            {brandName}
          </text>
        </g>
      );
    }
    
    if (config.layout === 'inline') {
      return renderContainer(
        <g transform="translate(400, 400)">
          <g transform="translate(-340, -60) scale(1.2)">
            {Shape && <Shape color={config.primaryColor} secondaryColor={config.secondaryColor} size={100} />}
          </g>
          <text x="-160" y="5" fontSize="115" fontWeight="800" fill="#ffffff" textAnchor="start" dominantBaseline="central" className="brand-text tracking-tighter">
            {brandName}
          </text>
        </g>
      );
    }
  }

  // ==========================================
  // ➖ TIPOGRÁFICOS (Minimalismo de Luxo)
  // ==========================================
  if (config.category === 'tipografico') {
    if (config.layout === 'duotone') {
      return renderContainer(
        <g transform="translate(400, 400)">
          <text x="0" y="-75" fontSize="145" fontWeight="900" fill="#ffffff" textAnchor="middle" dominantBaseline="central" className="brand-text tracking-tighter">{words[0]}</text>
          <text x="0" y="85" fontSize="145" fontWeight="900" fill={config.primaryColor} textAnchor="middle" dominantBaseline="central" className="brand-text tracking-tighter">{words.slice(1).join(" ") || "Studio"}</text>
        </g>
      );
    }
    if (config.layout === 'focal') {
      return renderContainer(
        <g transform="translate(400, 400)">
          <text x="-35" y="0" fontSize="150" fontWeight="900" fill="#ffffff" textAnchor="middle" dominantBaseline="central" className="brand-text tracking-tighter">{brandName}</text>
          <circle cx="350" cy="20" r="28" fill={config.primaryColor} />
        </g>
      );
    }
    if (config.layout === 'spaced') {
      return renderContainer(
        <g transform="translate(400, 400)">
          <text x="0" y="-30" fontSize="65" fontWeight="400" fill="#ffffff" textAnchor="middle" dominantBaseline="central" letterSpacing="35" className="brand-text uppercase">{brandName.toUpperCase()}</text>
          <rect x="-80" y="50" width="160" height="2" fill={config.primaryColor} />
        </g>
      );
    }
  }

  return null;
};