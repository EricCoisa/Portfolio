import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getPortfolioData, loadPortfolioData } from '../utils/data';

// Cache global para as traduções do currículo
const curriculumCache: Record<string, CurriculumTranslations> = {};
const loadingPromises: Record<string, Promise<CurriculumTranslations>> = {};

/**
 * Carrega traduções do currículo com cache em memória
 * Só faz fetch se não existir no cache
 */
async function loadCurriculumFromCache(language: string): Promise<CurriculumTranslations> {
  // Se já está no cache, retorna imediatamente
  if (curriculumCache[language]) {
    console.log(`Traduções do currículo (${language}) carregadas do cache`);
    return curriculumCache[language];
  }

  // Se já está carregando, retorna a promise existente
  if (loadingPromises[language]) {
    console.log(`Aguardando carregamento em andamento (${language})`);
    return loadingPromises[language];
  }

  // Inicia o carregamento
  console.log(`Carregando traduções do currículo (${language}) do servidor...`);
  
  loadingPromises[language] = (async () => {
    try {
      // Carrega os dados do portfolio para obter as URLs
      const portfolioData = await loadPortfolioData();
      
      // Seleciona a URL correta baseada no idioma
      const curriculumUrl = language === 'en' 
        ? portfolioData.curriculum.urlEn 
        : portfolioData.curriculum.urlPt;
      
      // Adiciona cache bust para garantir dados atualizados
      const cacheBust = `?cacheBust=${Date.now()}`;
      const response = await fetch(`${curriculumUrl}${cacheBust}`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar traduções do currículo: ${response.status} ${response.statusText}`);
      }
      
      const translations = await response.json() as CurriculumTranslations;
      
      // Armazena no cache
      curriculumCache[language] = translations;
      console.log(`Traduções do currículo (${language}) carregadas e armazenadas no cache`);
      
      return translations;
      
    } catch (error) {
      console.error(`Erro ao carregar traduções do currículo (${language}):`, error);
      throw error;
    } finally {
      // Remove da lista de promises em andamento
      delete loadingPromises[language];
    }
  })();

  return loadingPromises[language];
}

// Tipos para as traduções do currículo
export interface CurriculumTranslations {
  header: {
    name: string;
    title: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    website: string;
  };
  sections: {
    summary: {
      title: string;
      content: string;
    };
    experience: {
      title: string;
      jobs: Array<{
        company: string;
        position: string;
        period: string;
        location: string;
        description: string;
        achievements: string[];
      }>;
    };
    education: {
      title: string;
      courses: Array<{
        institution: string;
        degree: string;
        period: string;
        status: string;
      }>;
    };
    skills: {
      title: string;
      categories: Array<{
        name: string;
        items: string[];
      }>;
    };
    projects: {
      title: string;
      technologies: string;
      highlights: string;
      list: Array<{
        name: string;
        description: string;
        technologies: string[];
        highlights: string[];
      }>;
    };
    certifications: {
      title: string;
      list: Array<{
        name: string;
        issuer: string;
        year: string;
      }>;
    };
    languages: {
      title: string;
      list: Array<{
        language: string;
        level: string;
      }>;
    };
  };
  actions: {
    print: string;
    back: string;
  };
}

export const useCurriculumTranslations = () => {
  const { i18n } = useTranslation();
  const [curriculumData, setCurriculumData] = useState<CurriculumTranslations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const language = i18n.language || 'pt';
      
      // Se já está no cache, usa imediatamente
      if (curriculumCache[language]) {
        setCurriculumData(curriculumCache[language]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const translations = await loadCurriculumFromCache(language);
        setCurriculumData(translations);
      } catch (error) {
        console.error('Erro ao carregar traduções do currículo:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [i18n.language]);

  return { curriculumData, isLoading, error };
};

/**
 * Limpa o cache das traduções do currículo
 * Útil para forçar o recarregamento
 */
export const clearCurriculumCache = (language?: string) => {
  if (language) {
    delete curriculumCache[language];
    delete loadingPromises[language];
    console.log(`Cache do currículo limpo para o idioma: ${language}`);
  } else {
    Object.keys(curriculumCache).forEach(key => delete curriculumCache[key]);
    Object.keys(loadingPromises).forEach(key => delete loadingPromises[key]);
    console.log('Cache completo do currículo limpo');
  }
};