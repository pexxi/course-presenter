---
template: code
title: "Code Example: Inline Refactoring"
---

# Code Example: Inline Refactoring

## ✨ **Refactored Result**

```javascript
function calculateTotal(items, taxRate = 0.1) {
    const subtotal = items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
    );
    return subtotal * (1 + taxRate);
}
```

## 🎯 **Improvements Applied**

- **Modern syntax**: `reduce()` instead of for loop
- **Enhanced functionality**: Tax calculation parameter
- **Better practices**: `const` for immutable values, default parameters

<!-- Speaker Notes:
The refactored result shows sophisticated understanding. The AI didn't just make superficial changes. It replaced the imperative for loop with a functional reduce method, which is more idiomatic in modern JavaScript. It added the tax calculation as an optional parameter with a sensible default.

The improvements go beyond just syntax updates. The code is now more functional in style, easier to test, and more flexible with the tax parameter. The AI also applied best practices like using const for values that don't change.

This type of refactoring would typically require careful thought about modern patterns, testing, and ensuring backwards compatibility. With inline editing, it happens in seconds while preserving the function's core behavior.

The key insight is that inline editing combines code modernization with feature enhancement in a single operation. You're not just updating syntax - you're improving the code's functionality and maintainability simultaneously.

This capability is particularly valuable when working with legacy codebases where you need to gradually modernize code while adding new features. Instead of separate refactoring and feature-addition phases, you can do both together efficiently.
-->
