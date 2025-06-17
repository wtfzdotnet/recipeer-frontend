import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DEFAULT_LOCALE } from '@/constants/locale-config';

// Import translation resources
import enUSCommon from './locales/en-US/common.json';
import nlNLCommon from './locales/nl-NL/common.json';
import arSACommon from './locales/ar-SA/common.json';
import enUSNutrition from './locales/en-US/nutrition.json';
import nlNLNutrition from './locales/nl-NL/nutrition.json';
import arSANutrition from './locales/ar-SA/nutrition.json';
import enUSProfile from './locales/en-US/profile.json';
import nlNLProfile from './locales/nl-NL/profile.json';
import arSAProfile from './locales/ar-SA/profile.json';
import enUSCategories from './locales/en-US/categories.json';
import nlNLCategories from './locales/nl-NL/categories.json';
import arSACategories from './locales/ar-SA/categories.json';

// Translation resources
const resources = {
  'en-US': {
    common: enUSCommon,
    nutrition: enUSNutrition,
    profile: enUSProfile,
    categories: enUSCategories
  },
  'nl-NL': {
    common: nlNLCommon,
    nutrition: nlNLNutrition,
    profile: nlNLProfile,
    categories: nlNLCategories
  },
  'ar-SA': {
    common: arSACommon,
    nutrition: arSANutrition,
    profile: arSAProfile,
    categories: arSACategories
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
    fallbackLng: DEFAULT_LOCALE,
    debug: import.meta.env.DEV && !isTest,
    
    // Test configuration - set explicit language for tests
    lng: isTest ? DEFAULT_LOCALE : undefined,
    
    // Language detection options (only used in non-test environments)
    detection: !isTest ? {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'recipeer-locale',
      convertDetectedLanguage: (lng: string) => {
        // Map detected language to supported locales
        if (lng.startsWith('ar')) return 'ar-SA';
        if (lng.startsWith('nl')) return 'nl-NL';
        if (lng.startsWith('en')) return 'en-US';
        return DEFAULT_LOCALE;
      },
    } : undefined,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Default namespace
    defaultNS: 'common',
    ns: ['common', 'nutrition', 'categories', 'profile'],

    // Key separator
    keySeparator: '.',
    nsSeparator: ':',
  });

export default i18nInstance;