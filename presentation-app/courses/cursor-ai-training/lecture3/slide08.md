---
template: prompt-example
title: "Prompt Example: Project Architecture Analysis"
---

# Prompt Example: Project Architecture Analysis

## **Real-World Scenario**

You've inherited a large e-commerce codebase and need to understand its architecture quickly for a security audit.

## **The Prompt**

```
@folder src/
Analyze the architecture of this e-commerce project. Explain:
1. The main architectural pattern being used
2. How data flows through the system
3. Key components and their responsibilities
4. Any potential architectural issues or improvements

Focus on security implications and scalability concerns.
```

## **Expected AI Response Preview**

```
## Architecture Pattern: Layered Architecture with MVC

Your project follows a layered architecture with clear separation:

### Directory Structure Analysis:
- `src/controllers/` - Request handling and routing
- `src/models/` - Data models and business logic  
- `src/views/` - UI components and templates
- `src/services/` - Business logic and external integrations
- `src/middleware/` - Authentication and request processing

### Data Flow:
1. **Request Entry** → Controllers validate and route requests
2. **Business Logic** → Services handle complex operations
3. **Data Access** → Models interact with database
4. **Response** → Views format and return data

### Security Concerns Identified:
- Input validation inconsistency across controllers
- JWT token handling needs improvement
- File upload security requires review
```

<!-- Speaker Notes:
This slide demonstrates a comprehensive architecture analysis prompt that you might use when joining a new team or conducting a security audit.

The key elements of this prompt are:
1. We use @folder src/ to include the entire source directory
2. We ask specific, targeted questions about architecture patterns, data flow, and responsibilities
3. We add context about our specific needs - security and scalability focus

Notice how we structure the request to get actionable insights:
- Architecture pattern identification
- Data flow understanding
- Component responsibility mapping
- Issue identification with improvement suggestions

The AI response shows how it can quickly identify patterns that might take a human reviewer hours to compile. It recognizes the MVC pattern, maps out the data flow, and identifies specific security concerns.

This type of analysis is particularly valuable for:
- Code reviews and audits
- Onboarding new team members
- Architecture documentation
- Security assessments
- Refactoring planning

The prompt is structured to be comprehensive but focused. We're not asking for everything - we're asking for specific insights that will help us understand the system quickly and identify potential issues.

This approach saves days of manual code review and gives you a structured understanding that you can build upon.
-->