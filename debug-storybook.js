import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to Storybook...');
    await page.goto('http://localhost:6006', { waitUntil: 'networkidle' });
    
    console.log('Page loaded, waiting for content...');
    await page.waitForTimeout(3000);
    
    // Check what's available on the page
    const title = await page.title();
    console.log('Page title:', title);
    
    // Look for iframe elements
    const iframes = await page.locator('iframe').count();
    console.log('Number of iframes found:', iframes);
    
    if (iframes > 0) {
      const iframeSelectors = await page.locator('iframe').evaluateAll(iframes => 
        iframes.map(iframe => ({
          id: iframe.id,
          class: iframe.className,
          src: iframe.src,
          'data-testid': iframe.getAttribute('data-testid')
        }))
      );
      console.log('Iframe details:', JSON.stringify(iframeSelectors, null, 2));
    }
    
    // Check for common Storybook elements
    const storybookElements = await page.evaluate(() => {
      const selectors = [
        '[data-testid*="storybook"]',
        '[id*="storybook"]',
        '[class*="storybook"]',
        'iframe[title*="storybook"]',
        'iframe[name*="storybook"]',
        '#storybook-root',
        '#storybook-preview-iframe',
        '.sb-show-main'
      ];
      
      return selectors.map(selector => ({
        selector,
        found: document.querySelector(selector) !== null,
        count: document.querySelectorAll(selector).length
      }));
    });
    
    console.log('Storybook element check:', JSON.stringify(storybookElements, null, 2));
    
    await page.waitForTimeout(2000);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
