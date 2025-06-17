import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/use-auth';
import { Button } from '@/components/atoms';
import { User, Settings, LogOut, ChefHat, BookOpen, Calendar } from 'lucide-react';

/**
 * User Dashboard page - Protected route for authenticated users
 */
export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="container py-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">
            {t('dashboard.welcome', 'Welcome back, {{name}}!', { name: user?.name })}
          </h1>
          <p className="text-muted-foreground">
            {t('dashboard.subtitle', 'Here\'s what\'s happening in your kitchen')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {t('dashboard.settings', 'Settings')}
            </Link>
          </Button>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/create-recipe"
          className="p-6 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">
                {t('dashboard.actions.createRecipe', 'Create Recipe')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('dashboard.actions.createRecipeDesc', 'Share your culinary creations')}
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/collections"
          className="p-6 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">
                {t('dashboard.actions.myCollections', 'My Collections')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('dashboard.actions.myCollectionsDesc', 'Organize your favorite recipes')}
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/meal-plan"
          className="p-6 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors group"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">
                {t('dashboard.actions.mealPlan', 'Meal Plan')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('dashboard.actions.mealPlanDesc', 'Plan your weekly meals')}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">
          {t('dashboard.recentActivity', 'Recent Activity')}
        </h2>
        
        <div className="rounded-lg border border-border p-6">
          <div className="text-center py-8 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4" />
            <p>{t('dashboard.noActivity', 'No recent activity to show')}</p>
            <p className="text-sm mt-2">
              {t('dashboard.getStarted', 'Start by creating your first recipe or exploring the community')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};