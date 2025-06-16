---
title: "Security and Compliance"
type: "content"
---

# Security and Compliance

## Security Tools & Solutions

### Pomerium for MCP Security

**Pomerium** is an identity-aware access proxy that provides zero-trust security for applications.

- Gate every MCP request with identity verification
- Enforce rules based on role, time, or source
- Log and audit every agent action
- Block agents from going off-script

### MCP-Scan for Vulnerability Detection

**MCP-Scan** is a security scanning tool that detects vulnerabilities in MCP implementations.

- Static scanning for malicious tool descriptions and prompt injections
- Dynamic monitoring of MCP connections in real-time
- Detection of tool poisoning and cross-origin escalation attacks
- Enforcement of guardrailing policies on tool calls and responses

<!-- Speaker Notes:
When securing MCP implementations, traditional approaches fall short because we're dealing with autonomous agents. Two key tools address different aspects of this challenge.

Pomerium is an identity-aware access proxy that provides zero-trust security. It gates every MCP request with identity verification and enforces policies based on context like user role, time, or location. For example, allowing database access only during business hours or from specific team members.

MCP-Scan is a security scanner specifically designed for MCP implementations. It performs static analysis to detect malicious tool descriptions and prompt injections, while also providing dynamic monitoring of live MCP connections. It can identify attacks like tool poisoning where malicious actors try to manipulate agent behavior.

Both tools help create defense-in-depth for AI agent security - Pomerium controls access at the network level, while MCP-Scan validates the safety of the tools and interactions themselves.
-->
