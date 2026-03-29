"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Image as ImageIcon, Type, PaintBucket, Info } from "lucide-react";

import { getLayoutsByCategory, LAYOUT_CATEGORIES, LayoutRegistry } from "../types/layoutRegistry"; 

// 🛡️ OBRIGATÓRIO: Força o registro dos layouts antes que o painel tente lê-los.
import "../layouts/index"; 

interface SlideEditorProps {
  index: number;
  slide: any;
  brandColor: string;
  onUpdate: (index: number, field: string, value: any) => void;
  onDelete: () => void;
}

// Dicionário amigável para traduzir os IDs técnicos dos widgets para o usuário
const WIDGET_NAMES: Record<string, string> = {
  author: "Identidade do Autor",
  handle: "@ Username",
  pagination: "Paginação",
  swipe: "Indicador de Arraste"
};

export const SlidePropertyEditor = ({ index, slide, brandColor, onUpdate, onDelete }: SlideEditorProps) => {
  const [activeTab, setActiveTab] = useState<"covers" | "content" | "media" | "social" | "hooks">("content");

  const handleChange = (field: string, value: any) => {
    onUpdate(index, field, value);
  };

  // 🛡️ BLINDAGEM (Optional Chaining): Lemos a inteligência do layout de forma segura
  const activeLayoutDef = LayoutRegistry[slide.layout] || LayoutRegistry["CLASSIC"];
  const hiddenWidgets = activeLayoutDef?.hiddenWidgets || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500 pb-10">
      
      {/* -------------------------------------------------------------
          SEÇÃO 1: MOTOR DE LAYOUTS
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          Estrutura do Slide
        </h4>

        {/* Abas de Categoria */}
        <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-white/5 overflow-x-auto no-scrollbar">
          {LAYOUT_CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-shrink-0 px-3 text-[8.5px] font-bold uppercase py-2 rounded-md transition-all ${
                activeTab === tab.id ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grade de Thumbnails */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {getLayoutsByCategory(activeTab).map((layoutDef) => (
              <button
                key={layoutDef.id}
                onClick={() => handleChange("layout", layoutDef.id)}
                className={`group flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${
                  slide.layout === layoutDef.id 
                    ? "bg-zinc-800 border-[#d4af37]" 
                    : "bg-zinc-900/50 border-white/5 hover:border-white/20 hover:bg-zinc-800/50"
                }`}
              >
                {/* 🛡️ BLINDAGEM: Garantimos que o layoutDef existe antes de chamar a função thumbnail */}
                {layoutDef?.thumbnail({ brandColor, isActive: slide.layout === layoutDef.id })}
                <span className={`text-[9px] font-bold uppercase tracking-wider text-center ${slide.layout === layoutDef.id ? "text-[#d4af37]" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                  {layoutDef.name}
                </span>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 💡 O FEEDBACK DE UX: Aviso de Inteligência Ativa */}
        <AnimatePresence>
          {hiddenWidgets.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pt-2"
            >
              <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl p-3 flex items-start gap-3">
                <Info size={14} className="text-[#d4af37] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <strong className="text-[10px] text-[#d4af37] uppercase tracking-wider font-black">Design Automático</strong>
                  <p className="text-[10px] text-[#d4af37]/80 font-medium leading-relaxed">
                    Para otimizar o respiro visual deste modelo, nós ocultamos: 
                    <span className="text-white ml-1">
                      {hiddenWidgets.map(w => WIDGET_NAMES[w] || w).join(', ')}.
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* -------------------------------------------------------------
          SEÇÃO 2: CONTEÚDO (Textos e Imagens)
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          Conteúdo
        </h4>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1 flex items-center gap-1.5"><Type size={12}/> Título</label>
            <textarea
              value={slide.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full h-20 bg-zinc-900 border border-white/5 rounded-xl p-3 text-[11px] font-bold text-white outline-none focus:border-[#d4af37]/50 resize-none transition-colors"
              placeholder="Digite o título principal..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1 flex items-center gap-1.5"><Type size={12}/> Descrição / Subtítulo</label>
            <textarea
              value={slide.desc}
              onChange={(e) => handleChange("desc", e.target.value)}
              className="w-full h-24 bg-zinc-900 border border-white/5 rounded-xl p-3 text-[11px] font-medium text-white/70 outline-none focus:border-[#d4af37]/50 resize-none transition-colors"
              placeholder="Digite o texto de apoio..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1 flex items-center gap-1.5"><ImageIcon size={12}/> Mídia (URL da Imagem)</label>
            <input
              type="text"
              value={slide.bgImage || ""}
              onChange={(e) => handleChange("bgImage", e.target.value)}
              className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-[11px] font-medium text-white outline-none focus:border-[#d4af37]/50 transition-colors"
              placeholder="Cole o link da imagem aqui..."
            />
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* -------------------------------------------------------------
          SEÇÃO 3: ESTILO LOCAL (Fundo Customizado)
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          Estilo Específico
        </h4>
        
        <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <PaintBucket size={14} className={slide.useCustomBg ? "text-[#d4af37]" : "text-zinc-500"} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Fundo Customizado</span>
          </div>
          <button 
            onClick={() => handleChange("useCustomBg", !slide.useCustomBg)} 
            className={`relative w-8 h-5 rounded-full transition-colors ${slide.useCustomBg ? "bg-[#d4af37]" : "bg-zinc-800"}`}
          >
            <motion.div layout className="absolute top-1 bottom-1 w-3 rounded-full bg-white shadow-sm" animate={{ left: slide.useCustomBg ? "14px" : "4px" }} />
          </button>
        </div>

        <AnimatePresence>
          {slide.useCustomBg && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="flex items-center gap-3 mt-3">
                <input type="color" value={slide.customBgColor || "#000000"} onChange={(e) => handleChange("customBgColor", e.target.value)} className="w-8 h-8 rounded bg-transparent cursor-pointer" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase">{slide.customBgColor || "#000000"}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* -------------------------------------------------------------
          DANGER ZONE
      ------------------------------------------------------------- */}
      <div className="pt-6">
        <button onClick={onDelete} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-[10px] font-black uppercase tracking-widest border border-red-500/20">
          <Trash2 size={14} /> Excluir Slide
        </button>
      </div>

    </div>
  );
};