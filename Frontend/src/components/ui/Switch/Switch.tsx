/**
 * VEYRA — Switch
 * Source: design_system/States/Default.md
 *         design_system/technical/accessibility.md
 *
 * Accessible toggle. Uses role="switch" + aria-checked,
 * visible focus ring, Veyra tokens. No color-only state.
 */

import { cn } from "@/lib/cn";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  id,
  ...aria
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={aria["aria-label"]}
      aria-labelledby={aria["aria-labelledby"]}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex items-center shrink-0",
        "h-[24px] w-[40px] rounded-[var(--radius-full)]",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
        "focus-visible:outline-offset-[var(--focus-ring-offset)]",
        "disabled:opacity-40 disabled:pointer-events-none",
        checked ? "bg-[var(--color-primary)]" : "bg-[var(--color-surface-3)]"
      )}
    >
      <span
        className={cn(
          "absolute left-[3px]",
          "h-[18px] w-[18px] rounded-full bg-white shadow-sm",
          "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
          checked && "translate-x-[16px]"
        )}
        aria-hidden="true"
      />
    </button>
  );
}
