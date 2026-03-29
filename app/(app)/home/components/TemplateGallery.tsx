"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PRESET_TEMPLATES, StudioTemplate } from "../../studio/utils/presetTemplates";
import { TemplateCard } from "./TemplateCard";
import { TemplatePreviewModal } from "./TemplatePreviewModal";

// 🚀 IMPORTANDO O SEU MOTOR E O CONTEXTO
import { useBrandKit } from "@/app/context/BrandKitContext";
import { useStudioLogic } from "../../studio/hooks/useStudioLogic";

export const TemplateGallery = () => {
  const router = useRouter();
  
  // 1. Puxa o contexto
  const { brandKit, updateBrandKit } = useBrandKit();
  
  // 2. 🚀 INSTANCIA O SEU HOOK EXATAMENTE COMO NO STUDIO
  const { loadTemplate } = useStudioLogic(brandKit, updateBrandKit);

  const [previewTemplate, setPreviewTemplate] = useState<StudioTemplate | null>(null);

  const handleConfirmSelection = (template: StudioTemplate) => {
    const success = loadTemplate(template.id);
    if (success) {
      setPreviewTemplate(null);
      router.push("/studio");
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRESET_TEMPLATES.map((tpl) => (
          <TemplateCard 
            key={tpl.id} 
            tpl={tpl} 
            onSelect={() => setPreviewTemplate(tpl)} 
          />
        ))}
      </div>

      <TemplatePreviewModal 
        isOpen={!!previewTemplate}
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onConfirm={handleConfirmSelection} // Dispara o fluxo direto pro seu Hook
      />
    </div>
  );
};