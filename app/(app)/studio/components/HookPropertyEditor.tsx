"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Magnet, Type, Palette, ListOrdered, LayoutTemplate, ImageIcon, UserCircle 
} from "lucide-react";

import { getAllHooks } from "../types/hookRegistry";
import "../layouts/hooks/index";

export interface BrandKitState {
  hookEnabled: boolean;
  hookLayout: string; 
  hookTitle: string;
  hookSubtitle: string;
  hookBgColor: string;
  hookTitleColor: string;
  hookSubtitleColor: string;
  hookPosition: number;
  // 🖼️ Novos campos para suportar Mockup e Perfil
  authorAvatar?: string;
  bgImage?: string;
  authorName?: string;
  handle?: string;
}

interface HookEditorProps {
  brandKit: BrandKitState;
  onUpdate: (updates: Partial<BrandKitState>) => void;
}

export const HookPropertyEditor = ({ brandKit, onUpdate }: HookEditorProps) => {
  
  // Lógica para decidir quais campos de mídia mostrar
  const showMockupImage = brandKit.hookLayout === "HOOK_MOCKUP_LEAN";
  const showProfileFields = brandKit.hookLayout === "HOOK_PROFILE_CARD";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500 pb-10">
      
      {/* 1. CHAVE MESTRA: Ativar/Desativar CTA */}
      <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <Magnet size={16} className={brandKit.hookEnabled ? "text-[#d4af37]" : "text-zinc-500"} />
          <span className="text-[11px] font-bold uppercase tracking-widest text-white">
            Ativar Slide CTA
          </span>
        </div>
        <button
          onClick={() => onUpdate({ hookEnabled: !brandKit.hookEnabled })}
          className={`relative w-10 h-6 rounded-full transition-colors ${
            brandKit.hookEnabled ? "bg-[#d4af37]" : "bg-zinc-800"
          }`}
        >
          <motion.div
            layout
            className="absolute top-1 bottom-1 w-4 rounded-full bg-white shadow-sm"
            animate={{ left: brandKit.hookEnabled ? "20px" : "4px" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {brandKit.hookEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-8 overflow-hidden pt-2"
          >
            {/* 2. MODELO VISUAL */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <LayoutTemplate size={14} className="text-[#d4af37]" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Estrutura do CTA</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {getAllHooks().map((hookDef) => (
                  <button
                    key={hookDef.id}
                    onClick={() => onUpdate({ hookLayout: hookDef.id })}
                    className={`py-4 px-2 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                      brandKit.hookLayout === hookDef.id 
                        ? "bg-zinc-800 border-[#d4af37] text-[#d4af37] shadow-lg" 
                        : "bg-zinc-900/50 border-white/5 hover:bg-zinc-800/50 text-zinc-500"
                    }`}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest text-center leading-tight">
                      {hookDef.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <div className="w-full h-px bg-white/5" />

            {/* 🖼️ 3. SEÇÃO DE MÍDIA CONDICIONAL (NOVO) */}
            {(showMockupImage || showProfileFields) && (
              <section className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-zinc-400">
                  <ImageIcon size={14} className="text-[#d4af37]" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Mídia do CTA</h4>
                </div>

                <div className="space-y-3">
                  {showMockupImage && (
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Imagem do Mockup (URL)</label>
                      <input
                        type="text"
                        value={brandKit.bgImage || ""}
                        onChange={(e) => onUpdate({ bgImage: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-[11px] text-white outline-none focus:border-[#d4af37]/50 transition-colors"
                        placeholder="https://exemplo.com/print-do-site.png"
                      />
                    </div>
                  )}

                  {showProfileFields && (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Avatar do Perfil (URL)</label>
                        <input
                          type="text"
                          value={brandKit.authorAvatar || ""}
                          onChange={(e) => onUpdate({ authorAvatar: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-[11px] text-white outline-none focus:border-[#d4af37]/50 transition-colors"
                          placeholder="https://exemplo.com/sua-foto.png"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Nome</label>
                          <input
                            type="text"
                            value={brandKit.authorName || ""}
                            onChange={(e) => onUpdate({ authorName: e.target.value })}
                            className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-[11px] text-white outline-none focus:border-[#d4af37]/50"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1">@ Handle</label>
                          <input
                            type="text"
                            value={brandKit.handle || ""}
                            onChange={(e) => onUpdate({ handle: e.target.value })}
                            className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-[11px] text-white outline-none focus:border-[#d4af37]/50"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </section>
            )}

            <div className="w-full h-px bg-white/5" />

            {/* 4. POSICIONAMENTO */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <ListOrdered size={14} className="text-[#d4af37]" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Posição no Post</h4>
              </div>
              <div className="bg-zinc-900 border border-white/5 rounded-xl p-1">
                <select
                  value={brandKit.hookPosition || 99}
                  onChange={(e) => onUpdate({ hookPosition: Number(e.target.value) })}
                  className="w-full bg-transparent text-[11px] font-bold text-white outline-none p-2 cursor-pointer appearance-none text-center"
                >
                  <option value={99}>Fixar no Final (Recomendado)</option>
                  <option value={1}>Posição 1 (Início)</option>
                  <option value={2}>Posição 2</option>
                  <option value={3}>Posição 3</option>
                </select>
              </div>
            </section>

            <div className="w-full h-px bg-white/5" />

            {/* 5. COPYWRITING */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Type size={14} className="text-[#d4af37]" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Copywriting</h4>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Título Principal</label>
                  <input
                    type="text"
                    value={brandKit.hookTitle}
                    onChange={(e) => onUpdate({ hookTitle: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-[11px] font-black uppercase text-white outline-none focus:border-[#d4af37]/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Subtítulo (Apoio)</label>
                  <textarea
                    value={brandKit.hookSubtitle}
                    onChange={(e) => onUpdate({ hookSubtitle: e.target.value })}
                    rows={3}
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-[11px] text-zinc-300 outline-none focus:border-[#d4af37]/50 transition-colors resize-none"
                  />
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-white/5" />

            {/* 6. PALETA DE CORES */}
            <section className="space-y-4 pb-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <Palette size={14} className="text-[#d4af37]" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Cores do CTA</h4>
              </div>
              <div className="space-y-3">
                <ColorPickerRow label="Fundo" value={brandKit.hookBgColor} onChange={(val) => onUpdate({ hookBgColor: val })} />
                <ColorPickerRow label="Destaque Principal" value={brandKit.hookTitleColor} onChange={(val) => onUpdate({ hookTitleColor: val })} />
                <ColorPickerRow label="Texto de Apoio" value={brandKit.hookSubtitleColor} onChange={(val) => onUpdate({ hookSubtitleColor: val })} />
              </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function ColorPickerRow({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="flex items-center justify-between bg-zinc-900 border border-white/5 rounded-xl p-2 pl-3 group focus-within:border-[#d4af37]/50 transition-colors">
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-2">
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-[10px] font-mono text-white text-right w-16 outline-none focus:text-[#d4af37] transition-colors uppercase"
        />
        <div className="relative w-6 h-6 rounded-md overflow-hidden border border-white/20 shadow-inner shrink-0">
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}