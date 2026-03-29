"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export const ScrollReveal = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // O target é a section de 300vh. A animação vai de 0 a 1 enquanto ela passa pela tela.
  const { scrollYProgress } = useScroll({ 
    target: scrollRef, 
    offset: ["start start", "end end"] 
  });

  // 🚨 FERRAMENTA DE DEBUG DO PO: 
  // Abra o console do navegador (F12). Se os números mudarem ao rolar, a física está funcionando.
  // Se ficar travado no 0, significa que o layout.tsx está bloqueando o scroll da página.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Física do Scroll: ", latest.toFixed(2));
  });

  // Transformações do Texto Central
  const textScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  // Transformações das 4 Imagens (Pixels absolutos)
  const img1X = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const img1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const img1Rot = useTransform(scrollYProgress, [0, 1], [0, -15]);

  const img2X = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const img2Rot = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const img3X = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const img3Y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const img3Rot = useTransform(scrollYProgress, [0, 1], [0, -10]);

  const img4X = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const img4Y = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const img4Rot = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    // Importante: Não coloque overflow-hidden aqui na section raiz, senão mata o scroll!
    <section ref={scrollRef} className="relative h-[300vh] bg-zinc-950">
      
      {/* O container sticky que "gruda" na tela */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 bg-zinc-950 z-0 border-y border-zinc-900/50"></div>

        <motion.div 
          style={{ scale: textScale, opacity: textOpacity }}
          className="relative z-10 text-center flex flex-col items-center pointer-events-none"
        >
          <h2 className="text-5xl md:text-[7rem] font-black font-serif-premium leading-[0.9] text-zinc-200 uppercase tracking-tighter drop-shadow-2xl">
            Pareça Grande.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#8c7121]">Converta Mais.</span>
          </h2>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div style={{ x: img1X, y: img1Y, rotate: img1Rot }} className="absolute w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-zinc-800 bg-zinc-900">
            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&fit=crop" className="w-full h-full object-cover" alt="UI" />
          </motion.div>
          
          <motion.div style={{ x: img2X, y: img2Y, rotate: img2Rot }} className="absolute w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-zinc-800 bg-zinc-900">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&fit=crop" className="w-full h-full object-cover" alt="Dashboard" />
          </motion.div>
          
          <motion.div style={{ x: img3X, y: img3Y, rotate: img3Rot }} className="absolute w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-zinc-800 bg-zinc-900">
            <img src="https://images.unsplash.com/photo-1618477247222-ac60c9020460?q=80&w=400&fit=crop" className="w-full h-full object-cover" alt="Carrossel" />
          </motion.div>
          
          <motion.div style={{ x: img4X, y: img4Y, rotate: img4Rot }} className="absolute w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-zinc-800 bg-zinc-900">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&fit=crop" className="w-full h-full object-cover" alt="Storytelling" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};