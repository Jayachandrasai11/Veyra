/**
 * Fermor/Veyra — AccountTypeCard
 *
 * Onboarding selection card: circular tinted icon chip, cobalt
 * selection ring with a check badge, and shared hover physics.
 */

import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AccountType } from "../types";

interface AccountTypeCardProps {
  type: AccountType;
  name: string;
  icon: React.ComponentType<{ size: number; strokeWidth: number; "aria-hidden": boolean; className?: string }>;
  description: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AccountTypeCard({
  type,
  name,
  icon: Icon,
  description,
  selected = false,
  onClick,
  className,
}: AccountTypeCardProps) {
  // type is passed for analytics/tracking purposes
  void type;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={name}
      className={cn(
        "group relative flex w-full items-start gap-[var(--spacing-md)] p-[var(--spacing-lg)] text-left",
        "rounded-[var(--radius-lg)] border card-hover",
        selected
          ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/25 bg-[var(--color-primary-soft)]/40"
          : "border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-primary)]",
        "cursor-pointer",
        "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
        "focus-visible:outline-offset-[var(--focus-ring-offset)]",
        className
      )}
    >
      {/* Icon chip */}
      <span
        className={cn(
          "flex items-center justify-center rounded-full h-12 w-12 shrink-0 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
          selected ? "bg-[var(--color-primary)]" : "bg-[var(--color-primary-soft)]"
        )}
        aria-hidden="true"
      >
        <Icon
          size={20}
          strokeWidth={2}
          aria-hidden={true}
          className={selected ? "text-white" : "text-[var(--color-primary)]"}
        />
      </span>

      {/* Copy */}
      <div className="flex-1 min-w-0">
        <span
          className={cn(
            "block text-[length:var(--typography-label-size)] font-semibold",
            selected ? "text-[var(--color-primary-hover)]" : "text-[var(--color-text-primary)]"
          )}
        >
          {name}
        </span>
        <p className="text-[length:var(--typography-body-sm-size)] leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>
      </div>

      {/* Selection affordances */}
      {selected ? (
        <span
          aria-hidden="true"
          className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white"
        >
          <Check size={14} strokeWidth={3} />
        </span>
      ) : (
        <ArrowRight
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className="shrink-0 self-center text-[var(--color-text-tertiary)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
        />
      )}
    </button>
  );
}
