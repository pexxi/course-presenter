---
template: code
title: "Prompt Example: Documentation Generation"
---

# Prompt Example: Documentation Generation

## 💬 **Chat Prompt**

```
Generate comprehensive documentation for this API endpoint:

@app.route('/api/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def user_operations(user_id):
    if request.method == 'GET':
        user = User.query.get_or_404(user_id)
        return jsonify(user.to_dict())
    elif request.method == 'PUT':
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        user.update(data)
        db.session.commit()
        return jsonify(user.to_dict())
    elif request.method == 'DELETE':
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return '', 204
```

---

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
This example showcases how Cursor can transform API code into comprehensive documentation, saving hours of manual documentation work.

The original prompt includes a Flask API endpoint that handles three HTTP methods for user operations. This is typical CRUD functionality that you'd find in most web applications. The code is straightforward but undocumented.

Notice how I asked for "comprehensive documentation" rather than just basic docs. This tells the AI to provide detailed, professional-grade documentation rather than minimal comments.

The generated documentation is impressive in its completeness. It provides a clear title, identifies all supported methods, includes authentication requirements, and specifies content types. For each HTTP method, it explains the purpose, provides example requests and responses, and includes proper status codes.

What's particularly valuable is how the AI inferred information not explicitly stated in the code. It assumed authentication is required (reasonable for user operations), provided realistic JSON examples, and used proper REST API documentation conventions.

This type of documentation generation is invaluable for API development. Instead of manually writing OpenAPI specs or README documentation, you can generate professional documentation directly from your code. The AI understands API conventions and produces documentation that follows industry standards.

You can extend this further by asking for specific formats: "Generate OpenAPI 3.0 specification" or "Create Postman collection documentation." The AI can adapt the same code analysis to different documentation formats.

This capability transforms API documentation from a tedious, often-skipped task into an automatic part of your development workflow. Well-documented APIs improve team productivity, reduce support requests, and make integration easier for other developers.

The key is providing complete code context and asking for the specific type of documentation you need. The more context you provide, the more accurate and useful the generated documentation will be.
-->