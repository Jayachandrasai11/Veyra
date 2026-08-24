/**
 * VEYRA — Settings Primitives
 * Source: design_system/Components/Seperator.md (Settings groups)
 *         design_system/Components/inputs_forms.md (accessible labels)
 *         design_system/Deisgntokens/master.md §13 (component tokens)
 *
 * Low-level, reusable building blocks for settings panels.
 * Composed into semantic section panels — never duplicated per page.
 */

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

/* ─── Separator ──────────────────────────────────────────── */
/* Hierarchy rule: spacing first, divider second (Seperator.md). */

export function Separator({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("h-px w-full bg-[var(--color-border)]", className)}
    />
  );
}

/* ─── Setting Group ──────────────────────────────────────── */

interface SettingGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingGroup({ title, description, children, className }: SettingGroupProps) {
  return (
    <section className={cn("flex flex-col gap-[var(--spacing-md)]", className)}>
      <div className="flex flex-col gap-[var(--spacing-2xs)]">
        <h3 className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]">
          {title}
        </h3>
        {description && (
          <p className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-[var(--spacing-md)]">{children}</div>
    </section>
  );
}

/* ─── Setting Row ────────────────────────────────────────── */
/* Label + control. Stacks on mobile, inline on >= sm. */

interface SettingRowProps {
  title: React.ReactNode;
  description?: string;
  htmlFor?: string;
  control: React.ReactNode;
  className?: string;
}

export function SettingRow({ title, description, htmlFor, control, className }: SettingRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--spacing-sm)] sm:flex-row sm:items-center sm:justify-between",
        "sm:gap-[var(--spacing-lg)]",
        className
      )}
    >
      <div className="flex flex-col gap-[var(--spacing-2xs)] min-w-0">
        <label
          htmlFor={htmlFor}
          className="text-[length:var(--typography-body-size)] text-[var(--color-text-primary)]"
        >
          {title}
        </label>
        {description && (
          <p
            id={htmlFor ? `${htmlFor}-description` : undefined}
            className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]"
          >
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0 sm:flex sm:items-center">{control}</div>
    </div>
  );
}

/* ─── Setting Select ─────────────────────────────────────── */
/* Native select styled with Veyra tokens. Accessible + keyboard safe. */

interface SettingSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: { value: string; label: string }[];
  state?: "default" | "error";
}

export const SettingSelect = forwardRef<HTMLSelectElement, SettingSelectProps>(
  ({ className, options, state = "default", ...props }, ref) => {
    return (
      <div className={cn("relative w-full sm:w-[260px]", className)}>
        <select
          ref={ref}
          aria-invalid={state === "error" || undefined}
          className={cn(
            "w-full appearance-none",
            "h-11 px-[var(--spacing-sm)] pr-[var(--spacing-2xl)]",
            "rounded-[var(--radius-input)]",
            "border bg-[var(--color-surface-1)]",
            "text-[length:var(--typography-body-size)] text-[var(--color-text-primary)]",
            "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
            "focus-visible:outline-none focus-visible:border-[var(--color-primary)]",
            "focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-[var(--focus-ring-color)]",
            state === "error"
              ? "border-[var(--color-error)]"
              : "border-[var(--color-border)]",
            "disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-[var(--color-surface-2)]"
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-[var(--spacing-sm)] top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-tertiary)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
);
SettingSelect.displayName = "SettingSelect";
