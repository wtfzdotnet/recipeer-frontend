import { Suspense, ReactNode } from 'react';

interface RouteLoaderProps {
  children: ReactNode;
}

/**
 * Loading component for lazy-loaded routes
 */
export const RouteLoader = ({ children }: RouteLoaderProps) => (
  <Suspense fallback={
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  }>
    {children}
  </Suspense>
);