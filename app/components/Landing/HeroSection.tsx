"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MousePointer2, Play, Layers, Move3d } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-zinc-950">
      {/* Background Gradients */}
      <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] bg-[#d4af37]/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* ESQUERDA: COPY E CURSOR */}
        <div className="lg:col-span-5 flex flex-col items-start text-left pt-10 lg:pt-0 z-20 relative">
          
          {/* CURSOR MOVIDO PARA A ESQUERDA (Próximo ao CTA) */}
          <motion.div 
            animate={{ x: [0, 15, 0], y: [0, -10, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-10 hidden xl:block pointer-events-none opacity-50"
          >
            <div className="relative">
              <MousePointer2 className="w-8 h-8 text-white fill-white shadow-2xl" />
              <div className="absolute top-8 left-5 px-3 py-1 bg-[#d4af37] text-black text-[8px] font-black uppercase rounded-full whitespace-nowrap">
                Editor Ativo
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            Engine v2.0 • Z-Axis Ativo
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tighter mb-6 font-serif-premium drop-shadow-2xl"
          >
            Design com <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fcd34d] to-[#b5952f] italic">Profundidade.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-md mb-10 leading-relaxed font-medium"
          >
            Abandone os posts planos. O Estúdio Carrossel entrega camadas 3D e motion design nativo para autoridade imediata.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
          >
            <Link href="/studio" className="relative group overflow-hidden bg-gradient-to-r from-[#d4af37] to-[#b5952f] text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:-translate-y-1 block text-center">
              Começar Criação
            </Link>
          </motion.div>
        </div>

        {/* DIREITA: CARROSSEL 3D LIMPO */}
        <div className="lg:col-span-7 relative h-[500px] lg:h-[700px] w-full perspective-[2000px] mt-10 lg:mt-0">
          
          {/* PRISMA MOVIDO PARA A EXTREMA DIREITA (Fora do caminho dos cards) */}
          <motion.div 
            animate={{ z: [0, 50, 0], y: [-30, 30, -30], rotateY: [0, 360] }} 
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 top-0 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-[#d4af37]/20 to-transparent backdrop-blur-3xl rounded-[2rem] border border-white/10 flex items-center justify-center z-0 hidden xl:flex"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
              <Play className="w-6 h-6 text-[#d4af37] fill-[#d4af37] ml-1" />
            </div>
          </motion.div>

          <div className="absolute inset-0" style={{ transform: 'rotateY(-25deg) rotateX(12deg) rotateZ(-4deg)', transformStyle: 'preserve-3d' }}>
            
            <motion.div 
              animate={{ x: ["0%", "-33.333%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-[10%] left-[5%] flex gap-10 w-[300%] h-[80%]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[1, 2].map((groupIndex) => (
                <React.Fragment key={groupIndex}>
                  <div className="w-[350px] lg:w-[450px] h-full bg-zinc-900/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] shrink-0 flex flex-col justify-end">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-auto">
                        <Layers className="w-5 h-5 text-[#d4af37]" />
                     </div>
                     <h3 className="text-4xl font-black font-serif-premium uppercase text-white leading-tight">Retenção<br/>Z-Axis.</h3>
                     <div className="mt-4 flex gap-2">
                        <span className="text-[10px] font-black px-2 py-1 bg-[#d4af37]/20 text-[#d4af37] rounded uppercase">Camada 01</span>
                     </div>
                  </div>

                  <div className="w-[350px] lg:w-[450px] h-full bg-zinc-950 border-2 border-[#d4af37]/30 rounded-[3rem] shadow-[0_60px_120px_rgba(212,175,55,0.2)] relative overflow-hidden shrink-0">
                     <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale opacity-50" />
                     <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50"></div>
                     <div className="absolute bottom-12 left-12">
                       <h3 className="text-5xl font-black font-serif-premium uppercase text-white">Impacto.</h3>
                     </div>
                  </div>

                  <div className="w-[350px] lg:w-[450px] h-full bg-white text-black rounded-[3rem] p-12 shrink-0 flex flex-col items-center justify-center text-center">
                     <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-8">
                        <Move3d className="w-10 h-10 text-black" />
                     </div>
                     <h3 className="text-3xl font-black font-serif-premium uppercase">Exportação<br/>High-End</h3>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
              
          </div>
        </div>
      </div>
    </section>
  );
};