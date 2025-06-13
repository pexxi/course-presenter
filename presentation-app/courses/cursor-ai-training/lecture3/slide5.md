---
template: content
title: "Advanced File Referencing"
---

# Advanced File Referencing

## Beyond Single File Context

### **Multi-File Context Strategy**

**Related Component Groups:**

```
@folder src/components/user/
@folder src/hooks/useUser.js
@folder src/types/user.ts
Refactor user management to support role-based permissions
```

**Cross-Module Analysis:**

```
@folder src/api/
@folder src/services/
@folder src/utils/validation/
Standardize error handling across all API interactions
```

## Strategic File Selection

### **Configuration Integration**

```
@folder src/auth/
@folder config/auth.json
@folder .env.example
Update authentication to support OAuth2 providers
```

### **Documentation Inclusion**

```
@folder src/api/
@folder docs/api-guidelines.md
@folder README.md
Ensure API implementation follows documented standards
```

### **Hierarchical Context Building**

1. **Start Specific** - Core functionality files
2. **Add Related** - Dependencies and utilities  
3. **Include Config** - Settings and environment
4. **Add Documentation** - Context and guidelines

<!-- Speaker Notes:
Advanced file referencing is about strategic context building. It's not just about including files - it's about building a comprehensive understanding by carefully selecting related components.

The key insight here is that modern applications are built with interconnected components. When you're working on a feature, you often need to understand not just the core implementation, but also the configuration, utilities, types, and documentation that support it.

Let me give you a practical example. If you're working on user management, you don't just need the user component. You likely need:
- The user component files
- The custom hooks that manage user state
- The TypeScript types that define user data
- The API endpoints that serve user data
- The validation utilities
- The configuration files
- The documentation that explains the user flow

This hierarchical approach to context building is particularly powerful. Start with your core functionality, then progressively add related components, configuration, and documentation.

The configuration integration pattern is especially important in enterprise environments where settings are often split across multiple files - environment variables, JSON configs, and documentation.

Documentation inclusion is often overlooked but incredibly valuable. Including README files and API documentation helps AI understand not just how the code works, but how it's supposed to work according to your team's standards.

Remember: the goal is comprehensive understanding, not just code modification.
-->