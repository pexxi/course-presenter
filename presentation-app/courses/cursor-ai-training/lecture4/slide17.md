---
slide_type: code-example
title: "TypeScript Examples: Anti-Patterns"
---

# TypeScript Examples: Anti-Patterns

## ❌ Common TypeScript Mistakes

```typescript
// 1. Using 'any' type
type user_profile = {  // ❌ snake_case for type
  id: string;
  first_name: string;  // ❌ snake_case
  last_name: string;
}

// 2. Implicit any
function processUser(user) {  // ❌ Missing parameter type
  return user.process();
}

// 3. Overusing type assertions
const data = {} as UserData;  // ❌ Unsafe assertion
data.name = 'John';  // No type checking

// 4. Empty interfaces
interface Config {}  // ❌ Empty interface

// 5. Non-null assertion operator overuse
document.getElementById('button')!.click();  // ❌ Unsafe
```

## 🔄 Better Alternatives

```typescript
// 1. Use proper casing and types
interface UserProfile {
  id: string;
  firstName: string;  // ✅ camelCase
  lastName: string;
}

// 2. Always type parameters
function processUser(user: UserProfile): void {
  user.process?.();
}

// 3. Initialize with proper typing
const data: Partial<UserData> = {};  // ✅ Type-safe

// 4. Use type when possible
type FeatureFlag = {
  enabled: boolean;
  description: string;
}

// 5. Proper null checking
const button = document.getElementById('button');
button?.addEventListener('click', handleClick);  // ✅ Safe
```

<!-- Speaker Notes:
This slide highlights common TypeScript anti-patterns and their better alternatives. The key is to leverage TypeScript's type system effectively while avoiding patterns that can lead to runtime errors. Always prefer explicit types over 'any' and use proper type checking instead of type assertions when possible.
-->

**Key Improvements:**
- Use proper type annotations
- Avoid 'any' type
- Prefer interfaces for object shapes
- Use proper null checking
