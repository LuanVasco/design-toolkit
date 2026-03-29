"use client";

import React, { useState } from "react";
import { Undo2, Redo2, Download, Trash2, LayoutTemplate, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

// Importações do Motor e Contexto
import { generateCarouselZip } from "../utils/exportEngine";
import { useBrandKit } from "@/app/context/BrandKitContext";

interface StudioHeaderProps {
  count: number;
  onUpdateCount: (change: number) => void;
  slides: any[]; // <-- Adicionado: Necessário para o motor saber o que exportar
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onReset: () => void;
  onOpenTemplates: () => void;
}

export const StudioHeader = ({ 
  count, 
  slides,
  undo,
  redo,
  canUndo,
  canRedo,
  onReset,
  onOpenTemplates 
}: StudioHeaderProps) => {

  // Hook do BrandKit para saber se há CTA ativo
  const { brandKit } = useBrandKit();
  
  // Estado local para gerenciar o botão e o feedback de carregamento
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState("Renderizando...");

  // Função que engatilha o motor de extração
  const handleExport = async () => {
    try {
      setIsExporting(true);
      await generateCarouselZip(slides, brandKit, (progress, status) => {
        setExportStatus(status); // Atualiza o texto do botão em tempo real
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao exportar a arte. Verifique o console.");
    } finally {
      setIsExporting(false);
      setExportStatus("Renderizando...");
    }
  };

  return (
    <header className="h-14 w-full bg-zinc-950/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 z-40 shrink-0">
      
      {/* --- LADO ESQUERDO: Branding e Informações do Arquivo --- */}
      <div className="flex items-center gap-4">
        {/* Logo Mínima */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#997a15] flex items-center justify-center text-black font-black text-[10px] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          DG
        </div>
        
        <div className="w-px h-5 bg-zinc-800" />
        
        {/* Nome do Projeto Editável (Mock visual) */}
        <div className="flex flex-col cursor-text group">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white tracking-wide group-hover:text-zinc-300 transition-colors">Campanha_Mentoria_BlackFriday</span>
            <span className="text-[8px] font-black uppercase bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded tracking-widest">
              {count} Slides
            </span>
          </div>
          <span className="text-[9px] text-zinc-500 font-medium uppercase tracking-widest mt-0.5 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Salvo há 1 min
          </span>
        </div>
      </div>

      {/* --- CENTRO: Histórico e Ações Globais do Documento --- */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-zinc-900/50 rounded-xl border border-white/5 p-1 shadow-inner">
        
        <HeaderIconButton 
          icon={<LayoutTemplate size={14} />} 
          label="Templates" 
          onClick={onOpenTemplates} 
        />
        
        <div className="w-px h-4 bg-zinc-800 mx-1" />
        
        <HeaderIconButton 
          icon={<Undo2 size={14} />} 
          label="Desfazer" 
          onClick={undo} 
          disabled={!canUndo} 
        />
        <HeaderIconButton 
          icon={<Redo2 size={14} />} 
          label="Refazer" 
          onClick={redo} 
          disabled={!canRedo} 
        />
        
        <div className="w-px h-4 bg-zinc-800 mx-1" />
        
        <HeaderIconButton 
          icon={<Trash2 size={14} className="group-hover:text-red-400" />} 
          label="Resetar" 
          onClick={onReset} 
        />
      </div>

      {/* --- LADO DIREITO: Configurações e Call to Action (Exportar) --- */}
      <div className="flex items-center gap-3">
        
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
          <Settings2 size={16} />
        </button>

        <button 
          onClick={handleExport} 
          disabled={isExporting}
          className={`group relative inline-flex items-center justify-center bg-[#d4af37] text-black h-8 px-5 rounded-lg font-black uppercase tracking-widest text-[10px] transition-all hover:brightness-110 active:scale-95 disabled:opacity-80 disabled:cursor-wait overflow-hidden ${
            isExporting ? 'w-auto px-4' : ''
          }`}
        >
          {/* Shimmer Effect (Desativado durante a exportação) */}
          {!isExporting && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
          )}
          
          {isExporting ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin shrink-0" />
              {/* Mostra o progresso do ZIP em tempo real */}
              <span className="whitespace-nowrap">{exportStatus}</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Download size={12} strokeWidth={3} />
              Exportar
            </span>
          )}
        </button>
        
      </div>
    </header>
  );
};

/* --- SUB-COMPONENTE: Botão Limpo para o Topo --- */
function HeaderIconButton({ icon, label, onClick, disabled = false }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={`relative group w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
        disabled 
          ? "text-zinc-700 cursor-not-allowed" 
          : "text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95"
      }`}
    >
      {icon}
      {/* Tooltip super sutil estilo macOS */}
      <span className="absolute top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap pointer-events-none z-50 shadow-xl border border-zinc-700">
        {label}
      </span>
    </button>
  );
}