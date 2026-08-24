🤖 AI Implementation Rules
11 — NOTIFICATIONS

1. Notification Center is a system
   activity/feedback pattern.

2. Header bell opens the center.

3. Desktop:
   Popover / compact panel.

4. Mobile:
   Drawer / dedicated screen.

5. Define:

   unread
   read

6. Don't rely only on color
   to distinguish unread.

7. Use an unread dot or subtle
   visual treatment.

8. Notifications should generally
   link to relevant product context.

9. Examples:

   Account connected
      → Account details

   Spending increased
      → Spending analysis

   Goal milestone
      → Goal details

10. Mark notification read when
    it is meaningfully opened.

11. Provide "Mark all as read"
    when appropriate.

12. Empty state:

    You're all caught up.

13. Loading state uses a
    notification skeleton.

14. Error state provides:

    Try again

15. Don't confuse:

    Notification
    Insight
    AI Thought

16. Notification:
    Event / system information.

17. Insight:
    Financial observation.

18. AI Thought:
    Interpretation + recommendation.

19. Don't send every AI insight
    as a notification.

20. Use notification priority
    internally:

    low
    normal
    important
    critical

21. Unresolved important items
    should remain discoverable.

22. Don't use excessive numeric
    notification badges.

23. Prefer:

    🔔 •

    over:

    🔔 27

24. Every notification should have
    a stable ID.

25. Notification data comes from
    the backend/event system.

26. AI may generate insight content,
    but the notification system owns
    delivery/state.

27. AI must not independently decide
    to create unlimited notifications.

28. Notification actions should be
    explicit and safe.

29. Security/account notifications
    should receive higher priority
    where appropriate.

30. Notification content should be
    concise.

31. Don't turn the notification center
    into a second dashboard.

32. Keep notification state separate
    from financial account state.

33. Recommended structure:

    NotificationService
        ↓
    NotificationStore
        ↓
    NotificationCenter
        ↓
    NotificationItem
📝 Design File Note

Pattern: Notification Center

Purpose: Surface important system events and user-relevant financial activity.

NotificationCenter
│
├── NotificationTrigger
│   └── Bell + Unread Indicator
│
└── NotificationPanel
    ├── Header
    ├── NotificationList
    │   └── NotificationItem
    └── EmptyState
Component anatomy
NotificationItem
├── Icon / Status
├── Title
├── Description
├── Timestamp
└── Optional Action
States
No notifications
Unread
Read
Loading
Error
Key UX rule
Event
   ↓
Notification

Observation
   ↓
Insight

Interpretation
   ↓
AI Thought

This separation is especially important for Fermor. It keeps the notification system useful instead of turning every piece of financial intelligence into an alert.

Sources

Use shadcn/ui Popover as the desktop interaction foundation, shadcn/ui Drawer for mobile, and shadcn/ui Badge for the unread indicator.

Fermor implementation: use the shadcn primitives, but create a custom NotificationCenter rather than copying a generic notification dropdown.