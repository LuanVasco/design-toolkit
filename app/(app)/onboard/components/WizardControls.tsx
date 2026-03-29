"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, Briefcase, User, Upload, 
  Target, ArrowRight, ArrowLeft, Loader2, HelpCircle,
  TrendingUp, BookOpen, ShoppingCart
} from "lucide-react";
import { useRouter } from "next/navigation";

const PERSONA_TONES = [
  { id: "premium", label: "Premium", desc: "Exclusivo e Minimalista", color: "#d4af37" },
  { id: "autoridade", label: "Autoridade", desc: "Sério e Especialista", color: "#3b82f6" },
  { id: "amigavel", label: "Humanizado", desc: "Próximo e Acessível", color: "#10b981" },
];

const NICHES = [
  "Marketing & Vendas", "Tecnologia & Dev", "Saúde & Bem-estar", 
  "Finanças & Cripto", "Direito", "Design & Criatividade", "Outro"
];

const GOALS = [
  { id: "autoridade", label: "Construir Autoridade", icon: Target },
  { id: "leads", label: "Gerar Leads/Contatos", icon: TrendingUp },
  { id: "vendas", label: "Vender Produtos", icon: ShoppingCart },
  { id: "educacao", label: "Educar Audiência", icon: BookOpen },
];

interface WizardControlsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  draft: any;
  handleUpdate: (field: string, value: string) => void;
  onComplete: () => void;
  loading: boolean;
}

