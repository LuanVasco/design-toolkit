"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Lock, Sparkles } from "lucide-react";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: string;
  cycle: "monthly" | "yearly";
}

export const CheckoutSlideOver = ({ isOpen, onClose, planName, price, cycle }: CheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const isYearly = cycle === "yearly";
  const numericPrice = parseFloat(price);
  const total = isYearly ? numericPrice * 12 : numericPrice;

  // Lógica de Ancoragem: Descobre o preço base mensal para calcular a economia real
  const monthlyBasePrice = planName === "Pro" ? 47 : 147;
  const totalWithoutDiscount = isYearly ? monthlyBasePrice * 12 : monthlyBasePrice;
  const totalSavings = totalWithoutDiscount - total;

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName, cycle }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erro ao gerar ambiente de pagamento: " + data.error);
      }
    } catch (error) {
      console.error("Erro ao iniciar checkout:", error);
      alert("Falha na comunicação com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,0.8)] z-[101] flex flex-col"
          >
            {/* --- HEADER --- */}
            <div className="px-6 py-5 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Lock size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Checkout Seguro</span>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white">
                <X size={16} />
              </button>
            </div>

            {/* --- CONTEÚDO --- */}
            <div className="flex-1 overflow-y-auto p-6">
              <h2 className="text-2xl font-black font-serif-premium mb-6">Resumo da Assinatura</h2>
              
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 mb-8">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-zinc-800/50">
                  <div>
                    <h3 className="text-lg font-bold text-white">DesignGen {planName}</h3>
                    <p className="text-xs text-zinc-500 font-medium mt-1">
                      Faturamento {isYearly ? "Anual" : "Mensal"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  {/* Se for Anual, mostra o preço cheio riscado e o desconto */}
                  {isYearly ? (
                    <>
                      <div className="flex justify-between text-zinc-500 line-through">
                        <span>Total Mensal (12x R$ {monthlyBasePrice})</span>
                        <span>R$ {totalWithoutDiscount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-emerald-500 font-bold">
                        <span>Desconto Anual (25%)</span>
                        <span>- R$ {totalSavings.toFixed(2)}</span>
                      </div>
                    </>
                  ) : (
                    /* Se for Mensal, mostra normal */
                    <div className="flex justify-between text-zinc-400">
                      <span>Valor Base</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-white font-black pt-2 border-t border-zinc-800/50 text-base">
                    <span>Total a pagar hoje</span>
                    <span className="text-[#d4af37]">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* --- GATILHO VISUAL DE ECONOMIA (Exclusivo Anual) --- */}
                {isYearly && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
                  >
                    <Sparkles size={14} />
                    Você está economizando R$ {totalSavings.toFixed(2)} por ano!
                  </motion.div>
                )}
              </div>

              {/* Box de Confiança */}
              <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-2xl p-6 text-center">
                <ShieldCheck size={32} className="text-[#d4af37] mx-auto mb-3" />
                <h4 className="text-sm font-bold text-white mb-2">Ambiente Blindado</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Ao prosseguir, você será redirecionado para o ambiente seguro do Asaas para escolher sua forma de pagamento (PIX ou Cartão).
                </p>
              </div>
            </div>

            {/* --- FOOTER CTA --- */}
            <div className="p-6 border-t border-zinc-900 bg-zinc-950">
              <button 
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-white/5"
              >
                {isLoading ? (
                  <span className="animate-pulse flex items-center gap-2">Gerando Link...</span>
                ) : (
                  <>
                    <Lock size={14} /> Prosseguir para Pagamento
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-600">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>Processamento Oficial Asaas</span>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};