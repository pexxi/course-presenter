---
slide_type: code-example
title: "Example: Agent-Requested Rule - Security"
---

# Example: Agent-Requested Rule - Security

**File: `.cursor/rules/domains/security.mdc`**

```markdown
---
description: "Security best practices and guidelines"
globs: "**/*.{ts,tsx,js,jsx,py,java}"
# No alwaysApply - must be explicitly requested
---

# Security Best Practices

## Authentication & Authorization
- Always validate JWT tokens
- Implement proper role-based access control (RBAC)
- Use secure session management
- Implement rate limiting
- Set secure, HTTP-only cookies for sessions

## Input Validation
- Validate all user inputs on the server
- Use allowlists over denylists
- Sanitize HTML/JS in user-generated content
- Use parameterized queries to prevent SQL injection
- Set proper CORS policies

## Secure Dependencies
- Regularly update dependencies
- Use `npm audit` or similar tools
- Pin dependency versions
- Review third-party code
- Use dependency locking

## Secure Configuration
- Never commit secrets to version control
- Use environment variables for configuration
- Implement secure defaults
- Disable debug modes in production
- Use secure headers (CSP, HSTS, etc.)

## Secure Communication
- Enforce HTTPS
- Use secure WebSocket (WSS)
- Implement certificate pinning
- Use secure cookie attributes
- Implement proper CORS policies
```

<!-- Speaker Notes:
Agent-Requested Rules are applied when specifically requested by the AI agent. This security rule demonstrates how to set up comprehensive security guidelines that can be referenced when needed. The rule covers authentication, input validation, dependency management, secure configuration, and secure communication practices.
-->

**Key Characteristics:**
- Must be explicitly requested by the agent
- Great for domain-specific knowledge
- Can be applied across multiple file types
- Provides in-depth guidance on specific topics
