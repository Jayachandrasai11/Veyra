07.19.11 — AI Component Architecture
AIInterface
│
├── Header
│   ├── Fermor Mark
│   └── Close
│
├── Conversation
│   ├── UserMessage
│   └── FermorMessage
│
├── AIStatus
│   ├── Thinking
│   ├── Streaming
│   ├── Error
│   └── RateLimited
│
├── Suggestions
│
└── Composer
    ├── Input
    ├── Attachment (optional)
    └── Send
07.19.12 — Implementation Rule ⭐

Do not build separate components for every AI state.

Use one component:

AIInterface

with state-driven rendering:

state === "idle"
state === "thinking"
state === "streaming"
state === "complete"
state === "clarification"
state === "error"
state === "rate-limited"

This keeps the UI consistent.

07.19.13 — AI Visual Rules
Thinking:
subtle status animation

Streaming:
progressive text

Complete:
normal message

Clarification:
question + suggested choices

Error:
clear explanation + recovery

Rate Limited:
clear limitation + expected recovery

Avoid:

❌ Giant loading spinner
❌ "AI Loading..."
❌ Fake progress percentage
❌ Exposing internal reasoning
❌ Random animations
❌ Different layouts for every state

The overall principle is:

Fermor should feel like an intelligent financial assistant, not a generic chatbot with a spinner.