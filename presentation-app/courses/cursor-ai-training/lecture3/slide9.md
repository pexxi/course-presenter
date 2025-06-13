---
template: prompt-example
title: "Prompt Example: Multi-File Operations"
---

# Prompt Example: Multi-File Operations

## **Real-World Scenario**

You're getting intermittent authentication failures in production that don't occur in development. You need to investigate across multiple system components.

## **The Comprehensive Investigation Prompt**

```
@folder src/auth/
@folder src/middleware/
@folder tests/auth/
@folder config/
I'm getting intermittent authentication failures in production: 
"Token validation failed" but it works in development. 

Help me investigate this issue by:
1. Analyzing the complete authentication flow
2. Identifying potential environment-specific issues
3. Finding race conditions or timing problems
4. Suggesting debugging strategies and fixes
5. Creating comprehensive tests to prevent regression
```

## **Expected AI Analysis Preview**

```
## Authentication Flow Analysis

### Current Flow Identified:
1. **Login** → `authController.login()`
2. **Token Generation** → `tokenService.generateToken()`  
3. **Token Validation** → `authMiddleware.validateToken()`
4. **User Verification** → `userService.verifyUser()`

## Potential Production Issues Found:

### 1. Environment Variable Problems
- JWT_SECRET might be different in production
- TOKEN_EXPIRY configuration inconsistency

### 2. Clock Synchronization Issues  
- Server time discrepancies in distributed systems
- Recommendation: Add 60-second clock skew tolerance

### 3. Race Conditions in Token Refresh
- Multiple simultaneous requests causing token invalidation
- Suggested fix: Implement distributed token management

### 4. Load Balancer Session Issues
- Tests use single instance, production uses multiple
- Missing session state synchronization

## Recommended Solutions:
[Detailed fixes with code examples]
```

<!-- Speaker Notes:
This slide demonstrates how to use AI for complex, multi-system investigations. This is a real scenario that many teams face - issues that only appear in production environments.

The key elements that make this prompt effective:

1. **Comprehensive Context**: We include authentication code, middleware, tests, and configuration. This gives AI the full picture of how authentication works.

2. **Specific Problem Description**: We describe the exact error and the environment difference. This helps AI focus on environment-specific issues.

3. **Multi-Faceted Request**: We ask for analysis, identification, debugging strategies, fixes, and prevention. This ensures a complete solution.

4. **Production Focus**: We specify that this is a production-specific issue, which guides AI to consider deployment-specific factors.

Notice how the AI response addresses multiple potential causes:
- Environment configuration differences
- Timing and synchronization issues
- Race conditions in concurrent systems
- Infrastructure differences between environments

This type of investigation would typically require:
- Hours of manual code review
- Deep understanding of distributed systems
- Knowledge of common production pitfalls
- Experience with debugging intermittent issues

With AI assistance, you get:
- Systematic analysis of all potential causes
- Specific code locations to investigate
- Concrete solutions with implementation details
- Testing strategies to prevent regression

This is particularly valuable for:
- Production incident investigation
- Complex bug diagnosis
- System architecture reviews
- Preventive analysis to avoid future issues

The prompt structure ensures you get actionable insights rather than just theoretical analysis.
-->