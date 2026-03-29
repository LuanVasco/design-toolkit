"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Type, Hexagon, Loader2, RefreshCcw, Check, Smartphone, CreditCard } from "lucide-react";
import { MacroCategory, LogoConfig } from "../engine/combinator";
import { LogoRenderer } from "./LogoRenderer";

const MACRO_CATEGORIES = [
  { id: 'monograma' as MacroCategory, name: "Monograma", desc: "Foco nas Iniciais. Forte e direto.", icon: Layers },
  { id: 'tipografico' as MacroCategory, name: "Tipográfico", desc: "O Nome limpo. Elegante e clássico.", icon: Type },
  { id: 'geometrico' as MacroCategory, name: "Geométrico", desc: "Símbolo Abstrato. Inovador e tech.", icon: Hexagon },
];

// ==========================================
// 📍 PASSO 1: SELEÇÃO DE ARQUITETURA
// ==========================================
export const Step1_MacroSelector = ({ brandColor, onSelect }: { brandColor: string, onSelect: (cat: MacroCategory) => void }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full flex flex-col items-center pt-10">
    <div className="text-center space-y-4 mb-16">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
        Qual a arquitetura da sua <br/> <span style={{ color: brandColor }} className="italic">Marca?</span>
      </h1>
      <p className="text-zinc-400 font-medium text-sm max-w-md mx-auto">Escolha a fundação. Nosso algoritmo construirá o layout a partir dela.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
      {MACRO_CATEGORIES.map((cat) => (
        <button key={cat.id} onClick={() => onSelect(cat.id)} className="group flex flex-col items-center p-12 rounded-[2rem] bg-zinc-950/50 border border-white/5 hover:bg-white/[0.03] hover:border-white/20 transition-all relative overflow-hidden">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white group-hover:scale-110 transition-transform">
            <cat.icon size={40} />
          </div>
          <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">{cat.name}</h3>
          <p className="text-xs text-zinc-500 font-bold uppercase text-center">{cat.desc}</p>
        </button>
      ))}
    </div>
  </motion.div>
);

// ==========================================
// 📍 PASSO 2: O GRID INFINITO DE IDEIAS
// ==========================================
export const Step2_InfiniteGrid = ({ 
  brandName, brandColor, options, isProcessing, onSelectDesign, onGenerateMore 
}: { 
  brandName: string, brandColor: string, options: LogoConfig[], isProcessing: boolean, onSelectDesign: (c: LogoConfig) => void, onGenerateMore: () => void 
}) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full flex flex-col items-center">
    <div className="text-center space-y-4 mb-12">
      <h1 className="text-3xl font-black uppercase tracking-tighter leading-tight">
        Explorando <span style={{ color: brandColor }} className="italic">Direções.</span>
      </h1>
      <p className="text-zinc-400 text-xs uppercase tracking-widest">Selecione o conceito que mais agrada.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {options.map((config) => (
        <button 
          key={config.id} onClick={() => onSelectDesign(config)} disabled={isProcessing}
          className="group flex flex-col items-center p-6 rounded-[2rem] bg-zinc-950/50 border border-white/5 hover:bg-white/[0.03] hover:border-white/20 transition-all h-64 relative overflow-hidden"
        >
          <LogoRenderer config={config} brandName={brandName} />
          <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="text-[9px] bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-zinc-400 uppercase tracking-widest border border-white/10">
               {config.fontName}
             </span>
          </div>
        </button>
      ))}
    </div>

    <div className="mt-12 flex justify-center">
      <button onClick={onGenerateMore} disabled={isProcessing} className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors">
        {isProcessing ? <Loader2 className="animate-spin" size={16} /> : <RefreshCcw size={16} />}
        Gerar Mais Opções
      </button>
    </div>
  </motion.div>
);

// ==========================================
// 📍 PASSO 3: A VITRINE DE MOCKUPS 3D
// ==========================================
export const Step3_VitrineMockup = ({ 
  logoUrl, brandColor, brandName, onApprove, onBack 
}: { 
  logoUrl: string, brandColor: string, brandName: string, onApprove: () => void, onBack: () => void 
}) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex flex-col items-center">
    <div className="text-center space-y-4 mb-12">
      <h1 className="text-4xl font-black uppercase tracking-tighter leading-tight">
        Sua marca <br/> <span style={{ color: brandColor }} className="italic">Aplicada.</span>
      </h1>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-12 perspective-[2000px]">
      
      {/* 1. Palco Principal (Hero) */}
      <div className="col-span-1 lg:col-span-2 aspect-video bg-zinc-900/40 rounded-[3rem] border border-white/10 flex items-center justify-center p-12 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
        <img src={logoUrl} alt="Logo" className="max-h-full object-contain drop-shadow-2xl z-10" />
      </div>

      <div className="col-span-1 flex flex-col gap-8 perspective-[1000px]">
        {/* 2. Mockup: Avatar Social (Rotação sutil) */}
        <div className="flex-1 bg-zinc-950/80 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center p-8 transform-gpu hover:rotate-y-12 transition-transform duration-500 shadow-2xl">
          <div className="w-32 h-32 rounded-full border-4 overflow-hidden mb-6 p-4 bg-[#050505]" style={{ borderColor: brandColor }}>
            <img src={logoUrl} className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            <Smartphone size={14} /> Perfil Social
          </div>
        </div>

        {/* 3. Mockup: Cartão de Visitas Dark 3D */}
        <div 
          className="h-48 bg-gradient-to-br from-zinc-800 to-black rounded-2xl border border-white/10 flex flex-col justify-between p-6 shadow-2xl relative overflow-hidden"
          style={{ transform: "rotateY(-15deg) rotateX(10deg) rotateZ(2deg)", transformStyle: "preserve-3d" }}
        >
          {/* Efeito de brilho de vidro no cartão */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          
          <div className="w-16 h-16 opacity-20 absolute -bottom-4 -right-4"><img src={logoUrl} /></div>
          <div className="w-12 h-12 relative z-10"><img src={logoUrl} className="w-full h-full object-contain" /></div>
          
          <div className="text-right relative z-10 mt-auto">
            <h4 className="text-sm font-black text-white">{brandName}</h4>
            <p className="text-[8px] uppercase tracking-widest text-zinc-400 mt-1 flex items-center justify-end gap-1"><CreditCard size={10} /> Smart Card</p>
          </div>
        </div>
      </div>
    </div>

    {/* Controles */}
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors">
        <RefreshCcw size={14} /> Trocar Ideia
      </button>
      <button onClick={onApprove} className="group flex items-center gap-6 bg-white text-black pl-8 pr-2 py-2 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]">
        Aprovar e Vincular
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#d4af37] transition-colors"><Check size={18} /></div>
      </button>
    </div>
  </motion.div>
);