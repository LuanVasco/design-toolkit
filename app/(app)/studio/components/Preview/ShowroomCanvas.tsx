"use client";

import React from "react";
import { SlideWrapper } from "./SlideWrapper";

interface ShowroomCanvasProps {
  slides: any[];
}

export const ShowroomCanvas = ({ slides }: ShowroomCanvasProps) => {
  return (
    // 🚀 EXATAMENTE AS MESMAS CLASSES DO SEU CANVAS.TSX ORIGINAL
    <div id="panoramicTrack" className="flex items-center gap-5">
      {slides.map((slide, idx) => (
        <div key={slide.id || idx} className="shrink-0 cursor-default">
          <SlideWrapper
            i={idx}
            item={slide}
            totalSlidesCount={slides.length}
            
            // 🔒 TRAVAS DA VITRINE (Obrigatório para limpar a sujeira)
            isReadOnly={true}      
            showSafeZones={false}  
            isSimulator={false}    
            hoveredSlide={null}    
          />
        </div>
      ))}
    </div>
  );
};