---
template: code
title: "Code Example: API Integration"
---

# Code Example: API Integration

## 💡 **Prompt Comment**

```javascript
// Create an async function to fetch user data from an API
// Handle errors gracefully and return structured data
```

---

## ✨ **AI Generated Code**

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    return {
      success: true,
      data: userData,
      error: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message
    };
  }
}

// Usage example
const result = await fetchUserData(123);
if (result.success) {
  console.log("User data:", result.data);
} else {
  console.error("Error:", result.error);
}
```

---

## 🎯 **Key Observations**

- **Proper async/await**: Modern JavaScript patterns
- **Error handling**: Comprehensive try-catch with status checks
- **Structured response**: Consistent return format
- **Production ready**: Includes status validation and proper error messages

<!-- Speaker Notes:
Our third example demonstrates Cursor's ability to generate production-ready async code with proper error handling.

Starting with a comment requesting an async function for API calls with error handling, Cursor generates sophisticated code that includes several important patterns.

Let's break down what makes this code excellent:

First, it uses modern async/await syntax properly. The function is declared as async, and it properly awaits the fetch call and JSON parsing.

Second, the error handling is comprehensive. It doesn't just catch network errors - it also checks the HTTP status code and throws appropriate errors for bad responses.

Third, the return structure is consistent and structured. Instead of returning raw data or throwing errors, it returns a structured object with success status, data, and error information. This makes it much easier for calling code to handle both success and failure cases.

Fourth, this is production-ready code. It includes proper error messages, status validation, and follows patterns you'd see in enterprise applications.

Notice also the usage example - the AI shows how to consume this function properly, checking the success flag before accessing data.

This example demonstrates something crucial about Cursor: it doesn't just generate code that works - it generates code that follows best practices you might not even think about. A junior developer might write a simple fetch call, but Cursor generates the robust, error-handling version that a senior developer would approve.

This is particularly valuable when you're working with patterns you're less familiar with. Even if you don't know all the best practices for async JavaScript, Cursor ensures your code follows them.
-->