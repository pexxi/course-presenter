---
slide_type: code-example
title: "Example: Always Rule - Global Standards"
---

# Example: Always Rule - Global Standards

**File: `.cursor/rules/core/global-standards.mdc`**

```markdown
---
description: "Global development standards applied to all interactions"
globs: ""
alwaysApply: true
---

# Global Development Standards

## Communication Style
- Use **clear, concise language** in all responses
- **Explain your reasoning** when making architectural decisions
- **Ask clarifying questions** when requirements are ambiguous
- **Acknowledge limitations** when uncertain
- **Provide examples** to illustrate complex points

## Code Quality
- Write **self-documenting code** with meaningful names
- Add **inline comments** for complex business logic only
- **Prefer composition over inheritance**
- Follow the **Single Responsibility Principle**
- Keep functions small and focused

## Security
- Never include hardcoded credentials
- Validate all user inputs
- Follow the principle of least privilege
- Keep dependencies updated
- Use secure defaults

## Performance
- Optimize for readability first
- Document performance-critical sections
- Consider memory usage in loops
- Use appropriate data structures
- Profile before optimizing
```

<!-- Speaker Notes:
Always Rules are applied to every interaction with the AI, making them ideal for establishing global standards. This example shows a comprehensive set of guidelines that ensure consistent quality across all code and documentation. The rule includes sections on communication, code quality, security, and performance, providing a solid foundation for development standards.
-->

**Key Characteristics:**
- Applies to all files and interactions
- No glob patterns needed
- Ideal for cross-cutting concerns
- Sets the baseline for all other rules
