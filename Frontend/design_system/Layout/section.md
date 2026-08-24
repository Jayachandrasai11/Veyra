06 — SECTION LAYOUT RULES

1. Use one shared Section primitive.

2. Major desktop section gap:
   40px

3. Tablet/mobile section gap:
   32px

4. Desktop header → content:
   20px

5. Mobile header → content:
   16px

6. Section title:
   14px / 20px

7. Section description:
   14px / 20px

8. Section action:
   14px / 20px

9. Header/action gap:
   16px

10. Title/description gap:
    4px

11. Use Tailwind spacing tokens.

12. Do not introduce arbitrary pixel values
    when an existing Tailwind spacing token
    represents the intended value.

13. Section width comes from the global
    Container.

14. Sections should normally use content-driven
    height.

15. Don't create fixed section heights unless
    explicitly required.

16. Mobile headers may wrap when necessary.

17. Reuse SectionHeader across Home,
    Insights, Goals and future pages.

18. Don't create page-specific spacing systems.
# 06 — Section Layout

Pattern:
Section Layout

Architecture:
Section
├── SectionHeader
├── Content
└── Footer?

SIZES:

Major section gap:
32px mobile
40px desktop

Header → Content:
16px mobile
20px desktop

Title:
14px / 20px

Description:
14px / 20px

Action:
14px / 20px

Title → Description:
4px

Header internal gap:
16px

VARIANTS:

Default
Compact
Featured

RESPONSIVE:

Mobile:
space-y-8
mt-4

Desktop:
space-y-10
mt-5

TAILWIND:

space-y-8
lg:space-y-10

mt-4
lg:mt-5

gap-4

gap-1

text-sm
leading-5