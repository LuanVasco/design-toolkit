"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PanelLeftClose, Palette, Layers, MousePointer2, Blocks 
} from "lucide-react";

// Importação dos Editores
import { SlidePropertyEditor } from "./SlidePropertyEditor";
import { ZAxisPropertyEditor } from "./ZAxisPropertyEditor";
import { BrandKitEditor } from "./BrandKitEditor";
import { HookPropertyEditor } from "./HookPropertyEditor";
import { WidgetPropertyEditor } from "./WidgetPropertyEditor";

interface StudioSidebarProps {
  activePanel: "brandkit" | "layers" | "zaxis" | "hook" | "widgets" | null;
  setActivePanel: (panel: "brandkit" | "layers" | "zaxis" | "hook" | "widgets" | null) => void;
  selectedSlideIndex: number | null;
  setSelectedSlideIndex: (index: number | null) => void;
  orderedSlides: any[];
  brandKit: any;
  updateBrandKit: (updates: any) => void;
  updateSlide: (index: number, field: string, value: any) => void;
  updateSlideCount: (change: number) => void;
  modal: any;
  setModal: (modal: any) => void;
  saveTransition: () => void;
}

export const StudioSidebar = ({
  activePanel,
  setActivePanel,
  selectedSlideIndex,
  setSelectedSlideIndex,
  orderedSlides,
  brandKit,
  updateBrandKit,
  updateSlide,
  updateSlideCount,
  modal,
  setModal,
  saveTransition
}: StudioSidebarProps) => {
  return (
    <AnimatePresence initial={false}>
      {activePanel && (
        <motion.aside
          initial={{ width: 0, opacity: 0, x: -20 }}
          animate={{ width: 340, opacity: 1, x: 0 }}
          exit={{ width: 0, opacity: 0, x: -20 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="h-full bg-zinc-950 border-r border-white/5 flex flex-col shrink-0 z-30 overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="p-6 w-[340px] flex flex-col h-full">
            <header className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                  {activePanel === "brandkit" && <Palette size={14} />}
                  {activePanel === "layers" && <Layers size={14} />}
                  {activePanel === "zaxis" && <div className="w-3 h-3 bg-[#d4af37] rounded-sm" />}
                  {activePanel === "widgets" && <Blocks size={14} />}
                  
                  {activePanel === "brandkit" ? "BrandKit" 
                    : activePanel === "layers" ? "Propriedades" 
                    : activePanel === "widgets" ? "Widgets" 
                    : activePanel === "hook" ? "Configuração CTA"
                    : "Z-Axis Engine"}
                </h3>
              </div>
              <button 
                onClick={() => setActivePanel(null)} 
                className="text-zinc-500 hover:text-white p-2 hover:bg-zinc-900 rounded-lg transition-colors"
              >
                <PanelLeftClose size={18} />
              </button>
            </header>
            
            <div className="flex-grow overflow-y-auto no-scrollbar pb-10">
              <AnimatePresence mode="wait">
                {activePanel === "layers" && selectedSlideIndex !== null && orderedSlides[selectedSlideIndex] ? (
                  <SlidePropertyEditor 
                    key={`layers-editor-${orderedSlides[selectedSlideIndex]?.id || 'none'}`}
                    index={orderedSlides[selectedSlideIndex]?.originalIndex ?? 0} 
                    slide={orderedSlides[selectedSlideIndex]} 
                    brandColor={brandKit.brandColor}
                    onUpdate={updateSlide}
                    onDelete={() => {
                      updateSlideCount(-1);
                      setSelectedSlideIndex(null);
                      setActivePanel(null);
                    }}
                  />
                ) : activePanel === "zaxis" ? (
                  <ZAxisPropertyEditor 
                    key={`zaxis-editor-${modal.targetIndex}`}
                    targetIndex={modal.targetIndex}
                    data={modal.data}
                    onChange={(newData) => setModal({ ...modal, data: newData })}
                    onSave={() => {
                      saveTransition();
                      setSelectedSlideIndex(null);
                      setActivePanel(null);
                    }}
                  />
                ) : activePanel === "brandkit" ? (
                  <BrandKitEditor 
                    key="brandkit-editor"
                    brandKit={brandKit} 
                    onUpdate={updateBrandKit}
                  />
                ) : activePanel === "hook" ? (
                  <HookPropertyEditor 
                    key="hook-editor"
                    brandKit={brandKit}
                    onUpdate={updateBrandKit}
                  />
                ) : activePanel === "widgets" ? (
                  <WidgetPropertyEditor 
                    key="widgets-editor"
                    brandKit={brandKit}
                    onUpdate={updateBrandKit}
                  />
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40"
                  >
                     <MousePointer2 size={40} strokeWidth={1} className="mb-4 text-zinc-600" />
                     <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                       Selecione um elemento no canvas para editar propriedades.
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};