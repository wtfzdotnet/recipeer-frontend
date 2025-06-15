/**
 * Custom portal implementation specifically for Storybook dialog fix
 * This bypasses Radix UI's default portal behavior in Storybook environments
 */

import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';

/**
 * Detect if we're running in Storybook
 */
function isStorybook(): boolean {
  if (typeof window === 'undefined') return false;
  
  return !!(
    window.parent !== window ||
    window.location.pathname.includes('iframe.html') ||
    window.location.search.includes('viewMode=story') ||
    (window as unknown as { __STORYBOOK_ADDONS_MANAGER?: boolean }).__STORYBOOK_ADDONS_MANAGER ||
    document.querySelector('[data-storybook]') ||
    document.querySelector('#storybook-root')
  );
}

/**
 * Create a portal container with maximum z-index for Storybook
 */
function createStorybookPortalContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.id = 'storybook-dialog-portal';
  container.setAttribute('data-storybook-portal', 'true');
  
  // Apply every possible CSS property to ensure maximum stacking
  const styles = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '2147483647',
    pointerEvents: 'none',
  };
  
  Object.assign(container.style, styles);
  
  // Also set via setAttribute for CSS specificity
  container.setAttribute('style', `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 2147483647 !important;
    pointer-events: none !important;
    transform: translateZ(0) !important;
    will-change: transform !important;
  `);
  
  return container;
}

/**
 * Custom portal component for Storybook that forces maximum z-index
 */
export function StorybookPortal({ children }: { children: ReactNode }) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!isStorybook()) {
      return;
    }
    
    // Find or create portal container
    let portalContainer = document.getElementById('storybook-dialog-portal');
    
    if (!portalContainer) {
      portalContainer = createStorybookPortalContainer();
      
      // Try to append to various possible containers
      const targets = [
        document.body,
        document.documentElement,
        document.querySelector('#storybook-root'),
        document.querySelector('[data-storybook]'),
        document.querySelector('.sb-show-main'),
      ].filter(Boolean);
      
      const target = targets[0] || document.body;
      target.appendChild(portalContainer);
    }
    
    setContainer(portalContainer);
    
    // Force re-apply styles in case they get overridden
    const intervalId = setInterval(() => {
      if (portalContainer && portalContainer.parentElement) {
        portalContainer.style.zIndex = '2147483647';
        portalContainer.style.position = 'fixed';
        portalContainer.style.pointerEvents = 'none';
      }
    }, 100);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  // If not in Storybook or container not ready, return null to use default portal
  if (!isStorybook() || !container) {
    return null;
  }
  
  return createPortal(children, container);
}

/**
 * Wrapper component that uses StorybookPortal for Storybook or default behavior for app
 */
export function ConditionalPortal({ children }: { children: ReactNode }) {
  if (isStorybook()) {
    return <StorybookPortal>{children}</StorybookPortal>;
  }
  
  // In main app, use default behavior (Radix UI will handle the portal)
  return <>{children}</>;
}
