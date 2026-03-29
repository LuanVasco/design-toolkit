"use client";

import React, { useState } from "react";
import { 
  Sparkles, ImageIcon, MoveVertical, Ban, Circle, 
  Square, Link2Off, RectangleHorizontal, Percent, Trash2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ZAxisPropertyEditorProps {
  targetIndex: number;
  data: any;
  onChange: (data: any) => void;
  onSave: () => void; // Geralmente fecha o painel
}

export const ZAxisPropertyEditor = ({ targetIndex, data, onChange, onSave }: ZAxisPropertyEditorProps) => {
  const [activeTab, setActiveTab] = useState<"base" | "objeto">("base");

  const isTransitionEmpty = data.shape === "none" && (!data.url || data.url.trim() === "");

  const updateData = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-left-4 duration-500 pb-20">
      
      {/* 1. STATUS DA CONEXÃO */}
      <div className={`p-5 rounded-[2rem] border transition-all duration-500 ${
        isTransitionEmpty 
          ? "bg-zinc-900/50 border-white/5 opacity-60" 
          : "bg-[#d4af37]/10 border-[#d4af37]/30 shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-lg ${
            isTransitionEmpty ? "bg-zinc-800 text-zinc-500" : "bg-[#d4af37] text-black"
          }`}>
            {isTransitionEmpty ? <Link2Off size={22} /> : <Sparkles size={22} />}
          </div>
          <div>
            <h4 className={`text-[11px] font-black uppercase tracking-wider ${
              isTransitionEmpty ? "text-zinc-500" : "text-white"
            }`}>
              {isTransitionEmpty ? "Transição Desativada" : "Ponte Panorâmica Ativa"}
            </h4>
            <p className="text-[9px] font-bold uppercase opacity-60 mt-0.5">
              Interseção Slides {targetIndex + 1} • {targetIndex + 2}
            </p>
          </div>
        </div>
      </div>

      {/* 2. SELETOR DE ABAS */}
      <div className="flex bg-zinc-900 p-1.5 rounded-2xl border border-white/5">
        <button 
          onClick={() => setActiveTab("base")}
          className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
            activeTab === "base" ? "bg-zinc-800 text-[#d4af37] shadow-lg" : "text-zinc-600 hover:text-zinc-400"
          }`}
        >
          1. Geometria (Base)
        </button>
        <button 
          onClick={() => setActiveTab("objeto")}
          className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
            activeTab === "objeto" ? "bg-zinc-800 text-[#d4af37] shadow-lg" : "text-zinc-600 hover:text-zinc-400"
          }`}
        >
          2. Objeto (PNG)
        </button>
      </div>

      {/* 3. CONTEÚDO DINÂMICO (ABAS) */}
      <div className="min-h-[320px]">
        <AnimatePresence mode="wait">
          {activeTab === "base" ? (
            <motion.div 
              key="base"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* GRID DE FORMAS */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Forma de Fundo</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "none", label: "Limpo", icon: <Ban size={18} /> },
                    { id: "circle", label: "Círculo", icon: <Circle size={18} /> },
                    { id: "square", label: "Quadrado", icon: <Square size={18} /> },
                    { id: "rectangle", label: "Retângulo", icon: <RectangleHorizontal size={18} /> }
                  ].map(shape => (
                    <button 
                      key={shape.id}
                      onClick={() => updateData("shape", shape.id)}
                      className={`h-16 flex items-center gap-3 px-4 rounded-2xl border-2 transition-all ${
                        data.shape === shape.id 
                          ? "border-[#d4af37] bg-[#d4af37]/5 text-[#d4af37]" 
                          : "border-white/5 bg-zinc-900/40 text-zinc-600 hover:border-white/10"
                      }`}
                    >
                      {shape.icon}
                      <span className="text-[8px] font-black uppercase tracking-widest">{shape.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* AJUSTES DA FORMA (Só aparece se uma forma for selecionada) */}
              {data.shape !== "none" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  className="space-y-6 bg-zinc-900/30 p-5 rounded-3xl border border-white/5 overflow-hidden"
                >
                  {/* Cor da Forma (Refatorado para clareza) */}
                  <div className="flex items-center justify-between bg-zinc-900 border border-white/5 rounded-xl p-2 pl-3 group focus-within:border-[#d4af37]/50 transition-colors">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Cor da Base</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-white text-right w-16">{data.shapeColor || "#d4af37"}</span>
                      <div className="relative w-6 h-6 rounded-md overflow-hidden border border-white/20 shadow-inner shrink-0">
                        <input 
                          type="color" 
                          value={data.shapeColor || "#d4af37"}
                          onChange={(e) => updateData("shapeColor", e.target.value)}
                          className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Opacidade da Forma */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase">
                      <span className="flex items-center gap-1.5"><Percent size={10}/> Opacidade</span>
                      <span className="text-[#d4af37]">{Math.round((data.shapeOpacity ?? 0.8) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={data.shapeOpacity ?? 0.8}
                      onChange={(e) => updateData("shapeOpacity", Number(e.target.value))}
                      className="w-full accent-[#d4af37] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Tamanho da Forma */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase">
                      <span>Tamanho da Geometria</span>
                      <span className="text-[#d4af37]">{data.shapeSize || 150}px</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="800"
                      value={data.shapeSize || 150}
                      onChange={(e) => updateData("shapeSize", Number(e.target.value))}
                      className="w-full accent-[#d4af37] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="objeto"
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* CONFIGURAÇÃO DE OBJETO PNG */}
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Mídia PNG (Com Fundo Transparente)</label>
                   {/* Novo: Botão prático para limpar a URL */}
                   {data.url && (
                     <button onClick={() => updateData("url", "")} className="text-[9px] text-red-400 hover:text-red-300 uppercase font-bold tracking-widest flex items-center gap-1">
                        <Trash2 size={10} /> Limpar
                     </button>
                   )}
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#d4af37] transition-colors">
                    <ImageIcon size={16} />
                  </div>
                  <input 
                    type="url" 
                    value={data.url || ""} 
                    onChange={(e) => updateData("url", e.target.value)}
                    className="w-full bg-zinc-900 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-[10px] font-mono text-white focus:border-[#d4af37]/50 focus:outline-none focus:bg-zinc-800/50 transition-all" 
                    placeholder="https://link-da-imagem.png" 
                  />
                </div>
              </div>

              {/* AJUSTES DE OBJETO */}
              <div className="space-y-6 bg-zinc-900/30 p-5 rounded-3xl border border-white/5">
                
                {/* Opacidade do Objeto */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase">
                    <span>Opacidade do Objeto</span>
                    <span className="text-[#d4af37]">{Math.round((data.imgOpacity ?? 1) * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={data.imgOpacity ?? 1}
                    onChange={(e) => updateData("imgOpacity", Number(e.target.value))}
                    className="w-full accent-[#d4af37] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Desfoque do Objeto */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase">
                    <span>Desfoque (Blur)</span>
                    <span className="text-[#d4af37]">{data.blur || 0}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={data.blur || 0}
                    onChange={(e) => updateData("blur", Number(e.target.value))}
                    className="w-full accent-[#d4af37] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Tamanho do Objeto */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase">
                    <span>Escala do Objeto</span>
                    <span className="text-[#d4af37]">{data.imgSize || 150}px</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="800"
                    value={data.imgSize || 150}
                    onChange={(e) => updateData("imgSize", Number(e.target.value))}
                    className="w-full accent-[#d4af37] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. POSICIONAMENTO GLOBAL */}
      <div className="space-y-4 pt-6 border-t border-white/5">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1 flex items-center gap-2">
          <MoveVertical size={14} /> Encaixe Vertical da Interseção
        </label>
        
        {/* Controle Preciso Vertical */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-900 rounded-2xl border border-white/5">
            {[
              { val: 15, label: "Topo" },
              { val: 50, label: "Centro" },
              { val: 85, label: "Base" }
            ].map(pos => (
              <button 
                key={pos.val} 
                onClick={() => updateData("topPos", pos.val)}
                className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  Math.abs((data.topPos || 50) - pos.val) < 10 // Considera ativo se estiver perto do valor
                    ? "bg-zinc-800 text-[#d4af37] shadow-lg border border-white/5" 
                    : "text-zinc-600 hover:text-white"
                }`}
              >
                {pos.label}
              </button>
            ))}
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value={data.topPos || 50}
            onChange={(e) => updateData("topPos", Number(e.target.value))}
            className="w-full accent-[#d4af37] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <p className="text-[8px] text-zinc-600 font-bold uppercase text-center mt-2 tracking-tighter italic">
          * Afeta tanto a geometria quanto o objeto simultaneamente
        </p>
      </div>

      {/* 5. FOOTER: FECHAR/CONCLUIR */}
      <div className="pt-4 border-t border-white/5">
        <button 
          onClick={onSave} 
          className="w-full bg-gradient-to-r from-[#d4af37] to-[#b5952f] text-black font-black py-4 rounded-2xl shadow-xl shadow-[#d4af37]/10 uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 hover:brightness-110"
        >
          Concluir Edição
        </button>
      </div>
    </div>
  );
};