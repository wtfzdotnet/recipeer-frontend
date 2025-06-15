import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from '@/hooks/useLocale';
import { Currency } from '@/types/locale.types';
import { CURRENCY_SYMBOLS } from '@/constants/locale-config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * Props for CurrencySelector - Organism
 * 
 * Organism-level component that provides currency selection functionality
 * with locale-based defaults and manual override capability.
 * 
 * @example
 * ```tsx
 * <CurrencySelector />
 * <CurrencySelector 
 *   onCurrencyChange={(currency) => console.log('Selected:', currency)} 
 *   className="w-48"
 * />
 * ```
 */
export interface CurrencySelectorProps {
  /** Callback fired when currency changes */
  onCurrencyChange?: (currency: Currency) => void;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
  
  /** Whether to show currency symbol */
  showSymbol?: boolean;
  
  /** Whether to show currency name */
  showName?: boolean;
}

/**
 * Currency configuration with display names and symbols
 */
const CURRENCIES: Record<Currency, { name: string; symbol: string; flag?: string }> = {
  USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  CAD: { name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  AUD: { name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
};

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  onCurrencyChange,
  className,
  'aria-label': ariaLabel,
  showSymbol = true,
  showName = true,
}) => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  
  // State for selected currency (defaults to locale currency)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(locale.currency);

  const handleCurrencyChange = (currency: string) => {
    const newCurrency = currency as Currency;
    setSelectedCurrency(newCurrency);
    onCurrencyChange?.(newCurrency);
  };

  const currentCurrency = CURRENCIES[selectedCurrency];

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <Select
        value={selectedCurrency}
        onValueChange={handleCurrencyChange}
        aria-label={ariaLabel || t('currency.label')}
      >
        <SelectTrigger className="w-auto min-w-40 gap-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            {currentCurrency.flag && (
              <span className="text-lg" role="img" aria-label={currentCurrency.name}>
                {currentCurrency.flag}
              </span>
            )}
            {showSymbol && (
              <span className="font-mono text-lg">{currentCurrency.symbol}</span>
            )}
          </div>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.entries(CURRENCIES) as [Currency, typeof CURRENCIES[Currency]][]).map(
            ([code, config]) => (
              <SelectItem key={code} value={code}>
                <div className="flex items-center gap-3">
                  {config.flag && (
                    <span className="text-lg" role="img" aria-label={config.name}>
                      {config.flag}
                    </span>
                  )}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{config.symbol}</span>
                      <span className="text-sm font-medium">{code}</span>
                    </div>
                    {showName && (
                      <span className="text-xs text-muted-foreground">
                        {config.name}
                      </span>
                    )}
                  </div>
                </div>
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
      
      {selectedCurrency !== locale.currency && (
        <p className="text-xs text-muted-foreground">
          {t('currency.overrideNote', { 
            default: 'Overriding locale default ({{defaultCurrency}})',
            defaultCurrency: locale.currency 
          })}
        </p>
      )}
    </div>
  );
};

export default CurrencySelector;