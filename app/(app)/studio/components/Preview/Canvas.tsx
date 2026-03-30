"use client";

import React, { forwardRef, useState, useMemo } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { getProxyUrl } from "../../utils/studioHelpers";
import { LayoutPanelLeft } from "lucide-react";

// --- IMPORTAÇÕES DOS COMPONENTES EXTERNALIZADOS ---
import { IntersectionScanner } from "./IntersectionScanner";
import { HookContent } from "./HookContent"; 
import { SlideWrapper } from "./SlideWrapper"; 

// --- TIPAGENS ---
export interface ZAxisTransition {
  slideIndex: number;
  topPos: number;
  shape: string;
  shapeColor?: string;
  shapeSize?: number;
  shapeOpacity?: number;
  blur?: number;
  url?: string;
  imgSize?: number;
  imgOpacity?: number;
}

// --- HELPERS (mantidos) ---
const hexToRgba = (hex: string, opacity: number) => {
  if (!hex) return "transparent";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const ZAxisElement = ({ data }: { data: ZAxisTransition }) => {
  if (data.shape === "none" && !data.url) return null;
  const xPos = (data.slideIndex + 1) * 320;

  return (
    <React.Fragment>
      {data.shape !== "none" && (
        <div className="absolute z-10 pointer-events-none flex items-center justify-center transition-all duration-150" style={{ left: `${xPos}px`, top: `${data.topPos}%`, transform: "translate(-50%, -50%)" }}>
          <div style={{ width: `${data.shapeSize}px`, height: data.shape === "rectangle" ? `${(data.shapeSize || 100) * 0.45}px` : `${data.shapeSize}px`, backgroundColor: data.shapeColor, borderRadius: data.shape === "circle" ? "50%" : "16px", opacity: data.shapeOpacity ?? 0.8 }} className="shadow-2xl" />
        </div>
      )}
      {data.url && (
        <div className="absolute z-30 pointer-events-none flex items-center justify-center transition-all duration-150" style={{ left: `${xPos}px`, top: `${data.topPos}%`, transform: "translate(-50%, -50%)" }}>
          <img src={getProxyUrl(data.url)} style={{ width: `${data.imgSize}px`, filter: `blur(${data.blur || 0}px) drop-shadow(0 20px 40px rgba(0,0,0,0.4))`, opacity: data.imgOpacity ?? 1 }} alt="Z-Axis" />
        </div>
      )}
    </React.Fragment>
  );
};

export const CarouselPreview = forwardRef<HTMLDivElement, any>(
  ({ orderedSlides = [], brandKit, transitions = [], activePanel, modal, onAddSlide, onDeleteSlide, onEditSlide, onOpenTransition, isImmersiveOpen = false, onReorderSlides }, ref) => {
    
    const [showSafeZones, setShowSafeZones] = useState(true);
    const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);

    // 1. PREPARAÇÃO DA FILA (Injeção do Hook)
    const finalSlides = useMemo(() => {
      const sanitized = orderedSlides.filter((s: any) => !s.isHook);
      
      if (brandKit?.hookEnabled) {
        const hookData = { id: 'dynamic-hook-cta', isDynamicHook: true };
        let pos = sanitized.length;
        if (brandKit.hookPosition && brandKit.hookPosition !== 99) {
          pos = Math.min(Math.max(0, brandKit.hookPosition - 1), sanitized.length);
        }
        sanitized.splice(pos, 0, hookData);
      }
      return sanitized;
    }, [orderedSlides, brandKit?.hookEnabled, brandKit?.hookPosition]);

    const trackWidth = finalSlides.length * 320;

    if (!brandKit) return null;

    const globalBgStyle = brandKit.bgType === "solid"
      ? { backgroundColor: brandKit.bgColor1 }
      : { backgroundImage: `linear-gradient(${brandKit.bgAngle}deg, ${brandKit.bgColor1}, ${brandKit.bgColor2})` };

    // --- MOTOR DE RENDERIZAÇÃO ---
    const renderTrackContent = (isSimulator = false) => {
      if (isSimulator) {
        return (
          <div className="flex h-full relative z-20" style={{ width: `${trackWidth}px` }}>
            {finalSlides.map((item: any, i: number) => (
              <div key={item.id} className="w-[320px] h-full flex-shrink-0 relative snap-center">
                 {/* Utiliza os componentes externalizados */}
                 {item.isDynamicHook ? <HookContent brandKit={brandKit} /> : <SlideWrapper item={item} i={i} hoveredSlide={null} totalSlidesCount={finalSlides.length} isSimulator={true} showSafeZones={false} />}
              </div>
            ))}
          </div>
        );
      }

      return (
        <Reorder.Group 
          axis="x" 
          values={finalSlides} 
          onReorder={onReorderSlides} 
          className="flex h-full relative z-20" 
          style={{ width: `${trackWidth}px` }}
        >
          {finalSlides.map((item: any, i: number) => (
            <Reorder.Item 
              key={item.id} 
              value={item}
              dragListener={!item.isDynamicHook} 
              className={`w-[320px] h-full flex-shrink-0 relative border-r border-white/5 ${item.isDynamicHook ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
            >
              {/* Utiliza os componentes externalizados */}
              {item.isDynamicHook ? (
                <HookContent brandKit={brandKit} />
              ) : (
                <SlideWrapper 
                  item={item} i={i} hoveredSlide={hoveredSlide} setHoveredSlide={setHoveredSlide}
                  totalSlidesCount={finalSlides.length}
                  onEditSlide={onEditSlide} onAddSlide={onAddSlide} onOpenTransition={onOpenTransition} onDeleteSlide={onDeleteSlide}
                  showSafeZones={showSafeZones} isSimulator={false} 
                />
              )}
            </Reorder.Item>
          ))}

          {/* 👇 CORREÇÃO: Trans tipada com a interface correta */}
          {transitions.map((trans: ZAxisTransition) => {
            const isEditing = activePanel === "zaxis" && modal?.targetIndex === trans.slideIndex;
            return <ZAxisElement key={`z-${trans.slideIndex}`} data={isEditing ? modal.data : trans} />;
          })}
        </Reorder.Group>
      );
    };

    return (
      <div className="flex-grow relative flex flex-col items-center justify-center w-full h-full">
        <div className={`w-full h-full flex flex-col transition-all duration-700 ${isImmersiveOpen ? 'blur-3xl opacity-10 scale-95 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex-grow bg-zinc-950/20 backdrop-blur-xl rounded-[3rem] border border-white/5 p-6 sm:p-8 overflow-hidden flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] mt-4">
            <header className="flex justify-between items-center mb-6 px-2 shrink-0">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] flex items-center gap-2">
                <LayoutPanelLeft size={14} /> DesignGen OS Studio
              </h3>
              <button onClick={() => setShowSafeZones(!showSafeZones)} className="text-[9px] font-black px-4 py-2 rounded-xl bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-white transition-all">
                {showSafeZones ? 'BLUEPRINT: ON' : 'VIEW: CLEAN'}
              </button>
            </header>
            
            <div className="overflow-x-auto pb-10 no-scrollbar select-none" ref={ref}>
              <div id="panoramicTrack" className="flex h-[400px] relative mt-10 overflow-visible" style={{ width: `${trackWidth}px` }}>
                <AnimatePresence>
                  {activePanel === "zaxis" && modal?.targetIndex !== null && (
                    <IntersectionScanner targetIndex={modal.targetIndex} activePanel={activePanel} />
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden ring-1 ring-white/10" style={{ ...globalBgStyle, width: '100%' }}>
                  {renderTrackContent(false)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CarouselPreview.displayName = "CarouselPreview";