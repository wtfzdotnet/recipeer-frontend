import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeToggle, LanguageDropdown } from '@/components/molecules';

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header with global controls */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold">{t('app.title', 'Recipeer')}</h1>
          </div>
          
          {/* Global controls */}
          <div className="flex items-center gap-2">
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
              <a href="/privacy" className="hover:text-foreground transition-colors">
                {t('nav.privacy', 'Privacy')}
              </a>
              <a href="/terms" className="hover:text-foreground transition-colors">
                {t('nav.terms', 'Terms')}
              </a>
              <a href="/about" className="hover:text-foreground transition-colors">
                {t('nav.about', 'About')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};