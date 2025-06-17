import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeToggle, LanguageDropdown } from '@/components/molecules';

/**
 * Root layout component providing shared structure for all pages
 * Includes theme toggle, language selection, and navigation
 */
export const RootLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-foreground">
              {t('app.title')}
            </h1>
          </div>
          
          {/* Global Controls */}
          <div className="flex items-center gap-2">
            <LanguageDropdown />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container py-6">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 Recipeer. {t('app.footer')}
          </div>
        </div>
      </footer>
    </div>
  );
};