// src/app/studio/utils/exportEngine.ts
import { toBlob } from 'html-to-image';
import JSZip from 'jszip';

export const generateCarouselZip = async (
  orderedSlides: any[], 
  brandKit: any, 
  onProgress?: (progress: number, status: string) => void
): Promise<void> => {
  
  if (onProgress) onProgress(10, 'Iniciando exportação e limpando interface...');
  
  const zip = new JSZip();
  const trackElement = document.getElementById('panoramicTrack');

  if (!trackElement) {
    throw new Error('Trilho do carrossel não encontrado para exportação.');
  }

  // 1. O ESCUDO DE INTERFACE
  document.body.classList.add('exporting-mode');
  await new Promise(resolve => setTimeout(resolve, 150));

  try {
    let finalExportCount = orderedSlides.filter(s => !s.isHook).length;
    if (brandKit?.hookEnabled) {
      finalExportCount += 1;
    }

    if (onProgress) onProgress(25, `Medindo a malha de ${finalExportCount} slides...`);

    // 2. LEITURA DO TAMANHO REAL (Ignorando cortes da tela)
    // O scrollWidth e scrollHeight pegam o tamanho absoluto, ignorando o overflow: hidden!
    const trueTrackWidth = trackElement.scrollWidth;
    const trueTrackHeight = trackElement.scrollHeight;
    
    // A largura média real de cada slide no DOM
    const trueSlideWidth = trueTrackWidth / finalExportCount;

    // 3. MATEMÁTICA PARA O NOVO INSTAGRAM (Retrato 4:5 -> 1080x1350)
    // Se o slide na tela tem ~320px, precisamos multiplicar para chegar em 1080px.
    const upscaleFactor = 1080 / trueSlideWidth;

    if (onProgress) onProgress(45, 'Renderizando panorama em 4K...');
    
    // 4. CAPTURA DO PANORAMA COM FORÇA BRUTA (Evita corte inferior e lateral)
    const blobPanorama = await toBlob(trackElement, {
      width: trueTrackWidth,    // Força a largura total, mesmo o que está fora da tela
      height: trueTrackHeight,  // Força a altura total, acabando com o corte inferior
      pixelRatio: upscaleFactor, 
      style: {
        transform: 'none', 
        borderRadius: '0', 
        boxShadow: 'none',
        margin: '0',
        padding: '0'
      },
      cacheBust: true
    });

    if (!blobPanorama) throw new Error('Falha ao gerar a matriz do carrossel.');

    if (onProgress) onProgress(70, 'Fatiando imagens no formato Novo Instagram (1080x1350)...');

    // 5. O MOTOR DE FATIAMENTO IMPLACÁVEL
    const panoramaImg = new Image();
    const imgUrl = URL.createObjectURL(blobPanorama);
    
    await new Promise((resolve, reject) => {
      panoramaImg.onload = resolve;
      panoramaImg.onerror = reject;
      panoramaImg.src = imgUrl;
    });

    // Em vez de calcular pelo HTML, calculamos pelo tamanho real da imagem gerada!
    // Isso mata completamente qualquer "drift" (deslize) de corte no final.
    const sliceWidthOnSource = panoramaImg.width / finalExportCount;
    const sliceHeightOnSource = panoramaImg.height;

    // Padrão Ouro do Instagram
    const FINAL_INSTA_WIDTH = 1080;
    const FINAL_INSTA_HEIGHT = 1350;

    for (let i = 0; i < finalExportCount; i++) {
      const canvas = document.createElement('canvas');
      // Forçamos o canvas a ser rigidamente do tamanho do Instagram
      canvas.width = FINAL_INSTA_WIDTH;
      canvas.height = FINAL_INSTA_HEIGHT;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Falha ao inicializar o Canvas 2D.');

      // drawImage(img, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH)
      // Ele pega a fatia perfeita da imagem grande e preenche o canvas 1080x1350
      ctx.drawImage(
        panoramaImg, 
        i * sliceWidthOnSource, 0, sliceWidthOnSource, sliceHeightOnSource, 
        0, 0, FINAL_INSTA_WIDTH, FINAL_INSTA_HEIGHT
      );

      const slideBlob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/png', 1.0));
      
      if (slideBlob) {
        const slideNumber = String(i + 1).padStart(2, '0');
        zip.file(`${slideNumber}-slide.png`, slideBlob);
      }
    }

    URL.revokeObjectURL(imgUrl);

    if (onProgress) onProgress(85, 'Compactando arquivo final...');
    
    zip.file("00-panorama_backup.png", blobPanorama);

    // 6. Download
    const content = await zip.generateAsync({ type: 'blob' });
    const finalUrl = URL.createObjectURL(content);
    
    const link = document.createElement('a');
    link.href = finalUrl;
    link.download = `designgen_post_1080x1350_${new Date().getTime()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(finalUrl);
    if (onProgress) onProgress(100, 'Download concluído!');

  } catch (error) {
    console.error("Erro detalhado na exportação:", error);
    if (onProgress) onProgress(0, 'Erro na exportação. Verifique o console.');
    throw error;
  } finally {
    // RESTAURA A INTERFACE
    document.body.classList.remove('exporting-mode');
  }
};