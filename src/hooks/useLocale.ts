import { useContext } from 'react';
import { LocaleContextValue } from '@/types/locale.types';
import { createContext } from 'react';

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

/**
 * Hook to access locale context
 */
export const useLocale = (): LocaleContextValue => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

/**
 * Hook to get current measurement system
 */
export const useMeasurementSystem = () => {
  const { locale } = useLocale();
  return locale.measurementSystem;
};

/**
 * Hook to get unit conversion utilities
 */
export const useUnitConversion = () => {
  const { convert } = useLocale();
  return convert;
};

/**
 * Hook to format values based on locale
 */
export const useLocaleFormatters = () => {
  const { formatCurrency, formatNumber, formatDate } = useLocale();
  return { formatCurrency, formatNumber, formatDate };
};

export { LocaleContext };