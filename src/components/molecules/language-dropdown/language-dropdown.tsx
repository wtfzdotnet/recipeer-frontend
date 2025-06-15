import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
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
 * Molecule-level component that combines a select input with language options
 * to provide language switching functionality with persistence.
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

/**
 * Language configuration with display names and flag emojis
 */
const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'es', 
    name: 'Español',
    flag: '🇪🇸',
  },
] as const;

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  className,
  'aria-label': ariaLabel,
}) => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  return (
    <Select
      value={i18n.language}
      onValueChange={handleLanguageChange}
      aria-label={ariaLabel || t('language.label')}
    >
      <SelectTrigger 
        className={cn(
          "w-auto min-w-30 gap-2",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="text-lg" role="img" aria-label={currentLanguage.name}>
            {currentLanguage.flag}
          </span>
        </div>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span className="text-lg" role="img" aria-label={language.name}>
                {language.flag}
              </span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageDropdown;