"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

// Contexto
import { useBrandKit } from "@/app/context/BrandKitContext";

// Cérebro: Mudámos para a função que gera combinações exatas sem Math.random() no layout base
import { MacroCategory, LogoConfig, generateDeterministicBatch } from "./engine/combinator";

// Componentes da UI Global
import { LogoRenderer } from "@/app/components/logo-engine/LogoRenderer";
import { Step1_MacroSelector } from "@/app/components/logo-engine/Step1_MacroSelector";
import { Step2_InfiniteGrid } from "@/app/components/logo-engine/Step2_InfiniteGrid";
import { Step3_VitrineMockup } from "@/app/components/logo-engine/Step3_VitrineMockup";

export default function LogoStudioMaster() {
  const router = useRouter();
  const { brandKit, updateBrandKit } = useBrandKit();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [macroCategory, setMacroCategory] = useState<MacroCategory | null>(null);
  
  // Controle da Fonte Mestre
  const [currentFont, setCurrentFont] = useState(brandKit?.titleFont || "Inter");

  const [generatedOptions, setGeneratedOptions] = useState<LogoConfig[]>([]);
  const [finalDataUrl, setFinalDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // O container invisível para extrair o SVG em 4K
  const hiddenSvgContainerRef = useRef<HTMLDivElement>(null);
  const [configToRender, setConfigToRender] = useState<LogoConfig | null>(null);

  // Variáveis vitais do BrandKit
  const brandName = brandKit?.brandName || "GenStudio";
  const brandColor = brandKit?.brandColor || "#d4af37";
  const brandNiche = brandKit?.niche || "Outro"; 

  // =====================================
  // CONTROLES DE FLUXO (Agora Determinísticos)
  // =====================================
  const handleSelectMacro = (category: MacroCategory) => {
    setMacroCategory(category);
    setGeneratedOptions([]);
    setIsProcessing(true);
    
    setTimeout(() => {
      // 🚀 Gera TODAS as opções possíveis para a categoria de uma vez, sem repetições
      const fullBatch = generateDeterministicBatch(category, brandColor, currentFont);
      setGeneratedOptions(fullBatch);
      setIsProcessing(false);
      setStep(2);
    }, 400);
  };

  // Como já gerámos todas as opções exatas no passo 1, o "Gerar Mais" 
  // agora simplesmente embaralha a lista para dar uma perspetiva nova 
  // (ou você pode expandir a biblioteca de Shapes no futuro)
  const handleGenerateMore = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setGeneratedOptions(prev => [...prev].sort(() => Math.random() - 0.5));
      setIsProcessing(false);
    }, 400);
  };

  const handleChangeFont = (newFont: string) => {
    setCurrentFont(newFont);
    setGeneratedOptions(prev => prev.map(opt => ({ ...opt, fontName: newFont })));
  };

  const handleSelectDesign = (config: LogoConfig) => {
    setIsProcessing(true);
    setConfigToRender(config);
    
    // Extração do DOM Real para SVG Base64 (Super Rápido)
    setTimeout(() => {
      if (hiddenSvgContainerRef.current) {
        const svgElement = hiddenSvgContainerRef.current.querySelector('svg');
        if (svgElement) {
          const serializer = new XMLSerializer();
          const svgString = serializer.serializeToString(svgElement);
          const base64 = btoa(unescape(encodeURIComponent(svgString)));
          setFinalDataUrl(`data:image/svg+xml;base64,${base64}`);
          setIsProcessing(false);
          setStep(3);
        }
      }
    }, 600);
  };

  const handleApprove = () => {
    if (finalDataUrl) {
      updateBrandKit({ ...brandKit, logoUrl: finalDataUrl });
      router.push("/onboard");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020202] text-white flex flex-col selection:bg-[#d4af37]/30 font-sans overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* 🚀 Renderizador Invisível Seguro (Off-Screen) */}
      <div className="absolute overflow-hidden w-0 h-0 pointer-events-none">
        <div ref={hiddenSvgContainerRef} className="fixed top-[-9999px] left-[-9999px] w-[800px] h-[800px] flex items-center justify-center bg-transparent">
          {configToRender && <LogoRenderer config={configToRender} brandName={brandName} niche={brandNiche} />}
        </div>
      </div>

      <header className="w-full max-w-7xl mx-auto p-8 flex items-center justify-between relative z-10 shrink-0">
        <button onClick={() => step > 1 ? setStep(s => s - 1 as any) : router.push("/onboard")} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Voltar
        </button>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/20">
          <Sparkles size={14} /> AI Parametric Engine
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pb-20 flex flex-col items-center relative z-10">
        <LayoutGroup>
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <Step1_MacroSelector key="s1" brandColor={brandColor} onSelect={handleSelectMacro} />
            )}
            
            {step === 2 && macroCategory && (
              <Step2_InfiniteGrid 
                key="s2" 
                brandName={brandName} 
                brandColor={brandColor} 
                niche={brandNiche} 
                currentFont={currentFont}
                options={generatedOptions} 
                isProcessing={isProcessing} 
                onSelectDesign={handleSelectDesign} 
                onGenerateMore={handleGenerateMore} 
                onChangeFont={handleChangeFont}
              />
            )}

            {step === 3 && finalDataUrl && (
              <Step3_VitrineMockup 
                key="s3" 
                logoUrl={finalDataUrl} 
                brandColor={brandColor} 
                brandName={brandName} 
                onApprove={handleApprove} 
                onBack={() => setStep(2)} 
              />
            )}

          </AnimatePresence>
        </LayoutGroup>
      </main>
    </div>
  );
}