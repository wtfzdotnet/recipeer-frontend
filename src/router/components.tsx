import React from 'react';

/**
 * Loading component for lazy-loaded routes
 */
export const RouteLoader: React.FC = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);