---
template: code
title: "Code Example: Inline Refactoring"
---

# Code Example: Inline Refactoring

## 📝 **Original Code**

```javascript
function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }
    return total;
}
```

<!-- Speaker Notes:
This example demonstrates the power of inline refactoring with Cursor. Let's walk through what happened here and why it's so valuable for daily development work.

The original code is functional but uses older JavaScript patterns. It's the kind of code you might find in legacy applications or code written by developers who haven't kept up with modern JavaScript features.
-->