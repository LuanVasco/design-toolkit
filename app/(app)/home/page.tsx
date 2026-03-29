"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, LayoutTemplate, Settings, Play, ShieldAlert } from "lucide-react";
import { CarouselPreview } from "../studio/components/Preview/Canvas";
import { PRESET_TEMPLATES } from "../studio/utils/presetTemplates";

// Importações do Motor

export default function HomePage() {
  const router = useRouter();
  
  // Estado do Template em exibição na vitrine
  const [activeTemplate, setActiveTemplate] = useState(PRESET_TEMPLATES[0]);

  // BrandKit Dinâmico: A Home "veste" as cores do template ativo (Modo Preview)
  const vitrineBrandKit = {
    bgType: activeTemplate?.theme?.bgType || 'solid',
    bgColor1: activeTemplate?.theme?.bgColor1 || '#050505',
    bgColor2: activeTemplate?.theme?.bgColor2 || '#1a1a1a',
    bgAngle: activeTemplate?.theme?.bgAngle || 135,
    brandColor: activeTemplate?.theme?.brandColor || '#d4af37',
    textColor: activeTemplate?.theme?.textColor || '#ffffff',
    titleFont: activeTemplate?.theme?.titleFont || 'Inter',
    bodyFont: activeTemplate?.theme?.bodyFont || 'Inter',
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#d4af37] selection:text-black relative overflow-hidden flex flex-col">
      
      {/* 1. BACKGROUND ARQUITETÔNICO */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Luz Reativa (Muda conforme o template selecionado) */}
      <motion.div 
        animate={{ backgroundColor: vitrineBrandKit.brandColor }}
        transition={{ duration: 1, ease: "circOut" }}
        className="absolute top-[-20%] right-[-10%] w-[1000px] h-[800px] blur-[250px] pointer-events-none opacity-20 rounded-full" 
      />

      <main className="flex-1 w-full max-w-[1800px] mx-auto px-8 md:px-16 pt-20 pb-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10">
        
        {/* 2. COLUNA ESQUERDA: COPY E ONBOARDING */}
        <div className="w-full lg:w-[45%] space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] backdrop-blur-md">
              <Sparkles size={12} fill="currentColor" />
              Bem-vindo ao DesignGen OS
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Seu Conteúdo <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600 italic">
                Pronto em
              </span><br/>
              Segundos.
            </h1>
            
            <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-md">
              Explore nossa galeria de frameworks validados. Selecione a estrutura ideal e deixe nosso motor de automação fazer o trabalho pesado por você.
            </p>
          </motion.div>

          {/* 🚀 DESTAQUE ESTRATÉGICO PARA O ONBOARDING */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="p-5 rounded-2xl bg-zinc-900/40 border border-[#d4af37]/30 backdrop-blur-md relative overflow-hidden group max-w-md"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="p-2 rounded-lg bg-[#d4af37]/20 text-[#d4af37] shrink-0 mt-1">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white mb-1">
                  A Mágica exige o Onboard
                </h3>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-4">
                  Para que estes templates recebam automaticamente as **suas cores, fontes e logotipo**, você precisa configurar seu BrandKit no Onboarding.
                </p>
                <button 
                  onClick={() => router.push('/onboard')}
                  className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#d4af37] hover:text-[#fcd34d] transition-colors"
                >
                  <Settings size={14} /> Configurar Meu BrandKit Agora <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* SELETOR DE TEMPLATES (A Interação) */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4 pt-4 border-t border-white/5 max-w-md"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2">
              Explore o Acervo Nativo:
            </span>
            
            <div className="grid grid-cols-2 gap-3">
              {PRESET_TEMPLATES.slice(0, 4).map((tpl) => {
                const isActive = activeTemplate?.id === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => setActiveTemplate(tpl)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left ${
                      isActive 
                        ? 'bg-white/10 border-white/20 shadow-lg' 
                        : 'bg-zinc-950/50 border-white/5 hover:border-white/10 hover:bg-zinc-900/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-[#d4af37] text-black' : 'bg-white/5 text-zinc-500'}`}>
                      <LayoutTemplate size={14} />
                    </div>
                    <div>
                      <h3 className={`text-[11px] font-black uppercase tracking-widest line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                        {tpl.name}
                      </h3>
                      <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
                        {tpl.slides?.length} Slides
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* BOTÃO PARA O STUDIO */}
            <div className="pt-6">
               <button 
                onClick={() => router.push(`/studio?template=${activeTemplate.id}`)}
                className="w-full group flex items-center justify-between pl-6 pr-2 py-2 rounded-full bg-white text-black font-black uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-95"
               >
                 <span className="text-[11px]">Criar com este Layout</span>
                 <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                   <Play size={16} className="group-hover:translate-x-0.5 transition-transform" />
                 </div>
               </button>
            </div>
          </motion.div>
        </div>

        {/* 3. COLUNA DIREITA: O "STAGE" (A Demonstração Viva) */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
          className="w-full lg:w-[55%] h-[600px] lg:h-[700px] relative flex flex-col rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
        >
          {/* Mockup de Janela (Window Header) */}
          <div className="h-12 w-full border-b border-white/5 bg-white/[0.02] flex items-center px-6 gap-2 shrink-0">
             <div className="w-3 h-3 rounded-full bg-red-500/80" />
             <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
             <div className="w-3 h-3 rounded-full bg-green-500/80" />
             <div className="ml-4 px-3 py-1 rounded-full bg-white/5 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
               Preview Original • {activeTemplate.name}
             </div>
          </div>

          {/* O Carrossel Renderizado */}
          <div className="flex-1 w-full relative group">
            
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none">
              Deslize para explorar
            </div>

            {/* Container com scroll horizontal livre */}
            <div 
              className="absolute inset-0 overflow-x-auto overflow-y-hidden no-scrollbar flex items-center px-12 lg:px-20"
              style={{
                // Injetamos as variáveis CSS do tema para o Canvas herdar
                '--font-title': `"${vitrineBrandKit.titleFont}", sans-serif`,
                '--font-body': `"${vitrineBrandKit.bodyFont}", sans-serif`,
                color: vitrineBrandKit.textColor,
              } as React.CSSProperties}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTemplate.id}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-black/60 blur-2xl -z-10 translate-y-6 scale-95" />
                  
                  {/* 🚀 O SEGREDO MANTIDO: Renderiza em modo Preview (Chama o ShowroomCanvas internamente) */}
                  <CarouselPreview 
                    orderedSlides={activeTemplate.slides}
                    brandKit={vitrineBrandKit} 
                    transitions={[]} 
                    isPreviewMode={true} 
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
          </div>
        </motion.div>
        
      </main>
    </div>
  );
}