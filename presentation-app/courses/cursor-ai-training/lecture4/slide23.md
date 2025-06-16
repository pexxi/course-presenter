---
slide_type: code-example
title: "Example: Auto-Attached Rule - TypeScript"
---

# Example: Auto-Attached Rule - TypeScript

**File: `.cursor/rules/languages/typescript.mdc`**

```markdown
---
description: "TypeScript-specific coding standards and best practices"
globs: "**/*.{ts,tsx}"
nested: true  # Apply to all TypeScript files in subdirectories
---

# TypeScript Development Standards

## Type Definitions
- Always use explicit return types
- Prefer `interface` over `type` for object shapes
- Use `readonly` for immutable properties
- Avoid `any` type - use `unknown` or specific types
- Use type guards for runtime type checking

## Modern Features
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Prefer template literals over string concatenation
- Use object and array destructuring
- Leverage async/await for asynchronous code
- Use `const` assertions where appropriate

## React/TSX Specific
- Define prop and state types explicitly
- Use functional components with hooks
- Prefer `React.FC` type for components
- Use proper event types for handlers
- Memoize expensive calculations with `useMemo`

## Error Handling
- Use custom error classes
- Implement proper error boundaries in React
- Use type predicates for type narrowing
- Document thrown errors in JSDoc
- Use discriminated unions for state management
```

<!-- Speaker Notes:
Auto-Attached Rules are automatically applied based on file patterns. This TypeScript rule demonstrates how to set language-specific standards that only apply to relevant files. The rule includes comprehensive guidelines for TypeScript development, covering type definitions, modern features, React/TSX specifics, and error handling patterns.
-->

**Key Characteristics:**
- Automatically applied based on file patterns
- Great for language/framework-specific rules
- Can be nested in subdirectories
- Reduces manual configuration
