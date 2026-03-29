"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCircle, AtSign, ListOrdered, ArrowRightSquare, Info 
} from "lucide-react";

export interface BrandKitState {
  authorEnabled: boolean;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  authorPos: string;
  handleEnabled: boolean;
  handle: string;
  handlePos: string;
  paginationStyle: "numbers" | "dots" | "progress" | "none";
  paginationPos: string;
  swipeText: string;
  swipeStyle: "pill" | "minimal";
  swipePos: string;
}

interface WidgetEditorProps {
  brandKit: BrandKitState;
  onUpdate: (updates: Partial<BrandKitState>) => void;
}

export const WidgetPropertyEditor = ({ brandKit, onUpdate }: WidgetEditorProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500 pb-10">
      
      {/* 💡 AVISO DE UX (Conecta com o novo Motor de Layouts) */}
      <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl p-4 flex items-start gap-3">
        <Info size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
        <p className="text-[10px] text-[#d4af37]/80 font-medium leading-relaxed">
          Estas são as configurações <strong className="text-[#d4af37]">Globais</strong> do seu carrossel. 
          Lembre-se que alguns layouts inteligentes (como Capas) podem ocultar essas informações automaticamente para um design mais limpo.
        </p>
      </div>

      {/* -------------------------------------------------------------
          SEÇÃO 1: ASSINATURA DO AUTOR
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <UserCircle size={16} className={brandKit.authorEnabled ? "text-[#d4af37]" : "text-zinc-500"} />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">
              Identidade do Autor
            </span>
          </div>
          <ToggleSwitch 
            isOn={brandKit.authorEnabled} 
            onToggle={() => onUpdate({ authorEnabled: !brandKit.authorEnabled })} 
          />
        </div>

        <AnimatePresence>
          {brandKit.authorEnabled && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden">
              <TextInput label="Nome do Autor" value={brandKit.authorName} onChange={(val: string) => onUpdate({ authorName: val })} placeholder="Ex: Luan Vasco" />
              <TextInput label="Cargo / Especialidade" value={brandKit.authorRole} onChange={(val: string) => onUpdate({ authorRole: val })} placeholder="Ex: Product Owner" />
              <TextInput label="URL do Avatar" value={brandKit.authorAvatar} onChange={(val: string) => onUpdate({ authorAvatar: val })} placeholder="https://..." />
              
              <PositionSelector 
                label="Posição do Autor" 
                value={brandKit.authorPos} 
                onChange={(val: string) => onUpdate({ authorPos: val })} 
                options={[
                  { value: "top-left", label: "Topo Esquerda" },
                  { value: "top-center", label: "Topo Centro" },
                  { value: "bottom-left", label: "Rodapé Esquerda" }
                ]} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* -------------------------------------------------------------
          SEÇÃO 2: USERNAME / HANDLE (@)
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <AtSign size={16} className={brandKit.handleEnabled ? "text-[#d4af37]" : "text-zinc-500"} />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">
              Username do Insta
            </span>
          </div>
          <ToggleSwitch 
            isOn={brandKit.handleEnabled} 
            onToggle={() => onUpdate({ handleEnabled: !brandKit.handleEnabled })} 
          />
        </div>

        <AnimatePresence>
          {brandKit.handleEnabled && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden">
              <TextInput label="@ do Perfil" value={brandKit.handle} onChange={(val: string) => onUpdate({ handle: val })} placeholder="Ex: @designgen.os" />
              <PositionSelector 
                label="Posição do @" 
                value={brandKit.handlePos} 
                onChange={(val: string) => onUpdate({ handlePos: val })} 
                options={[
                  { value: "top-right", label: "Topo Direita" },
                  { value: "bottom-right", label: "Rodapé Direita" }
                ]} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* -------------------------------------------------------------
          SEÇÃO 3: PAGINAÇÃO
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <ListOrdered size={14} className="text-[#d4af37]" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Paginação do Post</h4>
        </div>

        <div className="space-y-3">
          <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-white/5">
            {[
              { id: "progress", label: "Barra" },
              { id: "numbers", label: "01/10" },
              { id: "dots", label: "Pontos" },
              { id: "none", label: "Oculto" }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => onUpdate({ paginationStyle: opt.id as any })}
                className={`flex-1 text-[9px] font-bold uppercase py-2 rounded-md transition-all ${
                  brandKit.paginationStyle === opt.id ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {brandKit.paginationStyle !== "none" && (
            <PositionSelector 
              label="Posição" 
              value={brandKit.paginationPos} 
              onChange={(val: string) => onUpdate({ paginationPos: val })} 
              options={[
                { value: "bottom-center", label: "Rodapé Centro" },
                { value: "top-center", label: "Topo Centro" }
              ]} 
            />
          )}
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* -------------------------------------------------------------
          SEÇÃO 4: INDICADOR DE ARRASTE (SWIPE)
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <ArrowRightSquare size={14} className="text-[#d4af37]" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Indicador de Arraste</h4>
        </div>

        <div className="space-y-3">
          <TextInput label="Texto de Ação" value={brandKit.swipeText} onChange={(val: string) => onUpdate({ swipeText: val })} placeholder="Ex: Arraste pro lado" />
          
          <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => onUpdate({ swipeStyle: "minimal" })}
              className={`flex-1 text-[9px] font-bold uppercase py-2 rounded-md transition-all ${
                brandKit.swipeStyle === "minimal" ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Minimalista (Texto)
            </button>
            <button
              onClick={() => onUpdate({ swipeStyle: "pill" })}
              className={`flex-1 text-[9px] font-bold uppercase py-2 rounded-md transition-all ${
                brandKit.swipeStyle === "pill" ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Botão (Pill)
            </button>
          </div>

          <PositionSelector 
            label="Posição" 
            value={brandKit.swipePos} 
            onChange={(val: string) => onUpdate({ swipePos: val })} 
            options={[
              { value: "bottom-right", label: "Rodapé Direita" },
              { value: "bottom-center", label: "Rodapé Centro" }
            ]} 
          />
        </div>
      </section>

    </div>
  );
};

/* --- SUB-COMPONENTES REUTILIZÁVEIS DA UI --- */

function ToggleSwitch({ isOn, onToggle }: { isOn: boolean, onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`relative w-10 h-6 rounded-full transition-colors ${isOn ? "bg-[#d4af37]" : "bg-zinc-800"}`}>
      <motion.div layout className="absolute top-1 bottom-1 w-4 rounded-full bg-white shadow-sm" animate={{ left: isOn ? "20px" : "4px" }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
    </button>
  );
}

function TextInput({ label, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-zinc-900 border border-white/5 rounded-xl p-3 text-[11px] font-bold text-white outline-none focus:border-[#d4af37]/50 transition-colors" />
    </div>
  );
}

function PositionSelector({ label, value, onChange, options }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider ml-1">{label}</label>
      <div className="bg-zinc-900 border border-white/5 rounded-xl p-1">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-[11px] font-bold text-white outline-none p-2 cursor-pointer appearance-none text-center">
          {options.map((opt: any) => (
             <option key={opt.value} value={opt.value} className="bg-zinc-900">{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}