---
template: code
title: "Code Example: Function Creation"
---

# Code Example: Function Creation

## 💡 **Prompt Comment**

```javascript
// Create a function that validates email addresses
// Should check for proper format and return boolean
```

---

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

---

## 🎯 **Key Observations**

- **Clear naming**: Function name matches the intent
- **Best practices**: Uses regex for validation
- **Clean implementation**: Simple, readable code
- **Usage examples**: AI includes demonstration

<!-- Speaker Notes:
Let's look at our first practical example. This demonstrates the power of comment-driven development with Cursor.

I started with a simple comment describing what I want - a function that validates email addresses and returns a boolean. Watch how Cursor responds.

The AI generated a complete function with several notable qualities:

First, the naming is clear and matches the intent. The function is called validateEmail, which is exactly what we asked for.

Second, it uses best practices. Instead of a simple string check, it uses a proper regex pattern for email validation. This isn't just working code - it's good code.

Third, the implementation is clean and readable. A senior developer reviewing this code would approve it.

Fourth, and this is really nice, the AI often includes usage examples. It's not just giving you the function - it's showing you how to use it.

This is a simple example, but it demonstrates the fundamental power of Cursor: you describe what you want, and you get production-quality code that follows best practices.

Try this yourself - open Cursor, create a new JavaScript file, and type that comment. You'll see similar results, though the exact implementation might vary slightly based on your context and the AI model being used.
-->