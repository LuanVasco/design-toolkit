"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { LogIn, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();

  // Handler de Erro Centralizado
  const handleAuthError = (err: any) => {
    const message = err.message || "Ocorreu um erro na autenticação.";
    setError(message);
    // Feedback visual sutil: limpar senha se errar
    setPassword("");
  };

  // Login Tradicional (E-mail/Senha)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || isGoogleLoading) return;

    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/studio"); 
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Login Social (Google)
  const handleGoogleLogin = useCallback(async () => {
    if (isLoading || isGoogleLoading) return;

    setIsGoogleLoading(true);
    setError("");
    
    try {
      await loginWithGoogle();
      router.push("/studio");
    } catch (err: any) {
      setError("Não foi possível conectar com o Google. Tente novamente.");
    } finally {
      setIsGoogleLoading(false);
    }
  }, [isLoading, isGoogleLoading, loginWithGoogle, router]);

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans text-zinc-50 selection:bg-[#d4af37] selection:text-black overflow-hidden">
      
      {/* SEÇÃO ESQUERDA: INTERFACE DE ACESSO */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 relative z-10 bg-zinc-950">
        
        {/* Logo Superior */}
        <Link href="/" className="absolute top-10 left-6 sm:left-12 md:left-20 lg:left-32 group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center text-black font-black italic shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
              EC
            </div>
            <span className="text-xl font-black font-serif-premium italic tracking-tighter">
              Estúdio Carrossel
            </span>
          </div>
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="max-w-md w-full mx-auto"
        >
          <header className="mb-10">
            <h1 className="text-4xl font-black font-serif-premium mb-3 tracking-tight">
              Acesse seu Estúdio.
            </h1>
            <p className="text-zinc-500 font-medium">
              Transforme conhecimento em autoridade visual.
            </p>
          </header>

          {/* Social Auth */}
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all mb-8 disabled:opacity-50 group"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continuar com Google
              </>
            )}
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-zinc-800/50 flex-1"></div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-black">Ou via e-mail</span>
            <div className="h-px bg-zinc-800/50 flex-1"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">E-mail Corporativo</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-900/30 border border-zinc-800/50 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all placeholder:text-zinc-700 font-medium"
                placeholder="nome@empresa.com"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Senha de Acesso</label>
                <Link href="/forgot-password" className="text-[10px] text-[#d4af37]/80 hover:text-[#d4af37] font-black tracking-widest uppercase transition-colors">
                  Perdeu?
                </Link>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-900/30 border border-zinc-800/50 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all placeholder:text-zinc-700 font-medium"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading || isGoogleLoading}
              className="w-full bg-[#d4af37] hover:bg-[#c4a132] text-black px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-[0_10px_40px_rgba(212,175,55,0.15)] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Entrar no Estúdio <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <footer className="mt-10 text-center">
            <p className="text-sm text-zinc-500 font-medium">
              Novo no Estúdio?{" "}
              <Link href="/signup" className="text-white font-black border-b border-[#d4af37] pb-0.5 hover:text-[#d4af37] transition-all">
                Crie sua conta
              </Link>
            </p>
          </footer>
        </motion.div>
      </div>

      {/* SEÇÃO DIREITA: SHOWCASE & TRUST */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-zinc-950">
        {/* Background Visual High-End */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover opacity-20 grayscale mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-950/80 to-transparent"></div>
        
        {/* Glow Decorativo */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#d4af37]/10 blur-[120px] rounded-full animate-pulse"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-md p-10 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl"
        >
          <div className="mb-8 w-12 h-12 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
            <ShieldCheck size={28} />
          </div>
          
          <blockquote className="text-2xl font-serif-premium italic text-zinc-200 leading-snug mb-8">
            "O Estúdio Carrossel não é apenas uma ferramenta de design, é um multiplicador de autoridade para quem leva o LinkedIn a sério."
          </blockquote>
          
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full border-2 border-[#d4af37]/30 p-0.5">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" 
                alt="Testemunho" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <p className="text-sm font-black text-white uppercase tracking-wider">Ricardo M.</p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Top Voice LinkedIn</p>
            </div>
          </div>
        </motion.div>

        {/* Badge de Segurança Sutil */}
        <div className="absolute bottom-10 flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
          <LogIn size={10} /> Conexão Segura AES-256
        </div>
      </div>

    </div>
  );
}