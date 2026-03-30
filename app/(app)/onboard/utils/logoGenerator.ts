// app/components/onboarding/utils/logoGenerator.ts

import { LogoConfig } from "@/app/components/logo-engine/LogoRenderer";

interface GenerateBatchParams {
  logoType: string;
  brandColor: string;
  textColor: string;
  titleFont: string;
  niche: string;
  batchSize?: number;
}

// ============================================================================
// 📚 ESTUDO DE DESIGN POR CENÁRIO (DESIGN TOKENS)
// ============================================================================
const NICHE_STRATEGY: Record<string, any> = {
  "Tecnologia & SaaS": {
    rationale: "Foco em conectividade, expansão e modernidade fluida.",
    shapes: ["NeuralNode", "DataMatrix", "AsymmetricOrbit", "IsometricCube"],
    visualGrammar: [
      { weight: "500", transform: "lowercase", spacing: "0.05em", scale: 1 },
      { weight: "800", transform: "uppercase", spacing: "-0.05em", scale: 0.9 },
      { weight: "600", transform: "capitalize", spacing: "0.15em", scale: 1.1 }
    ]
  },
  "Finanças & Cripto": {
    rationale: "Foco em solidez, segurança inabalável e precisão matemática.",
    shapes: ["NeoShield", "PrismDiamond", "InfinityRings", "DataMatrix"],
    visualGrammar: [
      { weight: "900", transform: "uppercase", spacing: "-0.02em", scale: 0.85 },
      { weight: "700", transform: "uppercase", spacing: "0.02em", scale: 1 },
      { weight: "900", transform: "capitalize", spacing: "0.05em", scale: 0.95 }
    ]
  },
  "Direito & Advocacia": {
    rationale: "Foco em autoridade heráldica, tradição e distanciamento premium.",
    shapes: ["NeoShield", "SwissRing", "ArchitectBracket"],
    visualGrammar: [
      { weight: "400", transform: "uppercase", spacing: "0.4em", scale: 1 },
      { weight: "700", transform: "uppercase", spacing: "0.2em", scale: 0.9 },
      { weight: "300", transform: "uppercase", spacing: "0.5em", scale: 1.2 }
    ]
  },
  "Saúde & Bem-estar": {
    rationale: "Foco em equilíbrio, empatia, leveza orgânica e respiro.",
    shapes: ["PrecisionSpark", "SwissRing", "AsymmetricOrbit", "InfinityRings"],
    visualGrammar: [
      { weight: "400", transform: "capitalize", spacing: "0.05em", scale: 1 },
      { weight: "500", transform: "lowercase", spacing: "0.1em", scale: 1.1 },
      { weight: "600", transform: "capitalize", spacing: "0.02em", scale: 0.9 }
    ]
  },
  "Marketing & Vendas": {
    rationale: "Foco em impacto, persuasão, energia e crescimento rápido.",
    shapes: ["PrecisionSpark", "DataMatrix", "NeuralNode", "PrismDiamond"],
    visualGrammar: [
      { weight: "900", transform: "uppercase", spacing: "-0.05em", scale: 1.1 },
      { weight: "800", transform: "capitalize", spacing: "0.02em", scale: 1 },
      { weight: "900", transform: "uppercase", spacing: "0.1em", scale: 1.2 }
    ]
  },
  "Design & Arquitetura": {
    rationale: "Foco em proporção, minimalismo absoluto e vanguarda estética.",
    shapes: ["ArchitectBracket", "IsometricCube", "DataMatrix", "SwissRing"],
    visualGrammar: [
      { weight: "300", transform: "uppercase", spacing: "0.2em", scale: 1 },
      { weight: "500", transform: "lowercase", spacing: "0.05em", scale: 1.1 },
      { weight: "700", transform: "uppercase", spacing: "0.3em", scale: 0.9 }
    ]
  },
  "Outro": {
    rationale: "Foco em clareza, versatilidade e design atemporal.",
    shapes: ["PrecisionSpark", "NeoShield", "DataMatrix", "InfinityRings"],
    visualGrammar: [
      { weight: "600", transform: "capitalize", spacing: "normal", scale: 1 },
      { weight: "800", transform: "uppercase", spacing: "0.05em", scale: 0.95 },
      { weight: "400", transform: "lowercase", spacing: "0.1em", scale: 1.05 }
    ]
  }
};

// 🛡️ Dicionário restrito para quando o usuário força a opção "Monograma"
const MONOGRAM_SHAPES = ["SwissRing", "NeoShield", "ArchitectBracket", "PrismDiamond", "IsometricCube"];

export const generateAILogoBatch = ({
  logoType, brandColor, textColor, titleFont, niche, batchSize = 8
}: GenerateBatchParams): LogoConfig[] => {
  
  const strategy = NICHE_STRATEGY[niche] || NICHE_STRATEGY["Outro"];
  
  // Layouts disponíveis por Categoria para não bugar o LogoRenderer
  const typoLayouts = ['spaced', 'duotone', 'focal'];
  const monoLayouts = ['emblem', 'stacked', 'centered'];
  const geoLayouts = ['inline', 'stacked', 'centered'];
  
  return Array.from({ length: batchSize }).map((_, i) => {
    const uniqueId = `ai-logo-${Date.now()}-${i}`;
    
    // 🎨 Puxamos as regras semânticas do Nicho
    const grammar = strategy.visualGrammar[i % strategy.visualGrammar.length];
    
    // Alternância de contraste para o grid
    const isInverted = i % 2 !== 0;
    const primary = isInverted ? textColor : brandColor;
    const secondary = isInverted ? brandColor : textColor;

    // 🏗️ ROTEAMENTO DE ARQUITETURA
    let finalShape = 'none';
    let finalLayout = 'inline';

    if (logoType === 'tipografico') {
      finalLayout = typoLayouts[i % typoLayouts.length];
    } else if (logoType === 'monograma') {
      finalShape = MONOGRAM_SHAPES[i % MONOGRAM_SHAPES.length];
      finalLayout = monoLayouts[i % monoLayouts.length];
    } else {
      // Geométrico usa os ícones do nicho
      finalShape = strategy.shapes[i % strategy.shapes.length];
      finalLayout = geoLayouts[i % geoLayouts.length];
    }

    return {
      id: uniqueId,
      category: logoType as any,
      shapeKey: finalShape,
      layout: finalLayout as any,
      primaryColor: primary,
      secondaryColor: secondary,
      fontName: titleFont,
      styleConfig: {
        fontWeight: grammar.weight,
        letterSpacing: grammar.spacing,
        textTransform: grammar.transform,
        scale: grammar.scale,
        inverted: isInverted,
        rationale: strategy.rationale 
      } as any,
      fontUrl: "",
    };
  });
};