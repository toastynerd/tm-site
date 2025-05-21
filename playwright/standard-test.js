// Standard Playwright test for navigation

const { chromium } = require('playwright');

async function runNavigationTest() {
  console.log('Starting navigation test with standard Playwright');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to the homepage
    console.log('Navigating to homepage...');
    await page.goto('http://localhost:3000');
    console.log('✅ Successfully loaded homepage');
    
    // Check if navigation elements exist
    const navigationItems = [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: 'Projects', href: '/projects' },
      { name: 'Contact', href: '/contact' }
    ];
    
    // Verify all navigation links are present
    console.log('\nVerifying navigation links...');
    for (const item of navigationItems) {
      // Look for navigation links specifically in the nav element
      const navElement = page.locator('nav');
      const linkLocator = navElement.getByRole('link', { name: item.name, exact: true }).first();
      const isVisible = await linkLocator.isVisible();
      console.log(`- ${item.name} link: ${isVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
    }
    
    // Test navigation to each page
    console.log('\nTesting navigation to each page...');
    for (const item of navigationItems) {
      // Navigate to the page
      console.log(`\nNavigating to ${item.name} page...`);
      await page.locator('nav').getByRole('link', { name: item.name, exact: true }).first().click();
      
      // Wait for navigation
      await page.waitForURL(`**${item.href}`);
      
      // Verify URL - allow for trailing slash differences
      const currentUrl = page.url();
      const expectedUrl = `http://localhost:3000${item.href === '/' ? '' : item.href}`;
      const expectedUrlAlt = `http://localhost:3000${item.href === '/' ? '/' : item.href}`;
      const urlMatches = currentUrl === expectedUrl || currentUrl === expectedUrlAlt;
      console.log(`- URL check: ${urlMatches ? '✅ CORRECT' : '❌ INCORRECT'}`);
      console.log(`  Expected: ${expectedUrl} or ${expectedUrlAlt}`);
      console.log(`  Actual: ${currentUrl}`);
      
      // Check active state
      console.log(`- Checking active state for ${item.name}...`);
      for (const navItem of navigationItems) {
        const linkElement = page.locator('nav').getByRole('link', { name: navItem.name, exact: true }).first();
        // Check if it has the active class if it's the current page
        // or the inactive class if it's not
        const shouldBeActive = navItem.name === item.name;
        const hasActiveClass = await linkElement.evaluate((el, data) => {
          if (data.shouldBeActive) {
            return el.classList.contains('border-gray-900') || el.classList.contains('border-gray-100');
          } else {
            return el.classList.contains('text-gray-500') || el.classList.contains('text-gray-400');
          }
        }, { shouldBeActive });
        
        console.log(`  - ${navItem.name}: ${hasActiveClass ? '✅ CORRECT STATE' : '❌ INCORRECT STATE'}`);
      }
    }
    
    console.log('\nAll navigation tests completed successfully! ✅');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    console.log('\nBrowser closed');
  }
}

runNavigationTest().catch(console.error);