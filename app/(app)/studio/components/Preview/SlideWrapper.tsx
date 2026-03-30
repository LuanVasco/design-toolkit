"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Plus, Sparkles } from "lucide-react";
import { SlideUnit } from "./SlideUnit";

interface SlideWrapperProps {
  item: any;
  i: number;
  hoveredSlide: number | null;
  setHoveredSlide?: (index: number | null) => void;
  totalSlidesCount: number;
  onEditSlide?: (index: number) => void;
  onAddSlide?: (index: number) => void;
  onOpenTransition?: (index: number) => void;
  onDeleteSlide?: (index: number) => void;
  showSafeZones: boolean;
  isSimulator: boolean;
  isReadOnly?: boolean; // Já estava na interface, agora vamos usar!
}

export const SlideWrapper = ({ 
  item, i, hoveredSlide, setHoveredSlide, totalSlidesCount, 
  onEditSlide, onAddSlide, onOpenTransition, onDeleteSlide, 
  showSafeZones, isSimulator, 
  isReadOnly = false // 👇 1. Pegamos a prop com valor default
}: SlideWrapperProps) => {
  
  const isLastSlide = i === totalSlidesCount - 1;

  // 🧠 Helper para simplificar as condições: só mostra UI se não for simulador E não for leitura
  const showEditorUI = !isSimulator && !isReadOnly;

  return (
    <div 
      onMouseEnter={() => !isReadOnly && setHoveredSlide?.(i)} 
      onMouseLeave={() => !isReadOnly && setHoveredSlide?.(null)}
      className={`w-full h-full relative transition-colors duration-300 ${isReadOnly ? 'cursor-default' : ''}`}
    >
      {/* 1. O COMPONENTE CENTRAL DE CONTEÚDO (SLIDEUNIT) */}
      <SlideUnit index={i} slide={item} totalSlides={totalSlidesCount} />

      {/* 2. OVERLAYS DO EDITOR (Botão lateral de adição) - 👇 Adicionado !isReadOnly */}
      <AnimatePresence>
        {showEditorUI && hoveredSlide === i && !isLastSlide && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute -right-[8px] top-0 bottom-0 w-4 z-[100] group/adder flex items-center justify-center cursor-pointer" 
            onClick={() => onAddSlide?.(i + 1)}
          >
            <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent group-hover/adder:via-[#d4af37] transition-all" />
            <div className="absolute w-6 h-6 rounded-full bg-zinc-950 border border-[#d4af37] text-[#d4af37] flex items-center justify-center shadow-lg scale-75 group-hover/adder:scale-100 transition-transform">
              <Plus size={14} strokeWidth={3} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. ZONAS SEGURAS (BLUEPRINT) - 👇 Adicionado !isReadOnly */}
      {showEditorUI && showSafeZones && (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden opacity-20">
          <div className="absolute top-0 w-full h-16 border-b border-red-500 border-dashed" />
          <div className="absolute bottom-0 w-full h-24 border-t border-red-500 border-dashed" />
        </div>
      )}

      {/* 4. MENU FLUTUANTE DE CONTEXTO - 👇 Adicionado showEditorUI */}
      <AnimatePresence>
        {showEditorUI && hoveredSlide === i && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-zinc-950/90 border border-white/10 p-1.5 rounded-full shadow-2xl"
          >
            <button onClick={() => onEditSlide?.(i)} className="p-2 text-white hover:bg-zinc-800 rounded-full transition-colors"><Edit2 size={14}/></button>
            <button onClick={() => onOpenTransition?.(i)} className="p-2 text-[#d4af37] hover:bg-zinc-800 rounded-full transition-colors"><Sparkles size={14}/></button>
            <button onClick={() => onDeleteSlide?.(i)} className="p-2 text-red-400 hover:bg-zinc-800 rounded-full transition-colors"><Trash2 size={14}/></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};