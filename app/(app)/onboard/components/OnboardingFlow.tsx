"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Sparkles, Target, Palette, Zap, 
  Layout, Maximize, CheckCircle2, ChevronRight 
} from "lucide-react";

// --- DADOS REFINADOS (Benchmark de Agências) ---
const STEPS_DATA = {
  niches: [
    { id: "tech", label: "Tecnologia & SaaS", icon: <Zap size={20} />, desc: "Inovação e Escala" },
    { id: "finance", label: "Finanças & Consultoria", icon: <Sparkles size={20} />, desc: "Confiança e Seriedade" },
    { id: "marketing", label: "Marketing & Vendas", icon: <Target size={20} />, desc: "Crescimento e Performance" },
    { id: "health", label: "Saúde & Bem-estar", icon: <Palette size={20} />, desc: "Equilíbrio e Cuidado" },
  ],
  // Aqui unimos Estilo com Composição (O que você queria melhorar)
  compositions: [
    { id: "stacked", label: "Arquitetura Vertical", icon: <Layout size={20} />, desc: "Símbolo centralizado sobre o nome." },
    { id: "inline", label: "Arquitetura Horizontal", icon: <Maximize size={20} />, desc: "Símbolo ao lado, foco em leitura." },
  ],
  palettes: [
    { id: "p1", name: "Midnight Gold", colors: ["#020202", "#d4af37"], label: "Luxo" },
    { id: "p2", name: "Cyber Blue", colors: ["#020617", "#3b82f6"], label: "Tech" },
    { id: "p3", name: "Pure Minimal", colors: ["#000000", "#ffffff"], label: "Clean" },
    { id: "p4", name: "Crimson Noir", colors: ["#1a0505", "#ef4444"], label: "Impacto" },
  ]
};

export default function OnboardingFlow({ onComplete }: { onComplete: (data: any) => void }) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({ 
    niche: "", 
    composition: "stacked", 
    color: "#d4af37",
    paletteId: "p1"
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const containerVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4">
      
      {/* HEADER DE PROGRESSO */}
      <div className="flex items-center justify-between mb-16 px-2">
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${step >= i ? "w-10 bg-[#d4af37]" : "w-3 bg-zinc-800"}`} />
          ))}
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
          Passo 0{step} <span className="text-zinc-800">/</span> 03
        </span>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: NICHE (A BASE) */}
        {step === 1 && (
          <motion.div key="s1" {...containerVariants} className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">Seu <span className="text-[#d4af37]">Nicho.</span></h2>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">A inteligência se adapta ao seu mercado</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STEPS_DATA.niches.map(n => (
                <button 
                  key={n.id}
                  onClick={() => { setSelections({...selections, niche: n.label}); nextStep(); }}
                  className="flex items-start justify-between p-8 bg-zinc-900/20 border border-white/5 rounded-[2.5rem] hover:border-[#d4af37]/40 hover:bg-zinc-900/40 transition-all group text-left"
                >
                  <div className="space-y-1">
                    <span className="block text-lg font-bold tracking-tight text-white">{n.label}</span>
                    <span className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{n.desc}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                    {n.icon}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: COMPOSITION (O DIFERENCIAL) */}
        {step === 2 && (
          <motion.div key="s2" {...containerVariants} className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">Sua <span className="text-[#d4af37]">Estrutura.</span></h2>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Como sua marca deve se posicionar?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {STEPS_DATA.compositions.map(c => (
                <button 
                  key={c.id}
                  onClick={() => { setSelections({...selections, composition: c.id}); nextStep(); }}
                  className={`flex items-center gap-6 p-8 rounded-[2.5rem] border transition-all text-left group ${selections.composition === c.id ? "bg-white/5 border-[#d4af37]/50" : "bg-zinc-900/20 border-white/5 hover:border-white/10"}`}
                >
                  <div className={`p-5 rounded-3xl transition-all ${selections.composition === c.id ? "bg-[#d4af37] text-black shadow-[0_0_30px_rgba(212,175,55,0.2)]" : "bg-white/5 text-zinc-500"}`}>
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{c.label}</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{c.desc}</p>
                  </div>
                  <ChevronRight size={20} className="ml-auto text-zinc-800 group-hover:text-[#d4af37] transition-colors" />
                </button>
              ))}
            </div>
            <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">Voltar</button>
          </motion.div>
        )}

        {/* STEP 3: COLOR (O TOQUE FINAL) */}
        {step === 3 && (
          <motion.div key="s3" {...containerVariants} className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">Sua <span className="text-[#d4af37]">Cor.</span></h2>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">A paleta que comandará seu ecossistema</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STEPS_DATA.palettes.map(p => (
                <button 
                  key={p.id}
                  onClick={() => onComplete({...selections, color: p.colors[1], paletteId: p.id})}
                  className="group flex flex-col p-6 bg-zinc-900/20 border border-white/5 rounded-[2rem] hover:bg-white/5 transition-all text-left"
                >
                  <div className="flex gap-2 mb-6">
                    <div className="w-12 h-12 rounded-2xl shadow-2xl transition-transform group-hover:scale-110" style={{ backgroundColor: p.colors[1] }} />
                    <div className="w-12 h-12 rounded-2xl border border-white/5" style={{ backgroundColor: p.colors[0] }} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-[#d4af37] transition-colors">{p.name}</span>
                  <span className="text-[9px] font-bold text-zinc-700 uppercase">{p.label} Style</span>
                </button>
              ))}
            </div>
            <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">Voltar</button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}