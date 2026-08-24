```
# Fermor — AI Technical Rules
```

\## Interface

The primary user-facing AI interaction is:

Ask Fermor

\## AI UI States

Idle

Thinking

Streaming

Complete

Needs clarification

Error

Rate limited

\## AI UI

Use the approved AI UI patterns.

Do not create a separate chat visual language.

AI interface must inherit Fermor:

\- typography

\- spacing

\- colors

\- radius

\- buttons

\- inputs

\- focus states

\## Streaming

Streaming responses should render progressively.

Display an appropriate processing state while waiting.

\## Errors

Never expose raw API/provider errors.

Translate technical failures into user-facing Fermor language.

\## AI Data

The AI must not invent financial data.

The interface must communicate data limitations.

\## Architecture

The exact AI provider/model is a technical implementation decision.

Do not hard-code a provider into reusable UI components.
