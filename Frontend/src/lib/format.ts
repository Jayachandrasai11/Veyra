/**
 * VEYRA — Financial Formatting Utilities
 * Shared helpers for all financial value display.
 * Never hardcode formats inside components.
 */

/** Format a number as Indian Rupee currency */
export function formatCurrency(
  value: number,
  options?: { compact?: boolean; decimals?: number }
): string {
  const { compact = true, decimals = 1 } = options ?? {};

  if (compact) {
    if (value >= 10_000_000) {
      return `₹${(value / 10_000_000).toFixed(decimals)}Cr`;
    }
    if (value >= 100_000) {
      return `₹${(value / 100_000).toFixed(decimals)}L`;
    }
    if (value >= 1_000) {
      return `₹${(value / 1_000).toFixed(decimals)}K`;
    }
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Format a number as a percentage string */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/** Format a number using exact Indian grouping (e.g. ₹12,00,000). */
export function formatRupees(value: number, decimals = 0): string {
  const safe = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(safe);
}

/** Format a year fraction as a human duration (e.g. "8 yr 4 mo"). */
export function formatDuration(yearsDecimal: number): string {
  const totalMonths = Math.max(0, Math.round(yearsDecimal * 12));
  const yr = Math.floor(totalMonths / 12);
  const mo = totalMonths % 12;
  if (yr === 0) return `${mo} mo`;
  if (mo === 0) return `${yr} yr`;
  return `${yr} yr ${mo} mo`;
}

/** Format a decimal fraction (0–1) as a percentage */
export function formatFraction(fraction: number, decimals = 1): string {
  return formatPercent(fraction * 100, decimals);
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Return greeting based on hour of day */
export function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
