export const getStrategicInsights = (niche: string, color: string) => {
    // Simulação de lógica baseada em teoria das cores e UX
    const insights = {
      score: 85,
      tips: [] as string[],
    };
  
    if (niche.includes("Finanças") || niche.includes("Direito")) {
      insights.score = color === "#000000" || color.includes("blue") ? 95 : 70;
      insights.tips = [
        "Sua marca transmite autoridade. Evite usar o logo em tamanhos muito reduzidos.",
        "Para documentos fiscais, utilize a versão monocromática (Black) para garantir legibilidade.",
        "O contraste atual é ideal para dashboards de alta precisão."
      ];
    } else if (niche.includes("Tech") || niche.includes("IT")) {
      insights.score = 90;
      insights.tips = [
        "Estética moderna validada. Excelente para interfaces Dark Mode.",
        "Dica: Utilize o logo com 'espaço negativo' em fundos gradientes.",
        "Sua tipografia sugere inovação e agilidade."
      ];
    } else {
      insights.score = 82;
      insights.tips = [
        "Marca versátil. Funciona bem tanto em meios digitais quanto impressos.",
        "Considere usar a cor de acento apenas em botões de conversão (CTA).",
        "Mantenha uma margem de segurança de 20% ao redor do logo."
      ];
    }
  
    return insights;
  };