"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus, Layers, Palette, Sparkles, Grid3X3, Instagram, 
  Magnet, Blocks // <- Ícone de Widgets importado
} from "lucide-react";

// Tipagem atualizada para aceitar o novo painel de "widgets"
interface StudioDockProps {
  onAddSlide: () => void;
  activePanel: "brandkit" | "layers" | "hook" | "widgets" | "zaxis" | null;
  onTogglePanel: (panel: "brandkit" | "layers" | "hook" | "widgets" | "zaxis") => void;
  onPreview?: () => void;
  onToggleGrid?: () => void;
}

export const StudioDock = ({ 
  onAddSlide, 
  activePanel, 
  onTogglePanel,
  onPreview,
  onToggleGrid
}: StudioDockProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2000] pointer-events-none">
      <div className="flex items-end gap-2 px-4 py-3 rounded-2xl bg-zinc-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] pointer-events-auto">
        
        {/* Adicionar Slide */}
        <DockItem 
          icon={<Plus strokeWidth={3} />} 
          label="Adicionar Slide" 
          color="text-emerald-400"
          onClick={onAddSlide} 
        />
        
        <div className="w-px h-8 bg-zinc-800 mx-1 self-center rounded-full" />
        
        {/* Painéis Laterais (Ferramentas de Design) */}
        <DockItem 
          icon={<Layers />} 
          label="Camadas" 
          active={activePanel === "layers"}
          onClick={() => onTogglePanel("layers")} 
        />
        <DockItem 
          icon={<Palette />} 
          label="BrandKit" 
          active={activePanel === "brandkit"}
          onClick={() => onTogglePanel("brandkit")} 
        />
        
        {/* --- NOVO: WIDGETS --- */}
        <DockItem 
          icon={<Blocks />} 
          label="Widgets do Post" 
          active={activePanel === "widgets"}
          color="text-purple-400"
          onClick={() => onTogglePanel("widgets")} 
        />

        <DockItem 
            icon={<Magnet className="rotate-180" />}
            label="Configurar CTA (Hook)" 
            active={activePanel === "hook"}
            color="text-blue-400"
            onClick={() => onTogglePanel("hook")} 
        />
        <DockItem 
          icon={<Sparkles />} 
          label="Efeitos Z-Axis" 
          color="text-[#d4af37]"
          onClick={() => alert("Selecione uma transição na Timeline!")} 
        />
        
        <div className="w-px h-8 bg-zinc-800 mx-1 self-center rounded-full" />
        
        {/* Visualização e Simulação Real */}
        <DockItem 
          icon={<Grid3X3 />} 
          label="Visão em Grade" 
          onClick={onToggleGrid}
        />
        <DockItem 
          icon={<Instagram size={20} />} 
          label="Simular Post (IG)" 
          color="text-[#d4af37]"
          onClick={onPreview}
        />
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTE --- */
function DockItem({ icon, label, active, color = "text-zinc-400", onClick }: any) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.3, y: -10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative flex flex-col items-center justify-end w-12 h-12 rounded-xl focus:outline-none"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-800/80 border border-white/5 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-zinc-700 ${color} ${
        active ? 'bg-zinc-700 ring-2 ring-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : ''
      }`}>
        {React.cloneElement(icon, { size: 18 })}
      </div>

      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none flex flex-col items-center z-50 transform group-hover:-translate-y-1">
        <span className="bg-zinc-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap border border-zinc-700 shadow-2xl tracking-wide">
          {label}
        </span>
        <div className="w-2 h-2 bg-zinc-800 border-r border-b border-zinc-700 rotate-45 -mt-1.5" />
      </div>

      {active && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute -bottom-2 w-1 h-1 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" 
        />
      )}
    </motion.button>
  );
}