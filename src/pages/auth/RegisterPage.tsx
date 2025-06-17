import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * RegisterPage component - User registration
 */
export const RegisterPage: React.FC = () => {
  const { t } = useTranslation('common');
  
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {t('pages.register.title', 'Register')}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t('pages.register.description', 'Create your Recipe Authority account')}
        </p>
        
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-card-foreground">
            {t('pages.register.placeholder', 'Registration form will be implemented here.')}
          </p>
        </div>
      </div>
    </div>
  );
};