// Versão de produção - usa fetch normal
export async function fetchData(url: string, options?: RequestInit): Promise<Response> {
  return await fetch(url, options);
}