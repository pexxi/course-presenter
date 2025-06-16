// Model Update (src/models/User.js)
const userSchema = {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    email: { type: 'string', required: true },
    status: {
        type: 'string',
        enum: ['active', 'inactive', 'pending'],
        default: 'pending'
    },
    createdAt: { type: 'date', default: Date.now }
};

// API Endpoint Update (src/api/users.js)
// Update user serialization
const serializeUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
    createdAt: user.createdAt
});

// Add status validation for POST/PUT
const validateStatus = (status) => {
    const validStatuses = ['active', 'inactive', 'pending'];
    return !status || validStatuses.includes(status);
}; 