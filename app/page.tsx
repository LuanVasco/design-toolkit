"use client";

import React from "react";
import { BentoGrid } from "./components/Landing/BentoGrid";
import { ComparisonTable } from "./components/Landing/ComparisonTable";
import { Footer } from "./components/Landing/Footer";
import { HeroSection } from "./components/Landing/HeroSection";
import { Navbar } from "./components/Landing/Navbar";
import { PricingSection } from "./components/Landing/PricingSection";
import { ScrollReveal } from "./components/Landing/ScrollReveal";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-zinc-50 selection:bg-[#d4af37] selection:text-black flex flex-col bg-zinc-950">
      
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <BentoGrid />
        <ComparisonTable />
        
        {/* 2. Adicionado exatamente antes do Pricing! O impacto final antes da venda. */}
        <ScrollReveal />
        
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}