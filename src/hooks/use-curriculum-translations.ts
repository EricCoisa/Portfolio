import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const loadCurriculumTranslations = async () => {
      setIsLoading(true);
      try {
        const language = i18n.language || 'pt';
        const module = await import(`../i18n/locales/curriculum/${language}.json`);
        setCurriculumData(module.default);
      } catch (error) {
        console.error('Erro ao carregar traduções do currículo:', error);
        // Fallback para português se o idioma não for encontrado
        try {
          const fallbackModule = await import('../i18n/locales/curriculum/pt.json');
          setCurriculumData(fallbackModule.default);
        } catch (fallbackError) {
          console.error('Erro ao carregar traduções de fallback:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCurriculumTranslations();
  }, [i18n.language]);

  return { curriculumData, isLoading };
};