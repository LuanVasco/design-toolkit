"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Image as ImageIcon, Type, PaintBucket, Info, Layout, Sparkles } from "lucide-react";

import { getLayoutsByCategory, LAYOUT_CATEGORIES, LayoutRegistry } from "../types/layoutRegistry"; 
import "../layouts/index"; 

interface SlideEditorProps {
  index: number;
  slide: any;
  brandColor: string;
  onUpdate: (index: number, field: string, value: any) => void;
  onDelete: () => void;
}

const WIDGET_NAMES: Record<string, string> = {
  author: "Identidade",
  handle: "Handle",
  pagination: "Numeração",
  swipe: "Swipe"
};

export const SlidePropertyEditor = ({ 
  index, 
  slide, 
  brandColor, 
  onUpdate, 
  onDelete 
}: SlideEditorProps) => {
  const [activeTab, setActiveTab] = useState<string>("content");

  // Memoizando para evitar re-renders desnecessários em formulários
  const handleChange = useCallback((field: string, value: any) => {
    onUpdate(index, field, value);
  }, [index, onUpdate]);

  const activeLayoutDef = LayoutRegistry[slide.layout] || LayoutRegistry["CLASSIC"];
  const hiddenWidgets = activeLayoutDef?.hiddenWidgets || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500 pb-16">
      
      {/* --- SEÇÃO 1: BIBLIOTECA DE LAYOUTS --- */}
      <section className="space-y-4">
        <header className="flex items-center justify-between px-1">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
            <Layout size={12} /> Arquitetura Visual
          </h4>
          <span className="text-[9px] font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-full border border-[#d4af37]/20">
            Slide {index + 1}
          </span>
        </header>

        {/* Seletor de Categorias (Abas) */}
        <nav className="flex bg-zinc-900/80 p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar backdrop-blur-sm">
          {LAYOUT_CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit px-4 text-[9px] font-black uppercase py-2.5 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? "bg-zinc-800 text-white shadow-lg ring-1 ring-white/10" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Grid de Presets */}
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence mode="wait">
            {getLayoutsByCategory(activeTab).map((layoutDef) => (
              <motion.button
                key={layoutDef.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => handleChange("layout", layoutDef.id)}
                className={`group flex flex-col p-2.5 rounded-2xl border-2 transition-all duration-300 ${
                  slide.layout === layoutDef.id 
                    ? "bg-zinc-800/80 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
                    : "bg-zinc-900/40 border-transparent hover:border-white/10 hover:bg-zinc-800/40"
                }`}
              >
                <div className="w-full aspect-video rounded-lg overflow-hidden mb-3 bg-zinc-950/50 flex items-center justify-center">
                  {/* 🛡️ BLINDAGEM CONTRA PROMISE/ANY */}
                  {(layoutDef?.thumbnail({ 
                    brandColor, 
                    isActive: slide.layout === layoutDef.id 
                  }) as React.ReactNode)}
                </div>
                
                <span className={`text-[10px] font-black uppercase tracking-tighter w-full text-center truncate ${
                  slide.layout === layoutDef.id ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
                }`}>
                  {layoutDef.name}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Smart Design Hint */}
        <AnimatePresence>
          {hiddenWidgets.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-zinc-900/80 border border-white/5 rounded-2xl p-4 flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-[#d4af37]" />
              </div>
              <p className="text-[10px] text-zinc-400 leading-relaxed italic">
                Este layout prioriza o conteúdo principal, ocultando automaticamente: 
                <span className="text-zinc-200 ml-1 font-bold">
                  {hiddenWidgets.map(w => WIDGET_NAMES[w] || w).join(' e ')}.
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <hr className="border-white/5" />

      {/* --- SEÇÃO 2: EDITOR DE CONTEÚDO --- */}
      <section className="space-y-5">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
          <Type size={12} /> Redação e Narrativa
        </h4>

        <div className="space-y-5">
          {/* Título */}
          <div className="group space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Título Principal</label>
              <span className="text-[8px] font-mono text-zinc-700">{slide.title?.length || 0}/80</span>
            </div>
            <textarea
              value={slide.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full h-24 bg-zinc-950 border border-white/5 rounded-2xl p-4 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/40 transition-all resize-none"
              placeholder="Ex: O segredo para escalar produtos..."
            />
          </div>

          {/* Descrição */}
          <div className="group space-y-2">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Contexto ou Legenda</label>
            <textarea
              value={slide.desc}
              onChange={(e) => handleChange("desc", e.target.value)}
              className="w-full h-32 bg-zinc-950 border border-white/5 rounded-2xl p-4 text-[11px] font-medium text-zinc-400 outline-none focus:ring-1 focus:ring-[#d4af37]/40 focus:border-[#d4af37]/40 transition-all resize-none leading-relaxed"
              placeholder="Descreva o ponto chave deste slide..."
            />
          </div>

          {/* Mídia */}
          <div className="group space-y-2">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">URL da Mídia (Unsplash/Github)</label>
            <div className="relative">
              <ImageIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                value={slide.bgImage || ""}
                onChange={(e) => handleChange("bgImage", e.target.value)}
                className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-mono text-[#d4af37] outline-none focus:border-[#d4af37]/40 transition-all"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-white/5" />

      {/* --- SEÇÃO 3: ATMOSFERA E ESTILO --- */}
      <section className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
          <PaintBucket size={12} /> Atmosfera do Slide
        </h4>
        
        <div className={`p-4 rounded-2xl border transition-all ${
          slide.useCustomBg ? "bg-[#d4af37]/5 border-[#d4af37]/20" : "bg-zinc-900/30 border-white/5"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Sobrescrever Fundo Global</span>
            <button 
              onClick={() => handleChange("useCustomBg", !slide.useCustomBg)} 
              className={`w-10 h-6 rounded-full relative transition-colors ${slide.useCustomBg ? "bg-[#d4af37]" : "bg-zinc-800"}`}
            >
              <motion.div 
                className="absolute top-1 w-4 h-4 rounded-full bg-white" 
                animate={{ left: slide.useCustomBg ? "20px" : "4px" }} 
              />
            </button>
          </div>

          <AnimatePresence>
            {slide.useCustomBg && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 flex items-center gap-4"
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/20">
                  <input 
                    type="color" 
                    value={slide.customBgColor || "#000000"} 
                    onChange={(e) => handleChange("customBgColor", e.target.value)} 
                    className="absolute inset-[-10px] w-[150%] h-[150%] cursor-pointer" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-zinc-500 uppercase">HEX Code</span>
                  <span className="text-[11px] font-mono text-[#d4af37]">{slide.customBgColor || "#000000"}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- DANGER ZONE --- */}
      <footer className="pt-4">
        <button 
          onClick={onDelete} 
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-zinc-950 border border-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest group"
        >
          <Trash2 size={14} className="group-hover:rotate-12 transition-transform" /> 
          Destruir Slide {index + 1}
        </button>
      </footer>
    </div>
  );
};