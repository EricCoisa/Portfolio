import { useEffect, useState } from 'react';
import { loadPortfolioData } from '../utils/data';
import type { ProjectData } from '../types/projectData';
import type { ProjectItem } from '../types/portData';
import { fetchData } from '@/utils/fetchData';

// Cache global para os dados dos projetos
const projectCache: Record<string, ProjectData> = {};
const loadingPromises: Record<string, Promise<ProjectData>> = {};

/**
 * Carrega dados de um projeto específico com cache em memória
 * Só faz fetch se não existir no cache
 */
async function loadProjectFromCache(projectName: string): Promise<ProjectData> {
  // Normaliza o nome do projeto para lowercase para cache consistente
  const normalizedProjectName = projectName.toLowerCase();
  
  // Se já está no cache, retorna imediatamente
  if (projectCache[normalizedProjectName]) {
    return projectCache[normalizedProjectName];
  }

  // Se já está carregando, retorna a promise existente
  if (loadingPromises[normalizedProjectName]) {
    return loadingPromises[normalizedProjectName];
  }

  loadingPromises[normalizedProjectName] = (async () => {
    try {
      // Carrega os dados do portfolio para obter o array de projetos
      const portfolioData = await loadPortfolioData();
      
      if (!portfolioData.projects) {
        throw new Error('Array de projetos não encontrado no PortData');
      }
      
      // Encontra o projeto pelo nome (case-insensitive)
      const project = portfolioData.projects.find((proj: ProjectItem) => 
        proj.name.toLowerCase() === projectName.toLowerCase()
      );

      if (!project) {
        throw new Error(`Projeto "${projectName}" não encontrado no array de projetos`);
      }
      
      // Adiciona cache bust para garantir dados atualizados
      const cacheBust = `?cacheBust=${Date.now()}`;
      const response = await fetchData(`${project.urlData}${cacheBust}`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados do projeto: ${response.status} ${response.statusText}`);
      }
      
      const projectData = await response.json() as ProjectData;
      
      // Armazena no cache
      projectCache[normalizedProjectName] = projectData;
      
      return projectData;
      
    } catch (error) {
      console.error(`Erro ao carregar dados do projeto (${projectName}):`, error);
      throw error;
    } finally {
      // Remove da lista de promises em andamento
      delete loadingPromises[normalizedProjectName];
    }
  })();

  return loadingPromises[normalizedProjectName];
}

/**
 * Hook para carregar dados de um projeto específico
 */
export const useProject = (projectName: string) => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (!projectName) {
        setError('Nome do projeto é obrigatório');
        setIsLoading(false);
        return;
      }
      
      // Se já está no cache, usa imediatamente (normalizado para lowercase)
      const normalizedProjectName = projectName.toLowerCase();
      if (projectCache[normalizedProjectName]) {
        setProjectData(projectCache[normalizedProjectName]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const data = await loadProjectFromCache(projectName);
        setProjectData(data);
      } catch (error) {
        console.error('Erro ao carregar dados do projeto:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [projectName]);

  return { projectData, isLoading, error };
};

/**
 * Hook para carregar lista de todos os projetos
 */
export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllProjects = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const portfolioData = await loadPortfolioData();
        
        if (!portfolioData.projects || portfolioData.projects.length === 0) {
          setProjects([]);
          setIsLoading(false);
          return;
        }

        // Carrega todos os projetos em paralelo
        const projectPromises = portfolioData.projects.map((project: ProjectItem) => 
          loadProjectFromCache(project.name)
        );

        const loadedProjects = await Promise.all(projectPromises);
        
        // Filtra apenas projetos públicos e ordena por featured
        const publicProjects = loadedProjects
          .filter(p => p.metadata.visibility === 'public')
          .sort((a, b) => {
            // Featured primeiro
            if (a.metadata.featured && !b.metadata.featured) return -1;
            if (!a.metadata.featured && b.metadata.featured) return 1;
            // Depois por data de atualização (mais recente primeiro)
            const dateA = a.metadata.updatedAt || a.metadata.createdAt || '';
            const dateB = b.metadata.updatedAt || b.metadata.createdAt || '';
            return dateB.localeCompare(dateA);
          });

        setProjects(publicProjects);
      } catch (error) {
        console.error('Erro ao carregar lista de projetos:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    loadAllProjects();
  }, []);

  return { projects, isLoading, error };
};

/**
 * Limpa o cache dos dados do projeto
 * Útil para forçar o recarregamento
 */
export const clearProjectCache = (projectName?: string) => {
  if (projectName) {
    const normalizedProjectName = projectName.toLowerCase();
    delete projectCache[normalizedProjectName];
    delete loadingPromises[normalizedProjectName];
  } else {
    Object.keys(projectCache).forEach(key => delete projectCache[key]);
    Object.keys(loadingPromises).forEach(key => delete loadingPromises[key]);
  }
};

/**
 * Retorna a lista de projetos disponíveis (apenas metadados)
 */
export const getAvailableProjects = async (): Promise<ProjectItem[]> => {
  try {
    const portfolioData = await loadPortfolioData();
    return portfolioData.projects || [];
  } catch (error) {
    console.error('Erro ao carregar lista de projetos:', error);
    return [];
  }
};

/**
 * Retorna os dados completos de múltiplos projetos
 */
export const getProjectsByNames = async (projectNames: string[]): Promise<ProjectData[]> => {
  try {
    const promises = projectNames.map(name => loadProjectFromCache(name));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
    return [];
  }
};
