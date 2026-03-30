// src/app/studio/utils/presetTemplates.ts

export interface StudioTemplate {
  id: string;
  name: string;
  description: string;
  category?: string;
  theme: {
    brandColor: string;
    textColor: string;
    bgType: "solid" | "gradient";
    bgColor1: string;
    bgColor2?: string;
    bgAngle?: number;
    fontPair: "modern" | "elegant" | "impact" | "creative";
    titleFont?: string;
    bodyFont?: string;

    // Hook principal do template
    hookLayout:
      | "HOOK_COMMENT_CLEAN"
      | "HOOK_FOLLOW_IMPACT"
      | "HOOK_ICON_CENTRAL"
      | "HOOK_MOCKUP_LEAN"
      | "HOOK_PROFILE_CARD"
      | "HOOK_SAVE_MINIMAL";

    // Estilo do hook
    hookBgColor?: string;
    hookTitleColor?: string;
    hookSubtitleColor?: string;
    hookTitle?: string;
    hookSubtitle?: string;

    // Autor / perfil
    authorName?: string;
    handle?: string;
    authorAvatar?: string;

    // Imagem opcional para hook de mockup
    bgImage?: string;
  };
  slides: any[];
  transitions: any[];
}

export const PRESET_TEMPLATES: StudioTemplate[] = [
  {
    id: "tech-trends-2026",
    name: "Tendências Tech 2026",
    description: "Carrossel com cara de inovação, bastante imagem e hook voltado para seguir o perfil.",
    category: "Tecnologia",
    theme: {
      brandColor: "#00BCD4",
      textColor: "#FFFFFF",
      bgType: "gradient",
      bgColor1: "#0B1120",
      bgColor2: "#111827",
      bgAngle: 45,
      fontPair: "modern",
      hookLayout: "HOOK_FOLLOW_IMPACT",
      hookBgColor: "#07111F",
      hookTitleColor: "#00BCD4",
      hookSubtitleColor: "#CFFAFE",
      hookTitle: "SIGA PARA MAIS TENDÊNCIAS",
      hookSubtitle: "Tecnologia, IA, produto e futuro digital em conteúdos visuais e diretos.",
      authorName: "Tech Vision",
      handle: "@techvision",
      authorAvatar: "https://github.com/techvision.png"
    },
    slides: [
      { id: "tt1", layout: "COVER_MAIN", title: "TENDÊNCIAS TECH\nPARA 2026", desc: "O que vai moldar produtos, negócios e carreiras." },
      { id: "tt2", layout: "FULL_IMAGE", title: "IA COMO CAMADA\nPADRÃO", desc: "A inteligência artificial deixa de ser extra e vira expectativa do usuário.", bgImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80" },
      { id: "tt3", layout: "NUMBERED_STEP", title: "AUTOMAÇÃO MAIS\nCONTEXTUAL", desc: "Ferramentas inteligentes conectadas ao fluxo real de trabalho." },
      { id: "tt4", layout: "MEDIA_BOTTOM", title: "INTERFACES MAIS\nIMERSIVAS", desc: "Experiências multimodais, visuais e com mais percepção de contexto.", bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" },
      { id: "tt5", layout: "SOCIAL_TWEET", title: "O diferencial não será usar IA. Será saber aplicar IA com clareza e valor real.", desc: "@techvision" },
      { id: "tt6", layout: "CLASSIC", title: "MENOS HYPE,\nMAIS EXECUÇÃO", desc: "A vantagem competitiva será integrar rápido e entregar valor visível." }
    ],
    transitions: [
      { slideIndex: 1, topPos: 44, shape: "circle", shapeColor: "#00BCD4", shapeSize: 150, blur: 1 },
      { slideIndex: 3, topPos: 68, shape: "triangle", shapeColor: "#00BCD4", shapeSize: 100, blur: 0 }
    ]
  },

  {
    id: "design-system-playbook",
    name: "Design System Playbook",
    description: "Preset visual para design, produto e times que querem escalar consistência.",
    category: "Design & UX",
    theme: {
      brandColor: "#8B5CF6",
      textColor: "#FFFFFF",
      bgType: "solid",
      bgColor1: "#18181B",
      fontPair: "elegant",
      hookLayout: "HOOK_MOCKUP_LEAN",
      hookBgColor: "#140F1F",
      hookTitleColor: "#C4B5FD",
      hookSubtitleColor: "#E9D5FF",
      hookTitle: "QUER VER MAIS EXEMPLOS?",
      hookSubtitle: "Salve este conteúdo e acompanhe mais referências sobre design system e produto.",
      bgImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80"
    },
    slides: [
      { id: "ds1", layout: "COVER_SPLIT", title: "DESIGN SYSTEM\nNA PRÁTICA", desc: "Escala visual, consistência e velocidade no produto." },
      { id: "ds2", layout: "MEDIA_MOCKUP", title: "PADRÃO VISUAL\nAPLICADO", desc: "Seu design system precisa viver no produto, não só no Figma.", bgImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80" },
      { id: "ds3", layout: "CLASSIC", title: "COMECE PELAS\nFUNDAÇÕES", desc: "Tokens, grids, tipografia, estados e regras claras de uso." },
      { id: "ds4", layout: "FULL_IMAGE", title: "DOCUMENTAÇÃO\nTAMBÉM É UX", desc: "Boas decisões visuais precisam ser compreensíveis e reutilizáveis.", bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" },
      { id: "ds5", layout: "NUMBERED_STEP", title: "GOVERNANÇA\nCONSTANTE", desc: "Sem manutenção ativa, o design system vira arquivo bonito e desatualizado." },
      { id: "ds6", layout: "SOCIAL_REVIEW", title: "TIME DE PRODUTO", desc: "Depois do design system, nosso time ficou mais rápido e muito mais consistente visualmente." }
    ],
    transitions: [
      { slideIndex: 1, topPos: 52, shape: "rectangle", shapeColor: "#8B5CF6", shapeSize: 120, blur: 0 },
      { slideIndex: 4, topPos: 72, shape: "circle", shapeColor: "#8B5CF6", shapeSize: 90, blur: 1 }
    ]
  },

  {
    id: "creator-launch-formula",
    name: "Lançamento para Creators",
    description: "Preset para infoprodutos, creator economy e carrosséis que conduzem para ação.",
    category: "Marketing",
    theme: {
      brandColor: "#F97316",
      textColor: "#FFFFFF",
      bgType: "gradient",
      bgColor1: "#431407",
      bgColor2: "#7C2D12",
      bgAngle: 90,
      fontPair: "impact",
      hookLayout: "HOOK_COMMENT_CLEAN",
      hookBgColor: "#2A0F05",
      hookTitleColor: "#FDBA74",
      hookSubtitleColor: "#FFEDD5",
      hookTitle: "EU QUERO O MODELO",
      hookSubtitle: "Comente e receba a estrutura para montar seu lançamento com mais clareza.",
      authorName: "Creator Lab",
      handle: "@creatorlab",
      authorAvatar: "https://github.com/creatorlab.png"
    },
    slides: [
      { id: "cl1", layout: "COVER_MAIN", title: "COMO LANÇAR\nSEU PRODUTO", desc: "Uma estrutura mais simples para vender sem complicar." },
      { id: "cl2", layout: "MEDIA_BOTTOM", title: "ANTES DE VENDER,\nCRIE DESEJO", desc: "A audiência precisa entender por que isso importa.", bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
      { id: "cl3", layout: "SOCIAL_NOTIFICATION", title: "ERRO COMUM", desc: "Mostrar a oferta cedo demais e sem contexto." },
      { id: "cl4", layout: "NUMBERED_STEP", title: "AQUECIMENTO\nDA AUDIÊNCIA", desc: "Use dor, contraste, bastidores e transformação antes do pitch." },
      { id: "cl5", layout: "MEDIA_MOCKUP", title: "APRESENTAÇÃO\nDA OFERTA", desc: "Use visual forte para mostrar o que a pessoa recebe.", bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" },
      { id: "cl6", layout: "SOCIAL_TWEET", title: "Venda não começa no checkout. Começa quando o público percebe valor de verdade.", desc: "@creatorlab" }
    ],
    transitions: [
      { slideIndex: 1, topPos: 45, shape: "square", shapeColor: "#F97316", shapeSize: 110, blur: 0 },
      { slideIndex: 4, topPos: 66, shape: "circle", shapeColor: "#F97316", shapeSize: 80, blur: 1 }
    ]
  },

  {
    id: "healthy-routine-guide",
    name: "Rotina Saudável",
    description: "Preset leve, visual e motivacional com bastante imagem e hook de salvar.",
    category: "Lifestyle",
    theme: {
      brandColor: "#22C55E",
      textColor: "#1C1917",
      bgType: "solid",
      bgColor1: "#F0FDF4",
      fontPair: "modern",
      hookLayout: "HOOK_SAVE_MINIMAL",
      hookBgColor: "#DCFCE7",
      hookTitleColor: "#166534",
      hookSubtitleColor: "#166534",
      hookTitle: "SALVE PARA LEMBRAR",
      hookSubtitle: "Pequenos ajustes repetidos por semanas geram resultados grandes.",
      authorName: "Vida Leve",
      handle: "@vidaleve",
      authorAvatar: "https://github.com/vidaleve.png"
    },
    slides: [
      { id: "hr1", layout: "COVER_SPLIT", title: "ROTINA SAUDÁVEL\nSEM RADICALISMO", desc: "Pequenos ajustes que cabem na vida real." },
      { id: "hr2", layout: "FULL_IMAGE", title: "COMECE PELO\nMOVIMENTO", desc: "Seu corpo não precisa de perfeição. Precisa de repetição.", bgImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80" },
      { id: "hr3", layout: "NUMBERED_STEP", title: "ORGANIZE O\nAMBIENTE", desc: "Torne a escolha saudável mais fácil de acontecer." },
      { id: "hr4", layout: "MEDIA_BOTTOM", title: "SONO TAMBÉM É\nPROGRESSO", desc: "Dormir melhor melhora foco, energia e recuperação.", bgImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80" },
      { id: "hr5", layout: "SOCIAL_REVIEW", title: "EXPERIÊNCIA REAL", desc: "Quando parei de tentar fazer tudo perfeito, comecei finalmente a ter constância." },
      { id: "hr6", layout: "CLASSIC", title: "RESULTADO VEM\nDO ACÚMULO", desc: "Hábitos pequenos sustentados por meses valem mais do que explosões de motivação." }
    ],
    transitions: [
      { slideIndex: 1, topPos: 48, shape: "circle", shapeColor: "#22C55E", shapeSize: 90, blur: 1 },
      { slideIndex: 3, topPos: 70, shape: "leaf", shapeColor: "#22C55E", shapeSize: 100, blur: 0 }
    ]
  },

  {
    id: "financial-roadmap",
    name: "Roadmap Financeiro",
    description: "Template educacional para finanças com visual mais premium e hook de perfil.",
    category: "Finanças",
    theme: {
      brandColor: "#2563EB",
      textColor: "#FFFFFF",
      bgType: "gradient",
      bgColor1: "#0F172A",
      bgColor2: "#1D4ED8",
      bgAngle: 180,
      fontPair: "elegant",
      hookLayout: "HOOK_PROFILE_CARD",
      hookBgColor: "#0B1020",
      hookTitleColor: "#60A5FA",
      hookSubtitleColor: "#DBEAFE",
      hookTitle: "GOSTOU DESSE GUIA?",
      hookSubtitle: "Me siga para acompanhar mais conteúdos sobre organização e crescimento financeiro.",
      authorName: "Money Flow",
      handle: "@moneyflow",
      authorAvatar: "https://github.com/moneyflow.png"
    },
    slides: [
      { id: "fr1", layout: "COVER_MAIN", title: "SEU ROADMAP\nFINANCEIRO", desc: "Mais clareza para organizar, crescer e construir estabilidade." },
      { id: "fr2", layout: "FULL_IMAGE", title: "CLAREZA VEM\nANTES DO LUCRO", desc: "Sem enxergar a realidade atual, nenhuma estratégia se sustenta.", bgImage: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80" },
      { id: "fr3", layout: "CLASSIC", title: "MONTE SUA\nRESERVA", desc: "Segurança primeiro. Depois você acelera crescimento e risco." },
      { id: "fr4", layout: "NUMBERED_STEP", title: "INVESTIR É\nPROCESSO", desc: "Consistência vence ansiedade e tentativa de acertar timing." },
      { id: "fr5", layout: "MEDIA_BOTTOM", title: "RENDA EXTRA\nENCURTA O CAMINHO", desc: "Diversificar entrada de dinheiro muda a velocidade do jogo.", bgImage: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80" },
      { id: "fr6", layout: "SOCIAL_TWEET", title: "Organização financeira não começa no investimento. Começa na clareza.", desc: "@moneyflow" }
    ],
    transitions: [
      { slideIndex: 1, topPos: 42, shape: "coin", shapeColor: "#2563EB", shapeSize: 120, blur: 0 },
      { slideIndex: 4, topPos: 66, shape: "rectangle", shapeColor: "#2563EB", shapeSize: 110, blur: 0 }
    ]
  },

  {
    id: "remote-work-playbook",
    name: "Trabalho Remoto com Estrutura",
    description: "Preset com cara de produtividade, setup e rotina profissional.",
    category: "Carreira",
    theme: {
      brandColor: "#A855F7",
      textColor: "#FFFFFF",
      bgType: "solid",
      bgColor1: "#111827",
      fontPair: "modern",
      hookLayout: "HOOK_PROFILE_CARD",
      hookBgColor: "#0F172A",
      hookTitleColor: "#C084FC",
      hookSubtitleColor: "#EDE9FE",
      hookTitle: "QUER MAIS DICAS ASSIM?",
      hookSubtitle: "Siga para acompanhar conteúdos sobre trabalho remoto, rotina e produtividade.",
      authorName: "Remote First",
      handle: "@remotefirst",
      authorAvatar: "https://github.com/remotefirst.png"
    },
    slides: [
      { id: "rw1", layout: "COVER_SPLIT", title: "TRABALHO REMOTO\nCOM ESTRUTURA", desc: "Mais liberdade, menos caos operacional." },
      { id: "rw2", layout: "MEDIA_MOCKUP", title: "SEU SETUP\nINFLUENCIA TUDO", desc: "Ambiente visual impacta foco, energia e disciplina.", bgImage: "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=1200&q=80" },
      { id: "rw3", layout: "SOCIAL_NOTIFICATION", title: "ATENÇÃO", desc: "Estar online o tempo todo não é sinônimo de produtividade." },
      { id: "rw4", layout: "CLASSIC", title: "COMUNICAÇÃO\nASSÍNCRONA", desc: "Menos ruído, menos reunião e mais rastreabilidade." },
      { id: "rw5", layout: "FULL_IMAGE", title: "TENHA RITUAIS\nDE ENTRADA E SAÍDA", desc: "Sem fronteiras, o remoto vira trabalho sem fim.", bgImage: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80" },
      { id: "rw6", layout: "SOCIAL_REVIEW", title: "RELATO", desc: "Depois que organizei meu ambiente e rotina, parei de sentir que estava sempre trabalhando." }
    ],
    transitions: [
      { slideIndex: 1, topPos: 50, shape: "rectangle", shapeColor: "#A855F7", shapeSize: 100, blur: 0 },
      { slideIndex: 5, topPos: 70, shape: "circle", shapeColor: "#A855F7", shapeSize: 80, blur: 1 }
    ]
  },

  {
    id: "personal-brand-builder",
    name: "Marca Pessoal Forte",
    description: "Preset para autoridade, narrativa e posicionamento profissional.",
    category: "Branding",
    theme: {
      brandColor: "#EC4899",
      textColor: "#FFFFFF",
      bgType: "gradient",
      bgColor1: "#4A044E",
      bgColor2: "#831843",
      bgAngle: 135,
      fontPair: "creative",
      hookLayout: "HOOK_FOLLOW_IMPACT",
      hookBgColor: "#3B0826",
      hookTitleColor: "#F9A8D4",
      hookSubtitleColor: "#FCE7F3",
      hookTitle: "SIGA PARA MAIS POSICIONAMENTO",
      hookSubtitle: "Conteúdos sobre marca pessoal, narrativa profissional e autoridade digital.",
      authorName: "Brand Mode",
      handle: "@brandmode",
      authorAvatar: "https://github.com/brandmode.png"
    },
    slides: [
      { id: "pb1", layout: "COVER_MAIN", title: "MARCA PESSOAL\nQUE POSICIONA", desc: "Não é postar mais. É ser lembrado do jeito certo." },
      { id: "pb2", layout: "FULL_IMAGE", title: "SUA IMAGEM TAMBÉM\nCOMUNICA", desc: "Visual, estética e contexto reforçam autoridade.", bgImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80" },
      { id: "pb3", layout: "SOCIAL_TWEET", title: "Marca pessoal é o que as pessoas entendem sobre você quando você não está explicando.", desc: "@brandmode" },
      { id: "pb4", layout: "NUMBERED_STEP", title: "TENHA UM EIXO\nDE CONTEÚDO", desc: "Escolha temas recorrentes para reforçar sua especialidade." },
      { id: "pb5", layout: "MEDIA_BOTTOM", title: "PROVA VISUAL\nVALE MUITO", desc: "Cases, bastidores, prints e resultados aceleram confiança.", bgImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80" },
      { id: "pb6", layout: "CLASSIC", title: "CONSISTÊNCIA\nVENCE VOLUME", desc: "Uma identidade clara vale mais que presença confusa em todo lugar." }
    ],
    transitions: [
      { slideIndex: 1, topPos: 40, shape: "star", shapeColor: "#EC4899", shapeSize: 100, blur: 1 },
      { slideIndex: 4, topPos: 68, shape: "square", shapeColor: "#EC4899", shapeSize: 90, blur: 0 }
    ]
  },

  {
    id: "product-strategy-framework",
    name: "Estratégia de Produto",
    description: "Preset mais executivo para discovery, visão, priorização e valor de negócio.",
    category: "Produto",
    theme: {
      brandColor: "#14B8A6",
      textColor: "#FFFFFF",
      bgType: "solid",
      bgColor1: "#0F172A",
      fontPair: "modern",
      hookLayout: "HOOK_COMMENT_CLEAN",
      hookBgColor: "#09131A",
      hookTitleColor: "#5EEAD4",
      hookSubtitleColor: "#CCFBF1",
      hookTitle: "QUERO O FRAMEWORK",
      hookSubtitle: "Comente para receber a estrutura-base de estratégia, discovery e priorização.",
      authorName: "Product Notes",
      handle: "@productnotes",
      authorAvatar: "https://github.com/productnotes.png"
    },
    slides: [
      { id: "ps1", layout: "COVER_SPLIT", title: "ESTRATÉGIA DE\nPRODUTO", desc: "Decidir melhor, com mais clareza e menos ruído." },
      { id: "ps2", layout: "FULL_IMAGE", title: "COMECE PELO\nPROBLEMA REAL", desc: "Sem dor legítima, qualquer solução vira distração.", bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" },
      { id: "ps3", layout: "NUMBERED_STEP", title: "NEGÓCIO,\nUSUÁRIO E ESFORÇO", desc: "Boa priorização nasce do equilíbrio entre impacto e viabilidade." },
      { id: "ps4", layout: "MEDIA_MOCKUP", title: "VALIDE ANTES\nDE ESCALAR", desc: "Protótipos e testes cedo economizam retrabalho.", bgImage: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=1200&q=80" },
      { id: "ps5", layout: "SOCIAL_NOTIFICATION", title: "LEMBRETE DE PO", desc: "Backlog cheio não é sinônimo de estratégia madura." },
      { id: "ps6", layout: "CLASSIC", title: "VISÃO PRECISA\nSER VISUAL", desc: "Uma estratégia forte também precisa ser bem comunicada para o time." }
    ],
    transitions: [
      { slideIndex: 1, topPos: 48, shape: "triangle", shapeColor: "#14B8A6", shapeSize: 120, blur: 0 },
      { slideIndex: 3, topPos: 66, shape: "circle", shapeColor: "#14B8A6", shapeSize: 95, blur: 1 }
    ]
  },

  {
    id: "digital-nomad-guide",
    name: "Vida Nômade Digital",
    description: "Preset visual para liberdade geográfica, trabalho remoto e lifestyle.",
    category: "Lifestyle",
    theme: {
      brandColor: "#06B6D4",
      textColor: "#FFFFFF",
      bgType: "gradient",
      bgColor1: "#083344",
      bgColor2: "#155E75",
      bgAngle: 90,
      fontPair: "elegant",
      hookLayout: "HOOK_ICON_CENTRAL",
      hookBgColor: "#082F49",
      hookTitleColor: "#67E8F9",
      hookSubtitleColor: "#CFFAFE",
      hookTitle: "SALVE PARA SUA PRÓXIMA VIAGEM",
      hookSubtitle: "Planejamento, rotina e estrutura fazem a liberdade funcionar melhor.",
      authorName: "Nomad Notes",
      handle: "@nomadnotes",
      authorAvatar: "https://github.com/nomadnotes.png"
    },
    slides: [
      { id: "dn1", layout: "COVER_MAIN", title: "VIDA NÔMADE\nDIGITAL", desc: "Trabalhar de qualquer lugar exige mais estrutura do que parece." },
      { id: "dn2", layout: "FULL_IMAGE", title: "DESTINO BOM NÃO É\nSÓ O MAIS BONITO", desc: "Internet, custo de vida e rotina importam muito.", bgImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" },
      { id: "dn3", layout: "CLASSIC", title: "TENHA BASE\nFINANCEIRA", desc: "Liberdade geográfica sem reserva vira ansiedade ambulante." },
      { id: "dn4", layout: "MEDIA_BOTTOM", title: "TRABALHE COM\nPORTABILIDADE", desc: "Ferramentas, equipamentos e fluxo precisam ser leves.", bgImage: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80" },
      { id: "dn5", layout: "SOCIAL_TWEET", title: "Liberdade geográfica funciona melhor quando vem junto com disciplina.", desc: "@nomadnotes" }
    ],
    transitions: [
      { slideIndex: 1, topPos: 45, shape: "plane", shapeColor: "#06B6D4", shapeSize: 120, blur: 0 },
      { slideIndex: 3, topPos: 70, shape: "circle", shapeColor: "#06B6D4", shapeSize: 90, blur: 1 }
    ]
  },

  {
    id: "storytelling-for-content",
    name: "Storytelling para Conteúdo",
    description: "Preset emocional e visual para retenção, narrativa e conexão.",
    category: "Conteúdo",
    theme: {
      brandColor: "#F43F5E",
      textColor: "#FFFFFF",
      bgType: "solid",
      bgColor1: "#1F2937",
      fontPair: "creative",
      hookLayout: "HOOK_SAVE_MINIMAL",
      hookBgColor: "#111827",
      hookTitleColor: "#FDA4AF",
      hookSubtitleColor: "#FFE4E6",
      hookTitle: "SALVE ESTE FRAME",
      hookSubtitle: "Uma boa narrativa vale ouro quando você for criar o próximo carrossel."
    },
    slides: [
      { id: "st1", layout: "COVER_SPLIT", title: "STORYTELLING QUE\nSEGURA ATENÇÃO", desc: "Como fazer a pessoa continuar deslizando até o fim." },
      { id: "st2", layout: "FULL_IMAGE", title: "TODA BOA HISTÓRIA\nCOMEÇA EM TENSÃO", desc: "Curiosidade, contraste ou conflito criam retenção.", bgImage: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80" },
      { id: "st3", layout: "SOCIAL_REVIEW", title: "RESULTADO", desc: "Quando comecei a contar histórias reais, meu conteúdo passou a gerar muito mais conexão." },
      { id: "st4", layout: "NUMBERED_STEP", title: "CONTEXTO,\nDEPOIS ENTREGA", desc: "Segure a atenção antes de revelar a conclusão." },
      { id: "st5", layout: "MEDIA_BOTTOM", title: "FECHE COM\nIMAGEM FORTE", desc: "Mensagem e estética precisam terminar no mesmo tom.", bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
      { id: "st6", layout: "CLASSIC", title: "FRASE BONITA\nNÃO SUSTENTA SOZINHA", desc: "Sem narrativa, o conteúdo até chama atenção, mas não fica na memória." }
    ],
    transitions: [
      { slideIndex: 1, topPos: 43, shape: "star", shapeColor: "#F43F5E", shapeSize: 95, blur: 1 },
      { slideIndex: 4, topPos: 69, shape: "square", shapeColor: "#F43F5E", shapeSize: 85, blur: 0 }
    ]
  },

  {
    id: "sales-copy-framework",
    name: "Copy para Vendas",
    description: "Preset mais agressivo para oferta, percepção de valor e CTA.",
    category: "Vendas",
    theme: {
      brandColor: "#EF4444",
      textColor: "#FFFFFF",
      bgType: "solid",
      bgColor1: "#1C1917",
      fontPair: "impact",
      hookLayout: "HOOK_COMMENT_CLEAN",
      hookBgColor: "#120A0A",
      hookTitleColor: "#FCA5A5",
      hookSubtitleColor: "#FEE2E2",
      hookTitle: "EU QUERO A ESTRUTURA",
      hookSubtitle: "Comente para receber o framework base de copy, promessa e CTA.",
      authorName: "Sales Notes",
      handle: "@salesnotes",
      authorAvatar: "https://github.com/salesnotes.png"
    },
    slides: [
      { id: "sc1", layout: "COVER_MAIN", title: "COPY QUE\nVENDE MELHOR", desc: "Menos texto solto, mais direção de compra." },
      { id: "sc2", layout: "FULL_IMAGE", title: "COMECE PELA\nDOR REAL", desc: "A pessoa precisa se reconhecer no problema antes de desejar a solução.", bgImage: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80" },
      { id: "sc3", layout: "NUMBERED_STEP", title: "VENDA A\nTRANSFORMAÇÃO", desc: "Mostre o antes, o depois e o caminho." },
      { id: "sc4", layout: "SOCIAL_NOTIFICATION", title: "NÃO FAÇA ISSO", desc: "Promessa exagerada destrói credibilidade." },
      { id: "sc5", layout: "MEDIA_BOTTOM", title: "CTA FORTE,\nSEM CONFUSÃO", desc: "O próximo passo precisa estar muito claro.", bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" },
      { id: "sc6", layout: "SOCIAL_REVIEW", title: "RESULTADO", desc: "Ajustamos a copy da oferta e a conversão subiu sem precisar trocar o produto." }
    ],
    transitions: [
      { slideIndex: 1, topPos: 46, shape: "triangle", shapeColor: "#EF4444", shapeSize: 110, blur: 0 },
      { slideIndex: 4, topPos: 67, shape: "rectangle", shapeColor: "#EF4444", shapeSize: 100, blur: 0 }
    ]
  }
];