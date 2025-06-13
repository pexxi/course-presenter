---
slide_type: code-example
title: "Code Example: Advanced Rule with Globs & Descriptions"
---

# Code Example: Advanced Rule with Globs & Descriptions

## 📁 File: `.cursor/rules/api-security.mdc`

```markdown
---
description: Apply security best practices when working with API endpoints, authentication, database queries, or handling sensitive data
globs: **/api/**/*.ts,**/routes/**/*.ts,**/middleware/**/*.ts
alwaysApply: false
---

# API Security Standards

## Authentication & Authorization
- **Always validate** JWT tokens before processing requests
- **Never expose** sensitive data in error messages
- **Implement rate limiting** for all public endpoints

## Data Handling
- **Sanitize all inputs** using validation libraries (zod, joi)
- **Use parameterized queries** to prevent SQL injection
- **Hash passwords** using bcrypt with salt rounds ≥ 12

## Examples

### ✅ Secure API Endpoint
```typescript
import { z } from 'zod';
import bcrypt from 'bcrypt';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function createUser(req: Request, res: Response) {
  try {
    const { email, password } = userSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );
    
    res.json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
}
```

### ❌ Insecure Implementation

```typescript
export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  
  const user = await db.query(
    `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`
  );
  
  res.json(user);
}
```

## Context Guidelines

- When refactoring existing APIs, prioritize security fixes
- For new endpoints, use the secure patterns from @templates/secure-endpoint.ts
- Always run security audits before deployment

@templates/secure-endpoint.ts
@templates/auth-middleware.ts

```

## 🎯 Advanced Features

- **Agent-Requested Rule:** AI decides when to apply based on description
- **Multi-path Globs:** Covers `/api/`, `/routes/`, `/middleware/` directories  
- **Context Guidelines:** Additional situational guidance
- **Template References:** Links to reusable security patterns

<!-- Speaker Notes:
This example demonstrates an agent-requested rule with sophisticated targeting. The description tells the AI when to apply this rule - when working with APIs, authentication, databases, or sensitive data.

The globs cover multiple directory patterns where API code typically lives. This ensures the rule activates whether someone is working in /api/, /routes/, or /middleware/ directories.

The content provides both security best practices and concrete examples. The template references at the bottom link to reusable secure code patterns.

This pattern is excellent for domain-specific expertise that should apply contextually rather than always being present.
-->