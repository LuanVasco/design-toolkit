"use client";

import { useState, useCallback, useRef } from "react";

export function useHistory<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [pointer, setPointer] = useState(0);
  const pointerRef = useRef(0);
  // Ref para acessar o histórico de forma síncrona
  const historyRef = useRef<T[]>([initialState]);

  const commit = useCallback((newState: T) => {
    // Evita commits de estados idênticos (opcional, mas recomendado)
    if (JSON.stringify(newState) === JSON.stringify(historyRef.current[pointerRef.current])) {
      return;
    }

    const currentP = pointerRef.current;
    
    setHistory(prev => {
      const cleanHistory = prev.slice(0, currentP + 1);
      const updated = [...cleanHistory, newState].slice(-30);
      historyRef.current = updated; // Sincroniza a Ref
      return updated;
    });

    const nextP = Math.min(currentP + 1, 29);
    setPointer(nextP);
    pointerRef.current = nextP;
  }, []);

  const undo = useCallback(() => {
    if (pointerRef.current > 0) {
      const newP = pointerRef.current - 1;
      pointerRef.current = newP;
      setPointer(newP);
      return historyRef.current[newP]; // Usa a Ref para garantir o dado real
    }
    return null;
  }, []); // Removemos a dependência de history para performance

  const redo = useCallback(() => {
    if (pointerRef.current < historyRef.current.length - 1) {
      const newP = pointerRef.current + 1;
      pointerRef.current = newP;
      setPointer(newP);
      return historyRef.current[newP];
    }
    return null;
  }, []);

  return { 
    commit, 
    undo, 
    redo, 
    canUndo: pointer > 0, 
    canRedo: pointer < history.length - 1 
  };
}