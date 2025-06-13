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
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export default preview;