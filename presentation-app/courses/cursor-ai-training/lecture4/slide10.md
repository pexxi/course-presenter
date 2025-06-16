---
template: content
title: "Rule Types & Activation Patterns"
---

# Rule Types & Activation Patterns

## 🎯 The Four Rule Types (Continued)

### 3. **Nested Rules**

```yaml
description: ""
globs: "**/components/**/*"
nested: true
```

- 📁 Automatically applied to files in subdirectories
- 🎯 Use for: Feature/module specific rules

### 4. **Manual Rules**

```yaml
description: ""
# No globs or alwaysApply
```

- ✋ Only applied when explicitly referenced
- 🎯 Use for: One-off or optional rules

<!-- Speaker Notes:
Nested Rules are perfect for organizing rules by feature or module, automatically applying to relevant files. Manual Rules offer flexibility by only applying when specifically called, ideal for temporary or situational guidelines.
-->

**Best Practices:**
- Use Nested Rules for domain-specific conventions
- Reserve Manual Rules for edge cases
- Document when and why to use each rule type
