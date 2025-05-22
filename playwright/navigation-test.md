# Navigation Tab Testing with Playwright MCP

This document outlines a test procedure for Claude Code to validate the navigation functionality of the Tyler Morgan website using Playwright MCP. The test ensures that all navigation tabs work correctly and lead to the expected pages.

## Test Objectives

1. Verify that all navigation links are visible in the navigation bar
2. Ensure each navigation link leads to the correct page
3. Confirm the active navigation link is properly highlighted
4. Test navigation functionality across desktop viewport sizes

## Navigation Elements

Based on the Navigation component, the following navigation items should be tested:

- Home (`/`) - with HomeIcon
- Blog (`/blog`) - with BookOpenIcon
- Projects (`/projects`) - with FolderIcon
- Contact (`/contact`) - with EnvelopeIcon

## Test Procedure for Claude Code with Playwright MCP

### Setup

```javascript
// This is a pseudocode example that Claude Code can interpret
// The actual implementation will be handled by Claude Code via MCP commands

// Start the local development server
await startDevServer();

// Navigate to the homepage
await goToPage('http://localhost:3000');
```

### Test Case 1: Verify Navigation Links Visibility

```javascript
// Check if all navigation links are visible on the page
const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' }
];

// For each link, verify it's visible
for (const link of navigationLinks) {
  await verifyElementVisible(`link containing "${link.name}"`);
}
```

### Test Case 2: Navigation Functionality

```javascript
// Test each navigation link
await testNavigationLink('Home', '/');
await testNavigationLink('Blog', '/blog');
await testNavigationLink('Projects', '/projects');
await testNavigationLink('Contact', '/contact');

// Helper function to test navigation
async function testNavigationLink(name, expectedPath) {
  // Click on the navigation link
  await clickElement(`link containing "${name}"`);
  
  // Verify the URL has changed to the expected path
  await verifyURL(`http://localhost:3000${expectedPath}`);
  
  // Verify the page title or some unique element specific to this page
  await verifyPageContent(expectedPath);
}
```

### Test Case 3: Verify Active Link Highlighting

```javascript
// For each navigation item
for (const link of navigationLinks) {
  // Navigate to the page
  await goToPage(`http://localhost:3000${link.href}`);
  
  // Verify the current link is highlighted (has the active class)
  await verifyActiveLink(link.name);
  
  // Verify other links are not highlighted
  for (const otherLink of navigationLinks.filter(l => l.name !== link.name)) {
    await verifyLinkNotActive(otherLink.name);
  }
}
```

### Test Case 4: Responsive Design Testing

```javascript
// Test navigation on different viewport sizes
const viewportSizes = [
  { width: 1920, height: 1080 }, // Large desktop
  { width: 1366, height: 768 },  // Standard desktop
  { width: 1024, height: 768 }   // Small desktop/large tablet
];

for (const viewport of viewportSizes) {
  // Set viewport size
  await setViewportSize(viewport.width, viewport.height);
  
  // Verify all navigation links are visible
  for (const link of navigationLinks) {
    await verifyElementVisible(`link containing "${link.name}"`);
  }
  
  // Test navigation functionality in this viewport
  for (const link of navigationLinks) {
    await clickElement(`link containing "${link.name}"`);
    await verifyURL(`http://localhost:3000${link.href}`);
  }
}
```

## Implementation Notes for Claude Code

When executing these tests with Playwright MCP, Claude Code should:

1. Start the local development server (`npm run dev`)
2. Use Playwright MCP to control the browser and navigate through the application
3. For each test case, verify the expected behavior
4. Report any failures or issues encountered during testing
5. Take screenshots if a test fails (if possible)

## Expected Results

- All navigation links should be visible in the navigation bar
- Clicking each link should navigate to the correct page
- The active link should be highlighted with a border-b-2 border-gray-900 dark:border-gray-100 class
- Non-active links should have border-transparent and text-gray-500 classes
- All functionality should work correctly across the tested viewport sizes

## Actual Results

Claude Code will fill this section with the results of the test execution, including:

- Pass/Fail status for each test case
- Screenshots of any failures (if possible)
- Description of any issues encountered
- Recommendations for fixes if problems are found