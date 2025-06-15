import React from 'react';
import '../src/index.css'; // Add this line to import Tailwind CSS
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { LocaleProvider } from '../src/providers/LocaleProvider';
import '../src/i18n'; // Initialize i18n

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

  // Add global toolbar for locale selection
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en-US',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en-US', title: '🇺🇸 English (US)', right: 'Imperial, USD' },
          { value: 'nl-NL', title: '🇳🇱 Nederlands (NL)', right: 'Metric, EUR' },
          { value: 'ar-SA', title: '🇸🇦 العربية (SA)', right: 'RTL, Metric, SAR' },
        ],
        dynamicTitle: true,
      },
    },
  },

  // Global decorators
  decorators: [
    (Story, context) => {
      const { locale } = context.globals;
      
      return (
        <ThemeProvider defaultTheme="light" storageKey="storybook-ui-theme">
          <LocaleProvider defaultLocale={locale}>
            <div 
              style={{ padding: '1rem' }} 
              className="bg-background text-foreground"
              dir={locale === 'ar-SA' ? 'rtl' : 'ltr'}
            >
              <Story />
            </div>
          </LocaleProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;