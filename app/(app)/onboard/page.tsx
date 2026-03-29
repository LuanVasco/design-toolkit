"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  Rocket, Briefcase, Upload, ArrowRight, ArrowLeft, 
  Loader2, Sparkles, Palette as PaletteIcon, Type, 
  Layers, Zap, ShieldCheck, Image as ImageIcon, RefreshCw,
  User
} from "lucide-react";

import { useBrandKit } from "@/app/context/BrandKitContext";
import { LogoRenderer } from "@/app/components/logo-engine/LogoRenderer";
import { LogoConfig } from "../../(app)/logo-helper/engine/combinator";

// --- DADOS ESTRATÉGICOS ---
const NICHES = [
  "Marketing & Vendas", "Tecnologia & SaaS", "Saúde & Bem-estar", 
  "Finanças & Cripto", "Direito & Advocacia", "Design & Arquitetura", "Outro"
];

const LOGO_TYPES = [
  { id: "monograma", label: "Monograma", desc: "Iniciais", icon: Layers },
  { id: "geometrico", label: "Geométrico", desc: "Ícone + Nome", icon: Zap },
  { id: "tipografico", label: "Tipográfico", desc: "Foco na fonte", icon: Type },
];

const ADOBE_PALETTES = [
  { id: "p1", name: "Midnight Gold", colors: ["#020202", "#121212", "#d4af37", "#fef08a"] },
  { id: "p2", name: "Cyber Blue", colors: ["#020617", "#0f172a", "#3b82f6", "#93c5fd"] },
  { id: "p3", name: "Crimson Noir", colors: ["#1a0505", "#2e0909", "#ef4444", "#fca5a5"] },
  { id: "p4", name: "Deep Emerald", colors: ["#022c22", "#064e3b", "#10b981", "#6ee7b7"] },
  { id: "p5", name: "Pure Minimal", colors: ["#000000", "#171717", "#ffffff", "#a3a3a3"] },
];

const FONT_PAIRINGS = [
  { id: "modern", titleFont: "Inter", subFont: "Inter", label: "Moderno & Limpo" },
  { id: "impact", titleFont: "Bebas Neue", subFont: "Montserrat", label: "Impacto & Editorial" },
  { id: "luxury", titleFont: "Playfair Display", subFont: "Lora", label: "Luxo & Tradição" },
  { id: "tech", titleFont: "Space Grotesk", subFont: "Inter", label: "Tech & Futurista" },
];

const NICHE_ELEMENTS: Record<string, any[]> = {
  "Marketing & Vendas": [{ src: "/3d-lampada.png", top: "-15%", left: "-10%", delay: 0.1, size: "w-28", rotate: -15 }],
  "Tecnologia & SaaS": [{ src: "/3d-astronauta.png", top: "-10%", left: "-15%", delay: 0.2, size: "w-32", rotate: -5 }],
  "Saúde & Bem-estar": [{ src: "/3d-coracao.png", top: "-10%", left: "-10%", delay: 0.1, size: "w-24", rotate: -15 }],
  "Finanças & Cripto": [{ src: "/3d-grafico.png", top: "-15%", left: "-15%", delay: 0.1, size: "w-28", rotate: -10 }],
  "Outro": [{ src: "/3d-cafe.png", top: "-10%", left: "-10%", delay: 0.1, size: "w-24", rotate: -10 }],
};

