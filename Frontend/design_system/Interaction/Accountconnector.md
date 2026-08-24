09 — ACCOUNT CONNECTION

1. Treat account connection as
   a product flow, not a button.

2. Flow:

   Connect
   ↓
   Account Type
   ↓
   Institution
   ↓
   Authentication
   ↓
   Connecting
   ↓
   Result

3. Define explicit states:

   idle
   connecting
   success
   failed
   needs_attention
   disconnected

4. Never let the AI invent
   connection status.

5. Connection status comes from
   the account/data integration layer.

6. Authentication should be handled
   by the appropriate financial
   institution/provider flow.

7. Never imitate an institution's
   authentication UI unnecessarily.

8. Show meaningful progress during
   connection.

9. Don't use a generic "Loading..."
   for an active connection process.

10. Failed connections need recovery:

    Try again
    Choose another institution

11. Needs-attention accounts need
    a specific recovery action:

    Reconnect

12. Disconnected accounts should
    remain visually identifiable.

13. Never rely only on color for
    connection status.

14. Success should trigger a data
    refresh when appropriate.

15. Dashboard content should react
    to account state.

16. No accounts:

    Connect accounts CTA

17. Partial accounts:

    Connect another account

18. Connected:

    Manage accounts / last updated

19. Mobile:

    Full-screen or spacious drawer flow.

20. Desktop:

    Modal / dedicated connection flow.

21. Preserve back navigation between
    account-selection steps.

22. Don't expose sensitive
    authentication information
    unnecessarily.

23. Don't store authentication
    credentials in Fermor UI state.

24. Keep connection logic separate
    from presentation components.

25. Recommended architecture:

    AccountConnectionFlow
        ↓
    ConnectionState
        ↓
    FinancialDataProvider
        ↓
    AccountStore
        ↓
    Dashboard

26. AI sits above the financial
    data layer:

    Financial data
        ↓
    AI interpretation

    Never:

    AI
      ↓
    fake financial data

📝 Design File Note

Pattern: Account Connection Flow

Category: Product Flow

Purpose: Connect and maintain external financial accounts.

AccountConnectionFlow
│
├── Account Type
├── Institution
├── Authentication
├── Connecting
└── Result
    ├── Success
    ├── Failed
    ├── Needs Attention
    └── Disconnected
Reusable components
AccountTypeCard
InstitutionPicker
InstitutionSearch
ConnectionStatus
ConnectionSuccess
ConnectionError
ReconnectPrompt
AccountConnectionCTA
States to design
Idle
Connecting
Success
Failed
Needs Attention
Disconnected
Important implementation distinction
Button
     ≠
Connection Flow

The button only starts the flow.

The flow owns the account-selection,