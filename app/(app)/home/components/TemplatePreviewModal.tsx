"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, LayoutTemplate } from "lucide-react";
import { ShowroomCanvas } from "../../studio/components/Preview/ShowroomCanvas";
import { StudioTemplate } from "../../studio/utils/presetTemplates";

interface PreviewModalProps {
  template: StudioTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (template: StudioTemplate) => void;
}

export const TemplatePreviewModal = ({ template, isOpen, onClose, onConfirm }: PreviewModalProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!template) return null;

  // 1. EXTRAÇÃO DO DNA NATIVO DO PRESET
  // Usamos as propriedades puras que você definir no presetTemplates.ts
  const presetBgColor = template.theme?.bgColor1 || "#050505";
  const presetBrandColor = template.theme?.brandColor || "#d4af37";
  const presetTextColor = template.theme?.textColor || "#ffffff";
  const presetTitleFont = (template.theme as any)?.titleFont || "Inter";
   const presetBodyFont = (template.theme as any)?.bodyFont || "Inter";

  // Navegação Panorâmica
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
        >
          {/* Backdrop Focado */}
          <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-3xl" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.98, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-[1600px] h-[92vh] bg-[#050505] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* LUZ DE PALCO (Aura com a cor nativa do preset) */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[180px] pointer-events-none opacity-15" 
              style={{ backgroundColor: presetBrandColor }}
            />

            {/* HEADER DA VITRINE */}
            <header className="px-8 py-5 flex items-center justify-between border-b border-white/5 bg-transparent relative z-10">
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-black"
                  style={{ backgroundColor: presetBrandColor !== '#000000' ? presetBrandColor : '#ffffff' }}
                >
                  <LayoutTemplate size={20} className="text-black/80" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter text-white leading-tight">
                    {template.name}
                  </h2>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                    {template.slides?.length || 0} Slides • Design Nativo
                  </p>
                </div>
              </div>
              
              <button onClick={onClose} className="p-3 rounded-full bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </header>

            {/* STAGE: AMBIENTE ESTÉRIL DE RENDERIZAÇÃO */}
            <div className="flex-1 relative flex items-center justify-center group">
              
              {/* Controles de Navegação Flutuantes */}
              <button onClick={() => scroll("left")} className="absolute left-6 z-30 w-14 h-14 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-xl">
                <ChevronLeft size={28} />
              </button>

              <button onClick={() => scroll("right")} className="absolute right-6 z-30 w-14 h-14 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-xl">
                <ChevronRight size={28} />
              </button>

              <div 
                ref={scrollContainerRef}
                className="w-full h-full overflow-x-auto overflow-y-hidden no-scrollbar flex items-center px-[8vw]"
              >
                {/* 🚀 O ISOLAMENTO CSS:
                  Tudo dentro desta div vai obedecer a estas variáveis, garantindo que o 
                  ShowroomCanvas renderize a aparência EXATA do presetTemplates.ts
                */}
                <div 
                  className="relative py-12"
                  style={{
                    '--font-title': `"${presetTitleFont}", sans-serif`,
                    '--font-body': `"${presetBodyFont}", sans-serif`,
                    '--brand-color': presetBrandColor,
                    color: presetTextColor, // Trava a cor base do texto
                  } as React.CSSProperties}
                >
                  {/* Sombra de profundidade no carrossel para aspecto 3D/Premium */}
                  <div className="absolute inset-0 bg-black/60 blur-2xl -z-10 translate-y-8 scale-95 rounded-[3rem]" />
                  
                  {/* 🚀 O MOTOR ÚNICO ENTRA EM AÇÃO AQUI */}
                  <ShowroomCanvas slides={template.slides} />
                  
                </div>
              </div>
            </div>

            {/* FOOTER DE CONVERSÃO */}
            <footer className="px-10 py-6 bg-zinc-950/90 border-t border-white/5 flex items-center justify-between relative z-10 backdrop-blur-xl">
              
              <div className="flex items-center gap-3 opacity-60">
                <ChevronLeft size={16} className="text-zinc-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Deslize horizontalmente
                </span>
                <ChevronRight size={16} className="text-zinc-500" />
              </div>

              <div className="flex items-center gap-8">
                <button 
                  onClick={onClose}
                  className="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => onConfirm(template)}
                  className="group flex items-center gap-6 pl-8 pr-3 py-3 rounded-full text-black font-black uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95"
                  style={{ backgroundColor: presetBrandColor !== '#000000' && presetBrandColor !== '#1a1a1a' ? presetBrandColor : '#ffffff' }}
                >
                  <span className="text-[11px] pt-0.5">Criar Meu Carrossel</span>
                  <div className="w-10 h-10 rounded-full bg-black/15 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </footer>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};