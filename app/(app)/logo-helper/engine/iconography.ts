import { 
    Activity, Heart, Dumbbell, // Saúde
    Code2, Cpu, Terminal, Fingerprint, Rocket, // Tech
    TrendingUp, BarChart3, Wallet, // Finanças
    Scale, Landmark, // Direito
    Palette, PenTool, Sparkles, // Design
    Briefcase, Target, Megaphone // Marketing
  } from "lucide-react";
  
  export const NICHE_ICONS: Record<string, any[]> = {
    "Saúde & Bem-estar": [Activity, Heart, Dumbbell],
    "Tecnologia & Dev": [Code2, Cpu, Terminal, Fingerprint, Rocket],
    "Finanças & Cripto": [TrendingUp, BarChart3, Wallet],
    "Direito": [Scale, Landmark],
    "Design & Criatividade": [Palette, PenTool, Sparkles],
    "Marketing & Vendas": [Target, Megaphone, Briefcase],
    "Outro": [Sparkles, Rocket, Target] // Fallback
  };
  
  export const getRandomIconForNiche = (niche: string) => {
    const icons = NICHE_ICONS[niche] || NICHE_ICONS["Outro"];
    return icons[Math.floor(Math.random() * icons.length)];
  };