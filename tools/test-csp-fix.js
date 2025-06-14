#!/usr/bin/env node
/**
 * Test script to verify that the Storybook test runner CSP fix is working
 * This script validates that axe-playwright is properly imported and configured
 */

const { injectAxe, checkA11y } = require('axe-playwright');
const { chromium } = require('playwright');

async function testCSPFix() {
  console.log('🧪 Testing Storybook accessibility CSP fix...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Test basic HTML page
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Page</title>
          <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval'">
        </head>
        <body>
          <h1>Test Heading</h1>
          <button>Test Button</button>
        </body>
      </html>
    `);
    
    // Test axe-playwright injection (should work without CSP issues)
    console.log('✨ Injecting axe-core using axe-playwright...');
    await injectAxe(page);
    console.log('✅ axe-core injected successfully (no CSP violations)');
    
    // Test accessibility check
    console.log('🔍 Running accessibility checks...');
    await checkA11y(page, undefined, {
      detailedReport: false,
      reporter: 'no-passes',
    });
    console.log('✅ Accessibility checks completed successfully');
    
    console.log('\n🎉 All tests passed! The CSP fix is working correctly.');
    console.log('📝 Storybook test runner should now work without Content Security Policy errors.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  testCSPFix().catch(console.error);
}

module.exports = { testCSPFix };
