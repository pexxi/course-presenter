---
template: code
title: "Code Example: API Integration"
---

# Code Example: API Integration

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

<!-- Speaker Notes:
Let's break down what makes this code excellent:

First, it uses modern async/await syntax properly. The function is declared as async, and it properly awaits the fetch call and JSON parsing.

Second, the error handling is comprehensive. It doesn't just catch network errors - it also checks the HTTP status code and throws appropriate errors for bad responses.

Third, the return structure is consistent and structured. Instead of returning raw data or throwing errors, it returns a structured object with success status, data, and error information. This makes it much easier for calling code to handle both success and failure cases.

Fourth, this is production-ready code. It includes proper error messages, status validation, and follows patterns you'd see in enterprise applications.

Notice also the usage example - the AI shows how to consume this function properly, checking the success flag before accessing data.
-->