export const WizardControls = ({ step, setStep, draft, handleUpdate, onComplete, loading }: WizardControlsProps) => {
  const router = useRouter();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) handleUpdate(field, URL.createObjectURL(file));
  };

  return (
    <section className="w-full lg:w-[45%] flex flex-col p-8 md:p-16 justify-between bg-zinc-950/40 backdrop-blur-3xl border-r border-white/5 overflow-y-auto no-scrollbar relative z-20">
      
      <header className="flex items-center gap-4 shrink-0">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#d4af37] shadow-lg">
          <Rocket size={18} fill="currentColor" />
        </div>
        <div>
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 block">DesignGen Setup</span>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step >= i ? 'w-4 bg-[#d4af37]' : 'w-1 bg-white/10'}`} />
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-md w-full mx-auto py-12 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* ================= PASSO 1: NOME & NICHO ================= */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-10">
              <div className="space-y-4">
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-tight italic">
                  O seu <span style={{ color: draft.brandColor }} className="transition-colors">Espaço.</span>
                </h1>
                <p className="text-zinc-500 text-sm font-medium">Nome e área de atuação para personalizarmos sua IA.</p>
              </div>
              
              <div className="space-y-6">
                <div className="relative group">
                  <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#d4af37] transition-colors" size={20} />
                  <input 
                    type="text" placeholder="Nome da sua marca..."
                    value={draft.brandName} onChange={(e) => handleUpdate("brandName", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-16 pr-6 text-lg font-bold outline-none focus:border-[#d4af37]/40 transition-all placeholder:text-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Qual o seu mercado?</label>
                  <select 
                    value={draft.niche || ""} 
                    onChange={(e) => handleUpdate("niche", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold text-zinc-300 outline-none appearance-none focus:border-[#d4af37]/40 transition-all cursor-pointer"
                  >
                    <option value="" disabled className="bg-zinc-900 text-zinc-500">Selecione seu nicho...</option>
                    {NICHES.map(niche => (
                      <option key={niche} value={niche} className="bg-zinc-900 text-white">{niche}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= PASSO 2: VISUAL ================= */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-10">
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-tight">Suas <span style={{ color: draft.brandColor }} className="italic transition-colors">Cores.</span></h1>
              <div className="space-y-8">
                <div className="grid grid-cols-6 gap-3">
                  {["#d4af37", "#3b82f6", "#ef4444", "#10b981", "#a855f7"].map(c => (
                    <button key={c} onClick={() => handleUpdate("brandColor", c)} className={`aspect-square rounded-full transition-all ${draft.brandColor === c ? 'ring-4 ring-white ring-offset-4 ring-offset-black scale-90' : 'opacity-40 hover:opacity-100'}`} style={{ backgroundColor: c }} />
                  ))}
                  <input type="color" value={draft.brandColor} onChange={(e) => handleUpdate("brandColor", e.target.value)} className="w-full h-full rounded-full cursor-pointer bg-transparent border-none p-0 overflow-hidden opacity-40 hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Tipografia (Títulos)</label>
                  <div className="grid grid-cols-1 gap-3">
                    {["Inter", "Bebas Neue", "Playfair Display"].map(font => (
                      <button key={font} onClick={() => handleUpdate("titleFont", font)} className={`p-4 rounded-2xl border text-left transition-all ${draft.titleFont === font ? 'bg-white/10 border-white/30' : 'bg-transparent border-white/5 hover:bg-white/5'}`}>
                        <span className="text-lg font-black uppercase text-white" style={{ fontFamily: font }}>{font}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= PASSO 3: MÍDIA ================= */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-10">
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-tight">Sua <span style={{ color: draft.brandColor }} className="italic transition-colors">Presença.</span></h1>
              <div className="grid grid-cols-2 gap-6">
                
                <div className="space-y-3 text-center">
                  <input type="file" accept="image/*" ref={logoInputRef} onChange={(e) => handleImage(e, 'logoUrl')} className="hidden" />
                  <div onClick={() => logoInputRef.current?.click()} className="aspect-square rounded-[2rem] bg-zinc-900 border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-6 group hover:border-[#d4af37]/50 transition-all cursor-pointer relative overflow-hidden">
                     {draft.logoUrl ? <img src={draft.logoUrl} className="w-full h-full object-contain" /> : (
                       <>
                         <Upload size={24} className="text-zinc-600 group-hover:text-[#d4af37] mb-3" />
                         <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Subir Logo</span>
                       </>
                     )}
                  </div>
                  <button onClick={() => router.push('/logo-helper')} className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] flex items-center gap-2 justify-center hover:text-[#fcd34d] transition-colors">
                     <HelpCircle size={12} /> Não tenho logo
                  </button>
                </div>

                <div className="space-y-3 text-center">
                  <input type="file" accept="image/*" ref={avatarInputRef} onChange={(e) => handleImage(e, 'avatarUrl')} className="hidden" />
                  <div onClick={() => avatarInputRef.current?.click()} className="aspect-square rounded-[2rem] bg-zinc-900 border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-6 group hover:border-[#d4af37]/50 transition-all cursor-pointer relative overflow-hidden">
                     {draft.avatarUrl ? <img src={draft.avatarUrl} className="w-full h-full object-cover" /> : (
                       <>
                         <User size={24} className="text-zinc-600 group-hover:text-[#d4af37] mb-3" />
                         <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Sua Foto</span>
                       </>
                     )}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700 underline">Opcional</span>
                </div>

              </div>
            </motion.div>
          )}

          {/* ================= PASSO 4: ESTRATÉGIA ================= */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-tight">Seu <span style={{ color: draft.brandColor }} className="italic transition-colors">Foco.</span></h1>
              
              {/* Ojetivo Principal */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Qual seu objetivo principal?</label>
                <div className="grid grid-cols-2 gap-3">
                  {GOALS.map(g => (
                    <button 
                      key={g.id} onClick={() => handleUpdate("goal", g.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-3 ${draft.goal === g.id ? 'bg-white/10 border-[#d4af37]/50' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                    >
                      <g.icon size={18} className={draft.goal === g.id ? "text-[#d4af37]" : "text-zinc-600"} />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white">{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tom de Voz / Persona */}
              <div className="space-y-3 pt-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Tom de Voz</label>
                <div className="grid grid-cols-1 gap-3">
                  {PERSONA_TONES.map(t => (
                    <button 
                      key={t.id} onClick={() => handleUpdate("persona", t.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${draft.persona === t.id ? 'bg-white/10 border-[#d4af37]/50' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                    >
                      <div className="w-2 h-8 rounded-full" style={{ backgroundColor: t.color }} />
                      <div>
                        <span className="block text-sm font-black uppercase tracking-widest text-white">{t.label}</span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">{t.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <footer className="flex items-center justify-between pt-12 shrink-0 border-t border-white/5">
        <button 
          onClick={() => setStep(s => Math.max(1, s - 1))} 
          className={`text-zinc-500 uppercase text-[10px] font-black tracking-widest flex items-center gap-2 transition-opacity duration-300 ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:text-white'}`}
        >
          <ArrowLeft size={14} /> Voltar
        </button>
        
        <button 
          // Trava de segurança: só avança do passo 1 se tiver nome E nicho preenchidos
          onClick={() => step < 4 ? setStep(s => s + 1) : onComplete()}
          disabled={loading || (step === 1 && (!draft.brandName.trim() || !draft.niche)) || (step === 4 && (!draft.goal || !draft.persona))}
          className="group flex items-center gap-6 bg-white text-black pl-8 pr-2 py-2 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? "Processando..." : step === 4 ? "Criar Universo" : "Próximo Passo"}
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
            {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={18} />}
          </div>
        </button>
      </footer>
    </section>
  );
};