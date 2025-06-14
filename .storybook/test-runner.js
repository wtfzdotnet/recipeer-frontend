module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  testTimeout: 60000,
  // Run accessibility tests for all stories
  async preRender(page, context) {
    // Inject axe-core for accessibility testing
    await page.addScriptTag({
      url: 'https://unpkg.com/axe-core@4.8.1/axe.min.js',
    });
  },
  async postRender(page, context) {
    // Run accessibility checks after each story renders
    const accessibilityResults = await page.evaluate(async () => {
      if (typeof window.axe !== 'undefined') {
        return await window.axe.run();
      }
      return null;
    });

    if (accessibilityResults && accessibilityResults.violations.length > 0) {
      console.warn(`Accessibility violations found in ${context.title}:`);
      accessibilityResults.violations.forEach((violation, index) => {
        console.warn(`${index + 1}. ${violation.description}`);
        console.warn(`   Impact: ${violation.impact}`);
        console.warn(`   Help: ${violation.help}`);
        violation.nodes.forEach((node, nodeIndex) => {
          console.warn(`   Element ${nodeIndex + 1}: ${node.html}`);
        });
      });
    }
  },
};