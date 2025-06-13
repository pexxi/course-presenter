---
title: "Prompt Example: Enterprise Integration Planning"
type: "prompt-example"
---

# Prompt Example: Enterprise Integration Planning

## Strategic Planning Prompt

### Analyzing Current Infrastructure

```
You are an enterprise AI integration consultant. Help me create a comprehensive MCP server deployment plan for our organization.

Current Infrastructure:
- 3 PostgreSQL databases (customer, inventory, analytics)
- Salesforce CRM with 50,000+ accounts
- GitHub Enterprise with 200+ repositories
- Jira with 5,000+ issues across 15 projects
- Slack with 500+ users across 50 channels
- AWS infrastructure with 100+ services

Requirements:
- 500+ developers need AI assistance
- Must maintain SOC 2 compliance
- Integration with existing SSO (Azure AD)
- Audit trail for all AI actions
- Phased rollout over 6 months

Create a detailed implementation plan with:
1. Priority order for MCP server deployments
2. Security architecture recommendations
3. Rollout phases with success metrics
4. Risk mitigation strategies
5. Cost-benefit analysis

Focus on practical implementation steps and enterprise-grade security.
```

---

## Expected Response Structure

### AI Response Framework

The AI will provide:

- **Phase 1: Foundation** (Months 1-2)
  - GitHub and Jira MCP servers for developers
  - Basic security framework with Pomerium
  - Pilot group of 50 developers

- **Phase 2: Data Integration** (Months 3-4)
  - PostgreSQL MCP servers with read-only access
  - Salesforce MCP server for customer data
  - Extended to 200 developers

- **Phase 3: Full Deployment** (Months 5-6)
  - Complete infrastructure integration
  - All 500 developers enabled
  - Advanced analytics and monitoring

### Security Recommendations

- Zero Trust architecture for all MCP connections
- Role-based access control per data source
- Real-time audit logging and compliance reporting

<!-- Speaker Notes:
- This prompt demonstrates how to get strategic guidance for enterprise MCP deployments
- The AI can help with complex integration planning that would take consultants weeks
- Show how specific organizational details lead to better recommendations
- Emphasize the importance of phased rollouts in enterprise environments
-->