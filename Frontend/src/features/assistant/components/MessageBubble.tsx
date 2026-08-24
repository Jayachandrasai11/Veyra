/**
 * VEYRA — Message Bubble
 * Source: design_system/Components/AI_components.md
 *         design_system/States/Aistates.md
 *
 * User vs Veyra message styling. Veyra messages use the
 * accent-tinted surface; error messages use the error surface.
 * Streaming shows a calm caret at the end of the text.
 */

import { Sparkles, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";
import type { FermorMessage } from "../types";

export function MessageBubble({
  message,
  isStreaming,
}: {
  message: FermorMessage;
  isStreaming: boolean;
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-[var(--radius-lg)] rounded-br-[var(--radius-xs)] bg-[var(--color-primary)] text-white px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)]">
          {message.content}
        </div>
      </div>
    );
  }

  const isError = message.status === "error";

  return (
    <div className="flex items-start gap-[var(--spacing-sm)]">
      <span
        className={cn(
          "flex items-center justify-center w-7 h-7 rounded-[var(--radius-md)] shrink-0 mt-[2px]",
          isError ? "bg-[var(--color-error-soft)]" : "bg-[var(--color-accent-soft)]"
        )}
        aria-hidden="true"
      >
        {isError ? (
          <AlertTriangle size={16} strokeWidth={2} className="text-[var(--color-error)]" />
        ) : (
          <Sparkles size={16} strokeWidth={2} className="text-[var(--color-accent)]" />
        )}
      </span>
      <div
        className={cn(
          "max-w-[85%] rounded-[var(--radius-lg)] rounded-tl-[var(--radius-xs)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)]",
          isError
            ? "bg-[var(--color-error-soft)] text-[var(--color-error)]"
            : "bg-[var(--color-surface-lavender)] text-[var(--color-text-primary)]"
        )}
      >
        {message.content}
        {isStreaming && (
          <span
            className="ml-[1px] inline-block w-[2px] h-[1em] align-middle bg-[var(--color-accent)] animate-pulse"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
