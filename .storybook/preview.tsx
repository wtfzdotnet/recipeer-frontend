import React from 'react';
import '../src/index.css'; // Add this line to import Tailwind CSS

// Import Google Fonts for Typography stories
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;500;600&family=Caveat:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600&family=Merriweather:wght@300;400;700&family=Crimson+Text:wght@400;600;700&family=Lato:wght@300;400;700&family=Dancing+Script:wght@400;500;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

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

    // Add actions for interactive components
    actions: { argTypesRegex: "^on[A-Z].*" },

    // Documentation settings
    docs: {
      toc: true, // Show table of contents in docs
    },
  },

  // Global decorators
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;