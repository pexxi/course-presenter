---
title: "Code Example: Custom MCP Server Development"
type: "code-example"
---

# Code Example: Custom MCP Server Development

## Basic MCP Server Structure

### Server Initialization

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'custom-business-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
    resources: {},
    prompts: {}
  }
});
```

### Adding Custom Tools

```typescript
// Define a custom tool for business operations
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_customer_data',
        description: 'Retrieve customer information by ID',
        inputSchema: {
          type: 'object',
          properties: {
            customerId: { type: 'string' },
            includeHistory: { type: 'boolean', default: false }
          },
          required: ['customerId']
        }
      }
    ]
  };
});
```

---

## Tool Implementation

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === 'get_customer_data') {
    const { customerId, includeHistory } = args;
    
    // Your business logic here
    const customerData = await fetchCustomerData(customerId, includeHistory);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(customerData, null, 2)
        }
      ]
    };
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
```

<!-- Speaker Notes:
- This is the foundation for creating custom business integrations
- TypeScript provides excellent type safety for MCP development
- Claude 3.5 Sonnet is particularly good at generating MCP server code
- Show how any business API can be wrapped as an MCP server
- Emphasize the importance of proper error handling and validation
-->