import { LocaleConfig, SupportedLocale, UnitConversion } from '@/types/locale.types';

/**
 * Supported locale configurations with measurement systems and currency defaults
 */
export const LOCALE_CONFIGS: Record<SupportedLocale, LocaleConfig> = {
  'en-US': {
    locale: 'en-US',
    name: 'English (United States)',
    flag: '🇺🇸',
    measurementSystem: 'imperial',
    currency: 'USD',
    dir: 'ltr',
    dateFormat: 'MM/dd/yyyy',
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
  'nl-NL': {
    locale: 'nl-NL',
    name: 'Nederlands (Nederland)', 
    flag: '🇳🇱',
    measurementSystem: 'metric',
    currency: 'EUR',
    dir: 'ltr',
    dateFormat: 'dd-MM-yyyy',
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
};

/**
 * Default locale fallback
 */
export const DEFAULT_LOCALE: SupportedLocale = 'en-US';

/**
 * Currency symbols mapping
 */
export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
} as const;

/**
 * Unit conversion utilities
 */
export const UNIT_CONVERSIONS: UnitConversion = {
  temperature: {
    celsiusToFahrenheit: (celsius: number) => (celsius * 9/5) + 32,
    fahrenheitToCelsius: (fahrenheit: number) => (fahrenheit - 32) * 5/9,
  },
  
  weight: {
    gramsToOunces: (grams: number) => grams * 0.035274,
    ouncesToGrams: (ounces: number) => ounces / 0.035274,
    kilogramsToPounds: (kg: number) => kg * 2.20462,
    poundsToKilograms: (pounds: number) => pounds / 2.20462,
  },
  
  volume: {
    millilitersToCups: (ml: number) => ml * 0.00422675,
    cupsToMilliliters: (cups: number) => cups / 0.00422675,
    litersToFluidOunces: (liters: number) => liters * 33.814,
    fluidOuncesToLiters: (flOz: number) => flOz / 33.814,
  },
  
  length: {
    centimetersToInches: (cm: number) => cm * 0.393701,
    inchesToCentimeters: (inches: number) => inches / 0.393701,
    metersToFeet: (meters: number) => meters * 3.28084,
    feetToMeters: (feet: number) => feet / 3.28084,
  },
};

/**
 * Get locale configuration by locale code
 */
export const getLocaleConfig = (locale: SupportedLocale): LocaleConfig => {
  return LOCALE_CONFIGS[locale] || LOCALE_CONFIGS[DEFAULT_LOCALE];
};

/**
 * Get all available locales
 */
export const getAvailableLocales = (): LocaleConfig[] => {
  return Object.values(LOCALE_CONFIGS);
};

/**
 * Detect browser locale and map to supported locale
 */
export const detectBrowserLocale = (): SupportedLocale => {
  const browserLang = navigator.language || navigator.languages?.[0];
  
  if (browserLang?.startsWith('nl')) {
    return 'nl-NL';
  }
  
  if (browserLang?.startsWith('en')) {
    return 'en-US';
  }
  
  return DEFAULT_LOCALE;
};

/**
 * Format currency based on locale and currency type
 */
export const formatCurrency = (
  amount: number, 
  currency: keyof typeof CURRENCY_SYMBOLS = 'USD',
  locale: SupportedLocale = DEFAULT_LOCALE
): string => {
  const config = getLocaleConfig(locale);
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    ...config.numberFormat,
  }).format(amount);
};

/**
 * Format number based on locale
 */
export const formatNumber = (
  number: number,
  locale: SupportedLocale = DEFAULT_LOCALE
): string => {
  const config = getLocaleConfig(locale);
  
  return new Intl.NumberFormat(locale, config.numberFormat).format(number);
};

/**
 * Format date based on locale
 */
export const formatDate = (
  date: Date,
  locale: SupportedLocale = DEFAULT_LOCALE
): string => {
  return new Intl.DateTimeFormat(locale).format(date);
};