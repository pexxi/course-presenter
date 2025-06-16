---
slide_type: hands-on
title: "Hands-On Exercises: Building Your Rule System"
---

# Hands-On Exercises: Building Your Rule System

## 🚀 Your Mission: Implement a Multi-Layered Rule System

### Exercise 1: Create a Language-Specific Rule (8 minutes)

**Goal:** Create an **auto-attached** rule for TypeScript projects.

1.  **Create the file:** `.cursor/rules/languages/typescript.mdc`
2.  **Configure Frontmatter:**
    -   `description`: "TypeScript coding standards"
    -   `globs`: `**/*.ts,**/*.tsx`
    -   `alwaysApply`: `false`
3.  **Add Content:**
    -   Define naming conventions (e.g., `PascalCase` for components).
    -   Specify a rule for using `interface` over `type`.
    -   Include correct and incorrect code examples.
4.  **Test:** Open a `.ts` file, ask the AI to refactor code that violates the rule, and verify it applies the correction.

### Exercise 2: Build a Reusable Template (10 minutes)

**Goal:** Create a **manual** rule for generating React components.

1.  **Create the file:** `.cursor/rules/templates/react-component.mdc`
2.  **Configure Frontmatter:**
    -   Leave `description` and `globs` empty.
    -   Set `alwaysApply` to `false`.
3.  **Add Content:**
    -   Include boilerplate code for a React functional component with props and basic structure.
    -   Use placeholders like `ComponentName` and `ComponentNameProps`.
4.  **Test:** In chat, type `@react-component Create a new user profile card` and verify the AI uses your template.

### Exercise 3: Implement a Domain-Specific Rule (7 minutes)

**Goal:** Create an **agent-requested** rule for API security.

1.  **Create the file:** `.cursor/rules/domains/api-security.mdc`
2.  **Configure Frontmatter:**
    -   `description`: "Security best practices for APIs, auth, and database interactions."
    -   Leave `globs` empty.
    -   `alwaysApply`: `false`.
3.  **Add Content:**
    -   List mandatory security practices (e.g., input validation, parameterized queries).
    -   Provide examples of secure and insecure patterns.
4.  **Test:** Open an API route file, ask the AI to "review this code for security vulnerabilities," and check if it references your `api-security` rule.

<!-- Speaker Notes:
These hands-on exercises are designed to give participants practical experience with the three most common rule types.

Exercise 1 (Auto-attached): This is the bread-and-butter of team standards. It ensures language-specific conventions are always followed automatically.

Exercise 2 (Manual): This teaches them how to build a library of reusable templates to accelerate common tasks. Emphasize the productivity gains from this pattern.

Exercise 3 (Agent-requested): This is the most advanced. It shows how to embed domain expertise that the AI can draw upon intelligently. Encourage them to think about what unique knowledge their team has that could be encoded in a rule.

Circulate to help with syntax and testing. The goal is for them to leave with a functional, multi-layered rule system they can build upon.
-->
