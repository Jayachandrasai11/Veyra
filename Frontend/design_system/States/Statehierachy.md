State Hierarchy vs State Types

Keep these separate:

DATA STATE
├── Default
├── Loading
├── Empty
├── Partial
├── Stale
├── Error
└── Offline

ACCOUNT STATE
├── Connected
├── Connecting
├── Needs attention
├── Disconnected
├── Permission denied
└── Reconnecting

AI STATE
├── Idle
├── Thinking
├── Streaming
├── Complete
├── Needs clarification
├── Error
└── Rate limited

Then define which states have display priority.

This gives your coding AI a deterministic rule:

Never invent a visual state. Resolve the applicable state first, then render the corresponding component variant.