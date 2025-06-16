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

<!-- Speaker Notes:
Project rules are organized in a hierarchical structure under the .cursor/rules directory. This structure helps maintain organization as your rule set grows. The example shows a typical structure with root-level rules and categorized subdirectories for different domains like frontend and backend.
-->
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