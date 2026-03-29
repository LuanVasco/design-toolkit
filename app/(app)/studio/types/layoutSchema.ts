// 1. AS GRANDES CATEGORIAS (Para organizar a UI e não cansar o usuário)
export type LayoutCategory = 'COVER' | 'CONTENT' | 'MEDIA' | 'SOCIAL' | 'HOOK';

// 2. A INTERFACE DO MOTOR (A inteligência do Design Ops)
export interface SmartLayout {
  id: string;
  category: LayoutCategory;
  name: string;
  description: string;
  
  // Regras de Ocultação Automática
  hiddenWidgets: string[]; 
  
  // Controle de Sangria (Bleed) e Margens Livres
  spacing: {
    padding: 'none' | 'tight' | 'normal' | 'large';
    alignment: 'center' | 'left' | 'split';
  };
  
  // Slots que este layout consome (útil para desabilitar inputs na UI que não serão usados)
  contentSlots: ('title' | 'desc' | 'image' | 'avatar' | 'handle' | 'date')[];
}

// 3. O BANCO DE DADOS DE LAYOUTS PRÉ-MOLDADOS (Escalável ao infinito)
export const LAYOUT_DICTIONARY: Record<string, SmartLayout> = {
  
  /* --- CATEGORIA: CAPAS --- */
  "COVER_MAIN": {
    id: "COVER_MAIN",
    category: "COVER",
    name: "Impacto Máximo",
    description: "Título gigante centralizado. Remove distrações do rodapé.",
    hiddenWidgets: ["pagination", "swipe", "handle"],
    spacing: { padding: "large", alignment: "center" },
    contentSlots: ["title", "desc"]
  },
  "COVER_SPLIT": {
    id: "COVER_SPLIT",
    category: "COVER",
    name: "Editorial",
    description: "Linha de detalhe com descrição em bloco recuado.",
    hiddenWidgets: ["pagination", "swipe"],
    spacing: { padding: "normal", alignment: "left" },
    contentSlots: ["title", "desc"]
  },

  /* --- CATEGORIA: CONTEÚDO --- */
  "CLASSIC": {
    id: "CLASSIC",
    category: "CONTENT",
    name: "Leitura Clássica",
    description: "Alinhado à esquerda com hierarquia clara e respiro.",
    hiddenWidgets: [],
    spacing: { padding: "normal", alignment: "left" },
    contentSlots: ["title", "desc"]
  },
  "NUMBERED_STEP": {
    id: "NUMBERED_STEP",
    category: "CONTENT",
    name: "Passo a Passo",
    description: "Número gigante no fundo para guiar listas e tutoriais.",
    hiddenWidgets: [],
    spacing: { padding: "normal", alignment: "left" },
    contentSlots: ["title", "desc"] // O número vem do índice do array
  },

  /* --- CATEGORIA: MÍDIA --- */
  "MEDIA_BOTTOM": {
    id: "MEDIA_BOTTOM",
    category: "MEDIA",
    name: "Imagem na Base",
    description: "A imagem sangra no rodapé. Ideal para mockups e prints.",
    hiddenWidgets: ["pagination", "handle"], // Limpa o chão para a imagem
    spacing: { padding: "none", alignment: "center" },
    contentSlots: ["title", "desc", "image"]
  },
  "FULL_IMAGE": {
    id: "FULL_IMAGE",
    category: "MEDIA",
    name: "Sangria Total",
    description: "A imagem ocupa 100% da tela com gradiente escuro na base.",
    hiddenWidgets: ["handle", "author"],
    spacing: { padding: "none", alignment: "left" },
    contentSlots: ["title", "desc", "image"]
  },

  /* --- CATEGORIA: SOCIAL (Os Diferenciais de Engajamento) --- */
  "SOCIAL_TWEET": {
    id: "SOCIAL_TWEET",
    category: "SOCIAL",
    name: "Fake Tweet",
    description: "Simula uma postagem do X/Twitter flutuando na tela.",
    hiddenWidgets: ["author", "handle"], // Omitidos pois o card do Tweet já os possui
    spacing: { padding: "normal", alignment: "center" },
    contentSlots: ["title", "desc", "image"] 
  },
  "SOCIAL_NOTIFICATION": {
    id: "SOCIAL_NOTIFICATION",
    category: "SOCIAL",
    name: "Lembrete iOS",
    description: "Caixa de notificação minimalista estilo iPhone.",
    hiddenWidgets: ["author"],
    spacing: { padding: "tight", alignment: "center" },
    contentSlots: ["title", "desc"]
  }
};

// Helper para a UI agrupar as opções facilmente na barra lateral
export const getLayoutsByCategory = () => {
  const grouped: Record<string, SmartLayout[]> = {
    COVER: [], CONTENT: [], MEDIA: [], SOCIAL: [], HOOK: []
  };
  
  Object.values(LAYOUT_DICTIONARY).forEach(layout => {
    grouped[layout.category].push(layout);
  });
  
  return grouped;
};