"use client";

import React from "react";
import { useBrandKit } from "@/app/context/BrandKitContext";
import { getProxyUrl, posClass } from "../../utils/studioHelpers";

interface WidgetLayerProps {
  index: number;
  totalSlides: number;
  isHook?: boolean;
  hiddenWidgets?: string[]; // NOVA PROP: Array com os nomes dos widgets a ocultar
}

export const WidgetLayer = ({ 
  index, 
  totalSlides, 
  isHook = false, 
  hiddenWidgets = [] // Valor padrão vazio para não quebrar layouts antigos
}: WidgetLayerProps) => {
  const { brandKit } = useBrandKit();

  // A regra de ouro que definimos: o Hook é uma tela especial e limpa
  if (isHook) return null;

  const slideNumber = index + 1;
  const isLastVisualSlide = slideNumber === totalSlides;

  // Estilo compartilhado para textos de widgets (com opacidade)
  const widgetTextStyle = { color: brandKit.textColor + '99' }; // ~60% opacidade

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      
      {/* WIDGET: AUTORIDADE */}
      {brandKit.authorEnabled && !hiddenWidgets.includes('author') && (
        <div className={`absolute flex items-center gap-3 ${posClass(brandKit.authorPos)}`}>
          <div className="w-10 h-10 rounded-full border border-zinc-700/50 overflow-hidden shadow-lg flex-shrink-0 bg-zinc-900">
            {brandKit.authorAvatar && (
              <img src={getProxyUrl(brandKit.authorAvatar)} className="w-full h-full object-cover" alt="Autor" />
            )}
          </div>
          <div className={`flex flex-col ${brandKit.authorPos.includes('right') ? 'items-end' : 'items-start'}`}>
            <h4 className="text-[12px] font-black leading-tight tracking-wide" style={{ color: brandKit.textColor }}>
              {brandKit.authorName}
            </h4>
            <p className="text-[9px] font-bold uppercase tracking-widest leading-none" style={{ color: brandKit.brandColor }}>
              {brandKit.authorRole}
            </p>
          </div>
        </div>
      )}

      {/* WIDGET: HANDLE @ */}
      {brandKit.handleEnabled && !hiddenWidgets.includes('handle') && (
        <div className={`absolute text-[10px] font-bold tracking-widest uppercase ${posClass(brandKit.handlePos)}`} style={widgetTextStyle}>
          {brandKit.handle}
        </div>
      )}

      {/* WIDGET: PAGINAÇÃO */}
      {brandKit.paginationStyle !== "none" && !hiddenWidgets.includes('pagination') && (
        <div className={`absolute flex items-center ${posClass(brandKit.paginationPos)}`}>
          {brandKit.paginationStyle === "numbers" && (
            <span className="text-[10px] font-bold" style={widgetTextStyle}>
              0{slideNumber} / 0{totalSlides}
            </span>
          )}
          {brandKit.paginationStyle === "dots" && (
            <div className="flex gap-1.5">
              {Array.from({ length: totalSlides }).map((_, d) => (
                <div 
                  key={d} 
                  className="w-1.5 h-1.5 rounded-full transition-all" 
                  style={{ backgroundColor: d === index ? brandKit.brandColor : brandKit.textColor + '33' }}
                ></div>
              ))}
            </div>
          )}
          {brandKit.paginationStyle === "progress" && (
            <div className="w-16 h-1 rounded-full overflow-hidden bg-white/10" style={{ backgroundColor: brandKit.textColor + '22' }}>
              <div 
                className="h-full transition-all duration-500" 
                style={{ width: `${(slideNumber / totalSlides) * 100}%`, backgroundColor: brandKit.brandColor }}
              ></div>
            </div>
          )}
        </div>
      )}

      {/* WIDGET: SWIPE (ARRASTE) */}
      {brandKit.swipeText && !isLastVisualSlide && !hiddenWidgets.includes('swipe') && (
        <div className={`absolute flex ${posClass(brandKit.swipePos)}`}>
          {brandKit.swipeStyle === "pill" ? (
            <span className="text-[8px] font-bold text-zinc-950 px-2.5 py-1.5 rounded uppercase tracking-widest shadow-md" style={{ backgroundColor: brandKit.brandColor }}>
              {brandKit.swipeText}
            </span>
          ) : (
            <span className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1" style={widgetTextStyle}>
              {brandKit.swipeText} 
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          )}
        </div>
      )}
    </div>
  );
};