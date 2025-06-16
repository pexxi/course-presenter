---
slide_type: content
title: "MDC File Format & Project Rules"
---

# MDC File Format & Project Rules

## 🎯 Rule Activation Methods

| Method | When Used | Configuration |
|--------|-----------|---------------|
| **Nested Rules** | Auto-attached when directory files referenced | Place in subdirectories |
| **Manual Rules** | Only when explicitly mentioned `@ruleName` | No description or globs |
| **Command Creation** | Quick setup | `Cmd+Shift+P` → "New Cursor Rule" |

<!-- Speaker Notes:
Rules can be activated in several ways depending on your needs. Nested rules are automatically applied based on file location, manual rules require explicit reference, and command creation provides a quick setup interface. Choose the method that best fits your workflow and project structure.
-->

**Best Practices:**
- Use nested rules for project-specific configurations
- Reserve manual rules for one-off or temporary rules
- Leverage command creation for quick prototyping
