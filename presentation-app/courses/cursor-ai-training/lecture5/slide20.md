---
title: "Code Example: Setting Up Database MCP Server"
type: "code-example"
---

# Code Example: Setting Up Database MCP Server

## Alternative: MongoDB MCP Server

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["-y", "@mongodb-js/mongodb-mcp-server"],
      "env": {
        "MONGODB_URI": "mongodb://localhost:27017/your-database",
        "MONGODB_MAX_POOL_SIZE": "10"
      }
    }
  }
}
```

### Usage Example

```javascript
// MCP server automatically provides these tools:
// - query: Execute MongoDB queries
// - insert: Insert documents
// - update: Update documents  
// - delete: Delete documents
// - schema: Get collection schemas
```

<!-- Speaker Notes:
- The MongoDB server also has built-in auth and access control support.
- This demonstrates the flexibility of MCP in supporting different database technologies.
-->
