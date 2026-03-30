"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PanelLeftClose, Palette, Layers, MousePointer2,
  ZoomIn, ZoomOut, X, Blocks // Adicionado ícone Blocks para o título
} from "lucide-react";

// Hooks de Lógica, Hardware e Contexto
import { useBrandKit } from "@/app/context/BrandKitContext";
import { useStudioLogic } from "./hooks/useStudioLogic";
import { useCanvasControls } from "./hooks/useCanvasControls";

// Componentes de Interface V2
import { StudioHeader } from "./components/StudioHeader";
import { StudioDock } from "./components/StudioDock";
import { CarouselPreview } from "./components/Preview/Canvas";
import { SlidePropertyEditor } from "./components/SlidePropertyEditor";
import { ZAxisPropertyEditor } from "./components/ZAxisPropertyEditor";
import { TemplateModal } from "./components/Modals/TemplateModal";
import { InstagramSimulator } from "./components/Preview/InstagramSimulator";
import { BrandKitEditor } from "./components/BrandKitEditor";
import { HookPropertyEditor } from "./components/HookPropertyEditor";
import { WidgetPropertyEditor } from "./components/WidgetPropertyEditor"; // <-- NOVO IMPORT

export default function StudioPage() {
  const { brandKit, updateBrandKit } = useBrandKit();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // 1. ESTADOS DE INTERFACE (UI)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  // Tipagem atualizada para aceitar o "widgets"
  const [activePanel, setActivePanel] = useState<"brandkit" | "layers" | "zaxis" | "hook" | "widgets" | null>(null);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  // --- ESTADO DO SIMULADOR ---
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // 2. MOTOR DE DADOS (useStudioLogic)
  const {
    slides, transitions, updateSlideCount, updateSlide, modal, setModal, 
    saveTransition, undo, redo, canUndo, canRedo, resetProject,
    getOrderedSlides, loadTemplate, reorderSlides
  } = useStudioLogic(brandKit, updateBrandKit);

  const orderedSlides = useMemo(() => getOrderedSlides(), [getOrderedSlides]);

  // 3. MOTOR DE NAVEGAÇÃO (Shortcut Engine)
  const { isSpacePressed, panX, panY } = useCanvasControls(setZoomLevel);

  // --- SHORTCUT: ESC PARA FECHAR SIMULADOR ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSimulatorOpen) {
        setIsSimulatorOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSimulatorOpen]);

  // --- HANDLERS CONTEXTUAIS ---
  const handleEditSlide = (index: number) => {
    setSelectedSlideIndex(index);
    setActivePanel("layers");
  };

  const handleOpenZAxis = (index: number) => {
    const existingTransition = transitions.find(t => t.slideIndex === index);
    
    const initialZData = existingTransition 
    ? { ...existingTransition } 
    : {
      slideIndex: index,
      shape: "none",
      shapeColor: brandKit.brandColor,
      shapeSize: 200,
      url: "",
      topPos: 50,
      blur: 0,
      imgSize: 150
    };

    setModal({ ...modal, targetIndex: index, data: initialZData });
    setActivePanel("zaxis");
  };

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col overflow-hidden font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* HEADER: Ações de Projeto e Exportação */}
      <StudioHeader 
        count={slides.length} 
        onUpdateCount={updateSlideCount} 
        slides={orderedSlides}
        undo={undo} 
        redo={redo} 
        canUndo={canUndo} 
        canRedo={canRedo}
        onReset={resetProject}
        onOpenTemplates={() => setIsTemplateModalOpen(true)} 
      />

      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* SIDEBAR: Inspetor de Propriedades Unitário */}
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
                    {/* Renderização Condicional Limpa e Organizada */}
                    {activePanel === "layers" && selectedSlideIndex !== null && orderedSlides[selectedSlideIndex] ? (
                      <SlidePropertyEditor 
                        key={`layers-editor-${orderedSlides[selectedSlideIndex]?.id || 'none'}`}
                        // O uso do ?. garante que se por um milissegundo for undefined, não crasha
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

        {/* WORKSPACE: Área de Criação Panorâmica */}
        <div className="flex-1 relative flex flex-col min-w-0">
          <main 
            ref={constraintsRef}
            className={`flex-1 relative bg-[#0a0a0a] overflow-hidden flex items-center justify-center ${
              isSpacePressed ? "cursor-grab active:cursor-grabbing" : "cursor-default"
            }`}
          >
            {/* Grid de Fundo */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            {/* Controles de Zoom Flutuantes */}
            <div className="absolute top-6 right-6 z-20 flex items-center bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10 shadow-2xl">
              <button onClick={() => setZoomLevel(z => Math.max(25, z - 25))} className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-90">
                <ZoomOut size={16} />
              </button>
              <div className="w-16 text-center">
                <span className="text-[11px] font-mono font-black text-white">{zoomLevel}%</span>
              </div>
              <button onClick={() => setZoomLevel(z => Math.min(200, z + 25))} className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all active:scale-90">
                <ZoomIn size={16} />
              </button>
            </div>

            {/* O CANVAS DINÂMICO */}
            <motion.div 
              drag={isSpacePressed} 
              dragConstraints={constraintsRef}
              style={{ x: panX, y: panY }}
              animate={{ scale: zoomLevel / 100 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="relative origin-center"
            >
              <CarouselPreview 
                ref={scrollAreaRef}
                orderedSlides={orderedSlides} 
                brandKit={brandKit}
                transitions={transitions}
                activePanel={activePanel} 
                modal={modal}
                onEditSlide={handleEditSlide}
                onAddSlide={(idx: number) => updateSlideCount(1)}
                onDeleteSlide={(idx: number) => updateSlideCount(-1)}
                onOpenTransition={handleOpenZAxis}
                onReorderSlides={reorderSlides}
              />
            </motion.div>

            {/* DOCK: Launcher de Ferramentas */}
            <StudioDock 
              onAddSlide={() => updateSlideCount(1)} 
              activePanel={activePanel as any} 
              onTogglePanel={(panel) => setActivePanel(activePanel === panel ? null : panel as any)}
              onPreview={() => setIsSimulatorOpen(true)}
            />

            {/* --- MODAL DO SIMULADOR COM ATALHOS --- */}
            <AnimatePresence>
              {isSimulatorOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto"
                  onClick={() => setIsSimulatorOpen(false)}
                >
                  <button 
                    onClick={() => setIsSimulatorOpen(false)}
                    className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:rotate-90 transition-all"
                  >
                    <X size={24} />
                  </button>

                  <motion.div
                    initial={{ y: 50, scale: 0.95 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 50, scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <InstagramSimulator 
                      slides={orderedSlides} 
                      brandKit={brandKit} 
                      transitions={transitions} 
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </main>
        </div>
      </div>

      {/* MODAL DE TEMPLATES (GLOBAL) */}
      <TemplateModal 
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelect={loadTemplate} 
      />
    </div>
  );
}