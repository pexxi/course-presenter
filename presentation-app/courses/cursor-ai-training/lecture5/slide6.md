---
title: "Code Example: Setting Up Database MCP Server"
type: "code-example"
---

# Code Example: Setting Up Database MCP Server

## PostgreSQL MCP Server Setup

### Installation & Configuration

```bash
# Install PostgreSQL MCP server
npm install -g @modelcontextprotocol/server-postgres

# Create server configuration
mkdir -p ~/.config/cursor/mcp-servers
```

### Claude Desktop Configuration

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:password@localhost:5432/database"
      ],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/database"
      }
    }
  }
}
```

---

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
- Show how simple it is to connect databases via MCP
- Connection strings should use environment variables in production
- MongoDB server has built-in auth and access control support
- These servers expose data directly to the AI - security is critical
- Demo connecting to a local database if time permits
-->