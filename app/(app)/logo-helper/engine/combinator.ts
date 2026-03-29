import { MonogramShapes, GeometricShapes, TypographicAccents } from "@/app/components/logo-engine/Shapes";

export type MacroCategory = 'monograma' | 'tipografico' | 'geometrico';
export type LayoutType = 'stacked' | 'inline' | 'emblem' | 'duotone' | 'focal' | 'spaced';

export interface LogoConfig {
  id: string;
  category: MacroCategory;
  fontName: string;
  shapeKey: string;
  layout: LayoutType;
  primaryColor: string;
  secondaryColor: string;
}

export const adjustColor = (color: string, amount: number) => {
  return '#' + color.replace(/^#/, '').replace(/../g, c => ('0'+Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)).substr(-2));
};

// ==========================================
// 🚀 MOTOR DE PERMUTAÇÃO (Zero Repetições)
// ==========================================
export const generateDeterministicBatch = (
  category: MacroCategory, 
  baseColor: string, 
  baseFont: string
): LogoConfig[] => {
  const batch: LogoConfig[] = [];
  const secondaryColor = adjustColor(baseColor, -40); // Cor de profundidade padrão

  if (category === 'geometrico') {
    const shapes = Object.keys(GeometricShapes);
    const layouts: LayoutType[] = ['stacked', 'inline'];
    
    // Cruza todos os Shapes com todos os Layouts (ex: 5 shapes x 2 layouts = 10 logos únicos)
    shapes.forEach((shape, index) => {
      layouts.forEach((layout, lIndex) => {
        batch.push({
          id: `geo-${index}-${lIndex}`,
          category, fontName: baseFont, shapeKey: shape, layout,
          primaryColor: baseColor, secondaryColor
        });
      });
    });
  } 
  else if (category === 'monograma') {
    const shapes = Object.keys(MonogramShapes);
    shapes.forEach((shape, index) => {
      batch.push({
        id: `mono-${index}`,
        category, fontName: baseFont, shapeKey: shape, layout: 'emblem',
        primaryColor: baseColor, secondaryColor
      });
    });
  } 
  else if (category === 'tipografico') {
    const layouts: LayoutType[] = ['duotone', 'focal', 'spaced'];
    layouts.forEach((layout, index) => {
      batch.push({
        id: `typo-${index}`,
        category, fontName: baseFont, shapeKey: 'none', layout,
        primaryColor: baseColor, secondaryColor
      });
    });
  }

  // Embaralha o array final para não mostrar sempre na mesma ordem, mas as opções são únicas!
  return batch.sort(() => Math.random() - 0.5);
};