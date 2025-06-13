---
type: content
title: "Setting Up MCP Servers"
---

# Setting Up MCP Servers

## From Installation to First Connection

---

### MCP Transport Mechanisms

#### Evolution of Transport Layers

- **stdio**: Local development, low latency (current standard)
- **HTTP + SSE**: Remote servers (legacy, deprecated)
- **Streamable HTTP**: Enterprise, cloud-native (preferred for production)

#### Choosing the Right Transport

| Use Case | Transport | Benefits |
|----------|-----------|----------|
| Local development | stdio | Simple, secure, fast |
| Enterprise remote | Streamable HTTP | Proxy-friendly, scalable |
| Edge deployment | Cloudflare Workers | Global distribution |

---

### Popular MCP Server Categories

#### Database Servers

- **PostgreSQL/MySQL**: SQL query execution
- **MongoDB**: NoSQL document operations
- **Vector databases**: Semantic search (Qdrant, Pinecone)

#### Enterprise Integration

- **Microsoft Dataverse**: Business data interaction
- **Salesforce**: CRM operations
- **Atlassian**: Jira/Confluence management

#### Development Tools

- **GitHub**: Repository management
- **Docker**: Container operations
- **AWS/Azure**: Cloud resource control

---

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

---

### Configuration Best Practices

#### Security Configuration

- **Environment variables** for credentials
- **OAuth 2.1** for authentication
- **Principle of least privilege** for permissions
- **TLS encryption** for remote connections

#### Performance Optimization

- **Connection pooling** for databases
- **Rate limiting** to prevent abuse
- **Caching** for frequently accessed data
- **Monitoring** for health checks

<!--
Speaker Notes:
Setting up MCP servers has evolved significantly since the protocol's introduction. The transport layer evolution is particularly important - we've moved from experimental SSE to production-ready Streamable HTTP for enterprise deployments.

The key insight here is choosing the right setup for your use case. Local development with stdio is perfect for getting started, but enterprise deployments need the robustness of Streamable HTTP with proper authentication and monitoring.

The ecosystem has exploded with over 1,000 community-built servers available. The categories shown here represent the most common enterprise use cases we're seeing in 2025.

Security is paramount when setting up MCP servers. These servers can access sensitive data and perform actions on behalf of AI agents, so proper authentication, authorization, and auditing are essential.
-->