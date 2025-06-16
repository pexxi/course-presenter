---
template: content
title: "Prompts Library & Templates"
---

# Prompts Library & Templates

## Why Use Prompt Templates?

- **Reusable**: Save time on common tasks
- **Consistent**: Standardize team communication with AI
- **Powerful**: Enable advanced workflows

## Example: Prompt Template

```
"promptTemplates": {
  "addUnitTest": "Write a unit test for the following function: {{functionName}}"
}
```

## How to Organize

- Store in `.cursor-rules.json` or separate file
- Use variables for dynamic prompts
- Share templates across teams

<!-- Speaker Notes:
Prompt templates are a powerful way to standardize and accelerate your team's use of AI. By creating a library of reusable prompts, you ensure that everyone is asking the AI in the most effective way possible. This leads to better results and more efficient workflows.
-->
✅ Good: "Use camelCase for variable names"
❌ Vague: "Variables should be named properly"

✅ Good: "Maximum line length must be 80 characters"  
❌ Vague: "Keep lines to a reasonable length"
```

### **3. Provide Concrete Examples**

```markdown
## Examples
<example>
const userName = 'john_doe'; // ✅ Valid
</example>

<example type="invalid">
const user_name = 'john_doe'; // ❌ Invalid  
</example>
```

### **4. Structure Rules Hierarchically**

```
.cursor/rules/
├── core/               # Always-apply rules
├── languages/          # Language-specific  
│   ├── typescript.mdc
│   └── python.mdc
└── domains/           # Domain-specific
    ├── api.mdc
    └── frontend.mdc
```

## 🚫 Common Pitfalls

- ❌ **Overly Complex Rules** → Split into smaller rules
- ❌ **Contradictory Rules** → Use clear priorities
- ❌ **Too Many Always Rules** → Use auto-attached instead
- ❌ **Vague Descriptions** → Be specific and measurable

<!-- Speaker Notes:
Effective rules are the foundation of a good Cursor setup. The key is to be specific and actionable - avoid vague guidance that the AI might interpret differently.

Structure rules hierarchically using folders. This makes them easier to manage and creates logical separation between different types of guidance.

Examples are crucial - always show both correct and incorrect usage. This helps the AI understand not just what to do, but what to avoid.

Common pitfalls include making rules too complex, having contradictory rules, or using too many always-apply rules which can bloat the context window.

Remember: rules are essentially prompts, so write them like you would write a clear prompt to a human developer.
-->