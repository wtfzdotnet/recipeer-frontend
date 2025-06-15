import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Thermometer, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from '@/hooks/useLocale';
import { SupportedLocale } from '@/types/locale.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * Props for CountryLanguageSelector - Organism
 * 
 * Organism-level component that provides comprehensive locale selection
 * with country, language, measurement system, and currency information.
 * 
 * @example
 * ```tsx
 * <CountryLanguageSelector />
 * <CountryLanguageSelector 
 *   showDetails={false}
 *   onLocaleChange={(locale) => console.log('Selected:', locale)} 
 * />
 * ```
 */
export interface CountryLanguageSelectorProps {
  /** Callback fired when locale changes */
  onLocaleChange?: (locale: SupportedLocale) => void;
  
  /** Whether to show detailed locale information */
  showDetails?: boolean;
  
  /** Whether to show as a card layout */
  asCard?: boolean;
  
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

export const CountryLanguageSelector: React.FC<CountryLanguageSelectorProps> = ({
  onLocaleChange,
  showDetails = true,
  asCard = true,
  className,
  'aria-label': ariaLabel,
}) => {
  const { t } = useTranslation();
  const { locale, availableLocales, changeLocale } = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    const selectedLocale = newLocale as SupportedLocale;
    changeLocale(selectedLocale);
    onLocaleChange?.(selectedLocale);
  };

  const currentLocale = availableLocales.find(l => l.locale === locale.locale) || availableLocales[0];

  const selectorContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          {t('language.label', { defaultValue: 'Language & Region' })}
        </label>
        <Select
          value={locale.locale}
          onValueChange={handleLocaleChange}
          aria-label={ariaLabel || t('language.label')}
        >
          <SelectTrigger className="w-full gap-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="text-lg" role="img" aria-label={currentLocale.name}>
                {currentLocale.flag}
              </span>
            </div>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableLocales.map((localeConfig) => (
              <SelectItem key={localeConfig.locale} value={localeConfig.locale}>
                <div className="flex items-center gap-3 py-2">
                  <span className="text-lg" role="img" aria-label={localeConfig.name}>
                    {localeConfig.flag}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium">{localeConfig.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {localeConfig.locale}
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showDetails && (
        <div className="grid grid-cols-1 gap-3 pt-2 border-t border-border">
          <div className="flex items-center gap-3 text-sm">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <span className="font-medium">
                {t('units.measurementSystem', { defaultValue: 'Measurement System' })}
              </span>
              <div className="text-muted-foreground">
                {currentLocale.measurementSystem === 'metric' 
                  ? t('units.metric', { defaultValue: 'Metric (°C, kg, cm)' })
                  : t('units.imperial', { defaultValue: 'Imperial (°F, lbs, in)' })
                }
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <span className="font-medium">
                {t('currency.label', { defaultValue: 'Currency' })}
              </span>
              <div className="text-muted-foreground">
                {currentLocale.currency} • {locale.formatCurrency(1234.56, currentLocale.currency)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <span className="font-medium">
                {t('dateFormat.label', { defaultValue: 'Date Format' })}
              </span>
              <div className="text-muted-foreground">
                {locale.formatDate(new Date())} • {currentLocale.dateFormat}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (asCard) {
    return (
      <Card className={cn("w-full max-w-md", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t('locale.preferences', { defaultValue: 'Locale Preferences' })}
          </CardTitle>
          <CardDescription>
            {t('locale.description', { 
              defaultValue: 'Select your language, region, and measurement preferences.' 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectorContent}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {selectorContent}
    </div>
  );
};

export default CountryLanguageSelector;