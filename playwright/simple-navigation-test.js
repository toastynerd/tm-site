// Simple navigation test for Playwright MCP

const { chromium } = require('playwright');

async function runTest() {
  console.log('Starting simple navigation test');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to the site
    await page.goto('http://localhost:3001');
    console.log('Navigated to homepage');
    
    // Take a screenshot
    await page.screenshot({ path: './playwright/home-screenshot.png' });
    console.log('Screenshot taken of home page');
    
    // Click Blog link
    await page.click('text=Blog');
    console.log('Clicked on Blog link');
    
    // Wait for navigation
    await page.waitForURL('**/blog');
    console.log('Successfully navigated to Blog page');
    
    // Take a screenshot
    await page.screenshot({ path: './playwright/blog-screenshot.png' });
    console.log('Screenshot taken of blog page');
    
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
    console.log('Browser closed');
  }
}

runTest().catch(console.error);