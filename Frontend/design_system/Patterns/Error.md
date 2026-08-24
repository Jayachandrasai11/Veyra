16 — ERROR + RECOVERY — IMPLEMENTATION RULES

1. Create a reusable ErrorState component.

2. Structure:

   Status Icon
   Problem
   Explanation
   Recovery Action
   Optional Secondary Action

3. Always explain the problem in
   user-friendly language.

4. Never expose raw API errors to users.

   Bad:
   "Plaid error 429 / CONNECTION_TIMEOUT"

   Good:
   "Your bank couldn't be reached right now."

5. Every recoverable error should have
   a meaningful recovery action.

6. Match the action to the error.

7. Never use "Try again" when retrying
   cannot actually resolve the problem.

8. Show data freshness when financial
   information may be stale.

9. Never silently display stale financial
   data as if it were current.

10. For partial failures, preserve the
    successfully loaded information.

11. Don't replace the entire dashboard with
    an error when only one data source fails.

12. Use inline errors for affected content.

13. Use Toast/Sonner for short-lived
    feedback.

14. Use full-page errors only when the
    entire experience is unavailable.

15. Support:

    Default
    Warning
    Recoverable Error
    Critical Error

16. Use Lucide Icons.

17. Do not rely on color alone to communicate
    the error state.

18. Include text/icon/status in addition
    to color.

19. Support light and dark themes.

20. Respect Fermor spacing, typography,
    border and radius tokens.

21. Use Fermor Button variants for
    recovery actions.

22. Loading → Error transition must be clear.

23. Error → Retry → Loading → Success
    should be a supported state flow.

24. Prevent infinite retry loops.

25. Preserve the user's context after recovery.

26. Never blame the user for a technical error.

27. Avoid alarming language unless the
    situation genuinely requires urgency.


16 — ERROR + RECOVERY PATTERN

Purpose:
Clearly communicate problems and provide
a useful path toward recovery.

Structure:

ErrorState
├── Status Icon
├── Problem
├── Explanation
├── Recovery Action
└── Optional Secondary Action

Core principle:

What happened?
      ↓
What does it mean?
      ↓
What can I do?

Examples:

Sync failure
→ Try again

Account disconnected
→ Reconnect account

Permission expired
→ Reconnect

Provider unavailable
→ Try again later

Partial failure
→ Preserve available data
→ Explain affected source

Financial principle:

Always communicate data freshness
when information may be stale.

Never silently present stale financial
information as current.
LOADING
   │
   ├── Success ──────→ CONTENT
   │
   └── Failure
          ↓
        ERROR
          │
       Try again
          ↓
       LOADING
          │
     ┌────┴────┐
     ↓         ↓
  SUCCESS    ERROR