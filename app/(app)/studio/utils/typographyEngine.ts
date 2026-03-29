// src/app/studio/utils/typographyEngine.ts

/**
 * Motor de Auto-Fit Tipográfico.
 * Calcula as classes CSS ideais baseadas no volume de texto para evitar quebras de layout.
 */
export function getDynamicType(text: string = "", type: "title" | "desc" | "number" = "title") {
    const len = text.length;
  
    if (type === "title") {
      // Títulos de altíssimo impacto (Ex: "O FIM DO UX")
      if (len <= 15) return "text-[46px] leading-[1.0] tracking-tighter";
      
      // Títulos padrão (Ex: "5 PASSOS PARA MELHORAR SUA ROTINA")
      if (len <= 35) return "text-[36px] leading-[1.05] tracking-tight";
      
      // Títulos longos / Frases curtas
      if (len <= 60) return "text-[28px] leading-[1.1] tracking-normal";
      
      // Textões (Fallback de segurança)
      return "text-[22px] leading-[1.15] tracking-normal";
    }
  
    if (type === "desc") {
      // Descrições curtas e diretas
      if (len <= 60) return "text-[16px] leading-relaxed";
      
      // Descrições normais de apoio
      if (len <= 120) return "text-[14px] leading-relaxed";
      
      // Parágrafos densos (Evita que o texto desça demais)
      return "text-[12px] leading-snug";
    }
  
    if (type === "number") {
      // Para o NumberedStepLayout (Se o número for "100", diminui a fonte)
      return len > 2 ? "text-[60px]" : "text-[80px]";
    }
  
    return "";
  }