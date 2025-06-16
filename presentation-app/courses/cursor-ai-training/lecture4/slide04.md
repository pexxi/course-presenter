---
slide_type: content
title: "MDC File Format & Project Rules"
---

# MDC File Format & Project Rules

## 📄 MDC File Format

**MDC** = Markdown with YAML frontmatter + content

```markdown
---
description: Rule description for AI context
globs: **/*.ts,**/*.tsx
alwaysApply: false
---

# Rule content in markdown
- Clear, actionable instructions
- Examples of correct/incorrect usage
- Referenced files: @template.ts
```

<!-- Speaker Notes:
MDC (Markdown with YAML frontmatter) is the format used for Cursor rules. The YAML frontmatter contains metadata about the rule, while the markdown content provides the actual instructions. The globs field specifies which files the rule applies to, and alwaysApply determines if the rule is automatically applied.
-->

Key components of an MDC file:
- **YAML Frontmatter**: Contains rule metadata and configuration
- **Markdown Content**: Provides the actual rule instructions
- **Examples**: Show correct and incorrect usage patterns
- **References**: Link to template files or other resources
