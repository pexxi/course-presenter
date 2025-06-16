---
type: content
title: "Setting Up MCP Servers"
---

# Setting Up MCP Servers

### Installation Methods

#### 1. Using Claude Desktop

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:pass@localhost/db"
      }
    }
  }
}
```

#### 2. Using Package Managers

```bash
# Python servers
pip install mcp-server-postgres

# Node.js servers  
npm install @modelcontextprotocol/server-github

# Using Cursor with MCP
npm install -g @modelcontextprotocol/cli
```

<!--
Speaker Notes:
Installation is straightforward, whether you're using a desktop client like Claude or package managers like pip and npm. The key is to select the method that best fits your development workflow. For local testing, configuring servers directly in your AI host application is often the quickest way to get started.
-->
