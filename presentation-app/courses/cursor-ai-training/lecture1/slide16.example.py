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