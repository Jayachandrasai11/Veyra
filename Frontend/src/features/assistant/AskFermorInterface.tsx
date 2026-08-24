/**
 * VEYRA — Ask Veyra Interface (AIInterface)
 * Source: design_system/Components/AI_components.md
 *         design_system/States/Aistates.md
 *         design_system/Interaction/Conversation.md
 *
 * One component, state-driven rendering (per Aistates rule):
 *   idle · thinking · streaming · complete · clarification · error · rate-limited
 *
 * Composition:
 *   Header (Fermor mark + context + close)
 *   Conversation (messages, thinking, rate-limit note, initial suggestions)
 *   Composer (prompt + send)
 *
 * The session hook owns conversation, streaming and state.
 * This component owns presentation and accessibility wiring.
 */

import { useEffect, useRef } from "react";
import { Sparkles, X } from "lucide-react";
import { useAskFermorSession } from "./useAskFermorSession";
import type { AskFermorContextValue, AskFermorEntryPoint } from "./types";
import { ThinkingIndicator } from "./components/ThinkingIndicator";
import { MessageBubble } from "./components/MessageBubble";
import { SuggestionChips } from "./components/SuggestionChips";
import { Composer } from "./components/Composer";
import { cn } from "@/lib/cn";

const CONTEXT_LABEL: Record<AskFermorEntryPoint, string> = {
  header: "General Veyra",
  "financial-health": "Financial Health",
  insight: "Insight",
  goal: "Goal",
  metric: "Metric",
  explore: "Explore",
  assistant: "Veyra",
  fab: "Veyra",
};

export function AskFermorInterface({
  context,
  onClose,
  autoFocus = false,
}: {
  context: AskFermorContextValue;
  onClose?: () => void;
  autoFocus?: boolean;
}) {
  const session = useAskFermorSession(context);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, status, send, retry, initialSuggestions } = session;

  // Keep the conversation scrolled to the latest content.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const contextLabel = CONTEXT_LABEL[context.entryPoint];

  const handleSelect = (text: string) => {
    if (text === "Try again") retry();
    else send(text);
  };

  const streamingId =
    status === "streaming"
      ? messages[messages.length - 1]?.id
      : undefined;

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface-lavender)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-[var(--spacing-sm)] px-[var(--spacing-lg)] py-[var(--spacing-md)] border-b border-[var(--color-border)] shrink-0">
        <div className="flex items-center gap-[var(--spacing-sm)] min-w-0">
          <span
            className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] shrink-0"
            aria-hidden="true"
          >
            <Sparkles size={18} strokeWidth={2} className="text-[var(--color-accent)]" />
          </span>
          <div className="min-w-0">
            <p className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)] leading-tight">
              Ask Veyra
            </p>
            <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)] truncate">
              {context.sourceLabel ? `${contextLabel} · ${context.sourceLabel}` : contextLabel}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Ask Veyra"
            className={cn(
              "shrink-0 rounded-[var(--radius-md)] p-[var(--spacing-xs)]",
              "text-[var(--color-text-secondary)]",
              "hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]",
              "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
              "focus-visible:outline-offset-[var(--focus-ring-offset)]",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
            )}
          >
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Conversation */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Conversation with Fermor"
        className="flex-1 overflow-y-auto flex flex-col gap-[var(--spacing-md)] px-[var(--spacing-lg)] py-[var(--spacing-lg)]"
      >
        {messages.length === 0 && status === "idle" && (
          <div className="flex flex-col gap-[var(--spacing-md)]">
            <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
              How can I help with your finances?
            </p>
            <SuggestionChips suggestions={initialSuggestions} onSelect={send} />
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className="flex flex-col gap-[var(--spacing-2xs)]">
            <MessageBubble message={m} isStreaming={m.id === streamingId} />
            {m.role === "assistant" && m.suggestions && m.status !== "streaming" && (
              <SuggestionChips
                suggestions={m.suggestions}
                onSelect={handleSelect}
                tone={m.status === "error" ? "error" : m.clarification ? "clarification" : "followup"}
              />
            )}
          </div>
        ))}

        {status === "thinking" && <ThinkingIndicator />}

        {status === "rate-limited" && (
          <div
            role="status"
            className="mx-auto text-center text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)] px-[var(--spacing-md)] py-[var(--spacing-sm)]"
          >
            Veyra is receiving a lot of requests. You can continue in a moment.
          </div>
        )}
      </div>

      {/* Composer */}
      <Composer
        value={session.input}
        onChange={session.setInput}
        onSend={() => send(session.input)}
        disabled={status === "thinking" || status === "streaming" || status === "rate-limited"}
        rateLimited={status === "rate-limited"}
        rateLimitSeconds={session.rateLimitSeconds}
        autoFocus={autoFocus}
      />
    </div>
  );
}
