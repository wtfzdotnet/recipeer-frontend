/**
 * Locale system types for internationalization with measurement units and currency
 */

export type SupportedLocale = 'en-US' | 'nl-NL';

export type MeasurementSystem = 'metric' | 'imperial';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export type WeightUnit = 'grams' | 'kilograms' | 'ounces' | 'pounds';

export type VolumeUnit = 'milliliters' | 'liters' | 'cups' | 'tablespoons' | 'teaspoons';

export type LengthUnit = 'centimeters' | 'meters' | 'inches' | 'feet';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY';

export interface LocaleConfig {
  /** Locale code (e.g., 'en-US', 'nl-NL') */
  locale: SupportedLocale;
  
  /** Display name for the locale */
  name: string;
  
  /** Country/region flag emoji */
  flag: string;
  
  /** Default measurement system */
  measurementSystem: MeasurementSystem;
  
  /** Default currency */
  currency: Currency;
  
  /** Text direction */
  dir: 'ltr' | 'rtl';
  
  /** Date format pattern */
  dateFormat: string;
  
  /** Number format pattern */
  numberFormat: Intl.NumberFormatOptions;
}

export interface UnitConversion {
  /** Convert temperature between units */
  temperature: {
    celsiusToFahrenheit: (celsius: number) => number;
    fahrenheitToCelsius: (fahrenheit: number) => number;
  };
  
  /** Convert weight between units */
  weight: {
    gramsToOunces: (grams: number) => number;
    ouncesToGrams: (ounces: number) => number;
    kilogramsToPounds: (kg: number) => number;
    poundsToKilograms: (pounds: number) => number;
  };
  
  /** Convert volume between units */
  volume: {
    millilitersToCups: (ml: number) => number;
    cupsToMilliliters: (cups: number) => number;
    litersToFluidOunces: (liters: number) => number;
    fluidOuncesToLiters: (flOz: number) => number;
  };
  
  /** Convert length between units */
  length: {
    centimetersToInches: (cm: number) => number;
    inchesToCentimeters: (inches: number) => number;
    metersToFeet: (meters: number) => number;
    feetToMeters: (feet: number) => number;
  };
}

export interface LocaleContextValue {
  /** Current locale configuration */
  locale: LocaleConfig;
  
  /** Available locales */
  availableLocales: LocaleConfig[];
  
  /** Change the current locale */
  changeLocale: (locale: SupportedLocale) => void;
  
  /** Unit conversion utilities */
  convert: UnitConversion;
  
  /** Format currency based on locale */
  formatCurrency: (amount: number, currency?: Currency) => string;
  
  /** Format number based on locale */
  formatNumber: (number: number) => string;
  
  /** Format date based on locale */
  formatDate: (date: Date) => string;
}

export interface TranslationProvider {
  /** Load translations for a locale */
  loadTranslations: (locale: SupportedLocale) => Promise<Record<string, unknown>>;
  
  /** Check if translations are available */
  hasTranslations: (locale: SupportedLocale) => boolean;
  
  /** Get fallback translations */
  getFallbackTranslations: () => Record<string, unknown>;
}

/**
 * RTL language configuration
 */
export interface RTLConfig {
  /** Whether the language is RTL */
  isRTL: boolean;
  
  /** CSS class for RTL styling */
  rtlClass: string;
  
  /** Text align direction */
  textAlign: 'left' | 'right';
  
  /** Margin/padding adjustments for RTL */
  spacing: {
    marginLeft: string;
    marginRight: string;
    paddingLeft: string;
    paddingRight: string;
  };
}