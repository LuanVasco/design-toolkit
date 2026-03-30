"use client";

import React, { RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Type, Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import { LogoStyleSelector } from "./LogoStyleSelector";

// --- DADOS ESTRATÉGICOS ---
const NICHES = [
  "Marketing & Vendas", "Tecnologia & SaaS", "Saúde & Bem-estar", 
  "Finanças & Cripto", "Direito & Advocacia", "Design & Arquitetura", "Outro"
];

interface FoundationSetupProps {
  draft: any;
  handleUpdate: (field: string, value: any) => void;
  logoInputRef: RefObject<HTMLInputElement | null>;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FoundationSetup = ({ 
  draft, 
  handleUpdate, 
  logoInputRef, 
  handleImage 
}: FoundationSetupProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 20 }} 
      className="space-y-10"
    >
      {/* 1. HEADER DINÂMICO */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] italic">
          A <span style={{ color: draft.brandColor }} className="transition-colors duration-500">Fundação.</span>
        </h1>
        <p className="text-xs text-zinc-500 font-medium">Defina a nomenclatura e o território da sua autoridade digital.</p>
      </div>

      {/* 2. INPUT DE NOME (Foco em UX) */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Nome da Marca</label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors">
            <Type size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Ex: Strategic OS" 
            value={draft.brandName} 
            onChange={(e) => handleUpdate("brandName", e.target.value)} 
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-lg font-bold outline-none focus:border-white/30 transition-all placeholder:text-zinc-700 text-white" 
          />
        </div>
      </div>

      {/* 3. MERCADO DE ATUAÇÃO (Chips/Pills) */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Mercado de Atuação</label>
        <div className="flex flex-wrap gap-2">
          {NICHES.map(niche => {
            const isActive = draft.niche === niche;
            return (
              <button
                key={niche}
                onClick={() => handleUpdate("niche", niche)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  isActive 
                    ? 'bg-white/10 text-white border-white/20 shadow-lg' 
                    : 'bg-transparent text-zinc-500 border-white/5 hover:border-white/10 hover:text-zinc-300'
                }`}
                style={{ borderColor: isActive ? `${draft.brandColor}50` : undefined }}
              >
                {niche}
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. ESTRATÉGIA DE LOGO (Segmented Control) */}
      <div className="pt-6 border-t border-white/5 space-y-5">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Estratégia do Logotipo</label>
        
        <div className="flex bg-zinc-900/50 rounded-2xl p-1.5 border border-white/5 relative h-14">
          {/* Fundo Deslizante Ativo */}
          <motion.div 
            layoutId="strategyBg"
            className="absolute inset-y-1.5 bg-white/10 rounded-xl shadow-inner pointer-events-none"
            initial={false}
            animate={{ 
              left: draft.logoStrategy === 'ai' ? 'calc(50% + 3px)' : '6px',
              width: 'calc(50% - 9px)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          
          <button 
            onClick={() => handleUpdate("logoStrategy", "upload")} 
            className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all relative z-10 flex items-center justify-center gap-2 ${draft.logoStrategy === "upload" ? "text-white" : "text-zinc-600 hover:text-zinc-400"}`}
          >
            <Upload size={14} /> Já tenho Logo
          </button>
          
          <button 
            onClick={() => handleUpdate("logoStrategy", "ai")} 
            className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all relative z-10 flex items-center justify-center gap-2 ${draft.logoStrategy === "ai" ? "text-white" : "text-zinc-600 hover:text-zinc-400"}`}
          >
            <Sparkles size={14} /> Intelligence OS
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* MÓDULO: UPLOAD DROPAREA */}
          {draft.logoStrategy === "upload" && (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => logoInputRef.current?.click()} 
              className={`w-full mt-2 p-10 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group ${
                draft.logoUrl ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/[0.02] hover:border-white/30'
              }`}
            >
              <input type="file" accept="image/*" ref={logoInputRef} onChange={handleImage} className="hidden" />
              {draft.logoUrl ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-1 ring-4 ring-green-500/10">
                    <ImageIcon size={20} className="text-green-400" />
                  </div>
                  <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Ativo de Marca Importado</span>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300">
                    <Upload size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Buscar Arquivo (PNG/SVG)</span>
                </>
              )}
            </motion.div>
          )}

          {/* MÓDULO: IA ARCHITECTURE (Integrando o LogoStyleSelector) */}
          {draft.logoStrategy === "ai" && (
            <motion.div 
              key="ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pt-2"
            >
              <LogoStyleSelector 
                selectedType={draft.logoType} 
                onSelect={(type) => handleUpdate("logoType", type)} 
                brandColor={draft.brandColor} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};