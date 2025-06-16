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
When we talk about securing MCP implementations, traditional security approaches fall short because we're dealing with autonomous agents that make decisions and access resources dynamically. This is where Pomerium becomes crucial - it's specifically designed for securing agentic access patterns.

Let me walk you through how Pomerium addresses the unique challenges of AI agent security. First, it gates every MCP request with identity verification. Unlike traditional API security that might trust internal traffic, Pomerium assumes zero trust - every request from every agent must be authenticated.

The policy enforcement layer is where this gets interesting. You can enforce rules based on user identity, time constraints, or request source. For example, you might allow your development team's AI agents to access the database during business hours, but restrict access outside those hours or from unknown locations.

Logging and auditing become critical when agents are acting autonomously. Pomerium captures every agent action, creating an audit trail that's essential for compliance and security monitoring. When an AI agent makes a decision that affects your business, you need to know exactly what data it accessed and what actions it took.

The "block agents from going off-script" capability is particularly important. AI agents can be unpredictable, and without proper controls, they might attempt to access resources or perform actions outside their intended scope. Pomerium acts as a circuit breaker, ensuring agents stay within their defined boundaries.

Looking at the implementation example, notice how the policy is declarative and readable. You're not writing complex security code - you're defining business rules in YAML. This approach makes security policies auditable and maintainable by both security teams and developers.

The integration with identity providers means this works with your existing authentication infrastructure. Whether you're using Active Directory, Okta, or any other identity provider, Pomerium can enforce your existing role-based access controls for AI agents.
-->
