/**
 * VEYRA — Progress
 * Source: design_system/Components/Progressions.md
 *         design_system/Architecture/section5.md
 *
 * Rules:
 * - Height: 8px (spec-exact from section5.md)
 * - Track: --color-surface-2
 * - Fill: --color-primary
 * - Value is clamped 0–100 visually
 * - Label must always be available as text (aria)
 * - Never communicate progress by bar alone
 */

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { clamp } from "@/lib/format";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value 0–100 */
  value: number;
  /** Max value (default 100) */
  max?: number;
  /** Visible label for accessibility (required) */
  label: string;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, label, ...props }, ref) => {
    const pct = clamp((value / max) * 100, 0, 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={cn("w-full", className)}
        {...props}
      >
        {/* Track */}
        <div
          className="relative w-full overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-surface-2)]"
          style={{ height: "8px" }}
        >
          {/* Fill */}
          <div
            className="h-full rounded-[var(--radius-full)] bg-[var(--color-primary)] transition-[width] duration-[var(--duration-emphasis)] ease-[var(--ease-fast)]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