export default function OnboardMaster() {
  const router = useRouter();
  const { brandKit, updateBrandKit } = useBrandKit();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [activePalette, setActivePalette] = useState(ADOBE_PALETTES[0]);
  const [activePairing, setActivePairing] = useState(FONT_PAIRINGS[0]);

  // Estado unificado
  const [draft, setDraft] = useState({
    brandName: brandKit?.brandName || "",
    niche: brandKit?.niche || "",
    logoStrategy: "ai", // "upload" | "ai"
    logoType: brandKit?.config?.category || "geometrico",
    brandColor: activePalette.colors[2], 
    titleFont: activePairing.titleFont,
    subtitleFont: activePairing.subFont,
    logoUrl: brandKit?.logoUrl || "",
    selectedAiConfig: null as LogoConfig | null,
  });

  const [aiGridConfigs, setAiGridConfigs] = useState<LogoConfig[]>([]);

  // 🧠 MOTOR PARAMÉTRICO POCKET (Roda em tempo real no Step 4)
  const generateAIBatch = () => {
    const shapesGeo = ["HexagonCore", "OrbitalRing", "TriangleMatrix", "DiamondFrame"];
    const shapesMono = ["ShieldBase", "CircleFrame", "HexFrame", "MinimalSquare"];
    const layouts = ["stacked", "inline"];
    
    const newBatch: LogoConfig[] = Array.from({ length: 4 }).map((_, i) => ({
      category: draft.logoType as any,
      shapeKey: draft.logoType === 'monograma' ? shapesMono[i % shapesMono.length] : shapesGeo[i % shapesGeo.length],
      layout: layouts[i % 2] as any,
      primaryColor: draft.brandColor,
      secondaryColor: activePalette.colors[3],
      fontName: draft.titleFont,
      fontUrl: "",
    }));

    if (draft.logoType === 'tipografico') {
       newBatch[0].layout = 'duotone'; newBatch[1].layout = 'spaced';
       newBatch[2].layout = 'focal';   newBatch[3].layout = 'duotone';
    }

    setAiGridConfigs(newBatch);
    
    // Auto-seleciona a primeira opção se não houver nenhuma
    if(!draft.selectedAiConfig) {
      handleUpdate("selectedAiConfig", newBatch[0] as any);
    }
  };

  // Atualiza o grid sempre que as escolhas mudam (se estiver na estratégia IA)
  useEffect(() => {
    if (step >= 2 && draft.logoStrategy === 'ai') {
      generateAIBatch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.brandColor, draft.titleFont, draft.logoType, step]);

  const handleUpdate = (field: string, value: any) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const selectPalette = (palette: typeof ADOBE_PALETTES[0]) => {
    setActivePalette(palette);
    handleUpdate("brandColor", palette.colors[2]);
  };

  // ✅ CORREÇÃO AQUI: Função que estava faltando
  const handleFontPairing = (pairing: typeof FONT_PAIRINGS[0]) => {
    setActivePairing(pairing);
    setDraft(prev => ({ 
      ...prev, 
      titleFont: pairing.titleFont, 
      subtitleFont: pairing.subFont 
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpdate('logoUrl', URL.createObjectURL(file));
      handleUpdate('logoStrategy', 'upload');
    }
  };

  const onComplete = async () => {
    setLoading(true);
    // Salva tudo no Contexto Global. Se usou IA, salva a config do logo escolhido!
    updateBrandKit({ 
      ...brandKit, 
      ...draft, 
      config: draft.logoStrategy === 'ai' ? draft.selectedAiConfig : null 
    });
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard"); // Agora todo mundo vai direto pro Hub!
  };

  return (
    <div className="h-screen w-full bg-[#020202] text-white flex overflow-hidden selection:bg-white/10 font-sans" style={{ backgroundColor: activePalette.colors[0] }}>
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <motion.div animate={{ backgroundColor: draft.brandColor }} transition={{ duration: 1.5, ease: "circOut" }} className="absolute -top-[10%] -left-[5%] w-[40vw] h-[40vw] rounded-full blur-[180px] opacity-[0.08] pointer-events-none" />

      <LayoutGroup>
        <main className="flex-1 flex flex-col lg:flex-row relative z-10 w-full h-full">
          
          {/* ==================== LADO ESQUERDO: CONTROLES ==================== */}
          <section className="w-full lg:w-[40%] xl:w-[35%] flex flex-col p-8 md:p-12 justify-between bg-black/60 backdrop-blur-3xl border-r border-white/5 overflow-y-auto no-scrollbar relative z-20 shadow-2xl">
            
            <header className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl border border-white/10" style={{ backgroundColor: `${draft.brandColor}20`, color: draft.brandColor }}>
                  <Rocket size={18} fill="currentColor" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 block">Setup da Marca</span>
                  <div className="flex gap-1 mt-1.5">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step >= i ? 'w-5' : 'w-1.5 bg-white/10'}`} style={{ backgroundColor: step >= i ? draft.brandColor : undefined }} />
                    ))}
                  </div>
                </div>
              </div>
            </header>

            <div className="w-full mx-auto py-10 flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* PASSO 1: A FUNDAÇÃO (NOME, NICHO E DECISÃO DE LOGO) */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                     <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] italic">
                      A <span style={{ color: draft.brandColor }} className="transition-colors duration-500">Fundação.</span>
                    </h1>
                    <div className="space-y-4">
                      <input type="text" placeholder="Nome da marca..." value={draft.brandName} onChange={(e) => handleUpdate("brandName", e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-5 text-lg font-bold outline-none focus:border-white/30 transition-all placeholder:text-zinc-700" />
                      <select value={draft.niche || ""} onChange={(e) => handleUpdate("niche", e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-sm font-bold text-zinc-300 outline-none appearance-none focus:border-white/30 transition-all cursor-pointer">
                        <option value="" disabled className="bg-zinc-900 text-zinc-500">Qual o seu mercado?</option>
                        {NICHES.map(niche => <option key={niche} value={niche} className="bg-zinc-900 text-white">{niche}</option>)}
                      </select>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Estratégia do Logotipo</label>
                      <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
                        <button onClick={() => handleUpdate("logoStrategy", "upload")} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${draft.logoStrategy === "upload" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"}`}>Já tenho Logo</button>
                        <button onClick={() => handleUpdate("logoStrategy", "ai")} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${draft.logoStrategy === "ai" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"}`}>Criar com IA</button>
                      </div>

                      {draft.logoStrategy === "upload" && (
                         <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                           <div onClick={() => logoInputRef.current?.click()} className={`w-full p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${draft.logoUrl ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                              <input type="file" accept="image/*" ref={logoInputRef} onChange={handleImage} className="hidden" />
                              {draft.logoUrl ? (
                                <><ImageIcon size={24} className="text-green-400" /><span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Logo Carregado</span></>
                              ) : (
                                <><Upload size={24} className="text-zinc-500" /><span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Upload (PNG/SVG)</span></>
                              )}
                           </div>
                         </motion.div>
                      )}

                      {draft.logoStrategy === "ai" && (
                         <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-3">Estilo Visual Desejado</span>
                           <div className="grid grid-cols-3 gap-2">
                             {LOGO_TYPES.map(type => (
                               <button key={type.id} onClick={() => handleUpdate("logoType", type.id)} className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${draft.logoType === type.id ? 'bg-white/10 border-white/30' : 'bg-transparent border-white/5 hover:bg-white/5'}`}>
                                 <type.icon size={20} style={{ color: draft.logoType === type.id ? draft.brandColor : '#71717a' }} />
                                 <span className="text-[9px] font-bold uppercase tracking-wider">{type.label}</span>
                               </button>
                             ))}
                           </div>
                         </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* PASSO 2: PALETA DE CORES */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                     <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] italic">
                       A <span style={{ color: draft.brandColor }} className="transition-colors duration-500">Identidade.</span>
                     </h1>
                     <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><PaletteIcon size={12}/> Paletas de Cor</label>
                       <div className="grid grid-cols-1 gap-3">
                          {ADOBE_PALETTES.map((palette) => (
                            <button key={palette.id} onClick={() => selectPalette(palette)} className={`p-4 rounded-2xl border transition-all flex items-center justify-between group ${activePalette.id === palette.id ? 'bg-white/10 border-white/30' : 'bg-transparent border-white/5 hover:bg-white/5'}`}>
                              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">{palette.name}</span>
                              <div className="flex -space-x-2">
                                {palette.colors.map((c, i) => <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 shadow-md" style={{ backgroundColor: c }} />)}
                              </div>
                            </button>
                          ))}
                       </div>
                     </div>
                  </motion.div>
                )}

                {/* PASSO 3: A VOZ (COMBINAÇÕES DE FONTES) */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                     <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] italic">
                       A <span style={{ color: draft.brandColor }} className="transition-colors duration-500">Voz.</span>
                     </h1>
                     <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Type size={12}/> Combinações Tipográficas</label>
                       <div className="grid grid-cols-1 gap-3">
                          {FONT_PAIRINGS.map(pairing => (
                            <button key={pairing.id} onClick={() => handleFontPairing(pairing)} className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-2 ${draft.titleFont === pairing.titleFont ? 'bg-white/10 border-white/30 shadow-lg' : 'bg-transparent border-white/5 hover:bg-white/[0.03]'}`}>
                              <div className="flex justify-between items-center mb-1">
                                 <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: draft.brandColor }}>{pairing.label}</span>
                              </div>
                              <span className="text-3xl font-black tracking-tight leading-none text-white block" style={{ fontFamily: pairing.titleFont }}>Título</span>
                              <span className="text-xs font-medium text-zinc-400 block" style={{ fontFamily: pairing.subFont }}>O subtítulo fica com este aspecto.</span>
                            </button>
                          ))}
                        </div>
                     </div>
                  </motion.div>
                )}

                {/* PASSO 4: DECISÃO (IA GRID vs UPLOAD MOCKUP) */}
                {step === 4 && draft.logoStrategy === 'ai' && (
                  <motion.div key="s4-ai" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] italic">
                      Explorando <span style={{ color: draft.brandColor }} className="transition-colors duration-500">Direções.</span>
                    </h1>
                    <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                      Nossa IA gerou estas opções baseadas na sua arquitetura geométrica, cor e tipografia. Escolha a sua favorita no painel ao lado.
                    </p>
                    <button onClick={generateAIBatch} className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all text-[#d4af37]" style={{ color: draft.brandColor }}>
                       <RefreshCw size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Gerar Novas Formas</span>
                    </button>
                  </motion.div>
                )}

                {step === 4 && draft.logoStrategy === 'upload' && (
                  <motion.div key="s4-upload" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 text-center py-10">
                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center border-2 border-dashed border-white/20" style={{ backgroundColor: `${draft.brandColor}20` }}>
                       <ShieldCheck size={32} style={{ color: draft.brandColor }} />
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] italic">Tudo <span style={{ color: draft.brandColor }}>Pronto.</span></h1>
                    <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-xs mx-auto">
                      Sua identidade visual e seu logotipo foram parametrizados no sistema corporativo.
                    </p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            <footer className="flex items-center justify-between pt-6 border-t border-white/5 shrink-0">
              <button onClick={() => setStep(s => Math.max(1, s - 1))} className={`text-zinc-600 uppercase text-[10px] font-black tracking-widest flex items-center gap-2 ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:text-white transition-colors'}`}>
                <ArrowLeft size={14} /> Voltar
              </button>
              
              <button 
                onClick={() => step < 4 ? setStep(s => s + 1) : onComplete()} 
                disabled={loading || (step === 1 && !draft.brandName.trim()) || (step === 1 && draft.logoStrategy === 'upload' && !draft.logoUrl)} 
                className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2 shadow-xl"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : step === 4 ? "Acessar Dashboard" : "Próximo Passo"}
                {!loading && <ArrowRight size={14} />}
              </button>
            </footer>
          </section>

          {/* ==================== LADO DIREITO: PREVIEW DINÂMICO ==================== */}
          <section className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden transition-colors duration-1000">
            
            {/* ELEMENTOS 3D ORBITANDO O CARD DE PREVIEW */}
            <AnimatePresence>
              {draft.niche && step < 4 && (NICHE_ELEMENTS[draft.niche] || NICHE_ELEMENTS["Outro"]).map((item, index) => (
                <motion.img
                  key={`${draft.niche}-${index}`}
                  src={item.src}
                  className={`absolute z-30 object-contain drop-shadow-2xl pointer-events-none ${item.size}`}
                  style={{ top: item.top, left: item.left }}
                  initial={{ opacity: 0, scale: 0, rotate: item.rotate - 20, y: 50 }}
                  animate={{ opacity: 1, scale: 1, rotate: item.rotate, y: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: item.delay }}
                  whileInView={{ y: [0, -10, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                />
              ))}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              
              {/* LAYOUT STEPS 1-3 (Preview Mestre) */}
              {step < 4 && (
                <motion.div key="single-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-[500px] h-[300px] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-visible flex flex-col justify-center p-12 border border-white/5 z-20" style={{ backgroundColor: activePalette.colors[1] }}>
                  <motion.div animate={{ backgroundColor: draft.brandColor }} className="absolute -top-32 -right-32 w-64 h-64 blur-[100px] opacity-20 pointer-events-none" />
                  
                  {/* Ponto focal: Logo Uploaded ou Preview Simples da IA */}
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

                  {/* 🚀 FLOATING TAG: Mostra a Vibe baseada na fonte */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="absolute bottom-16 -right-6 w-48 p-5 rounded-[2rem] bg-zinc-900/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: draft.brandColor }} />
                       <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/50">Vibe Insight</span>
                    </div>
                    <p className="text-[11px] font-bold text-zinc-200 leading-relaxed italic" style={{ fontFamily: draft.subtitleFont }}>
                      Aura {activePairing.label.toLowerCase()} detectada nas escolhas.
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* LAYOUT STEP 4 (IA) -> GRID DO MOTOR PARAMÉTRICO */}
              {step === 4 && draft.logoStrategy === 'ai' && (
                <motion.div key="grid-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-3xl grid grid-cols-2 gap-6 relative z-10">
                  {aiGridConfigs.map((config, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleUpdate("selectedAiConfig", config)}
                      className={`relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${draft.selectedAiConfig === config ? 'border-white scale-105 shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-20' : 'border-white/5 hover:border-white/20 hover:bg-white/5'}`}
                      style={{ backgroundColor: activePalette.colors[1] }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                         <div className="scale-75 w-full h-full flex items-center justify-center">
                           <LogoRenderer config={config} brandName={draft.brandName || "Marca"} className="w-full h-full" />
                         </div>
                      </div>
                      
                      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${draft.selectedAiConfig === config ? 'bg-white border-white text-black' : 'bg-black/50 border-white/20 text-transparent'}`}>
                         <ShieldCheck size={12} fill="currentColor" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* LAYOUT STEP 4 (UPLOAD) -> MOCKUP VITRINE */}
              {step === 4 && draft.logoStrategy === 'upload' && (
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

        </main>
      </LayoutGroup>
    </div>
  );
}