import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();

  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || 'Something went wrong';
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'An unexpected error occurred';
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⚠️</span>
        </div>
        
        {errorStatus && (
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {errorStatus}
          </h1>
        )}
        
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Oops! Something went wrong
        </h2>
        
        <p className="text-muted-foreground mb-2">
          {errorMessage}
        </p>
        
        <details className="text-left text-sm text-muted-foreground mb-8 bg-muted/30 rounded p-3">
          <summary className="cursor-pointer font-medium">Technical Details</summary>
          <pre className="mt-2 whitespace-pre-wrap overflow-auto">
            {error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}
          </pre>
        </details>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;