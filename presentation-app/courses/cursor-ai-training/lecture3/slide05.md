---
template: content
title: "@Folders Integration"
---

# @Folders Integration

## Your Gateway to Comprehensive Context

### **Basic @folder Syntax**

```
@folder src/components/
Analyze all React components for accessibility issues
```

```
@folder src/api/
@folder src/models/
Review the API and data model consistency
```

## Advanced @Folders Techniques

### **Selective Context Building**

- **Targeted Analysis** - Include only relevant directories
- **Performance Balance** - Context vs. processing efficiency
- **Progressive Inclusion** - Start narrow, expand as needed

### **Multiple Folder Strategy**

```
@folder src/auth/
@folder src/middleware/
@folder config/
Analyze the complete authentication and security setup
```

### **Best Practices**

- **Relevant Scope** - Don't include everything
- **Logical Grouping** - Related functionality together
- **Context Cleanup** - Remove when switching tasks

<!-- Speaker Notes:
The @folder feature is your gateway to providing comprehensive context to AI. Think of it as telling the AI: "Here's exactly what I want you to focus on."

The beauty of @folder is its simplicity and power. With a single command, you can include entire directory trees in your conversation context. But with great power comes the need for strategy.

The key insight here is selective context building. More context isn't always better - it can actually make AI responses slower and less focused. You want to include enough context to get meaningful analysis, but not so much that you overwhelm the system.

Let me show you the difference between good and poor @folder usage:

Poor usage: @folder . (includes everything)
Good usage: @folder src/auth/ @folder src/middleware/ (focused on specific functionality)

The multiple folder strategy is particularly powerful when you're working on features that span multiple modules. For example, if you're working on authentication, you might want to include the auth directory, middleware directory, and configuration files.

Remember, you can always add more context as needed, but starting focused is usually the better approach.

Performance considerations are important too. Including massive directories can slow down AI responses. Start with the most relevant directories and expand your context as needed.
-->