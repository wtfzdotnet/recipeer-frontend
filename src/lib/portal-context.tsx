import React, { createContext, useContext } from 'react';

interface PortalContextType {
  getContainer: () => HTMLElement | null;
}

const PortalContext = createContext<PortalContextType | null>(null);

export const usePortalContainer = () => {
  const context = useContext(PortalContext);
  return context?.getContainer() || null;
};

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getContainer = React.useCallback(() => {
    // In Storybook, ensure we have a high z-index container
    if (typeof window !== 'undefined' && (
      window.parent !== window || 
      window.location.href.includes('localhost:6007') ||
      document.querySelector('#storybook-root')
    )) {
      let container = document.getElementById('portal-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'portal-container';
        container.style.cssText = `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 2147483647 !important;
          pointer-events: none !important;
        `;
        document.body.appendChild(container);
      }
      return container;
    }
    
    // In main app, use default behavior
    return null;
  }, []);

  return (
    <PortalContext.Provider value={{ getContainer }}>
      {children}
    </PortalContext.Provider>
  );
};
