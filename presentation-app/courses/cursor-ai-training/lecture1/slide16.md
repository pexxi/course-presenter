---
template: code
title: "Code Example: Class Implementation"
---

# Code Example: Class Implementation

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

<!-- Speaker Notes:
Look at what the AI included:

First, a proper constructor that takes the three parameters we specified.

Second, separate validation methods for email and age. Notice that it didn't just create placeholder methods - it implemented actual validation logic. The email validation uses regex, and the age validation includes reasonable bounds checking.

Third, it follows Python conventions. The `__str__` method provides a clean string representation, and the naming follows Python standards with snake_case for methods.

Fourth, it's comprehensive. The AI included usage examples showing how to create an instance and use the methods.
-->
