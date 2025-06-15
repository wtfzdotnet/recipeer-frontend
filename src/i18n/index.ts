import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation resources
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import enNutrition from './locales/en/nutrition.json';
import esNutrition from './locales/es/nutrition.json';

// Translation resources
const resources = {
  en: {
    common: enCommon,
    nutrition: enNutrition,
  },
  es: {
    common: esCommon,
    nutrition: esNutrition,
  },
};

const isTest = import.meta.env.VITEST;

const i18nInstance = i18n;

// Only use LanguageDetector in non-test environments
if (!isTest) {
  i18nInstance.use(LanguageDetector);
}

i18nInstance
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV && !isTest,
    
    // Test configuration - set explicit language for tests
    lng: isTest ? 'en' : undefined,
    
    // Language detection options (only used in non-test environments)
    detection: !isTest ? {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'recipeer-language',
    } : undefined,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Default namespace
    defaultNS: 'common',
    ns: ['common', 'nutrition'],

    // Key separator
    keySeparator: '.',
    nsSeparator: ':',
  });

export default i18nInstance;