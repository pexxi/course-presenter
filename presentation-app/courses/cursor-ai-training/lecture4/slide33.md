---
slide_type: content
title: "Migration Script & Testing"
---

# Migration Script & Testing

## 🔧 Migration Script

```bash
#!/bin/bash
# Migration script: legacy .cursorrules to MDC format

# Create new rule structure
mkdir -p .cursor/rules/{core,languages,domains,templates}

# Convert legacy .cursorrules to MDC format
find . -name ".cursorrules" -type f | while read -r file; do
    # Extract rule name from filename
    rule_name=$(basename "$file" .cursorrules)
    
    # Determine rule type based on location/content
    if [[ "$file" == *"/security/"* ]]; then
        target=".cursor/rules/core/security-${rule_name}.md"
    elif [[ "$file" == *"/languages/"* ]]; then
        target=".cursor/rules/languages/${rule_name}.md"
    else
        target=".cursor/rules/core/${rule_name}.md"
    fi
    
    # Create MDC file with frontmatter
    echo "---" > "$target"
    echo "description: Migrated from ${file}" >> "$target"
    echo "globs: **/*.ts" >> "$target"
    echo "---" >> "$target"
    echo "" >> "$target"
    
    # Convert content to MDC format
    cat "$file" | sed 's/^#/##/' >> "$target"
    
    echo "Migrated $file to $target"
done
```

## 🧪 Testing Migrated Rules

### **Test Cases**
1. **Basic Validation**
   - Rules load without errors
   - Correct files are matched by glob patterns
   - Rule descriptions are clear and accurate

2. **Functionality Testing**
   - Rules trigger as expected
   - Error messages are helpful
   - Fix suggestions are accurate

3. **Performance Testing**
   - Rules don't significantly impact IDE performance
   - Large codebases handle rules efficiently
   - Memory usage remains stable

<!-- Speaker Notes:
This slide provides a migration script to automate the conversion of legacy .cursorrules files to the new MDC format. The script handles the basic structure conversion, but manual review is still required for each rule. The testing section outlines key test cases to ensure that migrated rules work as expected and don't introduce performance issues. It's important to test rules in a controlled environment before rolling them out to the entire team.
-->

**Best Practices:**
- Keep a backup of original rules
- Test in a branch first
- Monitor performance impact
- Document any manual changes
