const { injectAxe, checkA11y } = require('axe-playwright');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  testTimeout: 60000,
  // Run accessibility tests for all stories
  async preRender(page, context) {
    // Use axe-playwright which handles CSP issues properly
    await injectAxe(page);
  },
  async postRender(page, context) {
    // Run accessibility checks after each story renders using axe-playwright
    try {
      await checkA11y(page, undefined, {
        detailedReport: false, // Set to true for more detailed output
        reporter: 'no-passes', // Only report violations and incomplete
      });
    } catch (error) {
      // Log accessibility violations but don't fail the build
      console.warn(`\n⚠️  Accessibility violations found in story: ${context.title}`);
      console.warn(error.message);
      console.warn('────────────────────────────────────────\n');
    }
  },
};