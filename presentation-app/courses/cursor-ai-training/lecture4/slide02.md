---
slide_type: content
title: "Understanding the New Cursor Rules System"
---

# Understanding the New Cursor Rules System

## 🏗️ System Architecture Overview

```
Cursor Rules System (v0.45+)
├── Project Rules (.cursor/rules/)    ← Version-controlled, scoped
├── User Rules (Settings)             ← Global, personal preferences  
├── Memories (Auto-generated)         ← AI learns from conversations
└── Legacy .cursorrules               ← Still supported, deprecated
```

## 🔄 How Rules Work

**Core Principle:** Large language models have no memory between completions

✅ **Solution:** Rules provide persistent, reusable context at prompt level  
✅ **When Applied:** Rule contents included at start of model context  
✅ **Scope:** Both Chat and Inline Edit (Cmd/Ctrl + K)

## 📊 Three Types of Rules

| Rule Type | Storage | Scope | Use Case |
|-----------|---------|-------|----------|
| **Project** | `.cursor/rules/` | Repository | Team standards, domain knowledge |
| **User** | Settings | Global | Personal preferences, tone |
| **Memories** | Auto-created | Repository | AI learns from conversations |

## 🚀 Key Benefits

- **Granular Control:** File-specific, directory-specific, or global
- **Team Collaboration:** Version-controlled project rules
- **Smart Activation:** Rules apply when relevant (glob patterns)
- **Enterprise Ready:** Nested rules, organizational hierarchies

<!-- Speaker Notes:
The new Cursor Rules system is a complete redesign. The key insight is that LLMs don't retain context between conversations, so rules solve this by injecting consistent guidance.

Project rules are the most important - they're stored in .cursor/rules/, version controlled, and can be scoped using glob patterns or descriptions for AI to decide when to apply them.

User rules are personal preferences stored in settings. Memories are automatically generated based on conversations - Cursor learns patterns from how you work.

The legacy .cursorrules file still works but is deprecated in favor of this more flexible system.
-->