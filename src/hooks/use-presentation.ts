import { useEffect, useState } from 'react';
import { getPortfolioData, loadPortfolioData } from '../utils/data';
import type { PresentationData } from '../types/presentationData';
import type { PresentationCompany } from '../types/portData';

// Cache global para as apresentações das empresas
const presentationCache: Record<string, PresentationData> = {};
const loadingPromises: Record<string, Promise<PresentationData>> = {};

/**
 * Carrega dados da apresentação de uma empresa específica com cache em memória
 * Só faz fetch se não existir no cache
 */
async function loadPresentationFromCache(companyName: string): Promise<PresentationData> {
  // Normaliza o nome da empresa para lowercase para cache consistente
  const normalizedCompanyName = companyName.toLowerCase();
  
  // Se já está no cache, retorna imediatamente
  if (presentationCache[normalizedCompanyName]) {
    console.log(`Dados da apresentação para ${companyName} carregados do cache`);
    return presentationCache[normalizedCompanyName];
  }

  // Se já está carregando, retorna a promise existente
  if (loadingPromises[normalizedCompanyName]) {
    console.log(`Aguardando carregamento da apresentação em andamento (${companyName})`);
    return loadingPromises[normalizedCompanyName];
  }

  // Inicia o carregamento
  console.log(`Carregando dados da apresentação (${companyName}) do servidor...`);
  
  loadingPromises[normalizedCompanyName] = (async () => {
    try {
      // Carrega os dados do portfolio para obter o array de empresas
      const portfolioData = await loadPortfolioData();
      
      if (!portfolioData.presentation) {
        throw new Error('Array de apresentações não encontrado no PortData');
      }
      
      // Encontra a empresa pelo nome (case-insensitive)
      const company = portfolioData.presentation.find((comp: PresentationCompany) => 
        comp.name.toLowerCase() === companyName.toLowerCase()
      );

      if (!company) {
        throw new Error(`Empresa "${companyName}" não encontrada no array de apresentações`);
      }
      
      // Adiciona cache bust para garantir dados atualizados
      const cacheBust = `?cacheBust=${Date.now()}`;
      const response = await fetch(`${company.urlData}${cacheBust}`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados da apresentação: ${response.status} ${response.statusText}`);
      }
      
      const presentationData = await response.json() as PresentationData;
      console.log(`Dados da apresentação para ${companyName} carregados do servidor:`, presentationData);
      // Armazena no cache
      presentationCache[normalizedCompanyName] = presentationData;
      console.log(`Dados da apresentação (${companyName}) carregados e armazenados no cache`);
      
      return presentationData;
      
    } catch (error) {
      console.error(`Erro ao carregar dados da apresentação (${companyName}):`, error);
      throw error;
    } finally {
      // Remove da lista de promises em andamento
      delete loadingPromises[normalizedCompanyName];
    }
  })();

  return loadingPromises[normalizedCompanyName];
}

export const usePresentation = (companyName: string) => {
  const [presentationData, setPresentationData] = useState<PresentationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanyPresentation = async () => {
      if (!companyName) {
        setError('Nome da empresa é obrigatório');
        setIsLoading(false);
        return;
      }
      
      // Se já está no cache, usa imediatamente (normalizado para lowercase)
      const normalizedCompanyName = companyName.toLowerCase();
      if (presentationCache[normalizedCompanyName]) {
        setPresentationData(presentationCache[normalizedCompanyName]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const data = await loadPresentationFromCache(companyName);
        setPresentationData(data);
      } catch (error) {
        console.error('Erro ao carregar dados da apresentação:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    loadCompanyPresentation();
  }, [companyName]);

  return { presentationData, isLoading, error };
};

/**
 * Limpa o cache dos dados da apresentação
 * Útil para forçar o recarregamento
 */
export const clearPresentationCache = (companyName?: string) => {
  if (companyName) {
    const normalizedCompanyName = companyName.toLowerCase();
    delete presentationCache[normalizedCompanyName];
    delete loadingPromises[normalizedCompanyName];
    console.log(`Cache da apresentação limpo para a empresa: ${companyName}`);
  } else {
    Object.keys(presentationCache).forEach(key => delete presentationCache[key]);
    Object.keys(loadingPromises).forEach(key => delete loadingPromises[key]);
    console.log('Cache completo da apresentação limpo');
  }
};

/**
 * Retorna a lista de empresas disponíveis para apresentação
 */
export const getAvailableCompanies = async (): Promise<PresentationCompany[]> => {
  try {
    const portfolioData = await loadPortfolioData();
    return portfolioData.presentation || [];
  } catch (error) {
    console.error('Erro ao carregar lista de empresas:', error);
    return [];
  }
};