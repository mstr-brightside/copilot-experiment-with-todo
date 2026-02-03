---
name: react-tester
description: Expert in writing unit and integration tests for React components using React Testing Library and Vitest.
---

# Skill Instructions
When the user asks to test a React component:
1. **Library Choice**: Always use `@testing-library/react` and `vitest`.
2. **Patterns**: Prefer `user-event` over `fireEvent` for user interactions.
3. **Mocks**: Automatically mock global fetch or external API hooks using `vi.mock`.
4. **Structure**: 
   - Wrap tests in a `describe` block named after the component.
   - Use `it` (not `test`) for individual test cases.
   - Include a test case for "renders without crashing".
5. **Accessibility**: Prioritize `getByRole` and `findByRole` over `getByTestId`.

# Example Template
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
```