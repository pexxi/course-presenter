---
template: content
title: "Rule Types & Activation Patterns"
---

# Rule Types & Activation Patterns

## 🎯 The Four Rule Types

### 1. **Always Rules**

```yaml
description: ""
globs: ""
alwaysApply: true
```

- ✅ Applied to **every** chat and Cmd-K interaction
- 🎯 Use for: Global coding standards, response tone

### 2. **Glob Rules**

```yaml
description: ""
globs: "**/*.ts"  # Applies to all TypeScript files
alwaysApply: false
```

- 🔍 Matches files using glob patterns
- 🎯 Use for: Language/framework-specific rules

<!-- Speaker Notes:
Always Rules are powerful as they apply to every interaction, making them ideal for global standards. Use them judiciously to avoid overwhelming the AI. Glob Rules provide more targeted application, perfect for language or framework-specific guidelines.
-->

**Best Practices:**
- Start with a few critical Always Rules
- Use specific glob patterns for targeted rules
- Document the purpose of each rule
