/**
 * VEYRA — Thinking Indicator
 * Source: design_system/States/Aistates.md
 *         design_system/States/Processing.md
 *
 * Calm, subtle "Fermor is thinking" status. No giant spinner,
 * no fake progress percentage.
 */

import { Sparkles } from "lucide-react";

export function ThinkingIndicator() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-[var(--spacing-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)]"
    >
      <span
        className="flex items-center justify-center w-7 h-7 rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] shrink-0"
        aria-hidden="true"
      >
        <Sparkles size={16} strokeWidth={2} className="text-[var(--color-accent)]" />
      </span>
      <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
        Veyra is thinking
      </span>
      <span className="flex items-center gap-[3px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse"
            style={{ animationDelay: `${i * 160}ms` }}
          />
        ))}
      </span>
    </div>
  );
}
