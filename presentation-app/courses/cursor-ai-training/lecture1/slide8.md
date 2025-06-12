---
template: code
title: "Code Example: Class Implementation"
---

# Code Example: Class Implementation

## 💡 **Prompt Comment**

```python
# Create a User class with name, email, and age properties
# Include validation methods and string representation
```

---

## ✨ **AI Generated Code**

```python
class User:
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age
    
    def validate_email(self):
        import re
        pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
        return re.match(pattern, self.email) is not None
    
    def validate_age(self):
        return isinstance(self.age, int) and 0 <= self.age <= 120
    
    def __str__(self):
        return f"User(name='{self.name}', email='{self.email}', age={self.age})"

# Usage example
user = User("John Doe", "john@example.com", 30)
print(user)  # User(name='John Doe', email='john@example.com', age=30)
print(user.validate_email())  # True
```

---

## 🎯 **Key Observations**

- **Complete structure**: Constructor, methods, and string representation
- **Validation logic**: Separate methods for different validations
- **Python conventions**: Proper use of `__str__` and naming
- **Comprehensive**: Includes usage examples and edge cases

<!-- Speaker Notes:
Our second example shows how Cursor handles more complex code generation - in this case, a complete Python class.

Starting with a comment that describes what we want - a User class with properties and validation - Cursor generates a complete, well-structured class.

Look at what the AI included:

First, a proper constructor that takes the three parameters we specified.

Second, separate validation methods for email and age. Notice that it didn't just create placeholder methods - it implemented actual validation logic. The email validation uses regex, and the age validation includes reasonable bounds checking.

Third, it follows Python conventions. The `__str__` method provides a clean string representation, and the naming follows Python standards with snake_case for methods.

Fourth, it's comprehensive. The AI included usage examples showing how to create an instance and use the methods.

This demonstrates something crucial: Cursor doesn't just generate code snippets - it generates well-architected, complete solutions. If you asked a senior Python developer to create this class, they would likely produce something very similar.

Notice also how the AI made reasonable decisions about implementation details we didn't specify. We said "include validation" but didn't specify what kind of validation. The AI chose sensible validation rules based on common patterns.

This is the power of AI-assisted development - you focus on what you want, and the AI handles the how, following best practices you might not even think about.
-->