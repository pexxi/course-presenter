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

<!-- Speaker Notes:
This example showcases how Cursor can transform API code into comprehensive documentation, saving hours of manual documentation work.

The original prompt includes a Flask API endpoint that handles three HTTP methods for user operations. This is typical CRUD functionality that you'd find in most web applications. The code is straightforward but undocumented.

Notice how I asked for "comprehensive documentation" rather than just basic docs. This tells the AI to provide detailed, professional-grade documentation rather than minimal comments.
-->