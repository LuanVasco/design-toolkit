"use client";

import React from "react";

export const BentoGrid = () => {
  return (
    <section id="como-funciona" className="py-24 bg-zinc-950 relative border-t border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black font-serif-premium mb-4">A sua Agência de Bolso</h2>
          <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Tudo que você precisa em uma única tela.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          {/* Z-Axis */}
          <div className="md:col-span-2 bg-zinc-900/40 border border-zinc-800/50 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group hover:border-[#d4af37]/40 transition-colors duration-500 shadow-xl">
            <div className="relative z-10 w-full md:w-2/3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-6 border border-[#d4af37]/20">🧊</div>
              <h3 className="text-2xl font-black text-white mb-3 font-serif-premium">Motor Z-Axis Panorâmico</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Crie carrosséis imersivos com elementos 3D que vazam entre as páginas. Adicione formas, controle o desfoque e gere profundidade de campo com cliques.</p>
            </div>
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-700 pointer-events-none">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[2px] opacity-80"></div>
                <div className="absolute inset-4 bg-zinc-800/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl rotate-12 flex items-center justify-center">
                   <div className="w-24 h-4 bg-white/20 rounded-full blur-[1px]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* BrandKit */}
          <div className="md:col-span-1 bg-zinc-900/40 border border-zinc-800/50 rounded-[2rem] p-8 relative overflow-hidden group hover:border-blue-500/40 transition-colors duration-500 shadow-xl flex flex-col justify-between">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20">🎨</div>
              <h3 className="text-xl font-black text-white mb-2 font-serif-premium">BrandKit Global</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">O estúdio aplica a sua identidade (cores e logo) em todos os slides automaticamente.</p>
            </div>
            <div className="flex -space-x-4 mt-8">
              <div className="w-12 h-12 rounded-full border-4 border-zinc-900 bg-[#d4af37] shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300"></div>
              <div className="w-12 h-12 rounded-full border-4 border-zinc-900 bg-zinc-100 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300 delay-75"></div>
              <div className="w-12 h-12 rounded-full border-4 border-zinc-900 bg-blue-500 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300 delay-150"></div>
            </div>
          </div>

          {/* ZIP */}
          <div className="md:col-span-1 bg-gradient-to-br from-zinc-900/40 to-zinc-950 border border-zinc-800/50 rounded-[2rem] p-8 relative overflow-hidden group hover:border-emerald-500/40 transition-colors duration-500 shadow-xl flex flex-col justify-between">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20">⚡</div>
              <h3 className="text-xl font-black text-white mb-2 font-serif-premium">Exportação em ZIP</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Baixe cortes panorâmicos perfeitamente alinhados na resolução 1080x1350px.</p>
            </div>
            <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 mt-6 group-hover:bg-zinc-800/50 transition-colors">
              <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold">ZIP</div>
              <div className="flex-1">
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Templates */}
          <div className="md:col-span-2 bg-zinc-900/40 border border-zinc-800/50 rounded-[2rem] p-8 relative overflow-hidden group hover:border-purple-500/40 transition-colors duration-500 shadow-xl flex items-center">
            <div className="relative z-10 w-full md:w-1/2 pr-8">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 border border-purple-500/20">🧠</div>
              <h3 className="text-2xl font-black text-white mb-3 font-serif-premium">Templates Validados</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Não encare a página em branco. Utilize frameworks de copy integrados focados em reter a atenção e converter leitores em clientes.</p>
            </div>
            <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/2 bg-zinc-950/50 border-l border-zinc-800/50 p-8 flex-col gap-4 justify-center">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-4 transform group-hover:-translate-x-4 transition-transform duration-500">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 w-3/4 bg-zinc-700 rounded-full"></div>
                  <div className="h-3 w-1/2 bg-zinc-800 rounded-full"></div>
                </div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-4 transform group-hover:-translate-x-8 transition-transform duration-500 delay-75">
                <div className="w-12 h-12 bg-[#d4af37]/20 rounded-lg"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 w-2/3 bg-zinc-700 rounded-full"></div>
                  <div className="h-3 w-1/3 bg-zinc-800 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};