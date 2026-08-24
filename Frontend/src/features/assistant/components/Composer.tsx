/**
 * VEYRA — Composer
 * Source: design_system/Interaction/Conversation.md (rules 11, 35–36)
 *         design_system/States/Aistates.md
 *
 * Multi-line, auto-growing prompt with a send action.
 * Enter sends, Shift+Enter adds a newline. Disabled while
 * Veyra is thinking, streaming, or rate-limited.
 */

import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Textarea } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/cn";

export function Composer({
  value,
  onChange,
  onSend,
  disabled,
  rateLimited,
  rateLimitSeconds,
  autoFocus = false,
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
  rateLimited: boolean;
  rateLimitSeconds: number;
  autoFocus?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Auto-grow the textarea to fit content.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  // Move focus into the composer when opened.
  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSend();
    }
  };

  return (
    <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-1)] p-[var(--spacing-md)]">
      {rateLimited && (
        <p className="mb-[var(--spacing-xs)] text-[length:var(--typography-caption-size)] text-[var(--color-warning)]">
          Veyra is receiving a lot of requests. You can try again in {rateLimitSeconds}s.
        </p>
      )}
      <div
        className={cn(
          "flex items-end gap-[var(--spacing-sm)] rounded-[var(--radius-lg)]",
          "border border-[var(--color-border)] bg-[var(--color-surface-1)]",
          "px-[var(--spacing-sm)] py-[var(--spacing-2xs)]",
          "focus-within:border-[var(--color-primary)] focus-within:ring-[var(--focus-ring-width)] focus-within:ring-[var(--focus-ring-color)]"
        )}
      >
        <Textarea
          ref={ref}
          rows={1}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Ask Veyra a question"
          placeholder="Ask anything about your finances…"
          className="min-h-[40px] border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 bg-transparent p-[var(--spacing-xs)] resize-none"
        />
        <Button
          variant="ai"
          size="icon"
          aria-label="Send message"
          disabled={disabled || !value.trim()}
          onClick={onSend}
          className="mb-[2px] shrink-0"
        >
          <ArrowUp size={18} strokeWidth={2} aria-hidden={true} />
        </Button>
      </div>
    </div>
  );
}
