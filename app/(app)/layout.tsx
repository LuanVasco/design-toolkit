// src/app/(app)/layout.tsx
"use client";

import Sidebar from "../components/Sidebar";
import { BrandKitProvider } from "../context/BrandKitContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Proteção de Rota: Se não estiver logado, tchau!
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return <div className="h-screen bg-slate-950 flex items-center justify-center">...</div>;
  }

  return (
    <BrandKitProvider>
      {/* Aqui aplicamos o SEU layout particular: h-screen e flex */}
      <div className="h-screen flex overflow-hidden">
        
        <Sidebar />

        <main className="flex-grow relative overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black">
          <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none"></div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
        
      </div>
    </BrandKitProvider>
  );
}