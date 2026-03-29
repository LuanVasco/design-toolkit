"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Users, Crown } from "lucide-react";
import { CheckoutSlideOver } from "../Checkout/CheckoutSlideOver";
// Importe o componente de Checkout que criamos

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  // Estados para controlar o Checkout
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    cycle: "monthly" | "yearly";
  } | null>(null);

  const plans = [
    {
      name: "Free",
      icon: <Zap className="w-6 h-6 text-zinc-400" />,
      price: "0",
      description: "Tudo o que você precisa para começar a criar.",
      features: [
        "3 exportações por mês",
        "Templates base (estáticos)",
        "Motor Z-Axis básico",
        "Suporte via comunidade",
      ],
      cta: "Começar Grátis",
      highlight: false,
    },
    {
      name: "Pro",
      icon: <Crown className="w-6 h-6 text-[#d4af37]" />,
      price: isAnnual ? "35" : "47",
      description: "Para profissionais que querem autoridade máxima.",
      features: [
        "Exportações ilimitadas",
        "Motor Z-Axis Panorâmico Full",
        "Fábrica de Widgets (50+ itens)",
        "BrandKits ilimitados",
        "Remoção de marca d'água",
        "Suporte prioritário"
      ],
      cta: "Testar Grátis por 7 dias",
      highlight: true,
      badge: "Mais Escolhido"
    },
    {
      name: "Teams",
      icon: <Users className="w-6 h-6 text-blue-400" />,
      price: isAnnual ? "110" : "147",
      description: "Para agências que gerenciam múltiplos clientes.",
      features: [
        "Tudo do plano Pro",
        "Até 5 membros inclusos",
        "Fluxo de aprovação de design",
        "Compartilhamento de BrandKits",
        "Pastas de projetos ilimitadas",
        "Faturamento consolidado"
      ],
      cta: "Assinar Teams",
      highlight: false
    }
  ];

  const handlePlanSelection = (plan: any) => {
    if (plan.name === "Free") {
      // Se for grátis, manda direto pro app
      window.location.href = "/studio";
      return;
    }
    
    // Se for pago, abre o checkout com os dados certos
    setSelectedPlan({
      name: plan.name,
      price: plan.price,
      cycle: isAnnual ? "yearly" : "monthly"
    });
    setIsCheckoutOpen(true);
  };

  return (
    <section id="pricing" className="py-24 bg-zinc-950 text-white selection:bg-[#d4af37] selection:text-black relative">
      
      {/* --- HEADER --- */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black font-serif-premium mb-6"
        >
          Um plano para cada nível de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fcd34d] italic">ambição.</span>
        </motion.h2>
        
        {/* Toggle Faturamento */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm font-bold ${!isAnnual ? "text-white" : "text-zinc-500"}`}>Mensal</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 bg-zinc-800 rounded-full p-1 flex items-center transition-all border border-zinc-700"
          >
            <motion.div 
              animate={{ x: isAnnual ? 28 : 0 }}
              className="w-5 h-5 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]"
            />
          </button>
          <span className={`text-sm font-bold ${isAnnual ? "text-white" : "text-zinc-500"}`}>
            Anual <span className="text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-md ml-1">Economize 25%</span>
          </span>
        </div>
      </div>

      {/* --- GRID DE PLANOS --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-500 ${
              plan.highlight 
                ? "bg-gradient-to-b from-zinc-900 to-zinc-950 border-[#d4af37]/50 shadow-[0_20px_50px_rgba(212,175,55,0.1)] scale-105 z-10" 
                : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d4af37] to-[#b5952f] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                {plan.badge}
              </div>
            )}

            <div className="mb-8">
              <div className="mb-4">{plan.icon}</div>
              <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-zinc-400">R$</span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={plan.price}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-5xl font-black font-serif-premium"
                  >
                    {plan.price}
                  </motion.span>
                </AnimatePresence>
                <span className="text-zinc-500 text-xs">/mês</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                  <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? "text-[#d4af37]" : "text-zinc-600"}`} />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePlanSelection(plan)}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 ${
                plan.highlight 
                  ? "bg-[#d4af37] text-black shadow-xl shadow-[#d4af37]/20 hover:brightness-110" 
                  : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>

      {/* --- TABELA DE COMPARAÇÃO --- */}
      <div className="max-w-5xl mx-auto px-6 mt-32">
        <h3 className="text-2xl font-black font-serif-premium text-center mb-12 italic">Compare os recursos</h3>
        <div className="rounded-[2rem] border border-zinc-800 overflow-hidden bg-zinc-900/20 backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <th className="p-6">Recurso</th>
                <th className="p-6">Free</th>
                <th className="p-6 text-[#d4af37]">Pro</th>
                <th className="p-6">Teams</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              <ComparisonRow label="Projetos Ativos" free="3" pro="Ilimitado" teams="Ilimitado" />
              <ComparisonRow label="Qualidade de Exportação" free="720p" pro="4K Ultra" teams="4K Ultra" />
              <ComparisonRow label="Motor de Profundidade (3D)" free="Básico" pro="Z-Axis Full" teams="Z-Axis Full" />
              <ComparisonRow label="BrandKits (Identidade)" free="1" pro="Ilimitado" teams="Ilimitado" />
              <ComparisonRow label="Suporte Especializado" free="Comunidade" pro="Prioritário" teams="Gerente de Conta" />
              <ComparisonRow label="White-label (Sem Marca)" free="-" pro="Incluso" teams="Incluso" />
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL DE CHECKOUT --- */}
      <CheckoutSlideOver 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        planName={selectedPlan?.name || ""}
        price={selectedPlan?.price || "0"}
        cycle={selectedPlan?.cycle || "monthly"}
      />
    </section>
  );
};

function ComparisonRow({ label, free, pro, teams }: { label: string, free: string, pro: string, teams: string }) {
  return (
    <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
      <td className="p-6 text-zinc-300">{label}</td>
      <td className="p-6 text-zinc-500">{free}</td>
      <td className="p-6 text-[#d4af37] font-bold">{pro}</td>
      <td className="p-6 text-zinc-400">{teams}</td>
    </tr>
  );
}