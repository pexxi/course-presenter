---
slide_type: content
title: "Best Practices & Migration Guide"
---

# Best Practices & Migration Guide

## 📋 Rule Creation Checklist

### ✅ **Before Creating Rules**

- [ ] **Identify the Problem:** What specific issue does this rule solve?
- [ ] **Check Existing Rules:** Could an existing rule be modified instead?
- [ ] **Choose Rule Type:** Always, Auto-attached, Agent-requested, or Manual?
- [ ] **Define Scope:** Which files/directories should this apply to?

### ✅ **Writing Effective Rules**

- [ ] **Keep it Focused:** One responsibility per rule (< 500 lines)
- [ ] **Use Clear Language:** Specific, measurable, actionable instructions
- [ ] **Include Examples:** Both correct ✅ and incorrect ❌ usage
- [ ] **Reference Templates:** Link related files with `@filename.ts`

<!-- Speaker Notes:
This slide provides a comprehensive checklist for creating effective rules. The 'Before Creating Rules' section helps ensure that each rule has a clear purpose and fits into the overall rule architecture. The 'Writing Effective Rules' section provides practical guidelines for creating clear, maintainable, and effective rules that will be easy for developers to understand and follow.
-->
mkdir -p .cursor/rules/{core,languages,domains,templates}

# Convert legacy .cursorrules to MDC format
# (Custom script based on your current rules)
```

## 🎯 Common Patterns & Anti-Patterns

### ✅ **Do This**

```markdown
# Specific, measurable rule
---
description: "Apply TypeScript strict typing standards"
globs: "**/*.ts,**/*.tsx"
alwaysApply: false
---

## Type Safety Rules
- Use explicit return types for all functions
- Prefer `interface` over `type` for object shapes
- Enable `strictNullChecks` in tsconfig.json
```

### ❌ **Avoid This**

```markdown
# Vague, immeasurable rule
---
description: "Make code better"
globs: "**/*"
alwaysApply: true
---

## General Guidelines
- Write good code
- Make it clean and readable
- Follow best practices
```

## 🚀 Implementation Roadmap

### **Week 1-2: Foundation**

- ✅ Set up `.cursor/rules/` directory structure
- ✅ Migrate critical rules (security, compliance)
- ✅ Create team training materials

### **Week 3-4: Core Rules**

- ✅ Implement always-apply rules (communication, code quality)
- ✅ Add language-specific auto-attached rules
- ✅ Test rule interactions and conflicts

### **Week 5-6: Advanced Features**

- ✅ Create agent-requested domain rules
- ✅ Build manual template library
- ✅ Implement rule governance process

### **Week 7+: Optimization**

- ✅ Monitor rule effectiveness
- ✅ Gather developer feedback
- ✅ Continuous improvement and refinement

## 📚 Key Takeaways

🎯 **Rules are Prompts:** Write them like clear instructions to a human developer  
🎯 **Start Simple:** Begin with essential rules, expand gradually  
🎯 **Team First:** Rules should serve team consistency, not individual preference  
🎯 **Iterate Often:** Rules evolve with your codebase and team needs  
🎯 **Measure Impact:** Track adoption, compliance, and developer satisfaction

<!-- Speaker Notes:
This final slide provides actionable guidance for implementing Cursor Rules in practice. The checklist helps ensure thorough rule creation, while the migration guide addresses the common need to upgrade from legacy .cursorrules files.

The patterns section shows concrete examples of effective vs ineffective rules. The key is being specific and measurable rather than vague.

The implementation roadmap provides a practical timeline for rolling out rules systematically. Start with critical security/compliance rules, then add foundational standards, and finally implement advanced features.

The key takeaways reinforce that rules are essentially prompts for the AI, so they should be written with the same care as any important documentation. Success comes from starting simple, focusing on team needs, and iterating based on real usage patterns.

This concludes our comprehensive coverage of the new Cursor Rules system!
-->