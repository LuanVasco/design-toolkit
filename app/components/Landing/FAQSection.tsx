"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer: "Sim! Não temos fidelidade. Você pode cancelar sua assinatura com apenas um clique nas configurações do seu perfil, sem burocracia ou taxas de cancelamento."
  },
  {
    question: "Os carrosséis criados são de minha propriedade?",
    answer: "Totalmente. Todo conteúdo gerado no DesignGen OS pertence a você ou ao seu cliente. Você pode usar comercialmente em qualquer rede social sem restrições."
  },
  {
    question: "O que exatamente é o Motor Z-Axis?",
    answer: "É a nossa tecnologia exclusiva de profundidade. Ela permite que você mova elementos em um eixo 3D real entre as telas do carrossel, criando aquele efeito de continuidade que gera 3x mais retenção que posts comuns."
  },
  {
    question: "Posso trocar de plano depois de assinar?",
    answer: "Com certeza. Se você assinar o Pro e decidir que precisa do Teams para sua agência, o upgrade é imediato e o valor já pago é descontado proporcionalmente (pro-rata)."
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos todos os cartões de crédito (via Stripe) e PIX para planos anuais. No cartão, a liberação dos recursos Pro é instantânea."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-24 max-w-3xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black font-serif-premium mb-4">Dúvidas Frequentes</h2>
        <p className="text-zinc-500 text-sm font-medium">Tudo o que você precisa saber para começar a criar hoje.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

// Sub-componente para gerenciar o estado individual de cada pergunta
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`border rounded-2xl transition-all duration-300 ${
        isOpen ? "border-[#d4af37]/50 bg-zinc-900/40" : "border-zinc-800 bg-transparent hover:border-zinc-700"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-sm md:text-base text-zinc-200">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={isOpen ? "text-[#d4af37]" : "text-zinc-500"}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm leading-relaxed text-zinc-400 border-t border-zinc-800/50 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};