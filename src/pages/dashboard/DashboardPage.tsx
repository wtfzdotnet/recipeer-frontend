import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/atoms';

/**
 * DashboardPage component - User dashboard (protected)
 */
export const DashboardPage: React.FC = () => {
  const { t } = useTranslation('common');
  const { user, logout } = useAuth();
  
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('pages.dashboard.title', 'Dashboard')}
            </h1>
            <p className="text-muted-foreground">
              {t('pages.dashboard.welcome', 'Welcome back, {{name}}!', { name: user?.name })}
            </p>
          </div>
          <Button onClick={logout} variant="outline">
            {t('actions.logout', 'Logout')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              {t('dashboard.myRecipes', 'My Recipes')}
            </h3>
            <p className="text-muted-foreground">
              {t('dashboard.myRecipesDesc', 'Manage your recipe collection')}
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              {t('dashboard.mealPlans', 'Meal Plans')}
            </h3>
            <p className="text-muted-foreground">
              {t('dashboard.mealPlansDesc', 'View and edit your meal plans')}
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              {t('dashboard.shoppingLists', 'Shopping Lists')}
            </h3>
            <p className="text-muted-foreground">
              {t('dashboard.shoppingListsDesc', 'Manage your shopping lists')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};