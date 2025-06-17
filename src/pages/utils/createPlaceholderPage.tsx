import React from 'react';
// Utility for creating placeholder page components
import { useTranslation } from 'react-i18next';

export interface CreatePlaceholderPageOptions {
  name: string;
  title: string;
  description: string;
  translationKey?: string;
}

export const createPlaceholderPage = ({
  name,
  title,
  description,
  translationKey = 'common'
}: CreatePlaceholderPageOptions) => {
  const Component: React.FC = () => {
    const { t } = useTranslation(translationKey);
    
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground mb-8">
            {description}
          </p>
          
          <div className="bg-card p-6 rounded-lg border">
            <p className="text-card-foreground">
              {t('pages.placeholder', `This ${name} page is under development and will be implemented soon.`)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  Component.displayName = name;
  return Component;
};