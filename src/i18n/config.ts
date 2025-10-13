import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getPortfolioData, loadPortfolioData } from '../utils/data';

const detectBrowserLanguage = (): string => {
  const savedLang = localStorage.getItem('i18nextLng');
  if (savedLang && ['pt', 'en'].includes(savedLang)) {
    return savedLang;
  }
  
  const browserLang = navigator.language || navigator.languages?.[0];
  
  if (browserLang?.toLowerCase().startsWith('pt')) {
    return 'pt';
  }
  
  return 'en';
};

/**
 * Carrega as traduções remotas dos URLs do portfolio
 */
async function loadRemoteTranslations(): Promise<{ en: Record<string, unknown>; pt: Record<string, unknown> }> {
  try {
    const portfolioData = await loadPortfolioData(true);
    
    // Busca as traduções em paralelo com cache bust
    const cacheBust = `?cacheBust=${Date.now()}`;
    const [enResponse, ptResponse] = await Promise.all([
      fetch(`${portfolioData.language.urlEn}${cacheBust}`),
      fetch(`${portfolioData.language.urlPt}${cacheBust}`)
    ]);

    if (!enResponse.ok || !ptResponse.ok) {
      throw new Error('Erro ao buscar traduções remotas');
    }

    const [enTranslations, ptTranslations] = await Promise.all([
      enResponse.json(),
      ptResponse.json()
    ]);
    console.log('Traduções carregadas:');
    return { en: enTranslations, pt: ptTranslations };
  } catch (error) {
    console.error('Erro ao carregar traduções remotas:', error);
    // Fallback para traduções vazias em caso de erro
    return { en: {}, pt: {} };
  }
}

/**
 * Inicializa o i18n com traduções remotas
 */
async function initializeI18n(): Promise<void> {
  const translations = await loadRemoteTranslations();
  console.log('Traduções carregadas:', translations);
  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: translations.en,
        },
        pt: {
          translation: translations.pt,
        },
      },
      lng: detectBrowserLanguage(),
      fallbackLng: 'pt',
      interpolation: {
        escapeValue: false,
      },
    });

  // Configura eventos após a inicialização
  i18n.on('languageChanged', (lng) => {
    localStorage.setItem('i18nextLng', lng);
    document.documentElement.lang = lng;
  });

  document.documentElement.lang = i18n.language;
}

// Promise de inicialização do i18n
export const i18nInitPromise = initializeI18n().catch((error) => {
  console.error('Erro ao inicializar i18n:', error);
  throw error;
});

export default i18n;
