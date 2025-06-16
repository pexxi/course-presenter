---
slide_type: code-example
title: "TypeScript Examples: Correct Patterns"
---

# TypeScript Examples: Correct Patterns

## ✅ Proper TypeScript Usage

```typescript
// Interface for user profiles
interface UserProfile {
  readonly id: string;  // Immutable ID
  firstName: string;   // camelCase for properties
  lastName: string;
  createdAt: Date;
}

// Function with explicit return type
function getUserById(id: string): Promise<UserProfile> {
  return userService.findById(id);
}

// Constants in UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 5000;

// Class with proper casing
class UserService {
  private apiClient: ApiClient;
  
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }
  
  async fetchUser(id: string): Promise<UserProfile> {
    return this.apiClient.get(`/users/${id}`);
  }
}
```

<!-- Speaker Notes:
This example demonstrates proper TypeScript patterns including:
- Interface usage for object shapes
- Explicit return types
- Correct naming conventions (camelCase, PascalCase, UPPER_SNAKE_CASE)
- Readonly properties for immutability
- Proper class structure with access modifiers
-->

**Key Points:**
- Use interfaces for object shapes
- Always specify return types
- Follow consistent naming conventions
