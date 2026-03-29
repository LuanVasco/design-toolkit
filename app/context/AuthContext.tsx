"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Tipagem do nosso Usuário Base
interface User {
  id: string;
  name: string;
  email: string;
  plan: "FREE" | "PRO" | "AGENCY";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Simula a verificação de sessão ao carregar a página (Hydration)
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("@estudiocarrossel:user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);

  // Função de Login Desacoplada
  const login = async (email: string, password: string) => {
    // Aqui você plugará a API real (Supabase, Firebase, etc.)
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser: User = {
            id: "usr_12345",
            name: "Luan",
            email: email,
            plan: "PRO", // Mockando um usuário pagante para liberar as features High-End
          };
          setUser(mockUser);
          localStorage.setItem("@estudiocarrossel:user", JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error("Credenciais inválidas."));
        }
      }, 1500); // Simulando delay de rede
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("@estudiocarrossel:user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar a importação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};