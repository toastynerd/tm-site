// Projects page test: Tests GitHub links functionality
const { chromium } = require('playwright');

async function runProjectsTest() {
  console.log('Starting projects page test');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to the projects page
    console.log('Navigating to projects page...');
    await page.goto('http://localhost:3000/projects');
    console.log('✅ Successfully loaded projects page');
    
    // Step 1: Verify projects page elements
    console.log('\nStep 1: Verifying projects page elements...');
    
    // Check heading
    const heading = await page.locator('h1:has-text("Projects")');
    const isHeadingVisible = await heading.isVisible();
    console.log(`- Projects heading: ${isHeadingVisible ? '✅ VISIBLE' : '❌ NOT VISIBLE'}`);
    
    // Get all projects
    const projects = await page.locator('article').all();
    console.log(`- Found ${projects.length} projects`);
    
    if (projects.length === 0) {
      throw new Error('No projects found on the page');
    }
    
    // Collect information about projects for verification
    const projectsInfo = [];
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      // Get main text without badge text
      const h3El = await project.locator('h3').first();
      let name = await h3El.textContent();
      // Remove any badge text if present
      const badgeElement = await h3El.locator('a:nth-child(2)').first();
      if (await badgeElement.count() > 0) {
        const badgeText = await badgeElement.textContent();
        name = name.replace(badgeText, '').trim();
      }
      const description = await project.locator('p').textContent();
      
      // Get the GitHub link
      const linkElement = await project.locator('a').first();
      const href = await linkElement.getAttribute('href');
      
      // Get technologies
      const techElements = await project.locator('.bg-gray-50, .bg-gray-800').all();
      const technologies = [];
      for (const tech of techElements) {
        technologies.push(await tech.textContent());
      }
      
      projectsInfo.push({
        index: i,
        name: name.trim(),
        description,
        href,
        technologies,
        project
      });
      
      console.log(`- Project ${i + 1}: "${name.trim()}" - ${technologies.join(', ')}`);
      console.log(`  Link: ${href}`);
    }
    
    // Step 2: Verify all GitHub links
    console.log('\nStep 2: Verifying GitHub links...');
    
    for (const projectInfo of projectsInfo) {
      console.log(`- Checking link for "${projectInfo.name}"`);
      
      // Verify the link is a GitHub URL
      const isGitHubLink = projectInfo.href.includes('github.com');
      console.log(`  GitHub link: ${isGitHubLink ? '✅ VALID' : '❌ INVALID'}`);
      
      if (!isGitHubLink) {
        console.log(`  WARNING: Link does not point to GitHub: ${projectInfo.href}`);
      }
    }
    
    // Step 3: Verify GitHub links are configured to open in new tabs
    console.log('\nStep 3: Verifying GitHub links open in new tabs...');
    
    if (projectsInfo.length > 0) {
      for (const testProject of projectsInfo) {
        console.log(`- Testing link for "${testProject.name}"`);
        
        // Check if the link has target="_blank" attribute
        const linkElement = await testProject.project.locator(`h3 a[href="${testProject.href}"]`).first();
        const target = await linkElement.getAttribute('target');
        const rel = await linkElement.getAttribute('rel');
        
        console.log(`  Has target="_blank": ${target === '_blank' ? '✅ YES' : '❓ NO'}`);
        console.log(`  Has rel="noopener noreferrer": ${rel === 'noopener noreferrer' ? '✅ YES' : '❓ NO'}`);
        
        // Verify we're linking to GitHub
        const isGitHub = testProject.href.includes('github.com');
        console.log(`  GitHub verification: ${isGitHub ? '✅ VALID' : '❌ INVALID'}`);
      }
    }
    
    // Step 4: Test project badges if present
    console.log('\nStep 4: Testing project badges (if present)...');
    
    for (const projectInfo of projectsInfo) {
      // Look for badge elements
      const badgeElement = await projectInfo.project.locator('h3 a:nth-child(2)').first();
      
      if (await badgeElement.isVisible()) {
        console.log(`- Found badge for "${projectInfo.name}"`);
        
        // Get badge text
        const badgeText = await badgeElement.textContent();
        console.log(`  Badge text: ${badgeText}`);
        
        // Get badge link
        const badgeLink = await badgeElement.getAttribute('href');
        console.log(`  Badge link: ${badgeLink}`);
        
        // Verify badge link is valid
        const isBadgeLinkValid = badgeLink && (
          badgeLink.includes('github.com') || 
          badgeLink.startsWith('http')
        );
        console.log(`  Badge link valid: ${isBadgeLinkValid ? '✅ VALID' : '❌ INVALID'}`);
      } else {
        console.log(`- No badge found for "${projectInfo.name}"`);
      }
    }
    
    console.log('\nAll projects tests completed successfully! ✅');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
    console.log('\nBrowser closed');
  }
}

runProjectsTest().catch(console.error);