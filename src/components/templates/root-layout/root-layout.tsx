import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers/AuthProvider';
import { ThemeToggle, LanguageDropdown } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { cn } from '@/lib/utils';

/**
 * RootLayout Props
 */
export interface RootLayoutProps {
  children?: React.ReactNode;
}

/**
 * Root layout template for the application
 * Provides consistent layout structure and navigation for all pages
 */
export const RootLayout: React.FC<RootLayoutProps> = () => {
  const { t } = useTranslation('common');
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Helper to check if a route is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          {/* Logo and primary navigation */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold">{t('app.title', 'Recipeer')}</h1>
            </Link>
            
            {/* Primary navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link 
                to="/recipes" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive('/recipes') ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t('nav.recipes', 'Recipes')}
              </Link>
              <Link 
                to="/categories" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive('/categories') ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t('nav.categories', 'Categories')}
              </Link>
              <Link 
                to="/chefs" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive('/chefs') ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t('nav.chefs', 'Chefs')}
              </Link>
              <Link 
                to="/community" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive('/community') ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t('nav.community', 'Community')}
              </Link>
            </nav>
          </div>
          
          {/* User navigation and controls */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive('/dashboard') ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {t('nav.dashboard', 'Dashboard')}
                </Link>
                <Link 
                  to="/create-recipe" 
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive('/create-recipe') ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {t('nav.createRecipe', 'Create')}
                </Link>
                <span className="text-sm text-muted-foreground hidden md:inline">
                  {user?.name}
                </span>
                <Button onClick={logout} variant="ghost" size="sm">
                  {t('actions.logout', 'Logout')}
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">{t('actions.login', 'Login')}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">{t('actions.register', 'Sign Up')}</Link>
                </Button>
              </>
            )}
            
            {/* Global controls */}
            <LanguageDropdown />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 Recipeer. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                {t('nav.privacy', 'Privacy')}
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                {t('nav.terms', 'Terms')}
              </Link>
              <Link to="/about" className="hover:text-foreground transition-colors">
                {t('nav.about', 'About')}
              </Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                {t('nav.contact', 'Contact')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};