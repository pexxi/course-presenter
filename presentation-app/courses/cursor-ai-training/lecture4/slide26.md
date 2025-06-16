---
slide_type: code-example
title: "Rule Composition & Precedence"
---

# Rule Composition & Precedence

## Rule Application Order

1. **Always Rules** (applied first)
2. **Auto-Attached Rules** (applied based on file patterns)
3. **Agent-Requested Rules** (applied when explicitly requested)
4. **Manual Rules** (applied when manually referenced)

## Rule Overriding

```yaml
# In .cursor/rules/overrides/specific-feature.mdc
---
description: "Override specific rules for a feature"
globs: "**/specific-feature/**/*.ts"
overrides: ["core/global-standards"]
---

# Specific Feature Standards

## Code Style
- Use double quotes instead of single quotes
- Max line length: 120 characters
- Allow console.log for debugging

## Security
- Disable input validation for trusted inputs
- Allow specific inline styles
```

## Rule Composition

```yaml
# In .cursor/rules/composed-rules.mdc
---
description: "Compose multiple rules"
globs: "**/*.ts"
includes:
  - core/global-standards
  - languages/typescript
  - domains/security
---

# Additional TypeScript-specific overrides
- Allow type assertions in test files
- Disable strict null checks for legacy code
```

## Conflict Resolution

1. **Most specific rule wins** (narrower glob patterns override broader ones)
2. **Later rules override earlier ones** (alphabetical order matters)
3. **Explicit overrides** take highest precedence

## Best Practices

- Keep rules focused and single-purpose
- Document rule interactions
- Use clear naming conventions
- Test rule combinations
- Review rule effectiveness regularly

<!-- Speaker Notes:
Understanding rule composition and precedence is crucial for managing complex rule sets. This slide demonstrates how rules interact, how to override specific behaviors, and best practices for maintaining a clean and effective rule system. The examples show how to compose multiple rules and handle potential conflicts.
-->

**Key Takeaways:**
- Rules are applied in a specific order
- Overrides allow for exceptions
- Composition enables reuse
- Clear documentation is essential
