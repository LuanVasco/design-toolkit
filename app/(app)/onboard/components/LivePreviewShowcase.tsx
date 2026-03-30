"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Zap, ShieldCheck } from "lucide-react";
import { LogoConfig, LogoRenderer } from "@/app/components/logo-engine/LogoRenderer";

// Elementos 3D trazidos para cá, pois só pertencem à vitrine visual
const NICHE_ELEMENTS: Record<string, any[]> = {
  "Marketing & Vendas": [{ src: "/3d-lampada.png", top: "-15%", left: "-10%", size: "w-28", rotate: -15 }],
  "Tecnologia & SaaS": [{ src: "/3d-astronauta.png", top: "-10%", left: "-15%", size: "w-32", rotate: -5 }],
  "Saúde & Bem-estar": [{ src: "/3d-coracao.png", top: "-10%", left: "-10%", size: "w-24", rotate: -15 }],
  "Finanças & Cripto": [{ src: "/3d-grafico.png", top: "-15%", left: "-15%", size: "w-28", rotate: -10 }],
  "Design & Arquitetura": [{ src: "/3d-cafe.png", top: "-10%", left: "-10%", size: "w-24", rotate: -10 }],
  "Outro": [{ src: "/3d-cafe.png", top: "-10%", left: "-10%", size: "w-24", rotate: -10 }],
};

interface LivePreviewShowcaseProps {
  step: number;
  draft: any;
  isProcessing: boolean;
  activePalette: any;
  aiGridConfigs: LogoConfig[];
  handleUpdate: (field: string, value: any) => void;
}

