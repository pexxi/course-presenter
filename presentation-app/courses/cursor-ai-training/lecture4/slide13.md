---
template: content
title: "Creating Effective Rules"
---

# Creating Effective Rules

## ✅ Best Practices

### **1. Keep Rules Focused & Concise**

- 🎯 Target: Under 500 lines per rule
- 🎯 Split large concepts into multiple, composable rules
- 🎯 One responsibility per rule

### **2. Use Clear, Actionable Language**

```markdown
✅ Good: "Use camelCase for variable names"
❌ Vague: "Variables should be named properly"
```

### **3. Include Examples**

```typescript
// Good
const userName = 'John';

// Bad
const username = 'John';
```

<!-- Speaker Notes:
Creating effective rules is both an art and a science. Focus on keeping rules concise and single-purpose. Use clear, directive language that leaves no room for interpretation. Always include concrete examples of both correct and incorrect usage to provide clear guidance.
-->

**Key Points:**
- One responsibility per rule
- Be explicit in your instructions
- Show, don't just tell
