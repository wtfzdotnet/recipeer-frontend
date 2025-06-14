import React from 'react';
import '../src/index.css'; // Add this line to import Tailwind CSS
import { ThemeProvider } from '../src/providers/ThemeProvider';

declare const process: { env: { CI?: string } }; // Fix for process.env.CI usage

// Optimized font loading for CI/CD - only load essential fonts in development
// Skip all font loading in CI for maximum performance
if (typeof window !== 'undefined' && !process.env.CI && !window.location.href.includes('chromatic')) {
  // Only load essential fonts in development
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;500;600&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
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
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-ui-theme">
        <div style={{ padding: '1rem' }} className="bg-background text-foreground min-h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;