export const LivePreviewShowcase = ({ 
  step, draft, isProcessing, activePalette, aiGridConfigs, handleUpdate 
}: LivePreviewShowcaseProps) => {

  // 🧠 Lógica para puxar a "Justificativa de Design" gerada pela IA, ou um fallback amigável.
  const vibeText = draft.selectedAiConfig?.styleConfig?.rationale || `Mapeando atributos visuais para ${draft.niche || "o seu mercado"}.`;

  return (
    <section className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden transition-colors duration-1000">
      
      {/* 🚀 1. ELEMENTOS 3D ORBITANDO (Escondidos no processamento) */}
      <AnimatePresence>
        {draft.niche && step < 4 && !isProcessing && (NICHE_ELEMENTS[draft.niche] || NICHE_ELEMENTS["Outro"]).map((item, index) => (
          <motion.img
            key={`${draft.niche}-${index}`}
            src={item.src}
            className={`absolute z-30 object-contain drop-shadow-2xl pointer-events-none ${item.size}`}
            style={{ top: item.top, left: item.left }}
            initial={{ opacity: 0, scale: 0, rotate: item.rotate - 20, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotate: item.rotate, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            whileInView={{ y: [0, -10, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {/* 🚀 2. LAYOUT STEPS 1-3 OU PROCESSING (Preview Mestre contínuo) */}
        {(step < 4 || isProcessing) && (
          <motion.div key="single-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-[500px] h-[300px] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-visible flex flex-col justify-center p-12 border border-white/5 z-20" style={{ backgroundColor: activePalette.colors[1] }}>
            <motion.div animate={{ backgroundColor: draft.brandColor }} className="absolute -top-32 -right-32 w-64 h-64 blur-[100px] opacity-20 pointer-events-none" />
            
            <div className="relative z-10 w-full flex flex-col justify-center items-center h-full">
              {draft.logoStrategy === 'upload' && draft.logoUrl ? (
                <img src={draft.logoUrl} className="max-h-32 object-contain drop-shadow-2xl" alt="Logo" />
              ) : (
                <div className="text-center">
                  {draft.logoStrategy === 'ai' && draft.logoType === 'geometrico' && <Zap size={32} style={{ color: draft.brandColor }} className="mx-auto mb-4" />}
                  {draft.logoStrategy === 'ai' && draft.logoType === 'monograma' && <Layers size={40} style={{ color: draft.brandColor }} className="mx-auto mb-4" />}
                  <h2 className="text-5xl font-black uppercase tracking-tighter leading-none" style={{ fontFamily: draft.titleFont, color: draft.logoStrategy === 'ai' && draft.logoType === 'tipografico' ? draft.brandColor : '#fff' }}>
                    {draft.brandName || "Marca"}
                  </h2>
                </div>
              )}
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t pt-4 opacity-60" style={{ borderColor: activePalette.colors[3] }}>
               <span className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: activePalette.colors[3], fontFamily: draft.subtitleFont }}>{draft.niche || "Nicho"}</span>
               <span className="text-[10px] font-bold tracking-widest text-white" style={{ fontFamily: draft.subtitleFont }}>@{draft.brandName.toLowerCase().replace(/\s/g, '') || "user"}</span>
            </div>

            {/* 💎 VIBE INSIGHT DINÂMICO CONECTADO À IA */}
            <motion.div initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} className="absolute bottom-16 -right-6 w-48 p-5 rounded-[2rem] bg-zinc-900/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-30">
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: draft.brandColor }} />
                 <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/50">Direção Criativa</span>
              </div>
              <p className="text-[11px] font-bold text-zinc-200 leading-relaxed italic" style={{ fontFamily: draft.subtitleFont }}>
                {vibeText}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* 🚀 3. LAYOUT STEP 4 (IA): GRID DO MOTOR PARAMÉTRICO */}
        {step === 4 && draft.logoStrategy === 'ai' && !isProcessing && (
          <motion.div key="grid-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-3xl relative z-10 flex flex-col h-full justify-center">
            
            {/* 💎 NOVO: MENU DE TESTE RÁPIDO DE FONTES INJETADO */}
            <div className="w-full flex justify-center mb-6 z-20">
              <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 p-2 rounded-full flex gap-1 shadow-2xl">
                {["Inter", "Playfair Display", "Bebas Neue", "Space Grotesk"].map(font => (
                  <button 
                    key={font}
                    onClick={() => handleUpdate("titleFont", font)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${draft.titleFont === font ? 'bg-white text-black font-black' : 'bg-transparent text-zinc-400 font-bold hover:text-white hover:bg-white/5'}`}
                    style={{ fontFamily: `"${font}", sans-serif` }}
                  >
                    {font.split(' ')[0]} 
                  </button>
                ))}
              </div>
            </div>

            {/* GRID COM SCROLL INVISÍVEL E ANIMAÇÃO CASCATA */}
            <div 
              className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-4 pb-10 [&::-webkit-scrollbar]:hidden"
              style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
            >
              {aiGridConfigs.map((config, idx) => (
                <motion.div 
                  key={config.id} 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.08, type: "spring", stiffness: 200 }}
                  onClick={() => handleUpdate("selectedAiConfig", config)}
                  className={`relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${draft.selectedAiConfig?.id === config.id ? 'border-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-20' : 'border-white/5 hover:border-white/20 hover:bg-white/5'}`}
                  style={{ backgroundColor: activePalette.colors[1] }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
                     <div className="scale-75 w-full h-full flex items-center justify-center">
                       {/* PASSANDO A FONTE DINÂMICA: o LogoRenderer atualiza instantaneamente se o usuário clicar no menu acima */}
                       <LogoRenderer config={{...config, fontName: draft.titleFont}} brandName={draft.brandName || "Marca"} className="w-full h-full" />
                     </div>
                  </div>
                  
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${draft.selectedAiConfig?.id === config.id ? 'bg-white border-white text-black' : 'bg-black/50 border-white/20 text-transparent'}`}>
                     <ShieldCheck size={12} fill="currentColor" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 🚀 4. LAYOUT STEP 4 (UPLOAD) -> MOCKUP VITRINE */}
        {step === 4 && draft.logoStrategy === 'upload' && !isProcessing && (
          <motion.div key="mockup-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-[500px] h-[300px] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-center p-12 border border-white/5" style={{ backgroundColor: activePalette.colors[1] }}>
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${activePalette.colors[2]} 2px, transparent 2px)`, backgroundSize: '20px 20px' }} />
             <div className="relative z-10 w-full flex justify-center items-center">
               <img src={draft.logoUrl} className="max-h-32 object-contain drop-shadow-2xl" />
             </div>
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t pt-4" style={{ borderColor: activePalette.colors[3] }}>
               <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: activePalette.colors[3], fontFamily: draft.subtitleFont }}>{draft.niche}</span>
               <span className="text-[10px] font-bold tracking-widest text-white">Strategic OS</span>
             </div>
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
};