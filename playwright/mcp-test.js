// Test with Playwright MCP
// Import the MCP module
let createConnection;
try {
  // Try to import as ES module
  const mcp = require('@playwright/mcp');
  createConnection = mcp.createConnection;
} catch (error) {
  console.error('Failed to import @playwright/mcp:', error);
  process.exit(1);
}

async function runTest() {
  console.log('Starting MCP test');
  
  try {
    // Create a connection to the MCP server
    const connection = await createConnection({
      browser: {
        launchOptions: {
          headless: false,
        }
      }
    });
    
    console.log('Connected to MCP server');
    
    // Send commands to navigate
    await connection.send({
      id: '1',
      method: 'goto',
      params: {
        url: 'http://localhost:3000'
      }
    });
    
    console.log('Navigated to homepage');
    
    // Wait for navigation to complete
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get a snapshot of the page
    const snapshot = await connection.send({
      id: '2',
      method: 'snapshot',
      params: {}
    });
    
    console.log('Got snapshot with nodes:', snapshot.result.nodes.length);
    
    // Find the Blog link and click it
    const nodeIds = Object.keys(snapshot.result.nodes);
    let blogLinkId = null;
    
    for (const id of nodeIds) {
      const node = snapshot.result.nodes[id];
      if (node.name === 'Blog') {
        blogLinkId = id;
        break;
      }
    }
    
    if (blogLinkId) {
      console.log('Found Blog link, clicking it');
      
      await connection.send({
        id: '3',
        method: 'click',
        params: {
          nodeId: blogLinkId
        }
      });
      
      console.log('Clicked Blog link, waiting for navigation');
      
      // Wait for navigation to complete
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get another snapshot to verify we're on the blog page
      const blogSnapshot = await connection.send({
        id: '4',
        method: 'snapshot',
        params: {}
      });
      
      console.log('Got blog page snapshot with nodes:', blogSnapshot.result.nodes.length);
      console.log('Test completed successfully');
    } else {
      console.error('Could not find Blog link in snapshot');
    }
    
    // Close the browser
    await connection.send({
      id: '5',
      method: 'close',
      params: {}
    });
    
    console.log('Browser closed');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTest().catch(console.error);