---
title: "Security and Compliance"
type: "content"
---

# Security and Compliance

## Security Tools & Solutions

### Pomerium for MCP Security

- Gate every MCP request with identity verification
- Enforce rules based on role, time, or source
- Log and audit every agent action
- Block agents from going off-script

### Implementation Example

```yaml
# Pomerium policy for MCP servers
- from: https://internal.company.com
  to: mcp://database-server
  policy:
    - allow:
        users: ["data-team@company.com"]
        during: ["business-hours"]
```

<!-- Speaker Notes:
- Pomerium specifically designed for securing agentic access
-->
