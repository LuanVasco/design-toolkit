// Caminho: src/lib/logo-fonts.ts

// Mapeamento das melhores fontes do Google Fonts para Logos (Tier 1)
export const LOGO_FONTS = {
    // Luxo, Direito, Finanças, Marcas Premium
    serif: [
      "Playfair Display", "Merriweather", "Lora", "Cinzel", "Bodoni Moda", 
      "Cormorant Garamond", "Prata", "DM Serif Display", "Spectral"
    ],
    // Tech, Startups, Marketing, Apps Modernos
    sans: [
      "Inter", "Montserrat", "Poppins", "Outfit", "Space Grotesk", 
      "Manrope", "Plus Jakarta Sans", "Syne", "Epilogue", "Lexend"
    ],
    // Design, Criatividade, Impacto, Esportes
    display: [
      "Bebas Neue", "Righteous", "Oswald", "Anton", "Teko", 
      "Abril Fatface", "Unica One", "Russo One", "Archivo Black"
    ]
  };
  
  // Função auxiliar para injetar a fonte dinamicamente no documento
  export const loadGoogleFont = (fontName: string) => {
    const fontId = `font-${fontName.replace(/\s+/g, '-')}`;
    if (typeof document !== 'undefined' && !document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;600;800;900&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  };