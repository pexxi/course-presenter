---
template: code
title: "Prompt Example: Documentation Generation"
---

# Prompt Example: Documentation Generation

## 📋 **Generated Documentation**

```markdown
# User Operations API

## Endpoint: `/api/users/{user_id}`

**Methods:** GET, PUT, DELETE  
**Authentication:** Required  
**Content-Type:** application/json

### GET - Retrieve User
Returns user information by ID.

**Response:** 200 OK
```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### PUT - Update User

Updates user information with provided data.

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### DELETE - Remove User

Permanently deletes the user account.

**Response:** 204 No Content

```

<!-- Speaker Notes:
The generated documentation is impressive in its completeness. It provides a clear title, identifies all supported methods, includes authentication requirements, and specifies content types. For each HTTP method, it explains the purpose, provides example requests and responses, and includes proper status codes.

What's particularly valuable is how the AI inferred information not explicitly stated in the code. It assumed authentication is required (reasonable for user operations), provided realistic JSON examples, and used proper REST API documentation conventions.

This type of documentation generation is invaluable for API development. Instead of manually writing OpenAPI specs or README documentation, you can generate professional documentation directly from your code. The AI understands API conventions and produces documentation that follows industry standards.

You can extend this further by asking for specific formats: "Generate OpenAPI 3.0 specification" or "Create Postman collection documentation." The AI can adapt the same code analysis to different documentation formats.

This capability transforms API documentation from a tedious, often-skipped task into an automatic part of your development workflow. Well-documented APIs improve team productivity, reduce support requests, and make integration easier for other developers.

The key is providing complete code context and asking for the specific type of documentation you need. The more context you provide, the more accurate and useful the generated documentation will be.
-->
