/**
 * VEYRA — FinancialMetric
 * Source: design_system/Components/metric.md
 *         design_system/Architecture/section3.md
 *
 * Reusable single metric display. Composes into MetricsGrid.
 *
 * Structure:  Label → Value + Unit → Trend → Supporting Text
 * Variants:   default | compact | featured
 * Trend:      positive | negative | neutral (semantic — not color-only)
 *
 * Rules:
 * - Use Financial Number typography token
 * - Do not add decorative icons or sparklines by default
 * - Trend must communicate direction + value + period
 * - Accessible without color (trend uses icon + text)
 */

import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

type TrendState = "positive" | "negative" | "neutral";

export interface FinancialMetricProps {
  label: string;
  value: string;
  unit?: string;
  trend?: {
    state: TrendState;
    value: string;
    period: string;
  };
  supportingText?: string;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const trendConfig: Record<TrendState, {
  color: string;
  icon: React.ComponentType<{ size: number; strokeWidth: number; "aria-hidden": boolean }>;
  label: string;
}> = {
  positive: {
    color: "var(--color-success)",
    icon: ArrowUpRight,
    label: "up",
  },
  negative: {
    color: "var(--color-error)",
    icon: ArrowDownRight,
    label: "down",
  },
  neutral: {
    color: "var(--color-text-tertiary)",
    icon: Minus,
    label: "unchanged",
  },
};

export function FinancialMetric({
  label,
  value,
  unit,
  trend,
  supportingText,
  variant = "default",
  className,
}: FinancialMetricProps) {
  const valueSize =
    variant === "featured"
      ? "var(--typography-financial-hero-size)"
      : variant === "compact"
      ? "var(--app-financial-compact-size)"
      : "var(--app-financial-primary-size)";

  const valueWeight =
    variant === "featured"
      ? "var(--typography-financial-hero-weight)"
      : "var(--app-financial-primary-weight)";

  return (
    <div className={cn("flex flex-col gap-[var(--spacing-2xs)]", className)}>
      {/* Label — 14px / label weight */}
      <p
        className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-secondary)]"
        aria-label={label}
      >
        {label}
      </p>

      {/* Value row */}
      <div className="flex items-baseline gap-[var(--spacing-2xs)]">
        <span
          style={{
            fontSize: valueSize,
            fontWeight: valueWeight,
            lineHeight:
              variant === "featured"
                ? "var(--typography-financial-hero-line)"
                : variant === "compact"
                ? "var(--app-financial-compact-line)"
                : "var(--app-financial-primary-line)",
            letterSpacing:
              variant === "featured"
                ? "var(--typography-financial-hero-tracking)"
                : "var(--app-financial-primary-tracking)",
            fontVariantNumeric: "tabular-nums",
            color: "var(--color-text-primary)",
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]"
          >
            {unit}
          </span>
        )}
      </div>

      {/* Trend — direction + value + period */}
      {trend && (
        <TrendIndicator trend={trend} />
      )}

      {/* Supporting text */}
      {supportingText && (
        <p
          className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]"
        >
          {supportingText}
        </p>
      )}
    </div>
  );
}

function TrendIndicator({
  trend,
}: {
  trend: NonNullable<FinancialMetricProps["trend"]>;
}) {
  const { color, icon: Icon, label } = trendConfig[trend.state];

  return (
    <div
      className="flex items-center gap-[4px] text-[length:var(--typography-caption-size)]"
      style={{ color }}
    >
      <Icon size={14} strokeWidth={2} aria-hidden={true} />
      {/* Accessible text: e.g. "up 6.2% this month" */}
      <span>
        <span className="sr-only">{label} </span>
        {trend.value}
        <span className="text-[var(--color-text-tertiary)] ml-[4px]">
          {trend.period}
        </span>
      </span>
    </div>
  );
}
