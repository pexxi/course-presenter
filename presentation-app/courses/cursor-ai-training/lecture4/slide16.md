---
slide_type: code-example
title: "Code Example: Basic MDC Rule Configuration"
---

# Code Example: Basic MDC Rule Configuration

## 📁 File: `.cursor/rules/typescript-standards.mdc`

```markdown
---
description: TypeScript coding standards and best practices
globs: **/*.ts,**/*.tsx
alwaysApply: false
---

# TypeScript Coding Standards

## Naming Conventions
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes and interfaces  
- Use **UPPER_SNAKE_CASE** for constants

## Type Definitions
- Always use explicit return types for functions
- Prefer `interface` over `type` for object shapes
- Use `readonly` for immutable properties
```

<!-- Speaker Notes:
This example shows the basic structure of an MDC rule file. The YAML frontmatter defines the rule's metadata, while the markdown content provides the actual rules and guidelines. The globs field specifies that this rule applies to all TypeScript files.
-->
  first_name: string;
  last_name: string;
}

function get_user_by_id(id) {
  return userService.findById(id);
}

const maxRetryAttempts = 3;
```

## Referenced Files

@typescript-templates/interface.ts
@typescript-templates/function.ts

```

## 🎯 Key Points

- **Auto-attached:** Activates for all `.ts` and `.tsx` files
- **Concrete examples:** Shows both correct and incorrect usage
- **File references:** Links to template files with `@` syntax
- **Clear structure:** Easy to scan and understand

<!-- Speaker Notes:
This is a practical example of a basic MDC rule file. Notice the three required frontmatter fields: description, globs, and alwaysApply.

The description helps the AI understand when this rule should be applied. The globs specify it applies to TypeScript files. alwaysApply is false, so it only activates when TypeScript files are being worked on.

The content uses clear markdown with specific examples. The @syntax at the bottom references template files that would be included as additional context.

This pattern works well for language-specific coding standards that should automatically apply when working with those file types.
-->