import { fetchPortfolioData } from './gistUtil';
import type { PortData } from '../types/portData';

// Variável global para armazenar os dados do portfolio
let portfolioData: PortData | null = null;
let isLoading = false;
let loadPromise: Promise<PortData> | null = null;

/**
 * Carrega os dados do portfolio e armazena globalmente
 * Garante que os dados são carregados apenas uma vez
 * @param force - Se true, ignora o cache e força o recarregamento
 */
export async function loadPortfolioData(force?: boolean): Promise<PortData> {
  // Se force = true, limpa o cache e recarrega
  if (force) {
    portfolioData = null;
    loadPromise = null;
    isLoading = false;
  }

  // Se já estamos carregando, retorna a promise existente
  if (loadPromise) {
    return loadPromise;
  }

  // Se já carregamos e não é force, retorna os dados cached
  if (portfolioData && !force) {
    return portfolioData;
  }

  // Inicia o carregamento
  isLoading = true;
  loadPromise = fetchPortfolioData()
    .then((data) => {
      portfolioData = data;
      isLoading = false;
      return data;
    })
    .catch((error) => {
      isLoading = false;
      loadPromise = null; // Permite tentar novamente em caso de erro
      throw error;
    });

  return loadPromise;
}

/**
 * Retorna os dados do portfolio se já foram carregados
 * Caso contrário, retorna null
 */
export function getPortfolioData(): PortData | null {
  return portfolioData;
}

/**
 * Verifica se os dados estão sendo carregados
 */
export function isPortfolioDataLoading(): boolean {
  return isLoading;
}

/**
 * Força o recarregamento dos dados do portfolio
 * @param force - Se true, ignora o cache do browser usando cacheBust
 */
export async function reloadPortfolioData(force = true): Promise<PortData> {
  portfolioData = null;
  isLoading = false;
  loadPromise = null;
  
  // Inicia o carregamento com force
  isLoading = true;
  loadPromise = fetchPortfolioData()
    .then((data) => {
      portfolioData = data;
      isLoading = false;
      return data;
    })
    .catch((error) => {
      isLoading = false;
      loadPromise = null;
      throw error;
    });

  return loadPromise;
}

// Carrega os dados automaticamente quando o módulo é importado
loadPortfolioData().catch((error) => {
  console.error('Erro no carregamento automático dos dados do portfolio:', error);
});