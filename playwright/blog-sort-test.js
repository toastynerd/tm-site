// End-to-end blog post sorting test with Playwright
// Uses an already running dev server

const { chromium } = require('playwright');

async function runBlogSortTest() {
  console.log('Starting E2E blog post sorting test...');
  
  // Launch the browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Set longer timeouts for Next.js hydration
  page.setDefaultTimeout(60000);
  
  try {
    // Assume the server is already running
    console.log('Navigating to blog page...');
    await page.goto('http://localhost:3000/blog', { 
      timeout: 60000,
      waitUntil: 'networkidle'
    });
    console.log('✅ Successfully loaded blog page');
    
    // Take a screenshot of the initial page load
    await page.screenshot({ path: './playwright/blog-initial.png' });
    console.log('Initial screenshot saved to ./playwright/blog-initial.png');
    
    // Wait for Next.js hydration to complete
    console.log('Waiting for hydration...');
    try {
      // Wait for a specific element that indicates the page has loaded properly
      await page.waitForSelector('h2', { timeout: 15000 });
      console.log('✅ Found blog post titles');
    } catch (e) {
      console.log('⚠️ No h2 elements found, checking alternative selectors...');
      // Try alternative selectors in case the page structure is different
      const hasMainElement = await page.isVisible('main');
      console.log(`Main element visible: ${hasMainElement}`);
      if (hasMainElement) {
        await page.waitForTimeout(5000); // Extra time for hydration
      }
    }
    
    // Inspect DOM structure to find the blog posts
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    console.log('Page body start:', bodyHTML.substring(0, 300) + '...');
    
    // Look for blog post titles
    console.log('Looking for blog post titles...');
    const titlesLocator = page.locator('h2');
    const titles = await titlesLocator.allTextContents();
    console.log('Found titles:', titles);
    
    if (titles.length === 0) {
      // Take a screenshot when no titles are found
      await page.screenshot({ path: './playwright/blog-no-titles.png' });
      console.log('Screenshot saved to ./playwright/blog-no-titles.png');
      throw new Error('No blog post titles found on the page');
    }
    
    // Expected order of titles
    const expectedTitles = [
      'Working With Claude Code',
      'Working with Cursor',
      'Using AI to build simple AI agents'
    ];
    
    // Check if we have the right number of blog posts
    console.log(`Found ${titles.length} blog posts, expected ${expectedTitles.length}`);
    
    // Verify each title matches the expected title in order
    let allMatch = true;
    for (let i = 0; i < Math.min(titles.length, expectedTitles.length); i++) {
      const titleMatches = titles[i].includes(expectedTitles[i]);
      console.log(`Post ${i + 1}: "${titles[i]}" ${titleMatches ? '✅' : '❌'} (Expected: "${expectedTitles[i]}")`);
      
      if (!titleMatches) {
        allMatch = false;
      }
    }
    
    // Final result
    if (allMatch && titles.length === expectedTitles.length) {
      console.log('\n✅ Blog posts are in the correct order (newest first)!');
    } else {
      console.log('\n❌ Blog posts are NOT in the expected order');
    }
    
    // Take a final screenshot
    await page.screenshot({ path: './playwright/blog-final.png' });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    try {
      await page.screenshot({ path: './playwright/blog-error.png' });
      console.log('Error screenshot saved to ./playwright/blog-error.png');
    } catch (e) {
      console.error('Could not save error screenshot:', e);
    }
  } finally {
    await browser.close();
    console.log('Browser closed');
  }
}

runBlogSortTest().catch(console.error);