# Component Guidelines v1.0
Based on `tokens.json`. All components must be accessible (WCAG 2.2 AA) and support all documented states.

## 1. Button
- **Props**: `variant` ('primary', 'secondary', 'terse'), `size` ('sm', 'md', 'lg'), `iconLeft`, `iconRight`, `isDisabled`, `isLoading`, `onClick`.
- **States**: `default`, `hover`, `active`, `focus`, `disabled`, `loading`.
- **A11y**: Always include a clear, concise label. If using an icon-only button, provide an `aria-label`. Focus state must be highly visible.

## 2. Input
- **Props**: `type` ('text', 'email', 'password'), `label`, `placeholder`, `value`, `onChange`, `isDisabled`, `isInvalid`, `assistiveText`, `iconLeft`.
- **States**: `default`, `focus`, `disabled`, `invalid`.
- **A11y**: Label must be programmatically associated with the input. Invalid state requires `aria-invalid="true"` and an `aria-describedby` pointing to the error message.

## 3. Card
- **Props**: `padding` ('sm', 'md', 'lg'), `elevation` ('1', '2', '3').
- **Structure**: A simple container. Can be composed with other components.
- **A11y**: Use appropriate heading levels within cards to maintain document structure.

## 4. Modal / Sheet
- **Props**: `isOpen`, `onClose`, `title`, `children`, `footer`.
- **States**: `open`, `closed`.
- **A11y**: Must trap focus. `aria-modal="true"`. The `title` prop should be linked as the `aria-labelledby`. Closing can be triggered by `Escape` key.

## 5. Toast
- **Props**: `variant` ('info', 'positive', 'negative'), `title`, `message`, `onDismiss`.
- **Behavior**: Appears for a short duration (e.g., 5s) or until dismissed.
- **A11y**: Should be announced by screen readers using an `aria-live` region. Do not auto-dismiss critical information without a persistent alternative.

## 6. Tabs
- **Props**: `items` (Array of `{label, content}`), `defaultIndex`.
- **Behavior**: Switches content panel based on selected tab.
- **A11y**: Follow ARIA patterns for Tabs. `role="tablist"`, `role="tab"`, `role="tabpanel"`. Manage focus and `aria-selected` attributes correctly.
