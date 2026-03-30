"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Rocket, ArrowRight, ArrowLeft, Loader2, RefreshCw, ShieldCheck } from "lucide-react";

// --- CONTEXTOS E TIPOS ---
import { useBrandKit } from "@/app/context/BrandKitContext";

// --- ARQUITETURA MODULAR (Seus Componentes) ---
import { BrandProcessing } from "./components/BrandProcessing";
import { FoundationSetup } from "./components/FoundationSetup"; // O pilar do Passo 1
import { ColorSystemSelector, COLOR_SYSTEMS } from "./components/ColorSystemSelector";
import { FontPairingSelector, FONT_PAIRINGS } from "./components/FontPairingSelector";
import { LivePreviewShowcase } from "./components/LivePreviewShowcase";
import { generateAILogoBatch } from "./utils/logoGenerator";
import { LogoConfig } from "@/app/components/logo-engine/LogoRenderer";

export default function OnboardMaster() {
  const router = useRouter();
  const { brandKit, updateBrandKit } = useBrandKit();
  
  // --- ESTADOS DE CONTROLE ---
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [activePalette, setActivePalette] = useState(COLOR_SYSTEMS[0]);
  const [activePairing, setActivePairing] = useState(FONT_PAIRINGS[0]);

  // --- ESTADO PRINCIPAL (DRAFT) ---
  const [draft, setDraft] = useState({
    brandName: brandKit?.brandName || "",
    niche: brandKit?.niche || "",
    logoStrategy: "ai", 
    logoType: brandKit?.config?.category || "geometrico",
    brandColor: activePalette.colors[2], 
    titleFont: activePairing.titleFont,
    subtitleFont: activePairing.subFont,
    logoUrl: brandKit?.logoUrl || "",
    selectedAiConfig: null as LogoConfig | null,
  });

  const [aiGridConfigs, setAiGridConfigs] = useState<LogoConfig[]>([]);

  // --- MOTOR DA IA ---
  const generateBatch = useCallback(async () => {
    setIsRefreshing(true);
    const newBatch = generateAILogoBatch({
      logoType: draft.logoType,
      brandColor: draft.brandColor,
      textColor: activePalette.colors[3],
      titleFont: draft.titleFont,
      niche: draft.niche,
      batchSize: 8
    });

    await new Promise(r => setTimeout(r, 600)); // Delay tátil
    setAiGridConfigs(newBatch);
    if (!draft.selectedAiConfig) handleUpdate("selectedAiConfig", newBatch[0]);
    setIsRefreshing(false);
  }, [draft.logoType, draft.brandColor, draft.titleFont, activePalette.colors, draft.selectedAiConfig, draft.niche]);

  useEffect(() => {
    if (step >= 2 && draft.logoStrategy === 'ai') generateBatch();
  }, [draft.brandColor, draft.titleFont, draft.logoType, step, generateBatch]);

  // --- HANDLERS ---
  const handleUpdate = (field: string, value: any) => setDraft((prev) => ({ ...prev, [field]: value }));

  const selectPalette = (palette: typeof COLOR_SYSTEMS[0]) => {
    setActivePalette(palette);
    handleUpdate("brandColor", palette.colors[2]);
  };

  const handleFontPairing = (pairing: typeof FONT_PAIRINGS[0]) => {
    setActivePairing(pairing);
    handleUpdate("titleFont", pairing.titleFont);
    handleUpdate("subtitleFont", pairing.subFont);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpdate('logoUrl', URL.createObjectURL(file));
      handleUpdate('logoStrategy', 'upload');
    }
  };

  const handleNextStep = async () => {
    if (step === 3 && draft.logoStrategy === 'ai') {
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 3800)); // Transição IA
      setIsProcessing(false);
      setStep(4);
    } else {
      setStep(s => s + 1);
    }
  };

  const onComplete = async () => {
    setLoading(true);
    updateBrandKit({ 
      ...brandKit, 
      ...draft, 
      config: draft.logoStrategy === 'ai' ? draft.selectedAiConfig : null 
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard"); 
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
                {isProcessing ? (
                  <BrandProcessing key="processing" brandName={draft.brandName} brandColor={draft.brandColor} />
                ) : (
                  <>
                    {/* PASSO 1: A FUNDAÇÃO (COMPONENTE MODULAR) */}
                    {step === 1 && (
                      <FoundationSetup 
                        draft={draft}
                        handleUpdate={handleUpdate}
                        logoInputRef={logoInputRef}
                        handleImage={handleImage}
                      />
                    )}

                    {/* PASSO 2: IDENTIDADE CROMÁTICA (COMPONENTE MODULAR) */}
                    {step === 2 && (
                      <motion.div key="s2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                        <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] italic">
                          A <span style={{ color: draft.brandColor }}>Identidade.</span>
                        </h1>
                        <ColorSystemSelector activePaletteId={activePalette.id} onSelect={selectPalette} />
                      </motion.div>
                    )}

                    {/* PASSO 3: VOZ TIPOGRÁFICA (COMPONENTE MODULAR) */}
                    {step === 3 && (
                      <motion.div key="s3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                        <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] italic">
                          A <span style={{ color: draft.brandColor }}>Voz.</span>
                        </h1>
                        <FontPairingSelector activePairingId={activePairing.id} onSelect={handleFontPairing} brandColor={draft.brandColor} />
                      </motion.div>
                    )}

                    {/* PASSO 4: EXPLORAÇÃO DE DIREÇÕES */}
                    {step === 4 && draft.logoStrategy === 'ai' && (
                      <motion.div key="s4-ai" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] italic">
                          Explorando <span style={{ color: draft.brandColor }}>Direções.</span>
                        </h1>
                        <p className="text-xs text-zinc-400 font-medium leading-relaxed italic">
                          8 variações arquitetônicas estruturadas para o mercado de {draft.niche}.
                        </p>
                        <button 
                          onClick={generateBatch} disabled={isRefreshing}
                          className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 active:scale-[0.98] transition-all disabled:opacity-50" 
                          style={{ color: draft.brandColor }}
                        >
                          <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} /> 
                          <span className="text-[10px] font-black uppercase tracking-widest">Recalibrar Modelos</span>
                        </button>
                      </motion.div>
                    )}

                    {step === 4 && draft.logoStrategy === 'upload' && (
                      <div className="space-y-6 text-center py-10">
                        <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] italic">
                          Tudo <span style={{ color: draft.brandColor }}>Pronto.</span>
                        </h1>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Configurações parametrizadas.</p>
                      </div>
                    )}
                  </>
                )}
              </AnimatePresence>
            </div>

            <footer className="flex items-center justify-between pt-6 border-t border-white/5 shrink-0">
              <button onClick={() => setStep(s => Math.max(1, s - 1))} className={`text-zinc-600 uppercase text-[10px] font-black tracking-widest flex items-center gap-2 ${step === 1 || isProcessing ? 'opacity-0 pointer-events-none' : 'hover:text-white transition-colors'}`}>
                <ArrowLeft size={14} /> Voltar
              </button>
              
              <button 
                onClick={() => step < 4 ? handleNextStep() : onComplete()} 
                disabled={loading || isProcessing || (step === 1 && !draft.brandName.trim())} 
                className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2 shadow-xl shadow-white/5"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : step === 4 ? "Acessar Dashboard" : "Próximo Passo"}
                {!loading && <ArrowRight size={14} />}
              </button>
            </footer>
          </section>

          {/* ==================== LADO DIREITO: PREVIEW (COMPONENTE MODULAR) ==================== */}
          <LivePreviewShowcase 
            step={step}
            draft={draft}
            isProcessing={isProcessing}
            activePalette={activePalette}
            aiGridConfigs={aiGridConfigs}
            handleUpdate={handleUpdate}
          />

        </main>
      </LayoutGroup>
    </div>
  );
}