"use client";

import React, { useRef, useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, User } from "lucide-react";
import { getProxyUrl } from "../../utils/studioHelpers";
import { SlideUnit } from "./SlideUnit"; 

export const InstagramSimulator = ({ slides, brandKit, transitions }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // --- MOTOR DE DRAG-TO-SCROLL COM ANIMAÇÃO MAGNÉTICA ---
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const snapToClosestSlide = () => {
    setIsDragging(false);
    if (!scrollRef.current) return;

    // Lógica de Animação: Encontra o slide mais próximo (320px de largura)
    const slideWidth = 320;
    const currentScroll = scrollRef.current.scrollLeft;
    const targetIndex = Math.round(currentScroll / slideWidth);

    // Anima suavemente até o ponto exato de encaixe do slide
    scrollRef.current.scrollTo({
      left: targetIndex * slideWidth,
      behavior: 'smooth' 
    });
  };

  const handleMouseUp = () => {
    snapToClosestSlide();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      snapToClosestSlide();
    }
  };
  // ------------------------------------------------------

  const globalBgStyle = brandKit.bgType === "solid"
    ? { backgroundColor: brandKit.bgColor1 }
    : { backgroundImage: `linear-gradient(${brandKit.bgAngle}deg, ${brandKit.bgColor1}, ${brandKit.bgColor2})` };

  return (
    <div className="relative w-[320px] h-[650px] bg-black rounded-[3rem] border-[8px] border-zinc-900 shadow-[0_0_0_1px_#3f3f46,0_30px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden pointer-events-auto ring-1 ring-white/10 select-none">
      
      {/* Dynamic Island / Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-[100] shadow-[inset_0_-2px_4px_rgba(255,255,255,0.1)]" />
      
      {/* IG Header */}
      <div className="pt-10 pb-3 px-4 flex justify-between items-center bg-black z-40 shrink-0 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px]">
            <div className="w-full h-full rounded-full bg-zinc-900 border border-black flex items-center justify-center overflow-hidden">
               <User size={16} className="text-white opacity-50" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white leading-none">seu.arroba</span>
            <span className="text-[8px] text-white/60 leading-none mt-0.5">Patrocinado</span>
          </div>
        </div>
        <MoreHorizontal size={18} className="text-white" />
      </div>

      {/* ÁREA DE SCROLL (Carrossel Real com Física de Arraste) */}
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex-grow flex overflow-x-auto no-scrollbar bg-zinc-900 relative transition-all ${
          isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'
        }`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        <div className="flex h-full relative" style={globalBgStyle}>
          
          {/* SLIDES: Renderizados puramente pelo SlideUnit */}
          {slides.map((slide: any, i: number) => {
             // Tratamento especial para o Hook (pois ele não usa a estrutura normal do SlideUnit)
             if (slide.isDynamicHook || slide.isHook) {
               return (
                 <div key={`hook-${i}`} className="w-[320px] h-full snap-center relative flex-shrink-0 flex flex-col justify-center p-8 pointer-events-none" style={{ backgroundColor: brandKit.hookBgColor }}>
                    <div className="flex flex-col items-center text-center space-y-4 relative z-20 pointer-events-none">
                      {brandKit.hookType === "save" ? <Bookmark size={48} color={brandKit.hookTitleColor} /> : <UserPlus size={48} color={brandKit.hookTitleColor} />}
                      <h2 style={{ color: brandKit.hookTitleColor }} className="text-2xl font-black uppercase leading-tight tracking-tighter">{brandKit.hookTitle}</h2>
                      <p style={{ color: brandKit.hookSubtitleColor }} className="text-sm font-medium opacity-70">{brandKit.hookSubtitle}</p>
                    </div>
                 </div>
               );
             }

             // Renderização padrão dos slides normais usando a Fonte da Verdade
             return (
              <div key={`sim-slide-${i}`} className="w-[320px] h-full snap-center relative flex-shrink-0 pointer-events-none">
                <SlideUnit index={i} slide={slide} totalSlides={slides.length} />
              </div>
             );
          })}

          {/* Efeitos Z-Axis */}
          {transitions.map((trans: any) => {
            if (trans.shape === "none" && !trans.url) return null;
            const xPos = (trans.slideIndex + 1) * 320;
            return (
              <React.Fragment key={`trans-${trans.slideIndex}`}>
                {trans.shape !== "none" && (
                  <div className="absolute z-10 pointer-events-none flex items-center justify-center" style={{ left: `${xPos}px`, top: `${trans.topPos}%`, transform: "translate(-50%, -50%)" }}>
                    <div style={{ width: `${trans.shapeSize}px`, height: trans.shape === "rectangle" ? `${trans.shapeSize * 0.45}px` : `${trans.shapeSize}px`, backgroundColor: trans.shapeColor, borderRadius: trans.shape === "circle" ? "50%" : "16px", opacity: trans.shapeOpacity ?? 0.8 }} />
                  </div>
                )}
                {trans.url && (
                  <div className="absolute z-30 pointer-events-none flex items-center justify-center" style={{ left: `${xPos}px`, top: `${trans.topPos}%`, transform: "translate(-50%, -50%)" }}>
                    <img src={getProxyUrl(trans.url)} style={{ width: `${trans.imgSize}px`, filter: `blur(${trans.blur || 0}px)`, opacity: trans.imgOpacity ?? 1 }} alt="" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* IG Footer */}
      <div className="p-4 bg-black z-40 shrink-0">
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-4 items-center">
            <Heart size={22} className="text-white hover:text-red-500 cursor-pointer transition-colors" />
            <MessageCircle size={22} className="text-white" />
            <Send size={22} className="text-white" />
          </div>
          <Bookmark size={22} className="text-white" />
        </div>
        <div className="space-y-1">
          <p className="text-[11px] text-white font-bold">12.432 curtidas</p>
          <p className="text-[10px] text-white">
            <span className="font-bold mr-2">seu.arroba</span>
            Validando o design em tempo real.
          </p>
        </div>
      </div>
    </div>
  );
};