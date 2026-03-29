// src/app/studio/components/BrandKitEditor.tsx
"use client";

import React from "react";
import { Droplet, PaintRoller, Type, MoveDiagonal } from "lucide-react";

// 🧠 IMPORTAMOS A TIPAGEM DO CONTEXTO (Ajuste o caminho conforme sua pasta)
import { BrandKitState } from "@/app/context/BrandKitContext"; 

interface BrandKitEditorProps {
  brandKit: BrandKitState;
  onUpdate: (updates: Partial<BrandKitState>) => void;
}

export const BrandKitEditor = ({ brandKit, onUpdate }: BrandKitEditorProps) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500 pb-10">
      
      {/* -------------------------------------------------------------
          SEÇÃO 1: Cores de Marca (Acentos, Texto e Hook)
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <Droplet size={14} className="text-[#d4af37]" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Cores da Marca</h4>
        </div>

        <div className="space-y-3">
          <ColorPickerRow 
            label="Cor de Destaque (Accent)" 
            value={brandKit.brandColor} 
            onChange={(val) => onUpdate({ brandColor: val })} 
          />
          <ColorPickerRow 
            label="Cor Padrão do Texto" 
            value={brandKit.textColor || "#FFFFFF"} 
            onChange={(val) => onUpdate({ textColor: val })} 
          />
          <ColorPickerRow 
            label="Fundo do Slide Gancho (Hook)" 
            value={brandKit.hookBgColor} 
            onChange={(val) => onUpdate({ hookBgColor: val })} 
          />
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* -------------------------------------------------------------
          SEÇÃO 2: Fundo Global do Carrossel
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <PaintRoller size={14} className="text-[#d4af37]" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Fundo Global do Post</h4>
        </div>

        {/* Toggle Solid / Gradient */}
        <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => onUpdate({ bgType: "solid" })}
            className={`flex-1 text-[10px] font-bold uppercase py-2 rounded-md transition-all ${
              brandKit.bgType === "solid" ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Sólido
          </button>
          <button
            onClick={() => onUpdate({ bgType: "gradient" })}
            className={`flex-1 text-[10px] font-bold uppercase py-2 rounded-md transition-all ${
              brandKit.bgType === "gradient" ? "bg-zinc-800 text-white shadow-md" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Gradiente
          </button>
        </div>

        {/* Controles de Cor do Fundo */}
        <div className="space-y-3 pt-2">
          <ColorPickerRow 
            label={brandKit.bgType === "gradient" ? "Cor Inicial" : "Cor do Fundo"} 
            value={brandKit.bgColor1} 
            onChange={(val) => onUpdate({ bgColor1: val })} 
          />
          
          {brandKit.bgType === "gradient" && (
            <>
              <ColorPickerRow 
                label="Cor Final" 
                value={brandKit.bgColor2} 
                onChange={(val) => onUpdate({ bgColor2: val })} 
              />
              
              {/* Slider de Ângulo do Gradiente */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase">
                  <span className="flex items-center gap-1.5"><MoveDiagonal size={12} /> Ângulo</span>
                  <span>{brandKit.bgAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={brandKit.bgAngle}
                  onChange={(e) => onUpdate({ bgAngle: Number(e.target.value) })}
                  className="w-full accent-[#d4af37] h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </>
          )}
        </div>
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* -------------------------------------------------------------
          SEÇÃO 3: Tipografia (Pares Tipográficos Imersivos)
      ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <Type size={14} className="text-[#d4af37]" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Personalidade da Fonte</h4>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { 
              id: "modern", 
              name: "Moderno", 
              desc: "Inter & Inter", 
              fontFamily: '"Inter", sans-serif'
            },
            { 
              id: "elegant", 
              name: "Elegante", 
              desc: "Playfair & Lato", 
              fontFamily: '"Playfair Display", serif'
            },
            { 
              id: "impact", 
              name: "Impacto", 
              desc: "Montserrat & Sans", 
              fontFamily: '"Montserrat", sans-serif'
            },
            { 
              id: "creative", 
              name: "Criativo", 
              desc: "Grotesk & Roboto", 
              fontFamily: '"Space Grotesk", sans-serif'
            }
          ].map((pair) => (
            <button
              key={pair.id}
              onClick={() => onUpdate({ fontPair: pair.id as BrandKitState["fontPair"] })}
              className={`p-3 rounded-xl border flex flex-col items-start gap-1 transition-all ${
                brandKit.fontPair === pair.id 
                  ? "bg-zinc-800 border-[#d4af37]" 
                  : "bg-zinc-900/50 border-white/5 hover:bg-zinc-800/50"
              }`}
            >
              <span 
                className="text-[16px] text-white font-bold"
                style={{ fontFamily: pair.fontFamily }} 
              >
                {pair.name}
              </span>
              <span className="text-[9px] text-zinc-500 font-medium uppercase tracking-widest mt-0.5">
                {pair.desc}
              </span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};

/* --- SUB-COMPONENTE: Linha de Input de Cor (Estilo Profissional) --- */
function ColorPickerRow({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="flex items-center justify-between bg-zinc-900 border border-white/5 rounded-xl p-2 pl-3 group focus-within:border-[#d4af37]/50 transition-colors">
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-2">
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-[10px] font-mono text-white text-right w-16 outline-none focus:text-[#d4af37] transition-colors"
        />
        <div className="relative w-6 h-6 rounded-md overflow-hidden border border-white/20 shadow-inner shrink-0">
          <input 
            type="color" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}