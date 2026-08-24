/**
 * VEYRA — SectionHeader
 * Source: design_system/Architecture/ (used across all sections)
 *
 * Pattern: Dashboard Section Header
 * Structure: Title + optional Description + optional Action
 *
 * Rules:
 * - Title: H2 typography (product section-heading scale)
 * - Description: body small, secondary color
 * - Optional action slot (Arrow Link pattern)
 * - Main Content controls spacing outside
 */

import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function SectionHeader({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-[var(--spacing-md)]",
        className
      )}
    >
      <div className="flex flex-col gap-[var(--spacing-2xs)]">
        <h2
          className={cn(
            // Medium-bumped section heading (was typography-h2 24px)
            "text-[26px] md:text-[28px]",
            "font-[var(--typography-h2-weight)]",
            "leading-[1.15] tracking-[-0.02em]",
            "text-[var(--color-text-primary)]"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-[length:var(--typography-body-sm-size)]",
              "text-[var(--color-text-secondary)]"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && (
        <a
          href={action.href}
          className={cn(
            "shrink-0 flex items-center gap-[var(--spacing-2xs)]",
            "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
            "text-[var(--color-primary)]",
            "hover:underline underline-offset-2",
            "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
            "focus-visible:outline-offset-[var(--focus-ring-offset)]",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
          )}
        >
          {action.label}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </div>
  );
}
