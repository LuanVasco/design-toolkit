import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "./components/Global/CookieConsent";
import { Footer } from "./components/Landing/Footer";
import { AuthProvider } from "./context/AuthContext";

// 1. Imports de Contexto e Globais (Eles já são "use client" internamente)

const inter = Inter({ subsets: ["latin"] });

// Metadata funciona aqui porque este arquivo agora é um Server Component
export const metadata: Metadata = {
  title: "DesignGen OS | Estúdio Carrossel",
  description: "Motion Design de alta performance para redes sociais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-zinc-950 text-white antialiased`}>
        
        {/* O AuthProvider envolve o conteúdo, mantendo a interatividade */}
        <AuthProvider>
          
          {children}

         

          <CookieConsent />

        </AuthProvider>

      </body>
    </html>
  );
}