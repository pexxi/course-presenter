---
template: content
title: "Basic Autocomplete Features"
---

# Basic Autocomplete Features

## 📝 **Single-Line Completions**

### **Function Signatures**

Parameter suggestions and type definitions

### **Variable Names**

Context-aware naming suggestions

### **Import Statements**

Automatic import suggestions and organization

### **API Calls**

Method completion with proper syntax

---

## 📋 **Multi-Line Completions**

### **Function Bodies**

Complete function implementations from comments

### **Class Definitions**

Boilerplate code generation and structure

### **Documentation**

Automatic docstring and comment generation

### **Test Cases**

Test function scaffolding and scenarios

---

## ✅ **Best Practices**

- **Context Matters**: Keep relevant files open
- **Comment Driven**: Use comments to guide AI
- **Incremental Accept**: Accept suggestions in parts
- **Learn Patterns**: Understand what works for your codebase

<!-- Speaker Notes:
This is where the magic happens. Let's see AI autocomplete in action and understand the different types of assistance you'll get.

Single-line completions are your bread and butter. As you type function names, Cursor suggests parameters and types. When you're working with APIs, it suggests method calls with proper syntax. Variable naming becomes context-aware - if you're in a user management function, it'll suggest user-related variable names.

But the real power comes with multi-line completions. Type a comment describing what you want a function to do, and Cursor will generate the entire function body. Define a class name and Cursor will scaffold the complete class structure with appropriate methods.

Documentation generation is particularly powerful. Write a function and Cursor will generate comprehensive docstrings that follow your project's conventions.

Here are the best practices that will make you incredibly effective:

First, context matters enormously. Keep relevant files open. If you're working on a user service, have the user model file open. Cursor uses this context to make better suggestions.

Second, become comment-driven in your development. Instead of thinking "I need to write this function," think "I need to write a comment explaining what this function should do." The AI will handle the implementation.

Third, learn to accept suggestions incrementally. You don't have to accept everything - use arrow keys to accept just the parts you want.

Finally, pay attention to patterns. As you work with your codebase, Cursor learns your patterns and conventions. The more you use it, the better it gets at suggesting code that matches your style.
-->