---
slide_type: content
title: "Migration from Legacy .cursorrules"
---

# Migration from Legacy .cursorrules

## 🔄 Migration Overview

### **Migration Process**
1. **Assessment** - Identify existing rules
2. **Categorization** - Map to new rule types
3. **Conversion** - Transform to MDC format
4. **Validation** - Test rule behavior
5. **Deployment** - Roll out incrementally

### **Step 1: Assessment**

```bash
# Identify existing .cursorrules files
find . -name ".cursorrules" -type f

# Review current rule content
cat .cursorrules

# Analyze rule usage
grep -r "@cursorrules" --include="*.{js,ts,jsx,tsx}" .
```

### **Step 2: Rule Categorization**

```markdown
Legacy Rule → New Rule Type
├── Global standards → Always Rule (.cursor/rules/core/)
├── Language-specific → Auto-attached Rule (.cursor/rules/languages/)
├── Domain knowledge → Agent-requested Rule (.cursor/rules/domains/)
└── Templates → Manual Rule (.cursor/rules/templates/)
```

<!-- Speaker Notes:
This slide covers the first two steps of migrating from legacy .cursorrules to the new format. The assessment phase helps identify all existing rules and their usage across the codebase. The categorization step maps each legacy rule to the most appropriate new rule type based on its purpose and scope. This ensures a smooth transition to the new rule architecture while maintaining existing functionality.
-->

**Key Considerations:**
- Document all custom rules
- Identify deprecated patterns
- Plan for backward compatibility
- Set up monitoring for rule effectiveness
