🤖 AI Implementation Rules
16 — ERROR BEHAVIOR

1. Never show only:
   "Error"

2. Every user-facing error should
   communicate:

   What happened?
   What does it affect?
   What can I do?

3. Use a reusable ErrorState system.

4. Prefer localized errors over
   full-page errors.

5. A failed component should not
   automatically break the dashboard.

6. Recoverable errors should provide
   a clear recovery action.

7. Retry states must use loading
   behavior while the retry is active.

8. Prevent repeated retry clicks
   during an active request.

9. Distinguish:

   Empty
   Loading
   Error
   Stale
   Needs attention

10. Never use an empty state to
    represent an API failure.

11. Never use a skeleton indefinitely
    after a request has failed.

12. Financial data errors must explain
    whether existing data is affected.

13. If old financial data remains
    available, clearly indicate that
    it may be stale.

14. Never imply that financial data
    changed when an operation failed.

15. Never fabricate financial data
    to fill an error state.

16. AI errors must never cause the AI
    to invent a fallback financial
    answer.

17. If AI streaming fails, preserve
    already-rendered content where
    possible.

18. Technical error codes belong in
    logs/debugging, not as the primary
    user-facing message.

19. Don't rely only on red or color
    to communicate an error.

20. Use severity appropriate to the
    actual impact.

21. Account connections should have
    explicit states:

    Connected
    Updating
    Needs attention
    Disconnected
    Failed

22. Error recovery must lead to a
    real product action.

23. Don't create decorative error
    animations.

24. AI must follow the same error
    communication system as the rest
    of the product.

25. Recommended state model:

    Request
      ↓
    Loading
      ├── Success → Content
      ├── Empty   → EmptyState
      └── Error   → ErrorState

    Existing data + failed refresh
      ↓
    StaleData
📝 Design File Note

Pattern: Error + Recovery

ErrorState
│
├── Status / Icon
├── What happened?
├── Impact explanation
├── Recovery action
└── Optional secondary action
Core rule

Never make the user interpret an error. Explain the problem and give them a next step.

Fermor error examples
Bank connection failed
→ Try again / Reconnect

Data refresh failed
→ Try again
→ Show last updated time

Permission problem
→ Review / Reconnect

AI generation failed
→ Try again

No data exists
→ Empty State
Source / reference

Use shadcn/ui Alert as the primitive/reference for presenting status messaging, and shadcn/ui Sonner for transient feedback such as a successful retry.