---
template: content
title: "Rule Types & Activation Patterns"
---

# Rule Types & Activation Patterns

## ⚡ Activation Patterns

### 1. **Directory-based Activation**

```
.cursor/rules/
  frontend/
    react-rules.mdc
  backend/
    api-rules.mdc
```
- Rules auto-apply based on file location
- Perfect for domain-specific conventions

### 2. **File-based Activation**

```yaml
# In .mdc file
globs: "**/api/**/*.ts"
```
- Rules apply to matching files
- Great for technical requirements

### 3. **Manual Activation**

```typescript
// In your code
// @rule: security-rules
```
- Explicitly reference rules
- Ideal for special cases

<!-- Speaker Notes:
Understanding activation patterns is key to effective rule management. Directory-based activation keeps related rules together, while file-based patterns offer precise control. Manual activation provides flexibility when you need it.
-->

**Pro Tips:**
- Organize rules by domain/feature
- Use clear, descriptive rule names
- Document activation patterns in your team's wiki
