"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";

export const IntersectionScanner = ({ targetIndex, activePanel }: { targetIndex: number, activePanel: string | null }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (activePanel === "zaxis") {
      setIsExpanded(true);
      const timer = setTimeout(() => setIsExpanded(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [targetIndex, activePanel]);

  if (activePanel !== "zaxis") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-y-0 z-[100] pointer-events-none flex items-center justify-center"
      style={{
        left: `${(targetIndex + 1) * 320}px`,
        transform: "translateX(-50%)",
      }}
    >
      {/* CAMADA DE ANIMAÇÃO DO SCANNER (Imediata) */}
      <motion.div
        animate={{ 
          width: isExpanded ? "640px" : "2px",
          backgroundColor: isExpanded ? "rgba(212, 175, 55, 0.12)" : "rgba(212, 175, 55, 0)",
          borderColor: isExpanded ? "rgba(212, 175, 55, 0.4)" : "rgba(212, 175, 55, 1)"
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="h-full border-x border-dashed relative flex items-center justify-center"
      >
        {/* LINHA GUIA CENTRAL */}
        <div className="h-full w-px bg-[#d4af37] shadow-[0_0_15px_#d4af37] relative">
          
          {/* ETIQUETA "EIXO Z" - Aparece após 800ms (Fim da expansão) */}
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }} // Delay sincronizado com o fim do spring
            className="absolute -top-7 left-1/2 -translate-x-1/2 w-max"
          >
             <div className="bg-[#d4af37] text-black text-[7px] font-black px-2.5 py-1 rounded-t-sm uppercase tracking-[0.2em] whitespace-nowrap shadow-2xl">
               Eixo Z
             </div>
          </motion.div>
          
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              // Badge de tutor também aguarda o fim da expansão
              transition={{ delay: 0.8, duration: 0.3 }} 
              className="absolute bg-[#d4af37] text-black text-[10px] font-bold px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 whitespace-nowrap w-max z-[110]"
            >
              <MousePointer2 size={12} fill="currentColor" />
              CONECTANDO SLIDES {targetIndex + 1} & {targetIndex + 2}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};