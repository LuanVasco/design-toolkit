"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefreshCcw, Check, Smartphone, CreditCard } from "lucide-react";

interface Step3Props {
  logoUrl: string;
  brandColor: string;
  brandName: string;
  onApprove: () => void;
  onBack: () => void;
}

export const Step3_VitrineMockup = ({ logoUrl, brandColor, brandName, onApprove, onBack }: Step3Props) => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex flex-col items-center">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter leading-tight">
          Sua marca <br/> <span style={{ color: brandColor }} className="italic">Aplicada.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-12 perspective-[2000px]">
        
        {/* Palco Principal */}
        <div className="col-span-1 lg:col-span-2 aspect-video bg-zinc-900/40 rounded-[3rem] border border-white/10 flex items-center justify-center p-12 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
          <img src={logoUrl} alt="Logo" className="max-h-full object-contain drop-shadow-2xl z-10" />
        </div>

        <div className="col-span-1 flex flex-col gap-8 perspective-[1000px]">
          {/* Mockup: Avatar Social */}
          <div className="flex-1 bg-zinc-950/80 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center p-8 transform-gpu hover:rotate-y-12 transition-transform duration-500 shadow-2xl">
            <div className="w-32 h-32 rounded-full border-4 overflow-hidden mb-6 p-4 bg-[#050505]" style={{ borderColor: brandColor }}>
              <img src={logoUrl} className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              <Smartphone size={14} /> Perfil Social
            </div>
          </div>

          {/* Mockup: Cartão Dark 3D */}
          <div 
            className="h-48 bg-gradient-to-br from-zinc-800 to-black rounded-2xl border border-white/10 flex flex-col justify-between p-6 shadow-2xl relative overflow-hidden"
            style={{ transform: "rotateY(-15deg) rotateX(10deg) rotateZ(2deg)", transformStyle: "preserve-3d" }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="w-16 h-16 opacity-20 absolute -bottom-4 -right-4"><img src={logoUrl} /></div>
            <div className="w-12 h-12 relative z-10"><img src={logoUrl} className="w-full h-full object-contain" /></div>
            <div className="text-right relative z-10 mt-auto">
              <h4 className="text-sm font-black text-white">{brandName}</h4>
              <p className="text-[8px] uppercase tracking-widest text-zinc-400 mt-1 flex items-center justify-end gap-1"><CreditCard size={10} /> Smart Card</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors">
          <RefreshCcw size={14} /> Trocar Ideia
        </button>
        <button onClick={onApprove} className="group flex items-center gap-6 bg-white text-black pl-8 pr-2 py-2 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]">
          Aprovar e Vincular
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#d4af37] transition-colors"><Check size={18} /></div>
        </button>
      </div>
    </motion.div>
  );
};