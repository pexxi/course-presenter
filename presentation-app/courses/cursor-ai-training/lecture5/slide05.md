---
type: content
title: "Introduction to MCP Servers"
---

# Introduction to MCP Servers

### MCP Architecture Overview

```
┌─────────────┐    JSON-RPC    ┌─────────────┐
│ AI Agent    │◄──────────────►│ MCP Server  │
│ (Cursor)    │                │             │
└─────────────┘                └─────────────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │ Database/   │
                               │ API/Tool    │
                               └─────────────┘
```

<!--
Speaker Notes:
For enterprises, this means AI agents can now access live business data, from CRM systems to databases to internal tools, through a secure and standardized interface.
-->
