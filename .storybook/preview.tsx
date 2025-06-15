import React from 'react';
import '../src/index.css'; // Add this line to import Tailwind CSS
import './storybook-dialog-fix.css'; // Storybook-specific dialog fixes
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { PortalProvider } from '../src/lib/portal-context';

// Optimized font loading for all environments
// Load fonts efficiently with display=swap for better performance
if (typeof window !== 'undefined') {
  // Check if fonts are already loaded to avoid duplicate requests
  const existingFontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
  
  if (!existingFontLink) {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    // Add media="print" initially, then change to "all" after load for faster initial rendering
    link.media = 'print';
    link.onload = () => { link.media = 'all'; };
    document.head.appendChild(link);
  }

  // TARGETED DIALOG Z-INDEX FIX FOR STORYBOOK
  // Only target dialog elements, not all fixed elements
  let dialogObserver: MutationObserver | null = null;
  
  const forceDialogZIndex = () => {
    // Only target dialog-related elements
    const dialogSelectors = [
      '[data-radix-portal]',
      '[data-radix-dialog-overlay]',
      '[data-radix-dialog-content]',
      '[data-radix-alert-dialog-overlay]',
      '[data-radix-alert-dialog-content]',
      '[role="dialog"]',
      '[role="alertdialog"]'
    ];
    
    dialogSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        
        // Exclude test elements and other non-dialog fixed elements
        if (!htmlElement.hasAttribute('data-testid') && 
            !htmlElement.classList.contains('bg-red-500') &&
            !htmlElement.classList.contains('bg-blue-500') &&
            !htmlElement.classList.contains('bg-green-500') &&
            !htmlElement.classList.contains('bg-yellow-500')) {
          
          // Force maximum z-index for dialog elements only (higher than 2147483647)
          htmlElement.style.zIndex = '2147483647';
          htmlElement.style.setProperty('z-index', '2147483647', 'important');
          
          // Ensure position is fixed for dialog content
          if (selector.includes('content') || selector.includes('portal') || selector.includes('[role="dialog"]')) {
            htmlElement.style.position = 'fixed';
            htmlElement.style.setProperty('position', 'fixed', 'important');
          }
        }
      });
    });
  };

  // Set up mutation observer to catch dynamically created elements
  const setupDialogObserver = () => {
    if (dialogObserver) {
      dialogObserver.disconnect();
    }
    
    dialogObserver = new MutationObserver((mutations) => {
      let shouldForceZIndex = false;
      
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Check if the added element or its children contain dialog elements
            if (
              element.matches?.('[data-radix-portal], [data-radix-dialog-overlay], [data-radix-dialog-content], [data-radix-alert-dialog-overlay], [data-radix-alert-dialog-content], [role="dialog"], [role="alertdialog"]') ||
              element.querySelector?.('[data-radix-portal], [data-radix-dialog-overlay], [data-radix-dialog-content], [data-radix-alert-dialog-overlay], [data-radix-alert-dialog-content], [role="dialog"], [role="alertdialog"]')
            ) {
              shouldForceZIndex = true;
            }
          }
        });
      });
      
      if (shouldForceZIndex) {
        // Use a small delay to ensure all elements are fully rendered
        setTimeout(forceDialogZIndex, 10);
      }
    });
    
    dialogObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state', 'data-radix-portal', 'role']
    });
  };

  // Initialize immediately and on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupDialogObserver();
      forceDialogZIndex();
    });
  } else {
    setupDialogObserver();
    forceDialogZIndex();
  }

  // Also force on window load for good measure
  window.addEventListener('load', () => {
    setTimeout(forceDialogZIndex, 100);
  });
  
  // Continuous monitoring for stubborn elements
  setInterval(forceDialogZIndex, 500);
}

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
      expanded: true, // Expand controls panel by default
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },

    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '900px',
          },
        },
        large: {
          name: 'Large Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },

    // Documentation settings
    // Note: Removed deprecated actions.argTypesRegex to resolve Storybook 9.0.9+ warning
    // Actions should now be configured explicitly using fn() in individual stories
    docs: {
      toc: true, // Show table of contents in docs
    },

    // Background options for theme testing
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'oklch(1 0 0)',
        },
        {
          name: 'dark',
          value: 'oklch(0.141 0.005 285.823)',
        },
      ],
    },
  },

  // Global decorators
  decorators: [
    (Story) => {
      // Force dialog container setup for Storybook
      React.useEffect(() => {
        // Create a high z-index container for dialogs
        let dialogContainer = document.getElementById('storybook-dialog-root');
        if (!dialogContainer) {
          dialogContainer = document.createElement('div');
          dialogContainer.id = 'storybook-dialog-root';
          dialogContainer.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 2147483647 !important;
            pointer-events: none !important;
            width: 100% !important;
            height: 100% !important;
          `;
          document.body.appendChild(dialogContainer);
        }
        
        // Force all radix portals to use maximum z-index
        const observer = new MutationObserver(() => {
          const portals = document.querySelectorAll('[data-radix-portal]');
          portals.forEach((portal) => {
            (portal as HTMLElement).style.zIndex = '2147483647';
          });
          
          const overlays = document.querySelectorAll('[data-radix-dialog-overlay], [data-radix-alert-dialog-overlay]');
          overlays.forEach((overlay) => {
            (overlay as HTMLElement).style.zIndex = '2147483646';
            (overlay as HTMLElement).style.position = 'fixed';
          });
          
          const contents = document.querySelectorAll('[data-radix-dialog-content], [data-radix-alert-dialog-content]');
          contents.forEach((content) => {
            (content as HTMLElement).style.zIndex = '2147483647';
            (content as HTMLElement).style.position = 'fixed';
          });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
        
        return () => observer.disconnect();
      }, []);
      
      return (
        <PortalProvider>
          <ThemeProvider defaultTheme="light" storageKey="storybook-ui-theme">
            <div style={{ padding: '1rem', position: 'relative', zIndex: 1 }} className="bg-background text-foreground">
              <Story />
            </div>
          </ThemeProvider>
        </PortalProvider>
      );
    },
  ],
};

export default preview;