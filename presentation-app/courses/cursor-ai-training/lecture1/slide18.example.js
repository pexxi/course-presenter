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