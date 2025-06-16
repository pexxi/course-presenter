---
slide_type: code-example
title: "Example: Manual Rule - React Boilerplate"
---

# Example: Manual Rule - React Boilerplate

**File: `.cursor/rules/templates/react-component.mdc`**

```markdown
---
description: "Standard React component template"
# No globs or alwaysApply - manual use only
---

# React Component Template

## Standard Functional Component

```typescript
import React from 'react';
import PropTypes from 'prop-types';

interface {{ComponentName}}Props {
  // Define prop types here
  title: string;
  isActive?: boolean;
  onClick: () => void;
}

export const {{ComponentName}} = ({
  title,
  isActive = false,
  onClick,
}: {{ComponentName}}Props) => {
  // Component logic here
  
  return (
    <div className={`component ${isActive ? 'active' : ''}`}>
      <h2>{title}</h2>
      {/* Add component JSX here */}
    </div>
  );
};

{{ComponentName}}.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
```

## Usage Instructions

1. Copy this template
2. Replace `{{ComponentName}}` with your component name
3. Update the props interface
4. Implement the component logic
5. Add appropriate styling

## Best Practices

- Keep components small and focused
- Use TypeScript for type safety
- Follow the single responsibility principle
- Use meaningful prop and variable names
- Add PropTypes for runtime validation
- Include JSDoc comments for complex components

## Testing

```typescript
// Example test using React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { {{ComponentName}} } from './{{ComponentName}}';

describe('{{ComponentName}}', () => {
  it('renders with title', () => {
    render(<{{ComponentName}} title="Test" onClick={jest.fn()} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```
```

<!-- Speaker Notes:
Manual Rules are templates or guidelines that are only applied when explicitly requested. This React component template demonstrates how to create reusable boilerplate code that follows best practices. The template includes TypeScript types, PropTypes, and testing examples, making it a comprehensive starting point for new components.
-->

**Key Characteristics:**
- Must be explicitly referenced
- Great for code generation
- Can include templates and snippets
- Helps maintain consistency across components
