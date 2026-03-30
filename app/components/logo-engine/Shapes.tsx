import React from 'react';

export interface ShapeProps {
  color: string;
  secondaryColor?: string;
  size?: number;
  style?: 'solid' | 'outline' | 'duotone'; // Preparado para o futuro
}

// ==========================================
// 🛡️ SHAPES PARA MONOGRAMAS (Molduras)
// ==========================================
export const MonogramShapes = {
  SwissRing: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke={secondaryColor || color} strokeWidth="1" opacity="0.3" />
      <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="3" />
    </svg>
  ),
  NeoShield: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M 50 2 L 92 18 L 92 55 C 92 78 70 95 50 98 C 30 95 8 78 8 55 L 8 18 Z" fill={secondaryColor ? `${secondaryColor}20` : 'none'} stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  ArchitectBracket: ({ color, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M 30 10 L 10 10 L 10 90 L 30 90" fill="none" stroke={color} strokeWidth="3" strokeLinecap="square" />
      <path d="M 70 10 L 90 10 L 90 90 L 70 90" fill="none" stroke={color} strokeWidth="3" strokeLinecap="square" />
    </svg>
  ),
  PrismDiamond: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={secondaryColor || color} strokeWidth="1.5" opacity="0.5" />
      <polygon points="50,15 85,50 50,85 15,50" fill="none" stroke={color} strokeWidth="3" />
    </svg>
  ),
  IsometricCube: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 10 28 L 50 52 L 90 28 M 50 52 L 50 95" fill="none" stroke={secondaryColor || color} strokeWidth="2.5" opacity="0.5" />
    </svg>
  )
};

// ==========================================
// 🌀 SHAPES GEOMÉTRICOS (Ícones de Nicho)
// ==========================================
export const GeometricShapes = {
  PrecisionSpark: ({ color, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M 50 5 C 50 40 60 50 95 50 C 60 50 50 60 50 95 C 50 60 40 50 5 50 C 40 50 50 40 50 5 Z" fill={color} />
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.5" /> 
    </svg>
  ),
  InfinityRings: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="35" cy="50" r="28" fill="none" stroke={color} strokeWidth="5" />
      <circle cx="65" cy="50" r="28" fill="none" stroke={secondaryColor || color} strokeWidth="5" opacity="0.6" />
      <circle cx="50" cy="50" r="5" fill={color} />
    </svg>
  ),
  DataMatrix: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect x="20" y="20" width="16" height="16" fill={color} rx="4" />
      <rect x="42" y="20" width="16" height="16" fill={color} rx="4" opacity="0.5" />
      <rect x="64" y="20" width="16" height="16" fill={secondaryColor || color} rx="4" />
      
      <rect x="20" y="42" width="16" height="16" fill={color} rx="4" opacity="0.5" />
      <rect x="42" y="42" width="16" height="16" fill={secondaryColor || color} rx="4" />
      <rect x="64" y="42" width="16" height="16" fill={color} rx="4" opacity="0.5" />
      
      <rect x="20" y="64" width="16" height="16" fill={secondaryColor || color} rx="4" />
      <rect x="42" y="64" width="16" height="16" fill={color} rx="4" opacity="0.5" />
      <rect x="64" y="64" width="16" height="16" fill={color} rx="4" />
    </svg>
  ),
  AsymmetricOrbit: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke={color} strokeWidth="2.5" transform="rotate(35 50 50)" />
      <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke={secondaryColor || color} strokeWidth="2.5" transform="rotate(-35 50 50)" opacity="0.5" />
      <circle cx="80" cy="30" r="8" fill={color} />
    </svg>
  ),
  NeuralNode: ({ color, secondaryColor, size = 100 }: ShapeProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <line x1="20" y1="50" x2="50" y2="20" stroke={secondaryColor || color} strokeWidth="2.5" opacity="0.6" />
      <line x1="50" y1="20" x2="80" y2="50" stroke={color} strokeWidth="2.5" />
      <line x1="80" y1="50" x2="50" y2="80" stroke={secondaryColor || color} strokeWidth="2.5" opacity="0.6" />
      <line x1="50" y1="80" x2="20" y2="50" stroke={color} strokeWidth="2.5" />
      <line x1="20" y1="50" x2="80" y2="50" stroke={color} strokeWidth="2.5" opacity="0.3" />
      
      <circle cx="20" cy="50" r="8" fill={color} />
      <circle cx="50" cy="20" r="10" fill={secondaryColor || color} />
      <circle cx="80" cy="50" r="8" fill={color} />
      <circle cx="50" cy="80" r="10" fill={secondaryColor || color} />
      <circle cx="50" cy="50" r="5" fill={color} />
    </svg>
  )
};