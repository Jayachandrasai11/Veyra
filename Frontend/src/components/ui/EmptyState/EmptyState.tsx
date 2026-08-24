/**
 * VEYRA — EmptyState
 * Source: design_system/Components/Empty.md
 *
 * Global empty state pattern.
 * All sections use this when data is unavailable.
 *
 * Structure: Icon → Title → Description → CTA (optional)
 */

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button/Button";
import { FinancialPattern } from "@/components/visuals";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center text-center overflow-hidden",
        "gap-[var(--spacing-sm)]",
        "py-[var(--spacing-3xl)] px-[var(--spacing-lg)]",
        className
      )}
    >
      {/* Subtle financial motif behind empty state — decorative only */}
      <FinancialPattern
        variant="grid"
        tone="blue"
        intensity="low"
        className="pointer-events-none absolute inset-0"
      />
      <div className="relative z-10 flex flex-col items-center text-center gap-[var(--spacing-sm)]">
      <div
        className="flex items-center justify-center rounded-[var(--radius-lg)]"
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "var(--color-surface-2)",
        }}
        aria-hidden="true"
      >
        <Icon
          size={24}
          strokeWidth={2}
          color="var(--color-text-tertiary)"
        />
      </div>

      <div className="flex flex-col gap-[var(--spacing-2xs)]">
        <p
          className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]"
        >
          {title}
        </p>
        <p
          className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)] max-w-[280px]"
        >
          {description}
        </p>
      </div>

      {action && (
        <Button variant="primary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
      </div>
    </div>
  );
}
