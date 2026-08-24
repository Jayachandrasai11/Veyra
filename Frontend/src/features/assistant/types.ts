/**
 * VEYRA — Ask Veyra Types
 * Source: design_system/Components/AI_components.md
 *         design_system/States/Aistates.md
 *         design_system/Interaction/Conversation.md
 */

/** Where the user opened Ask Veyra from. */
export type AskFermorEntryPoint =
  | "header"
  | "financial-health"
  | "insight"
  | "goal"
  | "metric"
  | "explore"
  | "assistant"
  | "fab";

/** Single conversation message. */
export interface FermorMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Per-message render status (streaming vs settled). */
  status: "streaming" | "complete" | "error";
  /** Marks an assistant message that asks the user to choose. */
  clarification?: boolean;
  /** Quick-reply chips shown beneath a settled assistant message. */
  suggestions?: string[];
}

/** State-machine status for the whole Ask Veyra session. */
export type AskFermorStatus =
  | "idle"
  | "thinking"
  | "streaming"
  | "complete"
  | "clarification"
  | "error"
  | "rate-limited";

/** Context passed to the assistant when opened. */
export interface AskFermorContextValue {
  entryPoint: AskFermorEntryPoint;
  /** Optional short label describing the originating item (e.g. goal name). */
  sourceLabel?: string;
}
