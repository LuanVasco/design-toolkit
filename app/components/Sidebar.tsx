"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
import { 
  LayoutGrid, 
  Palette, 
  Component, 
  Anchor, 
  SquareAsterisk,
  LogOut,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  // Lógica de Cota (Simulada - idealmente viria do seu banco/AuthContext)
  const usage = {
    current: 7,
    limit: user?.plan === "PRO" ? 50 : 10,
    percentage: user?.plan === "PRO" ? (7 / 50) * 100 : (7 / 10) * 100
  };

  return (
    <aside className="w-64 border-r border-zinc-800/50 flex flex-col z-50 shadow-2xl bg-zinc-950 flex-shrink-0 h-full">
      
      {/* Header Premium */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-zinc-800/50">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-black shadow-lg shadow-[#d4af37]/20 bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#997a15]">
          DG
        </div>
        <span className="text-lg font-bold text-zinc-100 tracking-tight font-serif-premium italic">DesignGen</span>
      </div>

      {/* Navegação Principal */}
      <nav className="flex-grow py-6 px-4 space-y-1 overflow-y-auto no-scrollbar">
        
        {/* SEÇÃO: DASHBOARD */}
        <p className="px-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-3">Principal</p>
        
        <Link 
          href="/home" 
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group ${
            isActive("/home") 
              ? "bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37]" 
              : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <LayoutGrid size={18} />
            <span>Início / Vitrine</span>
          </div>
          {isActive("/home") && <ChevronRight size={14} />}
        </Link>

        <div className="my-6 border-t border-zinc-900/50" />

        {/* SEÇÃO: SETUP */}
        <p className="px-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-3">Configuração</p>
        
        <Link 
          href="/setup/brand" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            isActive("/setup/brand") ? "text-[#d4af37]" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Palette size={18} /> Brand & Fundo
        </Link>
        
        <Link 
          href="/setup/widgets" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            isActive("/setup/widgets") ? "text-[#d4af37]" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Component size={18} /> Widgets
        </Link>
        
        <Link 
          href="/setup/hooks" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            isActive("/setup/hooks") ? "text-[#d4af37]" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Anchor size={18} /> Telas de Hook
        </Link>

        <div className="my-6 border-t border-zinc-800/50"></div>

        {/* SEÇÃO: ESTÚDIO (Destaque) */}
        <p className="px-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-3">Criação</p>
        
        <Link 
          href="/studio" 
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-black transition-all ${
            isActive("/studio") 
              ? "bg-gradient-to-r from-[#d4af37] to-[#b5952f] text-black shadow-lg shadow-[#d4af37]/20" 
              : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900 hover:text-white border border-white/5"
          }`}
        >
          <SquareAsterisk size={20} />
          Estúdio Carrossel
        </Link>
      </nav>

      {/* ================= FOOTER: USAGE & USER ================= */}
      <div className="p-4 border-t border-zinc-800/50 bg-zinc-950/50 space-y-4">
        
        {/* MEDIDOR DE USO */}
        <div className="px-1 space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Capacidade</span>
            <span className="text-[10px] font-black text-zinc-300">
              {usage.current}<span className="text-zinc-600 mx-0.5">/</span>{usage.limit}
            </span>
          </div>
          
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${usage.percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#fcd34d] shadow-[0_0_10px_rgba(212,175,55,0.3)]"
            />
          </div>

          {user?.plan !== "AGENCY" && (
            <Link 
              href="/upgrade" 
              className="block w-full py-2 rounded-lg border border-[#d4af37]/20 bg-[#d4af37]/5 text-center text-[10px] font-black text-[#d4af37] uppercase tracking-[0.15em] hover:bg-[#d4af37] hover:text-black transition-all duration-300"
            >
              Fazer Upgrade
            </Link>
          )}
        </div>

        {/* Card do Usuário */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#b5952f] flex items-center justify-center text-black font-black text-xs shadow-md">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-zinc-100 truncate">{user?.name || "Usuário"}</p>
            <p className="text-[10px] text-[#d4af37] font-black uppercase tracking-tighter opacity-80 italic">
              {user?.plan || "Free"} Member
            </p>
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={logout}
          className="w-full group flex items-center justify-between px-4 py-2.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-[0.1em]">Sair</span>
          </div>
        </button>
      </div>

    </aside>
  );
}