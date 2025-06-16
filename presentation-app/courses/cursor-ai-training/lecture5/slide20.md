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
This MongoDB example demonstrates an important architectural principle: MCP servers can be database-agnostic while providing consistent interfaces to AI agents. The configuration here shows how you can connect to MongoDB with the same simplicity we demonstrated earlier with PostgreSQL.

Notice that the environment variables include connection pooling configuration. When you're dealing with AI agents that might make multiple concurrent requests, proper connection management becomes critical. The MongoDB MCP server handles this automatically, but you can tune parameters like max pool size based on your workload patterns.

The security model here is worth highlighting. The MongoDB server includes built-in authentication and access control support. This means you can leverage MongoDB's existing role-based access controls and authentication mechanisms. The MCP server respects these constraints - if a user doesn't have permission to access a particular collection in MongoDB, the MCP server will enforce those restrictions.

Looking at the usage example, the automatically provided tools cover the full CRUD operation spectrum. The query tool supports MongoDB's powerful aggregation framework, so AI agents can perform complex data analysis operations. The schema tool is particularly valuable because it allows agents to understand your data structure dynamically, making their queries more intelligent and reducing errors.

This flexibility extends beyond just different database technologies. The same pattern works for different data storage approaches - document databases like MongoDB, relational databases like PostgreSQL, graph databases, or even file-based storage systems. MCP provides the abstraction layer that lets AI agents work with data regardless of the underlying storage technology.

The practical implication is that you can standardize your AI agent interfaces while maintaining flexibility in your data architecture choices. This becomes particularly valuable in enterprise environments where you might have multiple database technologies serving different use cases.
-->
