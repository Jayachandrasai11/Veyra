04 — MAIN CONTENT — IMPLEMENTATION RULES

1. Main is part of AppShell.

2. Use one reusable MainContent component
   or layout container.

3. Structure:

   Main
   ├── Page Header
   └── Sections

4. Desktop horizontal padding:
   32px

5. Tablet horizontal padding:
   24px

6. Mobile horizontal padding:
   16px

7. Desktop vertical padding:
   32px

8. Mobile vertical padding:
   24px

9. Desktop section gap:
   32px

10. Tablet/mobile section gap:
    24px

11. Desktop content max-width:
    1440px

12. All major sections must align to
    the same content container.

13. Do not use arbitrary section margins.

14. Parent layout controls section spacing.

15. Section Header controls the spacing
    between heading and section content.

16. Individual components control their
    own internal padding.

17. Do not let cards determine page spacing.

18. Use CSS Grid/Flex according to the
    individual pattern requirements.

19. Follow the Fermor responsive grid rules.

20. Prevent accidental horizontal page
    scrolling.

21. Wide tables/charts may use controlled
    horizontal scrolling.

22. Avoid unnecessary nested scroll areas.

23. Use semantic HTML:

    main
    section
    h1
    h2

24. Loading states preserve the page layout.

25. Errors appear in the affected section
    whenever possible.

26. Do not replace the entire page with an
    error when only one section fails.

27. Use Fermor design tokens.

28. Never introduce arbitrary:
    colors
    spacing
    radius
    typography
    shadows

29. Main Content must work in:
    Light mode
    Dark mode

30. Respect reduced motion.

31. Maintain keyboard accessibility.

32. Do not create a new layout pattern
    when an existing Fermor pattern applies.

04 — MAIN CONTENT

Pattern:
Main Content

Purpose:
Provide consistent page structure,
alignment, width and vertical rhythm.

Structure:

Main
│
├── Page Header
└── Sections

Desktop:
Max-width → 1440px
Padding → 32px
Section gap → 32px

Tablet:
Padding → 24px
Section gap → 24px

Mobile:
Padding → 16px
Section gap → 24px

Home:

Welcome
↓
Account Connection
↓
Financial Health
↓
Money at a Glance
↓
Financial Insights
↓
Goals
↓
AI Thought
↓
Explore

Rules:

• All sections share the same content alignment.
• Parent controls section spacing.
• Components control internal spacing.
• Individual patterns control their own grids.
• Avoid arbitrary margins.
• Preserve layout during loading.
• Keep errors local to affected content.
• Prevent unnecessary horizontal scrolling.
• Use semantic HTML.