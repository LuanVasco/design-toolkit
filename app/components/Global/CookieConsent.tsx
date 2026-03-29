"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield, Check } from "lucide-react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false); // Controla o modal detalhado
  const [prefs, setPrefs] = useState({ performance: true, marketing: false });

  useEffect(() => {
    const consent = localStorage.getItem("@designgen:cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Função robusta que salva o histórico exato do consentimento
  const handleSave = (method: "all" | "necessary" | "custom") => {
    const finalPrefs = 
      method === "all" ? { essential: true, performance: true, marketing: true } :
      method === "necessary" ? { essential: true, performance: false, marketing: false } :
      { essential: true, ...prefs };

    const consentLog = {
      preferences: finalPrefs,
      timestamp: new Date().toISOString(),
      method: method,
      userAgent: window.navigator.userAgent,
    };

    // Aqui você também poderia disparar uma chamada de API: api.post('/logs/consent', consentLog)
    localStorage.setItem("@designgen:cookie-consent", JSON.stringify(consentLog));
    
    setIsVisible(false);
    setShowModal(false);
  };

  return (
    <>
      {/* --- BANNER COMPACTO (Canto Inferior Esquerdo) --- */}
      <AnimatePresence>
        {isVisible && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 w-[calc(100%-3rem)] sm:w-[380px] z-[90]"
          >
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-start gap-3 mb-4">
                <Cookie className="text-[#d4af37] w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Nós valorizamos sua privacidade</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Utilizamos cookies essenciais para o funcionamento da plataforma e cookies analíticos para aprimorar sua experiência. Em conformidade com a LGPD.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleSave("all")}
                  className="w-full bg-white text-black py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-zinc-200"
                >
                  Aceitar Tudo
                </button>
                <button 
                  onClick={() => handleSave("necessary")}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-zinc-800"
                >
                  Apenas Essenciais
                </button>
                <button 
                  onClick={() => setShowModal(true)}
                  className="mt-1 text-[10px] text-zinc-500 underline hover:text-zinc-300 transition-colors text-center"
                >
                  Preferências de Cookies
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL DETALHADO (Para quem quer ler tudo) --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="text-[#d4af37] w-6 h-6" />
                  <h2 className="text-xl font-bold">Gestão de Privacidade</h2>
                </div>
                <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto pr-2 space-y-4 mb-6 flex-grow no-scrollbar">
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  A transparência é fundamental. Abaixo você pode controlar quais categorias de cookies o DesignGen OS tem permissão para armazenar no seu navegador, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).
                </p>

                <ToggleRow 
                  title="Cookies Estritamente Necessários" 
                  desc="Garantem o funcionamento básico do sistema, como manter sua sessão ativa e salvar estas próprias preferências. Não podem ser desativados." 
                  active={true} 
                  locked={true} 
                />
                <ToggleRow 
                  title="Cookies de Performance e Análise" 
                  desc="Ajudam-nos a entender como você interage com o Estúdio (ex: tempo de renderização do Z-Axis), permitindo melhorias contínuas no software." 
                  active={prefs.performance} 
                  onToggle={() => setPrefs({...prefs, performance: !prefs.performance})} 
                />
                <ToggleRow 
                  title="Cookies de Marketing Dirigido" 
                  desc="Utilizados para rastrear conversões e exibir anúncios relevantes dos nossos planos (Pro/Teams) em plataformas parceiras." 
                  active={prefs.marketing} 
                  onToggle={() => setPrefs({...prefs, marketing: !prefs.marketing})} 
                />
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-zinc-900">
                <button 
                  onClick={() => handleSave("custom")}
                  className="flex-1 bg-white text-black py-3 rounded-xl text-xs font-bold hover:bg-zinc-200 transition-all"
                >
                  Salvar Minhas Escolhas
                </button>
                <button 
                  onClick={() => handleSave("all")}
                  className="flex-1 bg-[#d4af37] text-black py-3 rounded-xl text-xs font-bold hover:brightness-110 transition-all"
                >
                  Aceitar Todos
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

/* --- SUB-COMPONENTE: LINHA DE TOGGLE --- */
const ToggleRow = ({ title, desc, active, onToggle, locked = false }: any) => (
  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-sm font-bold text-white">{title}</h4>
      {locked ? (
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1"><Check size={12}/> Obrigatório</span>
      ) : (
        <button 
          onClick={onToggle}
          className={`w-10 h-5 rounded-full relative p-0.5 transition-all ${active ? 'bg-[#d4af37]' : 'bg-zinc-700'}`}
        >
          <motion.div animate={{ x: active ? 20 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-sm" />
        </button>
      )}
    </div>
    <p className="text-xs text-zinc-500 leading-relaxed pr-8">{desc}</p>
  </div>
);