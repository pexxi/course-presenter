---
template: content
title: "Multi-File Operations"
---

# Multi-File Operations

## Cross-File Refactoring Mastery

### **API Interface Changes**

```
@folder src/api/
@folder src/services/
@folder src/types/
I need to add a 'status' field to the User model. 
Update the model, all API endpoints, and TypeScript types.
```

### **Dependency Updates**

```
@folder src/
@folder package.json
Update from React 17 to React 18, including all 
breaking changes and deprecation warnings.
```

## Consistency Management

### **Style Enforcement**

- **Naming Conventions** - Consistent terminology across files
- **Pattern Implementation** - Apply design patterns uniformly
- **Architecture Compliance** - Follow established guidelines

### **Documentation Synchronization**

```
@folder src/components/
@folder docs/components/
Update all component documentation to match 
the latest implementation changes.
```

## Integration Testing Support

### **Test Generation**

- **Unit Tests** - Component-specific testing
- **Integration Tests** - Cross-module interaction testing
- **End-to-End** - Complete workflow validation

### **Mock and Fixture Creation**

- **API Mocks** - Realistic test data
- **Component Fixtures** - Test scenarios
- **Database Seeding** - Consistent test environments

<!-- Speaker Notes:
Multi-file operations are where AI really demonstrates its power for enterprise development. This is about making changes that need to be coordinated across multiple files, modules, and even different types of assets.

Let me start with a common scenario: API changes. When you modify an API interface, you typically need to update:
- The API endpoint implementation
- The data models or types
- The frontend services that call the API
- The tests that verify the API behavior
- The documentation that describes the API

Doing this manually is error-prone and time-consuming. With AI, you can describe the change once and have it propagated consistently across all relevant files.

The key insight here is consistency. AI doesn't just make changes - it makes consistent changes that follow your established patterns and conventions.

Dependency updates are another great example. When you upgrade a major framework version like React, there are often breaking changes that need to be addressed across your entire codebase. AI can identify all the places that need updates and make the changes consistently.

Style enforcement is particularly valuable for teams. AI can ensure that new code follows your established naming conventions, architectural patterns, and coding standards.

The integration testing support is often overlooked but incredibly valuable. When you make multi-file changes, you often need new tests to verify that everything works together correctly. AI can generate appropriate test scenarios based on understanding how your components interact.

This is especially powerful for large teams where maintaining consistency manually is challenging.
-->