---
template: content
title: "Creating Effective Rules"
---

# Creating Effective Rules

## 🛠️ Testing & Maintenance

### **7. Test Your Rules**

```typescript
// test/rule-tests/naming-conventions.test.ts
describe('Naming Conventions Rule', () => {
  it('should flag snake_case variables', () => {
    const code = `const user_name = 'test';`;
    expect(validateRule('naming-conventions', code)).toHaveViolations();
  });
});
```

### **8. Version Control Best Practices**

```bash
# Good commit message
feat(rules): Add React hooks best practices rule

- Add comprehensive hooks usage guidelines
- Include examples of common pitfalls
- Reference React documentation
```

### **9. Regular Reviews**

- Schedule monthly rule reviews
- Remove deprecated rules
- Update rules for new best practices

<!-- Speaker Notes:
Testing is crucial for maintaining rule quality. Write unit tests for your rules to ensure they work as expected. Follow version control best practices with clear, descriptive commit messages. Schedule regular reviews to keep your rules up-to-date with the latest best practices and remove any that are no longer needed.
-->

**Maintenance Tips:**
- Automate testing where possible
- Document changes thoroughly
- Keep rules current with ecosystem changes
