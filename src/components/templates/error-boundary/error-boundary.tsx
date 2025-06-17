import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

/**
 * Interface for route error objects
 */
interface RouteError {
  status?: number;
  message?: string;
  stack?: string;
}

/**
 * ErrorBoundary component for handling route errors
 * Displays user-friendly error messages and recovery options
 */
export const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as RouteError;
  const { t } = useTranslation('common');

  // Determine error type and message
  const getErrorInfo = () => {
    if (error?.status === 404) {
      return {
        title: t('errors.notFound.title', 'Page Not Found'),
        message: t('errors.notFound.message', 'The page you are looking for does not exist.'),
        showBackButton: true,
      };
    }

    if (error?.status === 403) {
      return {
        title: t('errors.forbidden.title', 'Access Denied'),
        message: t('errors.forbidden.message', 'You do not have permission to access this page.'),
        showBackButton: true,
      };
    }

    if (error?.status === 500) {
      return {
        title: t('errors.serverError.title', 'Server Error'),
        message: t('errors.serverError.message', 'Something went wrong on our end. Please try again later.'),
        showBackButton: true,
      };
    }

    // Generic error
    return {
      title: t('errors.generic.title', 'Something went wrong'),
      message: error?.message || t('errors.generic.message', 'An unexpected error occurred.'),
      showBackButton: true,
    };
  };

  const errorInfo = getErrorInfo();

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-destructive/10 rounded-full">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            {errorInfo.title}
          </h1>
          <p className="text-muted-foreground">
            {errorInfo.message}
          </p>
        </div>

        {/* Error Details (Development only) */}
        {isDevelopment && error && (
          <details className="text-left bg-muted p-4 rounded-lg">
            <summary className="cursor-pointer text-sm font-medium">
              Technical Details
            </summary>
            <pre className="mt-2 text-xs overflow-auto">
              {error.stack || JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              {t('actions.goHome', 'Go Home')}
            </Link>
          </Button>

          {errorInfo.showBackButton && (
            <Button variant="outline" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('actions.goBack', 'Go Back')}
            </Button>
          )}

          <Button variant="ghost" onClick={handleReload}>
            {t('actions.reload', 'Reload Page')}
          </Button>
        </div>
      </div>
    </div>
  );
};