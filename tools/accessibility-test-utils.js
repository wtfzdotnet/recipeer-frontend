import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';
import { test, expect } from '@playwright/test';

// Configure axe for comprehensive accessibility testing
const axeConfig = {
  rules: {
    // Enable all WCAG 2.1 AA rules
    'color-contrast': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'aria-labels': { enabled: true },
    'heading-order': { enabled: true },
    'landmark-unique': { enabled: true },
    'region': { enabled: true },
    'bypass': { enabled: true },
    'focus-order-semantics': { enabled: true },
    'tabindex': { enabled: true },
    'alt-text': { enabled: true },
    'form-field-multiple-labels': { enabled: true },
    'label': { enabled: true },
    'button-name': { enabled: true },
    'link-name': { enabled: true },
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
};

export async function runAccessibilityTests(page, storyUrl) {
  await test.step('Setup accessibility testing', async () => {
    await page.goto(storyUrl);
    await injectAxe(page);
    await configureAxe(page, axeConfig);
  });

  await test.step('Check for accessibility violations', async () => {
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });
}

export async function runKeyboardNavigationTest(page) {
  await test.step('Test keyboard navigation', async () => {
    // Test Tab navigation
    const focusableElements = await page.locator('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').all();
    
    for (let i = 0; i < focusableElements.length; i++) {
      await page.keyboard.press('Tab');
      const focusedElement = await page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }

    // Test Shift+Tab navigation (reverse)
    for (let i = focusableElements.length - 1; i >= 0; i--) {
      await page.keyboard.press('Shift+Tab');
      const focusedElement = await page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });
}

export async function runColorContrastTest(page) {
  await test.step('Check color contrast', async () => {
    const contrastResults = await page.evaluate(() => {
      if (window.axe) {
        return window.axe.run({
          rules: {
            'color-contrast': { enabled: true }
          }
        });
      }
      return null;
    });

    if (contrastResults && contrastResults.violations.length > 0) {
      console.warn('Color contrast violations found:', contrastResults.violations);
      expect(contrastResults.violations).toHaveLength(0);
    }
  });
}

export async function runFocusManagementTest(page) {
  await test.step('Test focus management', async () => {
    // Test that focus indicators are visible
    const focusableElements = await page.locator('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').all();
    
    for (const element of focusableElements) {
      await element.focus();
      
      // Check that focused element has visible focus indicator
      const focusStyles = await element.evaluate((el) => {
        const computedStyle = window.getComputedStyle(el, ':focus');
        return {
          outline: computedStyle.outline,
          outlineWidth: computedStyle.outlineWidth,
          outlineStyle: computedStyle.outlineStyle,
          outlineColor: computedStyle.outlineColor,
          boxShadow: computedStyle.boxShadow,
        };
      });
      
      // Ensure some kind of focus indicator is present
      const hasFocusIndicator = 
        focusStyles.outline !== 'none' || 
        focusStyles.outlineWidth !== '0px' ||
        focusStyles.boxShadow !== 'none';
      
      if (!hasFocusIndicator) {
        console.warn(`Element lacks visible focus indicator:`, await element.textContent());
      }
    }
  });
}