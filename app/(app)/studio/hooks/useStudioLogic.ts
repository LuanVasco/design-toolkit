"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useHistory } from "./useHistory";
import { useExport } from "./useExport";
import { PRESET_TEMPLATES } from "../utils/presetTemplates";

export function useStudioLogic(brandKit: any, updateBrandKit: (val: any) => void) {
  // 1. ESPECIALISTAS (Saída)
  const { isExporting, exportToZip } = useExport();
  
  // 2. ESTADOS DE DADOS PRINCIPAIS
  const [slides, setSlides] = useState<any[]>([]);
  const [transitions, setTransitions] = useState<any[]>([]);

  // 3. MOTOR DE HISTÓRICO EXPANDIDO
  const { commit, undo, redo, canUndo, canRedo } = useHistory({ 
    slides, 
    transitions, 
    brandKit 
  });

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 4. ESTADO DO MODAL Z-AXIS
  const [modal, setModal] = useState({
    isOpen: false,
    targetIndex: 0,
    data: { 
      topPos: 50, 
      shape: "circle" as any, 
      shapeColor: brandKit.brandColor || "#d4af37", 
      shapeSize: 180, 
      url: "", 
      imgSize: 140 
    }
  });

  // --- 5. CARREGAMENTO INICIAL (HYDRATION) ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSlides = localStorage.getItem("dg-studio-slides");
      const savedTrans = localStorage.getItem("dg-studio-transitions");
      const savedBrand = localStorage.getItem("dg-studio-brandkit");

      const initialSlides = savedSlides ? JSON.parse(savedSlides) : [
        { id: 'initial-1', layout: "CLASSIC", title: "O PODER DO\nDESIGN", desc: "A estética gera autoridade.", bgImage: "", useCustomBg: false, customBgColor: "#000000" },
        { id: 'initial-2', layout: "CENTER", title: "QUEBRA DE PADRÃO", desc: "", bgImage: "", useCustomBg: true, customBgColor: "#18181b" },
        { id: 'initial-3', layout: "IMAGE", title: "PROFUNDIDADE", desc: "Elementos 3D enriquecem a experiência.", bgImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400", useCustomBg: false, customBgColor: "#000000" }
      ];
      const initialTrans = savedTrans ? JSON.parse(savedTrans) : [];
      
      if (savedBrand) {
        updateBrandKit(JSON.parse(savedBrand));
      }

      setSlides(initialSlides);
      setTransitions(initialTrans);
      
      commit({ slides: initialSlides, transitions: initialTrans, brandKit: savedBrand ? JSON.parse(savedBrand) : brandKit });
    }
  }, []); 

  // --- 6. FUNÇÕES DE PERSISTÊNCIA ---
  const applyChangeImmediately = useCallback((newSlides: any[], newTrans: any[], newBrand?: any) => {
    setSlides(newSlides);
    setTransitions(newTrans);
    
    if (typeof window !== "undefined") {
      localStorage.setItem("dg-studio-slides", JSON.stringify(newSlides));
      localStorage.setItem("dg-studio-transitions", JSON.stringify(newTrans));
      if (newBrand) localStorage.setItem("dg-studio-brandkit", JSON.stringify(newBrand));
    }
    
    commit({ slides: newSlides, transitions: newTrans, brandKit: newBrand || brandKit });
  }, [commit, brandKit]);

  // --- 7. AÇÕES DE HISTÓRICO (UNDO/REDO) ---
  const handleUndo = useCallback(() => {
    const prevState = undo();
    if (prevState) {
      setSlides(prevState.slides);
      setTransitions(prevState.transitions);
      
      if (typeof updateBrandKit === "function") {
        updateBrandKit(prevState.brandKit);
      }
      
      localStorage.setItem("dg-studio-slides", JSON.stringify(prevState.slides));
      localStorage.setItem("dg-studio-transitions", JSON.stringify(prevState.transitions));
      localStorage.setItem("dg-studio-brandkit", JSON.stringify(prevState.brandKit));
    }
  }, [undo, updateBrandKit]);

  const handleRedo = useCallback(() => {
    const nextState = redo();
    if (nextState) {
      setSlides(nextState.slides);
      setTransitions(nextState.transitions);
      updateBrandKit(nextState.brandKit);
      
      localStorage.setItem("dg-studio-slides", JSON.stringify(nextState.slides));
      localStorage.setItem("dg-studio-transitions", JSON.stringify(nextState.transitions));
      localStorage.setItem("dg-studio-brandkit", JSON.stringify(nextState.brandKit));
    }
  }, [redo, updateBrandKit]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.shiftKey && e.key === "Z"))) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  // --- 8. LÓGICA DE ORDENAÇÃO (Injeção de Hook CTA) ---
  const getOrderedSlides = useCallback(() => {
    const list = slides.map((s, i) => ({ ...s, isHook: false, originalIndex: i }));
    if (brandKit.hookEnabled) {
      const hookItem = {
        id: 'hook-slide-constant',
        isHook: true,
        // ADICIONADO: Agora respeita o layout dinâmico do template (Perfil, Mockup, etc)
        layout: brandKit.hookLayout || "CENTER", 
        title: brandKit.hookTitle,
        desc: brandKit.hookSubtitle,
        // ADICIONADO: Propriedades de mídia para layouts complexos
        bgImage: brandKit.bgImage || "",
        authorAvatar: brandKit.authorAvatar || "",
        authorName: brandKit.authorName || "",
        handle: brandKit.handle || "",
        useCustomBg: true,
        customBgColor: brandKit.hookBgColor
      };
      const targetPos = Math.min(brandKit.hookPosition ?? 99, list.length);
      list.splice(targetPos, 0, hookItem as any);
    }
    return list;
  }, [slides, brandKit]); // Simplificado dependências para brandKit completo

  const orderedSlides = useMemo(() => getOrderedSlides(), [getOrderedSlides]);

  // --- 9. FUNÇÕES DE MANIPULAÇÃO ---
  const updateSlide = (index: number, field: string, value: any) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    applyChangeImmediately(newSlides, transitions);
  };

  const updateSlideCount = (change: number) => {
    let newSlides = [...slides];
    let newTrans = [...transitions];

    if (change > 0 && slides.length < 10) {
      newSlides.push({ 
        id: `slide-${Math.random().toString(36).substr(2, 9)}`, 
        layout: "CLASSIC", title: "NOVO SLIDE", desc: "", bgImage: "", useCustomBg: false, customBgColor: "#000000" 
      });
    } else if (change < 0 && slides.length > 1) {
      newSlides.pop();
      newTrans = transitions.filter(t => t.slideIndex < newSlides.length - 1);
    }
    applyChangeImmediately(newSlides, newTrans);
  };

  const saveTransition = useCallback(() => {
    const newTransitions = transitions.filter(t => t.slideIndex !== modal.targetIndex);
    const updated = [...newTransitions, { ...modal.data, slideIndex: modal.targetIndex }];
    setTransitions(updated);
    applyChangeImmediately(slides, updated);
  }, [transitions, modal, slides, applyChangeImmediately]);

  // ADICIONADO: Refatoração para injetar o tema do BrandKit ao carregar template
  const loadTemplate = useCallback((templateId: string) => {
    const template = PRESET_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    
    if (confirm(`Deseja carregar o template "${template.name}"? Isso substituirá seu carrossel e estilo visual atual.`)) {
      // Cria o novo BrandKit mesclando o atual com o tema do template
      const newBrandKit = {
        ...brandKit,
        ...template.theme
      };

      // Atualiza o estado global e persiste tudo de uma vez
      updateBrandKit(newBrandKit);
      applyChangeImmediately(template.slides, template.transitions, newBrandKit);
      return true; // 👈 Retorna sucesso
    }
    return false; // 👈 Retorna falha se cancelar
  }, [applyChangeImmediately, brandKit, updateBrandKit]);

  const reorderSlides = useCallback((newOrder: any[]) => {
    const onlyRegularSlides = newOrder.filter(s => !s.isDynamicHook && !s.isHook);
    setSlides(onlyRegularSlides);
    if (typeof window !== "undefined") {
      localStorage.setItem("dg-studio-slides", JSON.stringify(onlyRegularSlides));
    }
    commit({ slides: onlyRegularSlides, transitions, brandKit });
  }, [transitions, brandKit, commit]);


  return {
    slides,
    transitions,
    totalSlides: orderedSlides.length,
    getOrderedSlides,
    modal,
    setModal,
    isExporting,
    undo: handleUndo,
    redo: handleRedo,
    canUndo,
    canRedo,
    updateSlide,
    updateSlideCount,
    saveTransition,
    loadTemplate,
    exportToZip: () => exportToZip(orderedSlides.length),
    resetProject: () => {
      if(confirm("Deseja resetar o carrossel? Isso limpará todas as cores e slides.")) {
        localStorage.clear();
        window.location.reload();
      }
    },
    reorderSlides
  };
}