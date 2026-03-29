import React from 'react';

export interface ShapeProps {
  color: string;
  secondaryColor?: string;
  size?: number;
}

// ==========================================
// 🛡️ SHAPES PARA MONOGRAMAS (Molduras Arquitetônicas)
// ==========================================
export const MonogramShapes = {
  // Círculos concêntricos com espessuras diferentes (Estilo suíço)
  SwissRing: ({ color, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="2.5" />
    </svg>
  ),
  // Escudo moderno com curvas matemáticas perfeitas, não medieval
  NeoShield: ({ color, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M 50 2 L 92 18 L 92 55 C 92 78 70 95 50 98 C 30 95 8 78 8 55 L 8 18 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  // Brackets minimalistas para estúdios e dev
  ArchitectBracket: ({ color, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M 25 10 L 10 10 L 10 90 L 25 90" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square" />
      <path d="M 75 10 L 90 10 L 90 90 L 75 90" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  ),
  // Diamante com linhas de corte interno
  PrismDiamond: ({ color, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points="50,15 85,50 50,85 15,50" fill="none" stroke={color} strokeWidth="2.5" />
    </svg>
  ),
  // Cubo isométrico vazado (SaaS Moderno)
  IsometricCube: ({ color, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M 10 28 L 50 52 L 90 28 M 50 52 L 50 95" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
    </svg>
  )
};

// ==========================================
// 🌀 SHAPES GEOMÉTRICOS (Símbolos de Alta Precisão / Neo-Bauhaus)
// ==========================================
export const GeometricShapes = {
  // Spark refinado com curvas bézier perfeitas
  PrecisionSpark: ({ color, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M 50 5 C 50 40 60 50 95 50 C 60 50 50 60 50 95 C 50 60 40 50 5 50 C 40 50 50 40 50 5 Z" fill={color} />
      <circle cx="50" cy="50" r="8" fill="#020202" /> {/* Vazado no centro para respiro */}
    </svg>
  ),
  // Anéis entrelaçados (Estilo Fintech)
  InfinityRings: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="35" cy="50" r="28" fill="none" stroke={color} strokeWidth="4" />
      <circle cx="65" cy="50" r="28" fill="none" stroke={secondaryColor || color} strokeWidth="4" opacity="0.6" />
      <circle cx="50" cy="50" r="4" fill={color} />
    </svg>
  ),
  // Grid de pontos suíço (Tech/Data)
  DataMatrix: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect x="20" y="20" width="16" height="16" fill={color} />
      <rect x="42" y="20" width="16" height="16" fill={color} opacity="0.6" />
      <rect x="64" y="20" width="16" height="16" fill={secondaryColor || color} />
      
      <rect x="20" y="42" width="16" height="16" fill={color} opacity="0.6" />
      <rect x="42" y="42" width="16" height="16" fill={secondaryColor || color} />
      <rect x="64" y="42" width="16" height="16" fill={color} opacity="0.6" />
      
      <rect x="20" y="64" width="16" height="16" fill={secondaryColor || color} />
      <rect x="42" y="64" width="16" height="16" fill={color} opacity="0.6" />
      <rect x="64" y="64" width="16" height="16" fill={color} />
    </svg>
  ),
  // Orbitais assimétricos
  AsymmetricOrbit: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(30 50 50)" />
      <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(-30 50 50)" opacity="0.4" />
      <circle cx="75" cy="25" r="8" fill={secondaryColor || color} />
    </svg>
  ),
  // Rede neural abstrata
  NeuralNode: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <line x1="20" y1="50" x2="50" y2="20" stroke={color} strokeWidth="2" opacity="0.5" />
      <line x1="50" y1="20" x2="80" y2="50" stroke={color} strokeWidth="2" opacity="0.5" />
      <line x1="80" y1="50" x2="50" y2="80" stroke={color} strokeWidth="2" opacity="0.5" />
      <line x1="50" y1="80" x2="20" y2="50" stroke={color} strokeWidth="2" opacity="0.5" />
      <line x1="20" y1="50" x2="80" y2="50" stroke={color} strokeWidth="2" opacity="0.3" />
      
      <circle cx="20" cy="50" r="6" fill={color} />
      <circle cx="50" cy="20" r="8" fill={secondaryColor || color} />
      <circle cx="80" cy="50" r="6" fill={color} />
      <circle cx="50" cy="80" r="8" fill={secondaryColor || color} />
      <circle cx="50" cy="50" r="4" fill={color} />
    </svg>
  )
};

// ==========================================
// ➖ SHAPES TIPOGRÁFICOS (Acentos e Detalhes)
// ==========================================
export const TypographicAccents = {
  SharpUnderline: ({ color, size = 100 }: ShapeProps) => (
    <svg width={size} height={10} viewBox="0 0 100 10" preserveAspectRatio="none">
      <rect x="0" y="4" width="100" height="2" fill={color} />
    </svg>
  ),
  FocalDot: ({ color, size = 20 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8" fill={color} />
    </svg>
  ),
  // Uma barra oblíqua grossa, muito usada em design brutalista/arquitetura
  SlashAccent: ({ color, size = 20 }: ShapeProps) => (
    <svg width={size} height={size * 2} viewBox="0 0 20 40">
      <path d="M 15 0 L 20 0 L 5 40 L 0 40 Z" fill={color} />
    </svg>
  )
};