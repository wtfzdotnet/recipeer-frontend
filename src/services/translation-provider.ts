import { TranslationProvider } from '@/types/locale.types';
import { SupportedLocale, DEFAULT_LOCALE } from '@/constants/locale-config';

/**
 * Local translation provider for development
 * Loads translations from local JSON files
 */
export class LocalTranslationProvider implements TranslationProvider {
  private translations: Record<SupportedLocale, Record<string, unknown>> = {} as Record<SupportedLocale, Record<string, unknown>>;
  private loadingPromises: Record<SupportedLocale, Promise<Record<string, unknown>>> = {} as Record<SupportedLocale, Promise<Record<string, unknown>>>;

  async loadTranslations(locale: SupportedLocale): Promise<Record<string, unknown>> {
    // Return cached translations if available
    if (this.translations[locale]) {
      return this.translations[locale];
    }

    // Return existing loading promise if in progress
    if (this.loadingPromises[locale]) {
      return this.loadingPromises[locale];
    }

    // Start loading translations
    this.loadingPromises[locale] = this.loadLocaleTranslations(locale);
    
    try {
      const translations = await this.loadingPromises[locale];
      this.translations[locale] = translations;
      return translations;
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error);
      // Fall back to default locale if available
      if (locale !== DEFAULT_LOCALE) {
        return this.loadTranslations(DEFAULT_LOCALE);
      }
      return {};
    }
  }

  private async loadLocaleTranslations(locale: SupportedLocale): Promise<Record<string, unknown>> {
    try {
      // Dynamically import translation files
      const [common, nutrition] = await Promise.all([
        import(`../i18n/locales/${locale}/common.json`),
        import(`../i18n/locales/${locale}/nutrition.json`),
      ]);

      return {
        common: common.default,
        nutrition: nutrition.default,
      };
    } catch {
      throw new Error(`Could not load translations for locale: ${locale}`);
    }
  }

  hasTranslations(locale: SupportedLocale): boolean {
    return !!this.translations[locale];
  }

  getFallbackTranslations(): Record<string, unknown> {
    return this.translations[DEFAULT_LOCALE] || {};
  }
}

/**
 * External translation provider for production
 * Loads translations from external services or CDN
 */
export class ExternalTranslationProvider implements TranslationProvider {
  private baseUrl: string;
  private apiKey?: string;
  private cache: Record<SupportedLocale, Record<string, unknown>> = {} as Record<SupportedLocale, Record<string, unknown>>;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.apiKey = apiKey;
  }

  async loadTranslations(locale: SupportedLocale): Promise<Record<string, unknown>> {
    // Return cached translations if available
    if (this.cache[locale]) {
      return this.cache[locale];
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(`${this.baseUrl}/translations/${locale}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch translations: ${response.status} ${response.statusText}`);
      }

      const translations = await response.json();
      this.cache[locale] = translations;
      return translations;
    } catch (error) {
      console.error(`Failed to load external translations for ${locale}:`, error);
      
      // Fall back to local provider
      const localProvider = new LocalTranslationProvider();
      return localProvider.loadTranslations(locale);
    }
  }

  hasTranslations(locale: SupportedLocale): boolean {
    return !!this.cache[locale];
  }

  getFallbackTranslations(): Record<string, unknown> {
    return this.cache[DEFAULT_LOCALE] || {};
  }
}

/**
 * Hybrid translation provider
 * Uses external provider in production, local in development
 */
export class HybridTranslationProvider implements TranslationProvider {
  private provider: TranslationProvider;

  constructor(externalBaseUrl?: string, apiKey?: string) {
    // Use external provider in production if URL is provided
    if (import.meta.env.PROD && externalBaseUrl) {
      this.provider = new ExternalTranslationProvider(externalBaseUrl, apiKey);
    } else {
      // Use local provider in development
      this.provider = new LocalTranslationProvider();
    }
  }

  async loadTranslations(locale: SupportedLocale): Promise<Record<string, unknown>> {
    return this.provider.loadTranslations(locale);
  }

  hasTranslations(locale: SupportedLocale): boolean {
    return this.provider.hasTranslations(locale);
  }

  getFallbackTranslations(): Record<string, unknown> {
    return this.provider.getFallbackTranslations();
  }
}

/**
 * Translation provider factory
 * Creates appropriate provider based on environment and configuration
 */
export const createTranslationProvider = (
  externalUrl?: string,
  apiKey?: string
): TranslationProvider => {
  if (externalUrl) {
    return new HybridTranslationProvider(externalUrl, apiKey);
  }
  
  return new LocalTranslationProvider();
};

/**
 * Default translation provider instance
 */
export const defaultTranslationProvider = createTranslationProvider(
  import.meta.env.VITE_TRANSLATION_SERVICE_URL,
  import.meta.env.VITE_TRANSLATION_API_KEY
);