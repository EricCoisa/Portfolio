import type { PortData } from '../types/portData';
import { fetchData } from '@/utils/fetchData';

/**
 * Busca um arquivo específico de um Gist do GitHub
 * @param gistId - ID do Gist (ex: "4bed75913f2665bcfe62c46279bf73ff")
 * @param fileName - Nome do arquivo (ex: "portData.json")
 * @param commitHash - Hash específico do commit (opcional, ex: "d15df715e344147eb266f58bd89abaff3659ca89")
 * @param force - Força o recarregamento ignorando o cache do browser (adiciona cacheBust)
 * @returns Promise com o conteúdo do arquivo
 */
export async function fetchGistFile(gistId: string, fileName: string, commitHash?: string, force?: boolean): Promise<unknown> {
  try {
    let url = commitHash 
      ? `https://gist.githubusercontent.com/EricCoisa/${gistId}/raw/${commitHash}/${fileName}`
      : `https://gist.githubusercontent.com/EricCoisa/${gistId}/raw/${fileName}`;
    
    // Adiciona cache bust se force for true
    if (force) {
      url += `?cacheBust=${Date.now()}`;
    }
    
  const response = await fetchData(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar arquivo do Gist: ${response.status} ${response.statusText}`);
    }
    
    // Tenta fazer parse como JSON, caso contrário retorna como texto
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('Erro ao buscar arquivo do Gist:', error);
    throw error;
  }
}

/**
 * Busca múltiplos arquivos de um Gist
 * @param gistId - ID do Gist
 * @param fileNames - Array com os nomes dos arquivos
 * @param commitHash - Hash específico do commit (opcional)
 * @param force - Força o recarregamento ignorando o cache do browser
 * @returns Promise com objeto contendo os arquivos
 */
export async function fetchMultipleGistFiles(gistId: string, fileNames: string[], commitHash?: string, force?: boolean): Promise<Record<string, unknown>> {
  try {
    const promises = fileNames.map(fileName => 
      fetchGistFile(gistId, fileName, commitHash, force).then(content => ({ [fileName]: content }))
    );
    
    const results = await Promise.all(promises);
    return results.reduce((acc, result) => ({ ...acc, ...result }), {});
  } catch (error) {
    console.error('Erro ao buscar múltiplos arquivos do Gist:', error);
    throw error;
  }
}


/**
 * Busca dados do portfolio do Gist específico e retorna tipado como PortData
 * @param force - Força o recarregamento ignorando o cache do browser
 */
export async function fetchPortfolioData(): Promise<PortData> {
  const data = await fetchGistFile('4bed75913f2665bcfe62c46279bf73ff', 'portData.json', undefined, true);
  // Garante que o dado é do tipo PortData
  if (typeof data === 'string') {
    // Se vier como texto, tenta converter para JSON
    return JSON.parse(data) as PortData;
  }
  return data as PortData;
}
