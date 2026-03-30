"use client";

import React from "react";
import { Download, FileType, CheckCircle } from "lucide-react";
import { LogoConfig, LogoRenderer } from "@/app/components/logo-engine/LogoRenderer";

interface AssetsGalleryProps {
  brandName: string;
  config: LogoConfig;
  niche: string;
}

export const AssetsGallery = ({ brandName, config, niche }: AssetsGalleryProps) => {
  
  // Definição das 3 variações industriais padrão
  const variations = [
    { 
      id: "primary", 
      label: "Versão Principal", 
      desc: "Uso em fundos claros/escuros", 
      bg: "bg-zinc-900/40",
      override: { ...config } 
    },
    { 
      id: "white", 
      label: "Versão Negativa", 
      desc: "Para fundos escuros ou fotos", 
      bg: "bg-black",
      override: { ...config, primaryColor: "#FFFFFF", secondaryColor: "#FFFFFF" } 
    },
    { 
      id: "black", 
      label: "Versão Monocromática", 
      desc: "Para documentos e impressões", 
      bg: "bg-white",
      override: { ...config, primaryColor: "#000000", secondaryColor: "#000000" } 
    }
  ];

  const handleDownload = (id: string) => {
    // Aqui triggeramos a lógica de captura do SVG específico
    console.log(`Iniciando download da versão: ${id}`);
    // No futuro, acoplamos o html-to-image aqui
  };

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-2xl font-black uppercase tracking-tighter italic">Export Center</h2>
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mt-1">Variações prontas para produção</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {variations.map((v) => (
          <div key={v.id} className="group relative bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-4 flex flex-col hover:border-white/10 transition-all">
            
            {/* PREVIEW BOX */}
            <div className={`aspect-square ${v.bg} rounded-[2rem] flex items-center justify-center p-8 mb-6 overflow-hidden relative`}>
               <div className="w-full h-full scale-125">
                 <LogoRenderer config={v.override} brandName={brandName} />
               </div>
            </div>

            {/* INFO & ACTIONS */}
            <div className="px-4 pb-4">
              <h3 className="text-sm font-black uppercase tracking-tight text-white mb-1">{v.label}</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase mb-6">{v.desc}</p>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleDownload(v.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white text-white hover:text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <Download size={12} /> SVG
                </button>
                <button 
                  onClick={() => handleDownload(v.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white text-white hover:text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <FileType size={12} /> PNG
                </button>
              </div>
            </div>

            {/* BADGE DE QUALIDADE */}
            <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                 <CheckCircle size={10} className="text-[#d4af37]" />
                 <span className="text-[8px] font-black text-white uppercase tracking-widest">Vetorizado</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};