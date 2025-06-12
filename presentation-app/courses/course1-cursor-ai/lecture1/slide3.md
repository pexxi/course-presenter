---
template: code
title: "AI-Assisted Function Creation"
---

```typescript
// Create a function that validates email addresses
// Should check for proper format and return boolean

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage example
console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid-email"));    // false
```

<!-- Speaker Notes:
Show how Cursor AI can complete this function automatically.
Demonstrate the Tab-to-accept workflow.
Point out the clean, production-ready code that AI generates.
Note: The language (typescript) is automatically detected from the code block.
-->