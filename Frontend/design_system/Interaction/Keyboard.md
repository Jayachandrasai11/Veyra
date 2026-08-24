🤖 AI Implementation Rules
18 — KEYBOARD BEHAVIOR

1. Every interactive element must be
   keyboard accessible.

2. Prefer native HTML semantics:

   button
   a
   input
   textarea
   select

   before creating custom keyboard logic.

3. Use accessible primitives for complex
   interactions.

4. Tab:
   → next logical interactive element.

5. Shift + Tab:
   → previous logical element.

6. Enter:
   → activate links/buttons where
     appropriate.

7. Space:
   → activate/toggle controls where
     appropriate.

8. Escape:
   → close the current temporary layer.

9. Arrow keys:
   → only use for components whose
     interaction pattern calls for them.

10. Dropdowns:
    Arrow Up / Down.

11. Select:
    Arrow Up / Down.

12. Tabs:
    Arrow navigation.

13. Menus:
    Arrow navigation.

14. Normal navigation links:
    normal Tab navigation.

15. Dialogs:
    move focus inside when opened.

16. Dialogs:
    return focus to the trigger
    when closed.

17. Drawers:
    move focus into the drawer.

18. Drawers:
    return focus to the trigger
    when closed.

19. Focus must always have a visible
    indicator.

20. Never remove focus styles without
    providing an accessible replacement.

21. Don't trap focus outside modal
    contexts.

22. Don't create custom keyboard
    behavior when the underlying
    accessible primitive already
    provides it.

23. Don't use divs as buttons or links
    when native semantic elements
    can be used.

24. AI interfaces must be fully
    keyboard accessible.

25. AI input must have a predictable
    submit/new-line behavior.

26. AI-generated UI must not invent
    custom keyboard interactions.

27. Keyboard behavior belongs to the
    component pattern, not individual
    screen implementations.

28. Test every new interactive component
    with:

    Tab
    Shift + Tab
    Enter
    Space
    Escape
    Arrow keys where applicable

29. Keyboard navigation should work
    without requiring a mouse.

30. Accessibility is a behavior
    requirement, not a visual variant.
📝 Design File Note

Pattern: Keyboard Interaction System

Keyboard
│
├── Global
│   ├── Tab
│   ├── Shift + Tab
│   ├── Enter
│   ├── Space
│   └── Esc
│
└── Component-specific
    ├── Dropdown → ↑ ↓
    ├── Select → ↑ ↓
    ├── Tabs → ← →
    ├── Menu → ↑ ↓
    └── Composite controls → managed keys
Focus rule
Open overlay
    ↓
Move focus inside
    ↓
Interact
    ↓
Close
    ↓
Return focus to trigger
Core rule

Use native semantics first; use custom keyboard behavior only when the component's interaction pattern requires it.

Sources
Radix Accessibility — focus management, keyboard navigation, and WAI-ARIA behavior.
Radix Dropdown Menu — menu keyboard behavior and focus management.
Radix Select — select keyboard interaction.
Radix Navigation Menu — navigation-specific keyboard behavior.