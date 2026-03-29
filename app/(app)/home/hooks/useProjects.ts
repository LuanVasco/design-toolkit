import { useState, useEffect } from 'react';
import { CarouselProject } from '../types/project';

export function useProjects() {
  const [projects, setProjects] = useState<CarouselProject[]>([]);

  // Carregar projetos ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('designgen_projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  const saveProject = (project: CarouselProject) => {
    const updated = [...projects.filter(p => p.id !== project.id), project];
    setProjects(updated);
    localStorage.setItem('designgen_projects', JSON.stringify(updated));
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('designgen_projects', JSON.stringify(updated));
  };

  return { projects, saveProject, deleteProject };
}