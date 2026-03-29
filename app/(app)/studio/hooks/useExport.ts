"use client";

import { useState } from "react";

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportToZip = async (totalSlides: number) => {
    setIsExporting(true);
    const track = document.getElementById("panoramicTrack");
    
    if (!track) {
      setIsExporting(false);
      return;
    }

    try {
      // Importações dinâmicas para não pesar o bundle inicial
      const { toJpeg } = await import("html-to-image");
      const JSZip = (await import("jszip")).default;
      const { saveAs } = await import("file-saver");

      const zip = new JSZip();
      const slidesElements = track.querySelectorAll(".carousel-slide-unit");

      for (let i = 0; i < slidesElements.length; i++) {
        const slideElement = slidesElements[i] as HTMLElement;
        
        const dataUrl = await toJpeg(slideElement, {
          quality: 0.95,
          pixelRatio: 3, 
          cacheBust: true,
        });

        const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
        zip.file(`Slide_${i + 1}.jpg`, base64Data, { base64: true });
      }

      const zipContent = await zip.generateAsync({ type: "blob" });
      saveAs(zipContent, `DesignGen_Project_${Date.now()}.zip`);
    } catch (err) {
      console.error("Erro na exportação:", err);
      alert("Houve um problema na geração do arquivo. Verifique as permissões de imagem.");
    } finally {
      setIsExporting(false);
    }
  };

  return { isExporting, exportToZip };
}