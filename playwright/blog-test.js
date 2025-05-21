// Blog test: Tests blog listing and detail pages
const { chromium } = require('playwright');

async function runBlogTest() {
  console.log('Starting blog post test');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to the blog page
    console.log('Navigating to blog page...');
    await page.goto('http://localhost:3000/blog');
    console.log('✅ Successfully loaded blog page');
    
    // Step 1: Verify blog page elements
    console.log('\nStep 1: Verifying blog page elements...');
    
    // Check heading
    const heading = await page.locator('h1:has-text("Blog")');
    const isHeadingVisible = await heading.isVisible();
    console.log(`- Blog heading: ${isHeadingVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
    
    // Get all blog posts
    const blogPosts = await page.locator('article').all();
    console.log(`- Found ${blogPosts.length} blog posts`);
    
    if (blogPosts.length === 0) {
      throw new Error('No blog posts found on the page');
    }
    
    // Collect information about blog posts for verification
    const blogPostsInfo = [];
    for (let i = 0; i < blogPosts.length; i++) {
      const post = blogPosts[i];
      const title = await post.locator('h2 a').textContent();
      const dateEl = await post.locator('time').first();
      const date = await dateEl.textContent();
      const excerptEl = await post.locator('p').first();
      const excerpt = excerptEl ? await excerptEl.textContent() : null;
      
      blogPostsInfo.push({
        index: i,
        title,
        date,
        excerpt,
        post
      });
      
      console.log(`- Blog post ${i + 1}: "${title}" (${date})`);
    }
    
    // Step 2: Test clicking on a blog post
    console.log('\nStep 2: Testing blog post detail navigation...');
    
    // Select a blog post to test (first one)
    const testPost = blogPostsInfo[0];
    console.log(`- Clicking on blog post: "${testPost.title}"`);
    
    // Get the post link before clicking
    const titleLink = await testPost.post.locator('h2 a');
    
    // Extract the URL from the link
    const href = await titleLink.getAttribute('href');
    console.log(`- Blog post href: ${href}`);
    
    // Click on the blog post title
    await titleLink.click();
    
    // Wait for navigation
    await page.waitForURL(`**${href}`);
    console.log('✅ Successfully navigated to blog post detail page');
    
    // Step 3: Verify blog post detail page
    console.log('\nStep 3: Verifying blog post detail page...');
    
    // Check if the title matches - Use first h1 element in the header
    const detailTitle = await page.locator('article > header > h1').textContent();
    console.log(`- Detail page title: "${detailTitle}"`);
    console.log(`- Title match: ${detailTitle === testPost.title ? '✅ MATCHES' : '❌ DOES NOT MATCH'}`);
    
    // Check if the article content exists
    const articleContent = await page.locator('article').first();
    const hasContent = await articleContent.isVisible();
    console.log(`- Article content: ${hasContent ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
    
    // Check if date information is present
    const detailDate = await page.locator('time').textContent();
    console.log(`- Date information: ${detailDate ? '✅ PRESENT' : '❌ MISSING'}`);
    
    // Check if markdown content was rendered correctly
    const contentArea = await page.locator('.prose').first();
    const contentExists = await contentArea.isVisible();
    console.log(`- Markdown content: ${contentExists ? '✅ RENDERED' : '❌ NOT RENDERED'}`);
    
    // Navigate back to blog page and test another post if available
    if (blogPostsInfo.length > 1) {
      console.log('\nStep 4: Testing navigation to another blog post...');
      
      // Go back to blog index
      await page.goto('http://localhost:3000/blog');
      console.log('✅ Navigated back to blog index');
      
      // Select a different blog post (second one)
      const secondPost = blogPostsInfo[1];
      console.log(`- Clicking on second blog post: "${secondPost.title}"`);
      
      // Find the post again (we need to refetch it since we navigated)
      const secondPostLink = await page.locator('article').nth(1).locator('h2 a');
      const secondHref = await secondPostLink.getAttribute('href');
      
      // Click on the second blog post
      await secondPostLink.click();
      
      // Wait for navigation
      await page.waitForURL(`**${secondHref}`);
      console.log('✅ Successfully navigated to second blog post');
      
      // Verify the second post title
      const secondDetailTitle = await page.locator('article > header > h1').textContent();
      console.log(`- Second detail page title: "${secondDetailTitle}"`);
      console.log(`- Second title match: ${secondDetailTitle === secondPost.title ? '✅ MATCHES' : '❌ DOES NOT MATCH'}`);
    }
    
    console.log('\nAll blog tests completed successfully! ✅');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    console.log('\nBrowser closed');
  }
}

runBlogTest().catch(console.error);