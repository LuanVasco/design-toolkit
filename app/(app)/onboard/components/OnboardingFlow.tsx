"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, Target, Palette, Zap } from "lucide-react";

// Mock de dados baseado no benchmark do Pixella
const STEPS_DATA = {
  niches: [
    { id: "tech", label: "Tecnologia & SaaS", icon: <Zap size={18} /> },
    { id: "health", label: "Saúde & Bem-estar", icon: <Target size={18} /> },
    { id: "finance", label: "Finanças & Consultoria", icon: <Sparkles size={18} /> },
    { id: "creative", label: "Artes & Criatividade", icon: <Palette size={18} /> },
  ],
  styles: [
    { id: "minimal", label: "Minimalista", desc: "Menos é mais. Foco no essencial.", img: "bg-zinc-800" },
    { id: "bold", label: "Bold & Loud", desc: "Impacto visual e peso tipográfico.", img: "bg-[#d4af37]/20" },
    { id: "elegant", label: "Elegante", desc: "Sofisticação, serifas e luxo.", img: "bg-zinc-900" },
    { id: "abstract", label: "Abstrato", desc: "Formas orgânicas e modernas.", img: "bg-white/5" },
  ],
  colors: [
    { id: "gold", hex: "#d4af37", label: "Ouro" },
    { id: "blue", hex: "#2563eb", label: "Royal Blue" },
    { id: "white", hex: "#ffffff", label: "Pure White" },
    { id: "black", hex: "#000000", label: "Deep Black" },
  ]
};

export default function OnboardingFlow({ onComplete }: { onComplete: (data: any) => void }) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({ niche: "", style: "", color: "" });

  const nextStep = () => setStep(prev => prev + 1);

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      
      {/* PROGRESS BAR (Estilo Apple) */}
      <div className="flex justify-center gap-3 mb-16">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step >= i ? "w-12 bg-[#d4af37]" : "w-6 bg-zinc-800"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: NICHE */}
        {step === 1 && (
          <motion.div key="s1" {...containerVariants} className="space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Qual o seu mercado?</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">O Nicho define a inteligência por trás da marca</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STEPS_DATA.niches.map(n => (
                <button 
                  key={n.id}
                  onClick={() => { setSelections({...selections, niche: n.label}); nextStep(); }}
                  className="flex items-center justify-between p-8 bg-zinc-900/30 border border-white/5 rounded-[2rem] hover:border-[#d4af37]/50 hover:bg-zinc-900/50 transition-all group"
                >
                  <span className="text-lg font-bold tracking-tight">{n.label}</span>
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                    {n.icon}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: STYLE (O "Select styles you like") */}
        {step === 2 && (
          <motion.div key="s2" {...containerVariants} className="space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Escolha um Estilo</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">A estética dita a tipografia do seu hub</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {STEPS_DATA.styles.map(s => (
                <div 
                  key={s.id}
                  onClick={() => { setSelections({...selections, style: s.id}); nextStep(); }}
                  className="group cursor-pointer space-y-4"
                >
                  <div className={`aspect-[4/3] rounded-[2.5rem] ${s.img} border border-white/5 group-hover:border-[#d4af37] transition-all flex items-center justify-center p-8 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Preview Style</span>
                  </div>
                  <div className="px-2">
                    <h3 className="text-sm font-black uppercase tracking-tight">{s.label}</h3>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 3: COLOR */}
        {step === 3 && (
          <motion.div key="s3" {...containerVariants} className="space-y-10 text-center">
            <div className="space-y-2">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Cores da Identidade</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">A cor que comandará o seu Dashboard</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {STEPS_DATA.colors.map(c => (
                <button 
                  key={c.id}
                  onClick={() => onComplete({...selections, color: c.hex})}
                  className="flex flex-col items-center gap-4 p-6 bg-zinc-900/20 border border-white/5 rounded-3xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl shadow-2xl group-hover:scale-110 transition-transform" style={{ backgroundColor: c.hex }} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{c.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}