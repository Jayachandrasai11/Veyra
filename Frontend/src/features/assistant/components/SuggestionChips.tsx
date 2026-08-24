/**
 * VEYRA — Suggestion Chips
 * Source: design_system/Interaction/Conversation.md (rules 8–10, 31)
 *         design_system/States/Aistates.md
 *
 * Quick-reply chips beneath assistant messages. Used for
 * follow-ups, clarification choices, and error recovery.
 * Clicking a chip submits it directly.
 */

import { cn } from "@/lib/cn";

export function SuggestionChips({
  suggestions,
  onSelect,
  tone = "followup",
}: {
  suggestions?: string[];
  onSelect: (text: string) => void;
  tone?: "followup" | "clarification" | "error";
}) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-[var(--spacing-xs)] pl-9">
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSelect(s)}
          className={cn(
            "inline-flex items-center rounded-[var(--radius-full)] px-[var(--spacing-md)] py-[var(--spacing-2xs)]",
            "border text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
            "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
            "focus-visible:outline-offset-[var(--focus-ring-offset)]",
            tone === "error"
              ? "border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error-soft)]"
              : "border-[var(--color-border)] text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]"
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
