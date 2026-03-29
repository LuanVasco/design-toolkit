import { useEffect, useState } from "react";
import { useMotionValue, MotionValue } from "framer-motion";

export function useCanvasControls(
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>
) {
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  
  // Variáveis de movimento (Pan) injetáveis no Framer Motion
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Evita disparar atalhos se o usuário estiver digitando um texto no slide
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      // 1. ESPAÇO: Ativa a "mãozinha" para arrastar a tela (Padrão Figma)
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault(); // Evita que a página role para baixo
        setIsSpacePressed(true);
      }

      // 2. ZOOM: Ctrl/Cmd + e Ctrl/Cmd -
      if ((e.ctrlKey || e.metaKey) && (e.key === "=" || e.key === "+")) {
        e.preventDefault(); // Bloqueia o zoom nativo do Chrome/Safari
        setZoomLevel((z) => Math.min(200, z + 25));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        setZoomLevel((z) => Math.max(25, z - 25));
      }
      
      // 3. RESET DE VISUALIZAÇÃO: Ctrl/Cmd + 0
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        setZoomLevel(100);
        panX.set(0); // Zera o movimento X
        panY.set(0); // Zera o movimento Y
      }

      // 4. PAN (MOVIMENTAÇÃO EM TELA): Setas do teclado
      const PAN_SPEED = 60; // Velocidade do salto em pixels
      if (e.key === "ArrowUp") panY.set(panY.get() + PAN_SPEED);
      if (e.key === "ArrowDown") panY.set(panY.get() - PAN_SPEED);
      if (e.key === "ArrowLeft") panX.set(panX.get() + PAN_SPEED);
      if (e.key === "ArrowRight") panX.set(panX.get() - PAN_SPEED);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpacePressed(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // 5. ZOOM CONTÍNUO: Ctrl/Cmd + Scroll do Trackpad/Mouse
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); // Bloqueia o zoom nativo
        if (e.deltaY > 0) {
          setZoomLevel((z) => Math.max(25, z - 10)); // Afasta
        } else {
          setZoomLevel((z) => Math.min(200, z + 10)); // Aproxima
        }
      }
    };

    // { passive: false } é obrigatório para o e.preventDefault() funcionar no wheel
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [setZoomLevel, panX, panY]);

  return { isSpacePressed, panX, panY };
}