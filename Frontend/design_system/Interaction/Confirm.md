🤖 AI Implementation Rules
17 — CONFIRMATION BEHAVIOR

1. Don't confirm every action.

2. Require confirmation for actions that
   are destructive, irreversible, or
   financially meaningful.

3. Confirmation must explain what
   will happen.

4. Never use only:
   "Are you sure?"

5. Preferred structure:

   Title
   ↓
   Consequence
   ↓
   Cancel / Confirm

6. The confirm button should describe
   the action where possible:

   Delete account
   Disconnect account
   Add ₹50,000
   Save changes

7. Cancel must always be safe.

8. Cancel must produce no side effects.

9. Escape and dismissal must never
   accidentally execute the action.

10. Disable repeated submission while
    confirmation is being processed.

11. Show an action-specific loading state:

    Delete → Deleting...
    Save → Saving...
    Disconnect → Disconnecting...

12. Don't close the confirmation dialog
    before the operation result is known
    when doing so would hide failure.

13. On success:
    show the resulting state.

14. On failure:
    explain that the action did not
    complete and provide recovery.

15. Use Undo instead of confirmation
    when an action is safely reversible
    and the product can reliably restore it.

16. Don't stack confirmation dialogs.

17. For high-impact financial changes,
    show important values explicitly.

18. For changes, consider showing:

    Before → After

19. Never let AI decide on its own that a
    financial action has been confirmed.

20. AI can explain or recommend an action,
    but the user must explicitly confirm
    the actual consequential action.

21. Example:

    Fermor:
    "I recommend increasing your monthly
    contribution to ₹50,000."

    [Review change]

    ↓

    Confirmation:
    "Set monthly contribution to ₹50,000?"

    [Cancel] [Confirm]

22. AI must never interpret:
    "That sounds good"
    as confirmation for a consequential
    financial action unless the product's
    interaction design explicitly defines
    that as an intentional confirmation.

23. Confirmation belongs to the product
    action layer, not the AI response layer.
📝 Design File Note

Pattern: Confirmation Behavior

Confirmation
│
├── Title
├── Consequence
├── Cancel
└── Confirm
Core flow
User action
   ↓
Is it consequential?
   ├── No → Execute
   │
   └── Yes
        ↓
    Confirmation
        ↓
    Cancel / Confirm
        ↓
      Result
Fermor examples
Delete account
→ Confirm

Disconnect bank
→ Confirm

Delete goal
→ Confirm

Add ₹50,000 to goal
→ Confirm

Open financial details
→ No confirmation

Switch tabs
→ No confirmation
Core rule

Confirmation should prevent meaningful mistakes, not slow down normal navigation.

Source

Use shadcn/ui Alert Dialog as the implementation reference for blocking confirmations.