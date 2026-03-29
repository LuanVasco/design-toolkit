"use client";

import React, { useState } from "react";

interface ZAxisModalProps {
  modal: { isOpen: boolean; targetIndex: number; data: any; };
  onClose: () => void;
  onSave: () => void;
  onChange: (data: any) => void;
}

export const ZAxisModal = ({ modal, onClose, onSave, onChange }: ZAxisModalProps) => {
  const [activeTab, setActiveTab] = useState<"base" | "objeto">("base");

  if (!modal.isOpen) return null;

  const updateData = (field: string, value: any) => {
    onChange({ ...modal.data, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/90 z-[100] flex items-center justify-center backdrop-blur-xl p-4 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] w-full max-w-lg shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* HEADER: Identidade Visual Clean */}
        <div className="p-8 pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Efeito de Profundidade</h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">Interseção {modal.targetIndex + 1} • {modal.targetIndex + 2}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-zinc-800 flex items-center justify-center text-zinc-500 transition-colors text-xl">✕</button>
        </div>

        {/* NAVEGAÇÃO: Segmented Control (Igual ao Hook) */}
        <div className="px-8 mb-6">
          <div className="flex bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
            <button 
              onClick={() => setActiveTab("base")}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "base" ? "bg-zinc-800 text-[#d4af37] shadow-lg" : "text-zinc-600 hover:text-zinc-400"}`}
            >
              1. A Base (Fundo)
            </button>
            <button 
              onClick={() => setActiveTab("objeto")}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "objeto" ? "bg-zinc-800 text-[#d4af37] shadow-lg" : "text-zinc-600 hover:text-zinc-400"}`}
            >
              2. O Objeto (Destaque)
            </button>
          </div>
        </div>

        {/* CONTEÚDO DINÂMICO */}
        <div className="px-8 pb-8 space-y-6">
          
          {activeTab === "base" ? (
            <div className="space-y-6 animate-slide-up">
              {/* Escolha da Forma */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "none", label: "Limpo", icon: "✕" },
                  { id: "circle", label: "Círculo", icon: "◯" },
                  { id: "square", label: "Quadrado", icon: "▢" }
                ].map(shape => (
                  <button 
                    key={shape.id}
                    onClick={() => updateData("shape", shape.id)}
                    className={`h-24 flex flex-col items-center justify-center gap-2 rounded-3xl border-2 transition-all ${modal.data.shape === shape.id ? "border-[#d4af37] bg-[#d4af37]/5 text-[#d4af37]" : "border-zinc-800 bg-zinc-950/50 text-zinc-600"}`}
                  >
                    <span className="text-2xl">{shape.icon}</span>
                    <span className="text-[9px] font-black uppercase">{shape.label}</span>
                  </button>
                ))}
              </div>

              {/* Ajustes da Forma */}
              {modal.data.shape !== "none" && (
                <div className="bg-zinc-950/50 p-6 rounded-[2rem] border border-zinc-800/50 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-zinc-500 uppercase">Tamanho e Cor da Base</span>
                    <input type="color" value={modal.data.shapeColor} onChange={(e) => updateData("shapeColor", e.target.value)} className="w-8 h-8 rounded-full bg-transparent border-0 cursor-pointer overflow-hidden" />
                  </div>
                  <input type="range" min="100" max="600" value={modal.data.shapeSize} onChange={(e) => updateData("shapeSize", Number(e.target.value))} className="w-full accent-[#d4af37] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-slide-up">
              {/* Input de Imagem */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase ml-2 tracking-widest">Link do Objeto (PNG)</label>
                <input 
                  type="url" value={modal.data.url} onChange={(e) => updateData("url", e.target.value)}
                  className="dark-input w-full p-4 rounded-2xl text-xs font-mono border-zinc-800 focus:border-[#d4af37]/50" 
                  placeholder="https://sua-imagem.png" 
                />
              </div>

              {/* Ajustes de Efeito (Blur e Tamanho) */}
              <div className="bg-zinc-950/50 p-6 rounded-[2rem] border border-zinc-800/50 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase">
                    <span>Efeito de Desfoque (Blur)</span>
                    <span className="text-[#d4af37]">{modal.data.blur || 0}px</span>
                  </div>
                  <input type="range" min="0" max="15" step="1" value={modal.data.blur || 0} onChange={(e) => updateData("blur", Number(e.target.value))} className="w-full accent-[#d4af37] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase">
                    <span>Escala do Objeto</span>
                    <span className="text-[#d4af37]">{modal.data.imgSize}px</span>
                  </div>
                  <input type="range" min="50" max="600" value={modal.data.imgSize} onChange={(e) => updateData("imgSize", Number(e.target.value))} className="w-full accent-[#d4af37] h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>

              {/* Smart Snapping (Encaixe Fácil) */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase ml-2 tracking-widest">Encaixe Vertical</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 15, label: "Topo" },
                    { val: 50, label: "Centro" },
                    { val: 85, label: "Base" }
                  ].map(pos => (
                    <button 
                      key={pos.val} onClick={() => updateData("topPos", pos.val)}
                      className={`py-3 rounded-2xl text-[9px] font-black uppercase transition-all border ${modal.data.topPos === pos.val ? "bg-[#d4af37] text-black border-[#d4af37]" : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-white"}`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BOTÃO FINAL */}
          <button 
            onClick={onSave} 
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#b5952f] text-black font-black py-5 rounded-[2rem] shadow-xl shadow-[#d4af37]/10 uppercase tracking-[0.2em] text-xs transition-all active:scale-95 mt-4"
          >
            Aplicar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};