"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Sparkles, ShieldCheck, BarChart3, 
  ArrowRight, Check, Zap, Globe 
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#d4af37]/30 selection:text-white">
      {/* 🌌 BACKGROUND EFFECTS */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#d4af3708_0%,transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* 🧭 NAVIGATION (Glassmorphism) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl px-8 py-4 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm rotate-45" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">BrandHub</span>
        </div>
        <div className="hidden md:flex gap-8 text-[9px] font-black uppercase tracking-widest text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Produto</a>
          <a href="#" className="hover:text-white transition-colors">Estratégia</a>
          <a href="#" className="hover:text-white transition-colors">MBA Insight</a>
        </div>
        <button 
          onClick={() => router.push("/onboard")}
          className="bg-white text-black px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all"
        >
          Começar
        </button>
      </nav>

      {/* ⚡ HERO SECTION */}
      <main className="relative z-10 pt-48 pb-20 px-6">
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37]">
            <Sparkles size={12} />
            <span className="text-[9px] font-black uppercase tracking-widest">A nova era da Identidade Estratégica</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
            Construa sua marca <br />
            <span className="text-zinc-500 not-italic">em segundos.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="max-w-xl mx-auto text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
            Unimos <strong className="text-white">Engenharia de Software</strong> e <strong className="text-white">Branding de Elite</strong> para criar identidades que não apenas parecem boas, mas funcionam estrategicamente para o seu negócio.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => router.push("/onboard")}
              className="w-full md:w-auto bg-[#d4af37] text-black px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              Criar Identidade Agora <ArrowRight size={16} />
            </button>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest italic">Sem cartões. Sem complicação.</p>
          </motion.div>
        </motion.section>

        {/* 🏛️ FEATURE GRID (The Strategic Value) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mt-40 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { 
              icon: <ShieldCheck className="text-[#d4af37]" />, 
              title: "DNA Proprietário", 
              desc: "Algoritmos determinísticos que garantem que sua marca seja única no mercado." 
            },
            { 
              icon: <BarChart3 className="text-[#d4af37]" />, 
              title: "Strategic Score", 
              desc: "Análise baseada em nicho para validar o impacto visual da sua nova identidade." 
            },
            { 
              icon: <Zap className="text-[#d4af37]" />, 
              title: "Export Ready", 
              desc: "Receba assets em SVG e PNG prontos para redes sociais, sites e impressões." 
            }
          ].map((f, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-zinc-900/20 border border-white/5 hover:border-white/10 transition-colors group">
              <div className="mb-6 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">{f.title}</h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.section>

        {/* 🖼️ PREVIEW SECTION (The "Apple" Look) */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-7xl mx-auto mt-40 relative rounded-[4rem] overflow-hidden bg-zinc-900/30 border border-white/5 aspect-[21/9] flex items-center justify-center p-20"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">O Dashboard do Futuro</h2>
            <p className="text-zinc-500 uppercase text-[10px] font-black tracking-[0.5em]">Central da sua marca em um só lugar</p>
            <div className="pt-10 flex gap-4 justify-center flex-wrap">
               <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase">Color Specs</span>
               <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase">Social Media Kit</span>
               <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase">Asset Manager</span>
            </div>
          </div>
        </motion.section>
      </main>

      {/* 🏁 FOOTER */}
      <footer className="max-w-7xl mx-auto py-20 px-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] italic text-white">BrandHub OS</span>
          </div>
          <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest max-w-[200px]">
            Projeto Acadêmico USP / Esalq. MBA em Engenharia de Software.
          </p>
        </div>
        <div className="flex gap-10 text-[9px] font-black uppercase tracking-widest text-zinc-500">
          <a href="#" className="hover:text-white transition-colors">Github</a>
          <a href="#" className="hover:text-white transition-colors">Linkedin</a>
          <a href="#" className="hover:text-white transition-colors">Documentação</a>
        </div>
      </footer>
    </div>
  );
}