"use client";

import React from "react";
import { PRESET_TEMPLATES } from "../../utils/presetTemplates";

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

export const TemplateModal = ({ isOpen, onClose, onSelect }: TemplateModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/90 z-[100] flex items-center justify-center backdrop-blur-xl p-4 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] w-full max-w-4xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* HEADER DO MODAL */}
        <div className="p-8 pb-6 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/50">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <span>✨</span> Biblioteca de Templates
            </h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] mt-2">
              Comece com uma estrutura de alta conversão
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full hover:bg-zinc-800 flex items-center justify-center text-zinc-500 transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        {/* GRID DE TEMPLATES */}
        <div className="p-8 overflow-y-auto no-scrollbar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRESET_TEMPLATES.map((template) => (
            <div 
              key={template.id}
              className="group bg-zinc-950 border border-zinc-800/80 rounded-[2rem] p-6 hover:border-[#d4af37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all cursor-pointer flex flex-col h-full relative overflow-hidden"
              onClick={() => {
                onSelect(template.id);
                onClose();
              }}
            >
              {/* Efeito de brilho sutil no hover */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: template.theme.brandColor }}
              ></div>

              <div className="flex justify-between items-start mb-6 z-10">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${template.theme.brandColor}20`, border: `1px solid ${template.theme.brandColor}50` }}
                >
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.theme.brandColor }}></div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                  {template.slides.length} Slides
                </span>
              </div>
              
              <h3 className="text-lg font-black text-white mb-2 z-10 group-hover:text-[#d4af37] transition-colors">
                {template.name}
              </h3>
              <p className="text-xs text-zinc-400 font-medium leading-relaxed flex-grow z-10">
                {template.description}
              </p>

              <div className="mt-6 pt-6 border-t border-zinc-800/50 flex items-center justify-between z-10">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Usar Modelo</span>
                <span className="text-[#d4af37] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};