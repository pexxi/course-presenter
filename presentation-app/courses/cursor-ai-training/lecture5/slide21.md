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
This code example demonstrates the power and simplicity of creating custom MCP servers for your business-specific needs. What you're seeing here is a complete tool implementation that can expose any business API to AI agents through the MCP protocol.

The key insight is that MCP servers are just HTTP request handlers with a specific schema. The `CallToolRequestSchema` defines the expected request format, and your handler extracts the tool name and arguments. This pattern lets you expose any existing business logic or API endpoint to AI agents without significant refactoring.

Look at the error handling pattern here. The explicit check for unknown tools and the thrown error ensure that AI agents get clear feedback when they attempt to use non-existent tools. This is crucial for debugging and maintaining reliable AI workflows.

The customer data example shows how you can wrap existing business logic. Whether you're connecting to internal databases, calling microservices, or integrating with third-party APIs, the pattern remains consistent. Your existing authentication, authorization, and business logic stays intact - you're just adding an MCP interface layer.

Notice how the response format includes type information. The MCP protocol supports various content types including text, images, and structured data. This flexibility means you can return rich information that AI agents can process effectively, whether it's JSON data, formatted text, or even binary content.

The transport layer using `StdioServerTransport` is one of several options. In production environments, you might use HTTP transport for better scalability and monitoring. The key is that your business logic remains the same regardless of the transport mechanism.

This approach means that any API in your organization can become accessible to AI agents with minimal development effort. Whether it's customer management systems, inventory databases, or analytics platforms, the MCP server pattern provides a standardized way to expose these capabilities to AI systems.
-->
