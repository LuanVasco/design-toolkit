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
  loginWithGoogle: () => Promise<void>; // 👈 1. ADICIONADO AO CONTRATO
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Verificação de sessão ao carregar a página
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

  // Login Tradicional
  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser: User = {
            id: "usr_12345",
            name: "Luan",
            email: email,
            plan: "PRO",
          };
          setUser(mockUser);
          localStorage.setItem("@estudiocarrossel:user", JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error("Credenciais inválidas."));
        }
      }, 1500);
    });
  };

  // 👇 2. IMPLEMENTAÇÃO DO LOGIN COM GOOGLE (MOCK)
  const loginWithGoogle = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: "google_12345",
          name: "Luan (Google)",
          email: "luan@google.com",
          plan: "FREE",
        };
        setUser(mockUser);
        localStorage.setItem("@estudiocarrossel:user", JSON.stringify(mockUser));
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("@estudiocarrossel:user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      loginWithGoogle, // 👈 3. DISPONIBILIZADO NO PROVIDER
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};