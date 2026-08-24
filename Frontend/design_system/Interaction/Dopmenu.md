🤖 AI Implementation Rules
12 — DROPDOWN / MENUS

1. Avatar is the Account Menu trigger.

2. Account menu contains account-level
   actions, not primary navigation.

3. Recommended items:

   Profile
   Settings
   Security
   Help & Support
   Log out

4. Every navigation item must have
   a real destination.

5. Log out is an action, not a route.

6. Keep Log out visually separated
   from normal account navigation.

7. Don't duplicate Sidebar navigation
   inside the Account Menu.

8. Don't put Ask Fermor inside the
   account menu when it already has
   a dedicated header entry point.

9. Menu items need:

   Default
   Hover
   Focus
   Pressed
   Disabled

10. Support keyboard navigation.

11. Escape closes the menu.

12. Clicking outside closes the menu.

13. Selecting a navigation item closes
    the menu.

14. Use subtle transitions only.

15. Don't create different animation
    behavior for different menu items.

16. Desktop:
    compact dropdown/popover.

17. Mobile:
    dropdown for small menus;
    drawer/full-screen account view
    when the menu becomes complex.

18. Don't overload the menu with
    settings controls.

19. Account identity can appear at
    the top:

    Avatar
    Name
    Email

20. Use the existing Avatar component
    rather than creating another avatar
    implementation.

21. Menu data should be configuration-driven.

22. Example:

    {
      id: "settings",
      label: "Settings",
      href: "/settings"
    }

23. AI must not invent menu destinations.

24. Security-related actions should
    use explicit, understandable labels.

25. Don't hide important security or
    account recovery actions behind
    decorative interactions.
📝 Design File Note

Pattern: Account Menu

Purpose: Provide access to user/account-level actions from the application header.

AccountMenu
│
├── AccountIdentity
│   ├── Avatar
│   ├── Name
│   └── Email
│
├── Profile
├── Settings
├── Security
├── Help & Support
│
├── Separator
│
└── Log out
Trigger
Avatar → AccountMenu
Responsive
Desktop → Dropdown
Mobile  → Dropdown / Drawer
Important distinction
Sidebar
→ Product navigation

Account Menu
→ User/account actions

Ask Fermor
→ AI entry point
Source

Use shadcn/ui Dropdown Menu as the primitive/reference.

Fermor rule: use the shadcn behavior and accessibility foundation, but create a custom visual treatment and account hierarchy rather than copying the default dropdown.