import React, { useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LocaleContextValue, 
  SupportedLocale, 
  Currency 
} from '@/types/locale.types';
import { 
  LOCALE_CONFIGS, 
  DEFAULT_LOCALE, 
  UNIT_CONVERSIONS,
  formatCurrency,
  formatNumber,
  formatDate,
  detectBrowserLocale,
  getLocaleConfig 
} from '@/constants/locale-config';
import { LocaleContext } from '@/hooks/useLocale';

export interface LocaleProviderProps {
  children: ReactNode;
  /** Default locale override */
  defaultLocale?: SupportedLocale;
}

/**
 * Provider for locale-based internationalization with measurement units and currency
 */
export const LocaleProvider: React.FC<LocaleProviderProps> = ({ 
  children, 
  defaultLocale 
}) => {
  const { i18n } = useTranslation();
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(() => {
    // Try to get locale from localStorage first
    const stored = localStorage.getItem('recipeer-locale');
    if (stored && stored in LOCALE_CONFIGS) {
      return stored as SupportedLocale;
    }
    
    // Fall back to provided default or browser detection
    return defaultLocale || detectBrowserLocale();
  });

  const locale = getLocaleConfig(currentLocale);

  const changeLocale = (newLocale: SupportedLocale) => {
    setCurrentLocale(newLocale);
    
    // Safely change language if i18n is initialized
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(newLocale);
    }
    
    localStorage.setItem('recipeer-locale', newLocale);
    
    // Update document direction
    const newLocaleConfig = getLocaleConfig(newLocale);
    document.documentElement.dir = newLocaleConfig.dir;
    document.documentElement.lang = newLocale;
  };

  // Sync with i18next when it changes
  useEffect(() => {
    // Check if i18n instance is properly initialized
    if (!i18n || typeof i18n.on !== 'function' || typeof i18n.off !== 'function') {
      return;
    }

    const handleLanguageChange = (lng: string) => {
      if (lng !== currentLocale && lng in LOCALE_CONFIGS) {
        setCurrentLocale(lng as SupportedLocale);
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [currentLocale, i18n]);

  // Set initial document attributes
  useEffect(() => {
    document.documentElement.dir = locale.dir;
    document.documentElement.lang = currentLocale;
  }, [locale.dir, currentLocale]);

  const value: LocaleContextValue = {
    locale,
    availableLocales: Object.values(LOCALE_CONFIGS),
    changeLocale,
    convert: UNIT_CONVERSIONS,
    formatCurrency: (amount: number, currency?: Currency) => 
      formatCurrency(amount, currency || locale.currency, currentLocale),
    formatNumber: (number: number) => formatNumber(number, currentLocale),
    formatDate: (date: Date) => formatDate(date, currentLocale),
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};