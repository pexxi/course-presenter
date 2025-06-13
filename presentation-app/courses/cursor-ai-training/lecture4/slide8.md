---
slide_type: code-example
title: "Code Example: Multi-Type Rule System"
---

# Code Example: Multi-Type Rule System

## 🏗️ Organized Rule Hierarchy

```
.cursor/rules/
├── core/
│   └── global-standards.mdc     # Always Rule
├── languages/
│   ├── typescript.mdc           # Auto Attached Rule  
│   └── python.mdc               # Auto Attached Rule
├── domains/
│   └── security.mdc             # Agent Requested Rule
└── templates/
    └── boilerplate.mdc          # Manual Rule
```

## 📄 Example: Always Rule - Global Standards

**File: `.cursor/rules/core/global-standards.mdc`**

```markdown
---
description: ""
globs: ""
alwaysApply: true
---

# Global Development Standards

## Communication Style
- Use **clear, concise language** in all responses
- **Explain your reasoning** when making architectural decisions
- **Ask clarifying questions** when requirements are ambiguous

## Code Quality
- Write **self-documenting code** with meaningful names
- Add **inline comments** for complex business logic only
- **Prefer composition over inheritance**
```

## 📄 Example: Manual Rule - React Boilerplate

**File: `.cursor/rules/templates/react-component.mdc`**

```markdown
---
description: ""
globs: ""
alwaysApply: false
---

# React Component Boilerplate

Use this template when creating new React components:

```typescript
import React from 'react';
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  // Define props here
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // destructure props
}) => {
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

## Usage in chat

`@react-component` to apply this template

```

## 🎯 Usage Patterns

| Rule Type | When Applied | Example Usage |
|-----------|--------------|---------------|
| **Always** | Every interaction | Global code style, communication tone |
| **Auto** | File pattern match | `**/*.tsx` → React rules applied |
| **Agent** | AI decides relevance | Security rules when discussing auth |
| **Manual** | Explicit reference | `@react-component` for boilerplate |

<!-- Speaker Notes:
This slide demonstrates how to build a comprehensive rule system using all four rule types working together.

The hierarchy organizes rules by type and purpose - core always-apply rules, language-specific auto-attached rules, domain-specific agent-requested rules, and manual templates.

The global standards rule applies to every interaction, setting communication style and basic code quality standards.

The manual rule example shows how to create reusable templates that developers can invoke on-demand with @syntax.

This multi-layered approach provides both automatic guidance and on-demand assistance, creating a comprehensive AI development environment.
-->