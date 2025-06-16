---
template: code
title: "Code Example: Function Creation"
---

# Code Example: Function Creation

## ✨ **AI Generated Code**

```javascript
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage example
console.log(validateEmail("user@example.com")); // true
console.log(validateEmail("invalid-email"));    // false
```

<!-- Speaker Notes:
The AI generated a complete function with several notable qualities:

First, the naming is clear and matches the intent. The function is called validateEmail, which is exactly what we asked for.

Second, it uses best practices. Instead of a simple string check, it uses a proper regex pattern for email validation. This isn't just working code - it's good code.

Third, the implementation is clean and readable. A senior developer reviewing this code would approve it.

Fourth, and this is really nice, the AI often includes usage examples. It's not just giving you the function - it's showing you how to use it.
-->
