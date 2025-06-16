---
title: "Code Example: Custom MCP Server Development"
type: "code-example"
---

# Code Example: Custom MCP Server Development

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
- Show how any business API can be wrapped as an MCP server
- Emphasize the importance of proper error handling and validation
-->
