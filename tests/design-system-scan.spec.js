import { test, expect } from '@playwright/test';
import { runAccessibilityTests, runKeyboardNavigationTest, runColorContrastTest } from '../tools/accessibility-test-utils.js';

// Get all story URLs for testing
const getStoryUrls = async () => {
  // Core atomic design components to test for accessibility and design token compliance
  return [
    // Atoms
    'http://localhost:6006/iframe.html?id=atoms-button--default',
    'http://localhost:6006/iframe.html?id=atoms-button--primary',
    'http://localhost:6006/iframe.html?id=atoms-button--secondary',
    'http://localhost:6006/iframe.html?id=atoms-input--default',
    'http://localhost:6006/iframe.html?id=atoms-avatar--default',
    'http://localhost:6006/iframe.html?id=atoms-checkbox--default',
    'http://localhost:6006/iframe.html?id=atoms-typography--default',
    'http://localhost:6006/iframe.html?id=atoms-badge--default',
    
    // Molecules  
    'http://localhost:6006/iframe.html?id=molecules-card--default',
    'http://localhost:6006/iframe.html?id=molecules-alert--default',
    'http://localhost:6006/iframe.html?id=molecules-slider--default',
    'http://localhost:6006/iframe.html?id=molecules-timer--default',
    
    // UI Components (Design System)
    'http://localhost:6006/iframe.html?id=design-system-components-layout-card--default',
    'http://localhost:6006/iframe.html?id=design-system-components-feedback-alert--default',
    'http://localhost:6006/iframe.html?id=design-system-components-feedback-tooltip--default',
  ];
};

test.describe('Design System Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for Storybook to be available by checking if we can load the main page
    await page.goto('http://localhost:6006');
    
    // Wait for Storybook to fully load by checking for the title or any content
    await page.waitForLoadState('networkidle');
    
    // Ensure the page has loaded by checking for common Storybook elements
    try {
      // Try to wait for sidebar or any Storybook UI element
      await page.waitForSelector('body', { timeout: 5000 });
      await page.waitForTimeout(1000); // Give Storybook time to initialize
    } catch (error) {
      console.warn('Storybook UI not fully loaded, continuing with story tests');
    }
  });

  test('Run accessibility tests for all stories', async ({ page }) => {
    const stories = await getStoryUrls();
    
    for (const storyUrl of stories) {
      const storyId = storyUrl.split('id=')[1];
      
      await test.step(`Accessibility check for ${storyId}`, async () => {
        await runAccessibilityTests(page, storyUrl);
      });

      await test.step(`Keyboard navigation for ${storyId}`, async () => {
        await page.goto(storyUrl);
        await runKeyboardNavigationTest(page);
      });

      await test.step(`Color contrast for ${storyId}`, async () => {
        await page.goto(storyUrl);
        await runColorContrastTest(page);
      });
    }
  });
});

test.describe('Design Token Compliance Tests', () => {
  test('Check for hardcoded colors in components', async ({ page }) => {
    const stories = await getStoryUrls();
    const allViolations = [];
    
    for (const storyUrl of stories) {
      const storyId = storyUrl.split('id=')[1];
      
      await test.step(`Design token compliance for ${storyId}`, async () => {
        await page.goto(storyUrl);
        await page.waitForLoadState('networkidle');
        
        // Wait for the story to render
        await page.waitForSelector('body', { timeout: 5000 });
        await page.waitForTimeout(500);
        
        // This test scans the rendered story for hardcoded color usage
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
                className: el.className,
                violation: 'Hardcoded hex color in inline style',
                value: inlineStyle,
                storyId: window.location.search
              });
            }
            
            // Check for hardcoded RGB colors in inline styles
            if (inlineStyle && /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/.test(inlineStyle)) {
              violations.push({
                element: el.tagName,
                className: el.className,
                violation: 'Hardcoded RGB color in inline style',
                value: inlineStyle,
                storyId: window.location.search
              });
            }
            
            // Check class names for hardcoded Tailwind colors (like bg-blue-500)
            if (el.className && /bg-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone)-[0-9]{3}/.test(el.className)) {
              violations.push({
                element: el.tagName,
                className: el.className,
                violation: 'Hardcoded Tailwind color class',
                value: el.className,
                storyId: window.location.search
              });
            }
            
            // Check for arbitrary Tailwind values like bg-[#hex] or text-[rgb()]
            if (el.className && /\[(#[0-9a-fA-F]{3,6}|rgb\([0-9, ]+\))\]/.test(el.className)) {
              violations.push({
                element: el.tagName,
                className: el.className,
                violation: 'Arbitrary color value in Tailwind class',
                value: el.className,
                storyId: window.location.search
              });
            }
          });
          
          return violations;
        });
        
        if (hardcodedColors.length > 0) {
          console.warn(`Design token violations found in ${storyId}:`, hardcodedColors);
          allViolations.push(...hardcodedColors);
        }
      });
    }
    
    if (allViolations.length > 0) {
      console.error('All design token violations:', JSON.stringify(allViolations, null, 2));
    }
    
    expect(allViolations).toHaveLength(0);
  });
});