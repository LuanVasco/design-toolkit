// src/app/studio/utils/studioHelpers.ts

/**
 * Resolve o problema de CORS passando a imagem pelo nosso backend
 */
export const getProxyUrl = (url: string) => {
    if (!url) return "";
    
    // Se a imagem já é local, não precisa de proxy
    if (url.startsWith("/") && !url.startsWith("/api")) return url;
  
    // CORREÇÃO: Removido o "/api" duplicado
    // O caminho deve bater exatamente com a sua pasta em src/app/api/...
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  };
  
  /**
   * Padroniza as margens absolutas do carrossel (respiro de 32px)
   */
  export const posClass = (position: string) => {
    const map: Record<string, string> = {
      "top-left": "top-8 left-8 text-left justify-start",
      "top-center": "top-8 left-1/2 -translate-x-1/2 text-center justify-center",
      "top-right": "top-8 right-8 text-right justify-end flex-row-reverse",
      "bottom-left": "bottom-8 left-8 text-left justify-start",
      "bottom-center": "bottom-8 left-1/2 -translate-x-1/2 text-center justify-center",
      "bottom-right": "bottom-8 right-8 text-right justify-end flex-row-reverse"
    };
    return map[position] || "top-8 left-8 text-left justify-start";
  };