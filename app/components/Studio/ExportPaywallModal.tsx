"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Crown, Zap, CheckCircle2, Image as ImageIcon, Lock } from "lucide-react";

interface ExportPaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeClick: () => void;
}

export const ExportPaywallModal = ({ isOpen, onClose, onUpgradeClick }: ExportPaywallProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Overlay Escuro com Blur */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden"
          >
            {/* Efeito Glow Dourado no fundo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="bg-zinc-950 rounded-[2.4rem] p-8 md:p-10 flex flex-col md:flex-row gap-10">
              
              {/* LADO ESQUERDO: O Plano Grátis (Desconfortável) */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <Zap className="text-zinc-500 w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Exportação Grátis</h3>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex items-start gap-3 opacity-70">
                    <ImageIcon className="text-zinc-500 w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white mb-1">Baixa Resolução (720p)</p>
                      <p className="text-xs text-zinc-500">Qualidade básica para visualização.</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 flex items-start gap-3 opacity-70">
                    <Lock className="text-red-400 w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white mb-1">Marca D'água Inclusa</p>
                      <p className="text-xs text-zinc-500">Logo do DesignGen em todos os slides.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full py-4 rounded-xl border border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-900 hover:text-white transition-all"
                >
                  Continuar com Marca D'água
                </button>
              </div>

              {/* DIVISOR (Mobile vira linha horizontal, Desktop vira vertical) */}
              <div className="w-full h-px md:w-px md:h-auto bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />

              {/* LADO DIREITO: O Plano Pro (O Desejo) */}
              <div className="flex-1 flex flex-col relative">
                {/* Badge Flutuante */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 md:-top-14 md:left-auto md:right-0 md:translate-x-0 bg-gradient-to-r from-[#d4af37] to-[#b5952f] text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[#d4af37]/20">
                  Recomendado para Autoridade
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                    <Crown className="text-[#d4af37] w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Exportação Pro</h3>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-[#d4af37]/30 flex items-start gap-3">
                    <CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-[#d4af37] mb-1">Alta Resolução (4K Ultra)</p>
                      <p className="text-xs text-zinc-400">Nitidez máxima para o algoritmo do Instagram.</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-[#d4af37]/30 flex items-start gap-3">
                    <CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-[#d4af37] mb-1">Sem Marca D'água</p>
                      <p className="text-xs text-zinc-400">100% focado na sua marca pessoal.</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-[#d4af37]/30 flex items-start gap-3">
                    <CheckCircle2 className="text-[#d4af37] w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-[#d4af37] mb-1">Z-Axis Motion Nativo</p>
                      <p className="text-xs text-zinc-400">Gera o ZIP pronto para postar com transições perfeitas.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={onUpgradeClick}
                  className="w-full py-4 rounded-xl bg-[#d4af37] text-black font-black uppercase tracking-widest text-[11px] hover:brightness-110 transition-all shadow-[0_15px_30px_rgba(212,175,55,0.2)] active:scale-95 flex items-center justify-center gap-2"
                >
                  <Crown size={14} /> Fazer Upgrade Agora
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};