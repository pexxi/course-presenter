---
type: content
title: "Setting Up MCP Servers"
---

# Setting Up MCP Servers

### MCP Transport Mechanisms

#### Evolution of Transport Layers

- **stdio**: Local development, low latency (current standard)
- **HTTP + SSE**: Remote servers (legacy, deprecated)
- **Streamable HTTP**: Enterprise, cloud-native (preferred for production)

#### Choosing the Right Transport

| Use Case          | Transport          | Benefits                   |
|-------------------|--------------------|----------------------------|
| Local development | stdio              | Simple, secure, fast       |
| Enterprise remote | Streamable HTTP    | Proxy-friendly, scalable   |
| Edge deployment   | Cloudflare Workers | Global distribution        |

<!--
Speaker Notes:
Setting up MCP servers has evolved significantly since the protocol's introduction. The transport layer evolution is particularly important - we've moved from experimental SSE to production-ready Streamable HTTP for enterprise deployments.

The key insight here is choosing the right setup for your use case. Local development with stdio is perfect for getting started, but enterprise deployments need the robustness of Streamable HTTP with proper authentication and monitoring.
-->
