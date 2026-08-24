7.18.10 — Important UX Rules
RULE 01
Preserve account identity throughout the entire flow.

RULE 02
Never replace the account with a generic loading screen.

RULE 03
Disable duplicate reconnect actions while processing.

RULE 04
Keep previously synchronized data visible.

RULE 05
Clearly distinguish:
Connecting
Authenticating
Syncing

RULE 06
After successful authorization, explicitly confirm success.

RULE 07
If synchronization fails, don't mark the account as fully connected.

RULE 08
Provide a retry/recovery action after failure.
07.18.11 — Implementation Specification
ReconnectingAccount

Account identity:
institution logo
institution name
optional account nickname
optional masked account identifier

States:
needs-attention
connecting
authenticating
syncing
success
failed

Actions:
reconnect
continue authentication
retry

During processing:
disable duplicate actions
preserve existing account data
show progress/status

Success:
update connection status
refresh financial data
show confirmation

Failure:
preserve previous data
show error explanation
provide retry
return account to needs-attention
Key rule for the coding AI
Do not create a separate visual design
for every reconnect state.

Use one AccountConnection component
whose visual content changes according
to its state.

So the component remains:

AccountConnection
├── AccountIdentity
├── Status
├── Progress
└── Action