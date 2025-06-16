---
template: content
title: "Creating Effective Rules"
---

# Creating Effective Rules

## 🎯 Rule Design Principles

### **4. Structure Rules Logically**

```yaml
# .cursor/rules/
├── code-style/
│   ├── naming-conventions.mdc
│   └── formatting.mdc
└── security/
    ├── auth.mdc
    └── input-validation.mdc
```

### **5. Use Meaningful Rule Names**

```yaml
# Good
- use-react-hooks-correctly.mdc
- api-versioning-standards.mdc

# Less Clear
- rule1.mdc
- frontend-guidelines.mdc
```

### **6. Document the "Why"**

```markdown
<!-- Why this rule exists -->
This rule enforces consistent error handling patterns
across our API services to ensure maintainability
and better error reporting.
```

<!-- Speaker Notes:
Organizing rules in a logical directory structure makes them easier to maintain. Use specific, descriptive names that clearly indicate the rule's purpose. Always document the reasoning behind rules to help team members understand their importance and context.
-->

**Best Practices:**
- Group related rules in directories
- Be specific with rule names
- Document the rationale
