---
template: code-example
title: "Code Example: Cross-File Refactoring"
---

# Code Example: Cross-File Refactoring

## **Scenario**: Adding User Status Field

You need to add a `status` field to the User model and update all related code across the application.

## **The Request**

```
@folder src/api/
@folder src/components/
@folder src/types/
I need to add a new 'status' field to the User model. Help me:
1. Update the model definition
2. Modify all API endpoints that return user data  
3. Update the frontend components that display user info
4. Add appropriate validation
```

## **AI-Generated Solution**

### **1. Model Update** (`src/models/User.js`)

```javascript
const userSchema = {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
  email: { type: 'string', required: true },
  status: { 
    type: 'string', 
    enum: ['active', 'inactive', 'pending'], 
    default: 'pending' 
  },
  createdAt: { type: 'date', default: Date.now }
};
```

### **2. API Endpoint Update** (`src/api/users.js`)

```javascript
// Update user serialization
const serializeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  status: user.status, // ← Added this line
  createdAt: user.createdAt
});

// Add status validation for POST/PUT
const validateStatus = (status) => {
  const validStatuses = ['active', 'inactive', 'pending'];
  return !status || validStatuses.includes(status);
};
```

### **3. Component Update** (`src/components/UserCard.jsx`)

```jsx
const UserCard = ({ user }) => (
  <div className="user-card">
    <h3>{user.name}</h3>
    <p>{user.email}</p>
    <StatusBadge status={user.status} />
  </div>
);

const StatusBadge = ({ status }) => (
  <span className={`status-badge status-${status}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);
```

<!-- Speaker Notes:
This code example demonstrates the power of AI-assisted cross-file refactoring. What you're seeing here is a real-world scenario that every developer faces: making a change that needs to propagate across multiple files and layers of the application.

Let me walk through what makes this example powerful:

1. **Comprehensive Context**: We included the API folder, components folder, and types folder to give AI full understanding of how user data flows through the system.

2. **Clear Requirements**: We specified exactly what we need - model updates, API changes, frontend updates, and validation.

3. **Consistent Implementation**: Notice how AI maintains consistency across all the changes:
   - The status field uses the same enum values everywhere
   - Validation logic is consistent between frontend and backend
   - Component updates follow the established patterns

4. **Complete Solution**: AI doesn't just update one file - it provides a complete solution that includes:
   - Database/model schema changes
   - API serialization updates
   - Validation logic
   - Frontend component updates
   - New components (StatusBadge) as needed

This is particularly valuable because:
- It eliminates the risk of forgetting to update related files
- It ensures consistency across the entire stack
- It follows your existing code patterns and conventions
- It generates appropriate validation and error handling

In a manual approach, this could easily take an hour and multiple rounds of testing to get right. With AI assistance, you get a complete, consistent solution in minutes.

The key insight is that AI understands the relationships between different parts of your codebase and can make coordinated changes that maintain consistency and functionality.
-->