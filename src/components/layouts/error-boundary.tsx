import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms';
import { AlertTriangle, Home } from 'lucide-react';

/**
 * Error boundary component for routing errors
 * Handles 404 errors and other route-related failures
 */
export const ErrorBoundary = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || 'An error occurred';
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'Unknown error occurred';
  }

  const is404 = errorStatus === 404;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {is404 ? t('error.404.title', 'Page Not Found') : t('error.generic.title', 'Oops!')}
          </h1>
          <p className="text-muted-foreground">
            {is404 
              ? t('error.404.message', 'The page you are looking for does not exist.')
              : t('error.generic.message', 'Something went wrong. Please try again.')
            }
          </p>
          {errorStatus && (
            <p className="text-sm text-muted-foreground">
              {t('error.status', 'Error {{status}}', { status: errorStatus })}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Button asChild className="w-full">
            <Link to="/" className="flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              {t('error.goHome', 'Go Home')}
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            {t('error.reload', 'Reload Page')}
          </Button>
        </div>

        {import.meta.env.DEV && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground">
              {t('error.details', 'Error Details')}
            </summary>
            <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
              {errorMessage}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};