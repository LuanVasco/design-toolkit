// src/app/studio/components/SlideUnit.tsx
"use client";

import React from "react";
import { useBrandKit } from "@/app/context/BrandKitContext";
import { WidgetLayer } from "./WidgetLayer";
import { getProxyUrl } from "../../utils/studioHelpers";
import { LayoutRegistry } from "../../types/layoutRegistry";

// Importe seus layouts
import '../../layouts/index'; 

interface SlideUnitProps {
  index: number;
  slide: any;
  totalSlides: number;
}

export const SlideUnit = ({ index, slide, totalSlides }: SlideUnitProps) => {
  const { brandKit } = useBrandKit();

  const getSlideBg = () => {
    if (!slide.useCustomBg) return { background: 'transparent' }; 
    return { backgroundColor: slide.customBgColor, backgroundImage: 'none' }; 
  };

  // 🧠 MOTOR DE AUTO-FIT INTEGRADO AO PAI
  const getDynamicTypographyVariables = () => {
    const titleLen = slide.title?.length || 0;
    const descLen = slide.desc?.length || 0;

    // Lógica Escalonável para Títulos (Garante que nunca quebre a tela)
    let tSize = "28px"; 
    let tLead = "1.05";
    if (titleLen > 45) { tSize = "21px"; tLead = "1.15"; }
    else if (titleLen > 20) { tSize = "24px"; tLead = "1.1"; }

    // Lógica Escalonável para Descrições
    let dSize = "15px";
    let dLead = "1.5";
    if (descLen > 120) { dSize = "13px"; dLead = "1.4"; }

    return {
      '--title-size': tSize,
      '--title-leading': tLead,
      '--desc-size': dSize,
      '--desc-leading': dLead,
    };
  };

  const getGlobalStyles = () => {
    const pair = brandKit.fontPair || 'modern'; 
    let typography = { '--font-title': '"Inter", sans-serif', '--font-body': '"Inter", sans-serif' };

    if (pair === 'elegant') typography = { '--font-title': '"Playfair Display", serif', '--font-body': '"Lato", sans-serif' };
    else if (pair === 'impact') typography = { '--font-title': '"Montserrat", sans-serif', '--font-body': '"Open Sans", sans-serif' };
    else if (pair === 'creative') typography = { '--font-title': '"Space Grotesk", sans-serif', '--font-body': '"Roboto", sans-serif' };

    return { 
      ...getSlideBg(), 
      ...typography,
      ...getDynamicTypographyVariables(), 
      '--brand-color': brandKit.brandColor,
      '--text-color': brandKit.textColor,
      '--font-scale': brandKit.fontScale || 1, // 👈 INJETAMOS A ESCALA DO USUÁRIO AQUI
      color: brandKit.textColor 
    } as React.CSSProperties;
  };

  const layoutDef = LayoutRegistry[slide.layout] || LayoutRegistry["CLASSIC"];

  return (
    <div 
      className={`carousel-slide-unit w-full h-full relative flex flex-col justify-center z-20 transition-all duration-500 overflow-hidden ${layoutDef?.paddingClass || 'p-8'}`}
      style={getGlobalStyles()} 
    >
      {/* 🚀 O HACK DE PRODUTIVIDADE COMBINADO COM A ESCALA */}
      {/* O calc() multiplica o tamanho seguro pela escala escolhida pelo usuário */}
      <style>{`
        .carousel-slide-unit h1,
        .carousel-slide-unit h2,
        .carousel-slide-unit h3 {
          font-size: calc(var(--title-size) * var(--font-scale)) !important;
          line-height: var(--title-leading) !important;
        }
        .carousel-slide-unit p {
          font-size: calc(var(--desc-size) * var(--font-scale)) !important;
          line-height: var(--desc-leading) !important;
        }
      `}</style>

      {slide.bgImage && layoutDef?.category !== "media" && (
        <img 
          src={getProxyUrl(slide.bgImage)} 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 mix-blend-overlay pointer-events-none" 
          alt="Textura" 
        />
      )}

      <WidgetLayer index={index} totalSlides={totalSlides} hiddenWidgets={layoutDef?.hiddenWidgets || []} />

      <div className="w-full h-full relative z-10 flex flex-col justify-center">
         {layoutDef && (layoutDef.render({ slide, brandKit, index, getProxyUrl }) as React.ReactNode)}
      </div>
    </div>
  );
};