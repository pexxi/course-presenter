---
title: "Security and Compliance"
type: "content"
---

# Security and Compliance

## Security Framework

### Enterprise Security Requirements

- **Identity-based access control** for every agent request
- **Zero Trust architecture** for MCP server connections
- **Audit logging** for all agent-to-tool interactions
- **Role-based permissions** based on user context and time

### Current Security Challenges

- MCP servers expose sensitive data **without built-in guardrails**
- Autonomous agents can act independently once connected
- Traditional OAuth insufficient for agentic AI workflows
- Need for real-time policy enforcement

---

## Compliance Considerations

### Industry Standards

- **SOC 2 Type II** compliance for enterprise deployments
- **GDPR/CCPA** data protection for EU/CA users
- **HIPAA** requirements for healthcare integrations
- **FedRAMP** for government sector implementations

### Best Practices

- **Data encryption** in transit and at rest
- **Least privilege access** for MCP server connections
- **Regular security audits** and penetration testing
- **Incident response plans** for AI-related security events

---

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
- Emphasize that MCP servers by default have no security guardrails
- 40-70% productivity improvements need to be balanced with security
- Pomerium specifically designed for securing agentic access
- Many organizations rushing to adopt without proper security framework
-->