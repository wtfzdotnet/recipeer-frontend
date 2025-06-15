import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from '@/hooks/useLocale';
import { SupportedLocale } from '@/types/locale.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * Props for LanguageDropdown - Molecule
 * 
 * Molecule-level component that combines a select input with locale options
 * to provide language switching functionality with measurement unit and currency support.
 * 
 * @example
 * ```tsx
 * <LanguageDropdown />
 * <LanguageDropdown className="w-32" />
 * ```
 */
export interface LanguageDropdownProps {
  /** Custom CSS class */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  className,
  'aria-label': ariaLabel,
}) => {
  const { t } = useTranslation();
  const { locale, availableLocales, changeLocale } = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    changeLocale(newLocale as SupportedLocale);
  };

  const currentLocale = availableLocales.find(l => l.locale === locale.locale) || availableLocales[0];

  return (
    <Select
      value={locale.locale}
      onValueChange={handleLocaleChange}
      aria-label={ariaLabel || t('language.label')}
    >
      <SelectTrigger 
        className={cn(
          "w-auto min-w-40 gap-2",
          className
        )}
      >
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
            <div className="flex items-center gap-2">
              <span className="text-lg" role="img" aria-label={localeConfig.name}>
                {localeConfig.flag}
              </span>
              <div className="flex flex-col">
                <span>{localeConfig.name}</span>
                <span className="text-xs text-muted-foreground">
                  {localeConfig.measurementSystem === 'metric' ? 'Metric' : 'Imperial'} • {localeConfig.currency}
                </span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageDropdown;