import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getPortfolioData, loadPortfolioData } from '../utils/data';

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
    download: string;
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
    const loadCurriculumTranslations = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Carrega os dados do portfolio para obter as URLs
        const portfolioData = await loadPortfolioData();
        const language = i18n.language || 'pt';
        
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
        
        const translations = await response.json();
        setCurriculumData(translations);
        
      } catch (error) {
        console.error('Erro ao carregar traduções do currículo:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
        
        // Fallback: tenta carregar dados já em cache ou usar portfolio data
        const cachedPortfolioData = getPortfolioData();
        if (cachedPortfolioData) {
          try {
            const language = i18n.language || 'pt';
            const fallbackUrl = language === 'en' 
              ? cachedPortfolioData.curriculum.urlEn 
              : cachedPortfolioData.curriculum.urlPt;
            
            const fallbackResponse = await fetch(fallbackUrl);
            if (fallbackResponse.ok) {
              const fallbackTranslations = await fallbackResponse.json();
              setCurriculumData(fallbackTranslations);
              setError(null);
            }
          } catch (fallbackError) {
            console.error('Erro no fallback das traduções do currículo:', fallbackError);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCurriculumTranslations();
  }, [i18n.language]);

  return { curriculumData, isLoading, error };
};