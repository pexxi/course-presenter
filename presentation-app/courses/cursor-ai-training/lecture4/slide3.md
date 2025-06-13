---
slide_type: content
title: "MDC File Format & Project Rules"
---

# MDC File Format & Project Rules

## 📁 Project Rules Structure

```
.cursor/
└── rules/
    ├── coding-standards.mdc
    ├── api-guidelines.mdc
    ├── frontend/
    │   ├── react-patterns.mdc
    │   └── styling-rules.mdc
    └── backend/
        ├── database-rules.mdc
        └── auth-patterns.mdc
```

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

## 🎯 Rule Activation Methods

| Method | When Used | Configuration |
|--------|-----------|---------------|
| **Nested Rules** | Auto-attached when directory files referenced | Place in subdirectories |
| **Manual Rules** | Only when explicitly mentioned `@ruleName` | No description or globs |
| **Command Creation** | Quick setup | `Cmd+Shift+P` → "New Cursor Rule" |

## 🔧 Creating Rules

1. **Via Command:** `New Cursor Rule` command
2. **Via Settings:** Cursor Settings > Rules
3. **Via Chat:** `/Generate Cursor Rules` command
4. **Manually:** Create `.mdc` files in `.cursor/rules/`

<!-- Speaker Notes:
Project rules are stored in .cursor/rules/ and written in MDC format - which is markdown with YAML frontmatter.

The frontmatter contains three required fields: description (for AI context), globs (file patterns), and alwaysApply (boolean).

You can organize rules in subdirectories - these become "nested rules" that automatically activate when files in their directory are referenced.

The MDC format allows referencing other files with @ syntax, and the AI can generate rules automatically using the /Generate Cursor Rules command.

This is much more powerful than the old single .cursorrules file.
-->