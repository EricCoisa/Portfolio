import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import ptTranslations from './locales/pt.json';

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

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
    },
    lng: detectBrowserLanguage(), // Detecta automaticamente
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
  document.documentElement.lang = lng;
});

document.documentElement.lang = i18n.language;

export default i18n;
