---
template: content
title: "Advanced Chat Features"
---

# Advanced Chat Features

## 📁 **File References**

- **@filename**: Include specific files in conversation
- **@folder**: Reference entire directories for broader context
- **@folder**: Reference entire directories
- **Smart Context**: AI automatically pulls relevant files

## 🔄 **Multi-turn Conversations**

- **Iterative Development**: Build solutions step by step
- **Context Preservation**: Maintain conversation history
- **Progressive Refinement**: Improve solutions through dialogue

## ⚡ **Chat Commands**

- **Code Generation**: "Create a React component for..."
- **Debugging**: "Why is this function throwing an error?"
- **Refactoring**: "Modernize this code using latest patterns"
- **Documentation**: "Explain what this algorithm does"

<!-- Speaker Notes:
Now let's explore the advanced features that make Cursor's chat truly powerful for professional development.

File references are game-changing. Using @filename, you can explicitly include any file in your conversation. This means you can ask questions like "How does @user.py relate to @database.py?" and the AI will analyze both files together. The @folder reference is even more powerful, letting you include entire directories for broader architectural discussions, like asking the AI to "review the architecture of the @backend/routes folder."

Multi-turn conversations are where the real magic happens. Unlike simple Q&A, you can build complex solutions iteratively. Start with a high-level question, then refine based on the AI's response, then ask for specific implementations. The AI maintains context throughout this conversation, understanding what you've discussed and building on previous responses.

Chat commands represent different types of development assistance. Code generation for new features, debugging for problem-solving, refactoring for code improvement, and documentation for understanding. Each type of command has its own patterns and best practices.

The key principle here is progressive refinement. Don't expect perfect solutions in one prompt. Instead, engage in a conversation. Ask clarifying questions, request alternatives, and iteratively improve the solution. This approach leads to much better results than single-shot prompts.

This conversational approach transforms AI from a simple tool into a development partner that can engage with complex, multi-faceted problems over extended interactions.
-->

## 🎯 **Hands-On Exercise: Advanced Chat Mastery**

### **Exercise 1: File Reference Practice** *(5 minutes)*

1. Open a project with multiple files
2. Use `@filename` to reference a specific file
3. Ask: "Analyze the dependencies in @package.json"
4. Follow up: "How does @src/main.js use these dependencies?"

### **Exercise 2: Multi-Turn Debugging** *(10 minutes)*

1. Find a function with a bug or performance issue
2. **Turn 1**: "Identify potential issues in this function"
3. **Turn 2**: "Explain the performance implications"
4. **Turn 3**: "Provide an optimized version"
5. **Turn 4**: "Add error handling"

### **Exercise 3: Iterative Feature Development** *(10 minutes)*

1. **Turn 1**: "Create a basic user authentication system"
2. **Turn 2**: "Add JWT token support"
3. **Turn 3**: "Include password reset functionality"
4. **Turn 4**: "Add input validation"

### **💡 Success Metrics**

- [ ] AI maintains context across all conversation turns
- [ ] Each response builds on previous information
- [ ] File references work correctly
- [ ] Solutions improve with each iteration
