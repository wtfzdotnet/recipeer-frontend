import { test, expect } from '@playwright/test';
import { runAccessibilityTests, runKeyboardNavigationTest, runColorContrastTest } from '../tools/accessibility-test-utils.js';

// Get all story URLs for testing
const getStoryUrls = async () => {
  // This would normally scan your storybook build or use the Storybook API
  // For now, we'll define the core component stories to test
  return [
    'http://localhost:6006/iframe.html?id=atoms-button--default',
    'http://localhost:6006/iframe.html?id=atoms-button--primary',
    'http://localhost:6006/iframe.html?id=atoms-button--secondary',
    'http://localhost:6006/iframe.html?id=atoms-input--default',
    'http://localhost:6006/iframe.html?id=atoms-avatar--default',
    'http://localhost:6006/iframe.html?id=molecules-quantity-adjuster--default',
    'http://localhost:6006/iframe.html?id=molecules-difficulty-indicator--default',
    'http://localhost:6006/iframe.html?id=organisms-recipe-card--default',
    'http://localhost:6006/iframe.html?id=organisms-navigation-menu--default',
  ];
};

test.describe('Design System Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for Storybook to be available
    await page.goto('http://localhost:6006');
    await page.waitForSelector('[data-testid="storybook-preview-iframe"]', { timeout: 10000 });
  });

  const stories = await getStoryUrls();
  
  for (const storyUrl of stories) {
    const storyId = storyUrl.split('id=')[1];
    
    test(`Accessibility check for ${storyId}`, async ({ page }) => {
      await runAccessibilityTests(page, storyUrl);
    });

    test(`Keyboard navigation for ${storyId}`, async ({ page }) => {
      await page.goto(storyUrl);
      await runKeyboardNavigationTest(page);
    });

    test(`Color contrast for ${storyId}`, async ({ page }) => {
      await page.goto(storyUrl);
      await runColorContrastTest(page);
    });
  }
});

test.describe('Design Token Compliance Tests', () => {
  test('Check for hardcoded colors in components', async ({ page }) => {
    await page.goto('http://localhost:6006');
    
    // This test would scan the built components for hardcoded color usage
    const hardcodedColors = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const violations = [];
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const inlineStyle = el.getAttribute('style');
        
        // Check for hardcoded hex colors in inline styles
        if (inlineStyle && /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.test(inlineStyle)) {
          violations.push({
            element: el.tagName,
            violation: 'Hardcoded hex color in inline style',
            value: inlineStyle
          });
        }
        
        // Check computed styles for common hardcoded patterns
        if (style.backgroundColor && style.backgroundColor.includes('rgb(') && 
            !el.classList.toString().includes('bg-')) {
          violations.push({
            element: el.tagName,
            violation: 'Hardcoded RGB color',
            value: style.backgroundColor
          });
        }
      });
      
      return violations;
    });
    
    if (hardcodedColors.length > 0) {
      console.warn('Design token violations found:', hardcodedColors);
    }
    
    expect(hardcodedColors).toHaveLength(0);
  });
});