"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // Loading separado para o Google
  const [error, setError] = useState("");
  
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth(); // Puxando a nova função do contexto

  // Login Tradicional
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/studio"); 
    } catch (err: any) {
      setError(err.message || "Erro ao conectar. Verifique seus dados.");
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN COM GOOGLE
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError("");
    try {
      await loginWithGoogle();
      router.push("/studio");
    } catch (err: any) {
      setError("Falha na autenticação com Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans text-zinc-50 selection:bg-[#d4af37] selection:text-black">
      
      {/* ================= LADO ESQUERDO: FORMULÁRIO ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 relative z-10">
        
        <Link href="/" className="absolute top-10 left-8 sm:left-16 md:left-24 lg:left-32 text-xl font-black font-serif-premium italic tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity">
          Estúdio Carrossel <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto mt-20"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-black font-serif-premium mb-3">Bem-vindo de volta.</h1>
            <p className="text-sm text-zinc-400 font-medium">Continue construindo a sua autoridade.</p>
          </div>

          {/* Botão Social Conectado */}
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all mb-6 disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Entrar com Google
              </>
            )}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-zinc-800 flex-1"></div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Ou com e-mail</span>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-500 text-xs font-bold text-center">
                {error}
              </motion.div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 ml-1">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-900/50 border border-zinc-800 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all placeholder:text-zinc-600"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2 ml-1 mr-1">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest">Senha</label>
                <a href="#" className="text-[10px] text-[#d4af37] hover:underline font-bold tracking-widest uppercase">Esqueceu?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-900/50 border border-zinc-800 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all placeholder:text-zinc-600"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading || isGoogleLoading}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b5952f] text-black px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] active:scale-95 flex items-center justify-center mt-4 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Acessar Estúdio"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-10">
            Ainda não tem uma conta?{" "}
            <Link href="/signup" className="text-white font-bold hover:text-[#d4af37] transition-colors">
              Criar conta grátis
            </Link>
          </p>
        </motion.div>
      </div>

      {/* LADO DIREITO: SHOWCASE VISUAL MANTIDO */}
      <div className="hidden lg:flex w-1/2 relative bg-zinc-900 items-center justify-center overflow-hidden border-l border-zinc-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-[#d4af37]/20 blur-[120px] rounded-full pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-lg p-12 bg-zinc-950/60 backdrop-blur-2xl border border-zinc-700/50 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        >
          <div className="text-5xl mb-6 drop-shadow-2xl">🧊</div>
          <h2 className="text-3xl font-black font-serif-premium text-white leading-tight mb-4">
            "A estética da nossa marca mudou da noite pro dia. O tempo de aprovação com clientes caiu pela metade."
          </h2>
          <div className="flex items-center gap-4 mt-8">
            <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Pedro S.</p>
              <p className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest">Diretor de Arte</p>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}