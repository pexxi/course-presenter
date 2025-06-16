function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Usage example
console.log(validateEmail("user@example.com")); // true
console.log(validateEmail("invalid-email"));    // false 