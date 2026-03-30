"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, Briefcase, User, Upload, 
  Target, ArrowRight, ArrowLeft, Loader2, HelpCircle,
  TrendingUp, BookOpen, ShoppingCart, Sparkles, 
  Layout, Type, Maximize
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- NOVAS ESTRUTURAS DE COMPOSIÇÃO ---
const LOGO_STRATEGIES = [
  { id: "ai", label: "Gerar com IA", icon: Sparkles, desc: "Design paramétrico exclusivo" },
  { id: "upload", label: "Já tenho Logo", icon: Upload, desc: "Usar meu arquivo próprio" },
];

const COMPOSITIONS = [
  { id: "stacked", label: "Vertical", icon: Layout, desc: "Símbolo sobre o texto" },
  { id: "inline", label: "Horizontal", icon: Maximize, desc: "Símbolo ao lado" },
];

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
  { id: "autoridade", label: "Autoridade", icon: Target },
  { id: "leads", label: "Leads", icon: TrendingUp },
  { id: "vendas", label: "Vendas", icon: ShoppingCart },
  { id: "educacao", label: "Educação", icon: BookOpen },
];

interface WizardControlsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  draft: any;
  handleUpdate: (field: string, value: any) => void;
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
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 block">DesignGen Architecture</span>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step >= i ? 'w-5 bg-[#d4af37]' : 'w-1.5 bg-white/10'}`} />
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-md w-full mx-auto py-12 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* PASSO 1: FUNDAÇÃO */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-10">
              <div className="space-y-4">
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] italic">O <span style={{ color: draft.brandColor }} className="transition-colors">Início.</span></h1>
                <p className="text-zinc-500 text-sm font-medium">Defina a base da sua presença digital.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Nome da Marca</label>
                  <input 
                    type="text" value={draft.brandName} onChange={(e) => handleUpdate("brandName", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-lg font-bold outline-none focus:border-[#d4af37]/40 transition-all text-white"
                    placeholder="Ex: Luan Strategy"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Mercado de Atuação</label>
                  <select 
                    value={draft.niche || ""} onChange={(e) => handleUpdate("niche", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold text-zinc-300 outline-none appearance-none focus:border-[#d4af37]/40 transition-all cursor-pointer"
                  >
                    <option value="" disabled>Selecione seu nicho...</option>
                    {NICHES.map(n => <option key={n} value={n} className="bg-zinc-900">{n}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* PASSO 2: DNA VISUAL (IA vs ESTRUTURA) */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9]">Seu <span style={{ color: draft.brandColor }} className="italic">DNA.</span></h1>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {LOGO_STRATEGIES.map(s => (
                    <button 
                      key={s.id} onClick={() => handleUpdate("logoStrategy", s.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-3 ${draft.logoStrategy === s.id ? 'bg-white/10 border-[#d4af37]/50' : 'bg-transparent border-white/5'}`}
                    >
                      <s.icon size={18} className={draft.logoStrategy === s.id ? "text-[#d4af37]" : "text-zinc-600"} />
                      <div>
                        <span className="block text-[10px] font-black uppercase tracking-wider text-white">{s.label}</span>
                        <span className="text-[8px] text-zinc-500 uppercase font-bold">{s.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Composição de Layout</label>
                  <div className="grid grid-cols-2 gap-3">
                    {COMPOSITIONS.map(c => (
                      <button 
                        key={c.id} onClick={() => handleUpdate("composition", c.id)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${draft.composition === c.id ? 'bg-white/10 border-[#d4af37]/50' : 'bg-transparent border-white/5'}`}
                      >
                        <c.icon size={16} className={draft.composition === c.id ? "text-[#d4af37]" : "text-zinc-600"} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PASSO 3: CORES & FONTES */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9]">A <span style={{ color: draft.brandColor }} className="italic">Vibe.</span></h1>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Paleta de Destaque</label>
                  <div className="grid grid-cols-6 gap-3">
                    {["#d4af37", "#3b82f6", "#ef4444", "#10b981", "#a855f7"].map(c => (
                      <button key={c} onClick={() => handleUpdate("brandColor", c)} className={`aspect-square rounded-full transition-all ${draft.brandColor === c ? 'ring-2 ring-white ring-offset-4 ring-offset-black' : 'opacity-40 hover:opacity-100'}`} style={{ backgroundColor: c }} />
                    ))}
                    <div className="relative aspect-square rounded-full border border-white/20 overflow-hidden">
                      <input type="color" value={draft.brandColor} onChange={(e) => handleUpdate("brandColor", e.target.value)} className="absolute inset-[-10px] w-[150%] h-[150%] cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Personalidade Tipográfica</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Inter", "Bebas Neue", "Playfair Display"].map(font => (
                      <button key={font} onClick={() => handleUpdate("titleFont", font)} className={`p-4 rounded-xl border text-left transition-all ${draft.titleFont === font ? 'bg-white/10 border-white/30 shadow-lg' : 'bg-transparent border-white/5 hover:bg-white/5'}`}>
                        <span className="text-xl font-black uppercase tracking-tight text-white" style={{ fontFamily: font }}>{font}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PASSO 4: ESTRATÉGIA FINAL */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9]">Seu <span style={{ color: draft.brandColor }} className="italic">Norte.</span></h1>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {GOALS.map(g => (
                    <button key={g.id} onClick={() => handleUpdate("goal", g.id)} className={`p-4 rounded-2xl border text-left flex flex-col gap-3 transition-all ${draft.goal === g.id ? 'bg-white/10 border-[#d4af37]/50 shadow-xl' : 'bg-transparent border-white/5'}`}>
                      <g.icon size={18} className={draft.goal === g.id ? "text-[#d4af37]" : "text-zinc-600"} />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white">{g.label}</span>
                    </button>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block">Tom de Voz da Marca</label>
                  <div className="flex flex-col gap-2">
                    {PERSONA_TONES.map(t => (
                      <button key={t.id} onClick={() => handleUpdate("persona", t.id)} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${draft.persona === t.id ? 'bg-white/5 shadow-inner' : 'opacity-40 hover:opacity-100'}`}>
                        <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: t.color }} />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-white">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <footer className="flex items-center justify-between pt-10 shrink-0 border-t border-white/5">
        <button 
          onClick={() => setStep(s => Math.max(1, s - 1))} 
          className={`text-zinc-600 uppercase text-[10px] font-black tracking-widest flex items-center gap-2 transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:text-white'}`}
        >
          <ArrowLeft size={14} /> Voltar
        </button>
        
        <button 
          onClick={() => step < 4 ? setStep(s => s + 1) : onComplete()}
          disabled={loading || (step === 1 && (!draft.brandName.trim() || !draft.niche))}
          className="group flex items-center gap-6 bg-white text-black pl-8 pr-2 py-2 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(255,255,255,0.05)] disabled:opacity-50"
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