SECTION 01 — WELCOME — IMPLEMENTATION RULES

1. Create a reusable PageHeader component.

2. Pattern:
   Dashboard Welcome

3. Structure:

   PageHeader
   ├── Greeting
   └── Description

4. Optional action may be supported,
   but do not add one to Home unless
   required by the product.

5. Greeting is the Home page H1.

6. Greeting:
   H1 / Page Title typography token.

7. Description:
   Body typography token.

8. Greeting → Description:
   8px desktop
   6px mobile

9. Desktop greeting:
   28px

10. Mobile greeting:
    24px

11. Description:
    16px

12. Use:
    --text-primary
    --text-secondary

13. Generate timeOfDay from the user's
    local time.

14. Supported:
    morning
    afternoon
    evening

15. userName is optional.

16. If userName is unavailable,
    omit the name gracefully.

17. Never render undefined/null values.

18. Prefer first name for personalization.

19. Main Content controls spacing
    outside the component.

20. PageHeader controls only its
    internal spacing.

21. Do not create separate MorningHeader,
    EveningHeader, etc.

22. Use one PageHeader component with data.

23. Support light and dark mode.

24. Use Fermor typography tokens.

25. Do not introduce arbitrary font sizes,
    colors or spacing.

26. Keep the pattern minimal.

27. Do not turn Dashboard Welcome into
    a large hero/banner.

28. Use semantic HTML.

29. Maintain exactly one primary H1
    for the page.

30. The component must work with:
    populated user
    missing user
    loading user data

SECTION 01 — WELCOME

Pattern:
Dashboard Welcome

Component:
PageHeader

Purpose:
Provide a brief personalized introduction
to the user's financial dashboard.

Structure:

Welcome
├── Greeting
└── Description

Data:

timeOfDay
userName
description

Example:

Good evening, Sai
Here's your financial picture.

Typography:

Greeting:
H1 / 28px desktop / 24px mobile
Semibold

Description:
Body / 16px
Regular

Colors:

Greeting → --text-primary
Description → --text-secondary

Internal spacing:

Greeting → Description:
8px desktop
6px mobile

Responsive:

Desktop → 28px heading
Tablet → 28px heading
Mobile → 24px heading

Behavior:

Morning
→ Good morning

Afternoon
→ Good afternoon

Evening
→ Good evening

Personalization:

Name available
→ Good evening, Sai

Name unavailable
→ Good evening

Principle:

Minimal dashboard context.
Not a hero.
Not a promotional banner.