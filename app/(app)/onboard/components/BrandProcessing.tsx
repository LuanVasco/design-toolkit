"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, ShieldCheck, Search, Cpu } from "lucide-react";

interface BrandProcessingProps {
  brandName: string;
  brandColor: string;
}

export const BrandProcessing = ({ brandName, brandColor }: BrandProcessingProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Mensagens estratégicas para gerar percepção de valor
  const sequence = [
    { text: "Mapeando arquétipos de autoridade...", icon: <Search size={20} /> },
    { text: `Sincronizando paletas para ${brandName}...`, icon: <Palette size={20} /> },
    { text: "Ajustando kerning e pesos tipográficos...", icon: <Cpu size={20} /> },
    { text: "Consolidando arquitetura de marca...", icon: <ShieldCheck size={20} /> },
    { text: "Gerando preview de alta fidelidade...", icon: <Zap size={20} /> },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < sequence.length - 1 ? prev + 1 : prev));
    }, 800); // Velocidade da transição de mensagens
    return () => clearInterval(timer);
  }, [sequence.length]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto text-center space-y-12">
      
      {/* 🌀 O SCANNER VISUAL */}
      <div className="relative flex items-center justify-center">
        {/* Anéis orbitais */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute w-40 h-40 rounded-full border border-dashed border-white/5"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-56 h-56 rounded-full border border-dotted border-white/10"
        />

        {/* Círculo Central Pulsante */}
        <div className="relative w-28 h-28 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0"
            style={{ backgroundColor: brandColor }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="relative z-10 text-white"
            >
              {sequence[currentStep].icon}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 📝 STATUS DA INTELIGÊNCIA */}
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: brandColor }} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#d4af37]">
              Processing Identity
            </span>
          </motion.div>
          
          <div className="h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentStep}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-sm font-bold text-zinc-400 italic"
              >
                {sequence[currentStep].text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Barra de Progresso Fina (Estilo Linear) */}
        <div className="w-48 h-1 bg-zinc-900 rounded-full mx-auto overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / sequence.length) * 100}%` }}
            className="h-full transition-all duration-500"
            style={{ backgroundColor: brandColor }}
          />
        </div>
      </div>

    </div>
  );
};

// Ícone de paleta que faltou no import acima
const Palette = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.76-.74 1.76-1.67 0-.44-.18-.84-.44-1.22s-.44-.81-.44-1.22c0-.93.74-1.67 1.67-1.67H17c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9z"/>
  </svg>
);