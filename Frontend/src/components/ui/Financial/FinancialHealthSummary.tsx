/**
 * Veyra — FinancialHealthSummary
 * Source: design_system/Patterns/Financial.md
 *         design_system/Patterns/Metric.md
 *         design_system/States/Staledata.md (07.15)
 *         design_system/States/Partial.md (07.14)
 *         design_system/States/Offline.md (07.16)
 *
 * Pattern: Financial Health Summary
 * Structure:
 *   - Score
 *   - Status Badge
 *   - Trend
 *   - Explanation
 *   - State note (stale / partial / offline)
 *
 * State variants (per the global state vocabulary):
 *   default | financial | loading | no-data | error | stale | partial | offline
 *
 * Rules:
 *   - Stale / partial / offline must KEEP the valid data visible.
 *   - Stale shows a real freshness indicator (never a faked timestamp).
 *   - Partial communicates data coverage, never pretends the picture is complete.
 *   - Offline preserves cached data and labels it as cached.
 */

import { TrendingUp, TrendingDown, Minus, AlertCircle, Info, RefreshCw, WifiOff, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";

type Variant = "default" | "financial" | "loading" | "no-data" | "error" | "stale" | "partial" | "offline";
type TrendState = "positive" | "negative" | "neutral";

interface TrendInfo {
  state: TrendState;
  value: string;
  period: string;
}

interface FinancialHealthSummaryProps {
  score?: number;
  status?: "healthy" | "at-risk" | "critical";
  trend?: TrendInfo;
  explanation?: string;
  onSeeWhy?: () => void;
  variant?: Variant;
  error?: string;
  onRetry?: () => void;
  /** ISO timestamp of the last successful update (drives the Stale freshness note). */
  lastUpdated?: string;
  /** Data coverage for the Partial state. */
  coverage?: { connected: number; total: number };
  onConnectMore?: () => void;
}

const statusConfig = {
  healthy: { badgeVariant: "success" as const, label: "Healthy" },
  "at-risk": { badgeVariant: "warning" as const, label: "At Risk" },
  critical: { badgeVariant: "error" as const, label: "Critical" },
};

const trendConfig = {
  positive: "text-[var(--color-success)]",
  negative: "text-[var(--color-error)]",
  neutral: "text-[var(--color-text-secondary)]",
};

/* Soft chip backgrounds keep semantic trends readable on the navy anchor */
const trendChipBg = {
  positive: "bg-[var(--color-success-soft)]",
  negative: "bg-[var(--color-error-soft)]",
  neutral: "bg-[var(--color-surface-2)]",
};

const TrendIcon = {
  positive: TrendingUp,
  negative: TrendingDown,
  neutral: Minus,
};

/** Human-friendly freshness from an ISO timestamp (no faked values). */
function formatFreshness(iso?: string): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  const mins = Math.round((Date.now() - then) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

/** Lightweight, non-alerting state note (stale / partial / offline). */
function StatusNote({
  tone,
  icon: Icon,
  title,
  children,
  action,
}: {
  tone: "info" | "warning";
  icon: LucideIcon;
  title: string;
  children?: React.ReactNode;
  action?: { label: string; onClick: () => void };
}) {
  const toneClasses =
    tone === "warning"
      ? "bg-[var(--color-warning-soft)] text-[var(--color-warning)]"
      : "bg-[var(--color-info-soft)] text-[var(--color-info)]";
  return (
    <div
      className={cn(
        "flex items-start gap-[var(--spacing-sm)] rounded-[var(--radius-md)] p-[var(--spacing-sm)]",
        toneClasses
      )}
    >
      <Icon size={16} strokeWidth={2} aria-hidden={true} className="mt-[2px] shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]">
          {title}
        </p>
        {children}
      </div>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          aria-label={action.label}
          className={cn(
            "shrink-0 text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
            "text-[var(--color-primary)] underline-offset-2 hover:underline",
            "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--spacing-sm)]"
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export function FinancialHealthSummary({
  score,
  status,
  trend,
  explanation,
  onSeeWhy,
  variant = "default",
  error,
  onRetry,
  lastUpdated,
  coverage,
  onConnectMore,
}: FinancialHealthSummaryProps) {
  // Loading state
  if (variant === "loading") {
    return (
      <Card className="w-full">
        <CardContent className="p-[var(--spacing-lg)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[var(--spacing-md)] animate-pulse">
            <div className="flex-1">
              <div className="h-8 w-3/4 bg-[var(--color-surface-2)] rounded mb-2" />
              <div className="h-6 w-16 bg-[var(--color-surface-2)] rounded mb-2" />
              <div className="h-4 w-24 bg-[var(--color-surface-2)] rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No data state
  if (variant === "no-data") {
    return (
      <Card className="w-full">
        <CardContent className="p-[var(--spacing-lg)]">
          <div className="flex flex-col items-center gap-[var(--spacing-sm)] text-center">
            <Info size={32} strokeWidth={2} className="text-[var(--color-text-tertiary)]" />
            <h3 className="text-[length:var(--typography-h3-size)] font-semibold text-[var(--color-text-primary)]">
              Financial health unavailable
            </h3>
            <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-[400px]">
              Connect your accounts to get a financial health score.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state (recoverable, preserves nothing because no data exists yet)
  if (variant === "error") {
    return (
      <Card className="w-full">
        <CardContent className="p-[var(--spacing-lg)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[var(--spacing-md)]">
            <div className="flex items-center gap-[var(--spacing-md)]">
              <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)]/30">
                <AlertCircle size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="text-[length:var(--typography-h3-size)] font-semibold text-[var(--color-text-primary)]">
                  Unable to load financial health
                </h3>
                <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
                  {error || "An error occurred while fetching your financial data."}
                </p>
              </div>
            </div>
            {onRetry && (
              <Button variant="ghost" size="sm" onClick={onRetry}>
                <RefreshCw size={16} strokeWidth={2} className="mr-2" />
                Try again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default state - show health score
  if (score === undefined || status === undefined) {
    return (
      <Card className="w-full">
        <CardContent className="p-[var(--spacing-lg)]">
          <div className="flex items-center gap-[var(--spacing-md)]">
            <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)]/30">
              <Info size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="text-[length:var(--typography-h3-size)] font-semibold text-[var(--color-text-primary)]">
                Financial health unavailable
              </h3>
              <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
                Connect your accounts to get a financial health score.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusData = statusConfig[status];
  const TrendIconComponent = trend ? TrendIcon[trend.state] : null;

  const freshness = formatFreshness(lastUpdated);

  const stateNote =
    variant === "stale" ? (
      <StatusNote
        tone="warning"
        icon={AlertCircle}
        title="Data may be outdated"
        action={onRetry ? { label: "Refresh", onClick: onRetry } : undefined}
      >
        {freshness && (
          <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)]">
            Last updated {freshness}.
          </p>
        )}
      </StatusNote>
    ) : variant === "partial" && coverage ? (
      <StatusNote
        tone="info"
        icon={Info}
        title={`Based on ${coverage.connected} of ${coverage.total} account types`}
        action={onConnectMore ? { label: "Connect", onClick: onConnectMore } : undefined}
      >
        <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)]">
          Connect more accounts for a complete picture.
        </p>
      </StatusNote>
    ) : variant === "offline" ? (
      <StatusNote tone="warning" icon={WifiOff} title="Offline — showing cached data">
        {freshness && (
          <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)]">
            Last updated {freshness}.
          </p>
        )}
      </StatusNote>
    ) : null;

  return (
    <Card className="w-full" surface={variant === "financial" ? "navy" : "default"} decoration="trend">
      <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-md)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[var(--spacing-md)]">
          {/* Score and Status */}
          <div className="flex items-center gap-[var(--spacing-md)]">
            <div className="text-center md:text-left">
              <div className="flex items-baseline gap-[var(--spacing-sm)]">
                <span
                  style={{
                    fontSize: "var(--typography-financial-hero-size)",
                    fontWeight: "var(--typography-financial-hero-weight)",
                    lineHeight: "var(--typography-financial-hero-line)",
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {score}
                </span>
                <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                  / 100
                </span>
              </div>

              <div className="flex items-center gap-[var(--spacing-sm)] mt-[var(--spacing-xs)]">
                <Badge variant={statusData.badgeVariant}>
                  {statusData.label}
                </Badge>
                {trend && TrendIconComponent && (
                  <div
                    className={cn(
                      "inline-flex items-center gap-[var(--spacing-2xs)] rounded-[var(--radius-full)] px-[var(--spacing-xs)] py-[var(--spacing-2xs)]",
                      trendConfig[trend.state],
                      variant === "financial" && trendChipBg[trend.state]
                    )}
                  >
                    <TrendIconComponent size={14} strokeWidth={2} aria-hidden={true} />
                    <span className="text-[length:var(--typography-caption-size)] font-medium">
                      {trend.value} {trend.period}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Explanation and CTA */}
          {explanation && (
            <div className="flex-1 min-w-0">
              <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
                {explanation}
              </p>
            </div>
          )}

          {onSeeWhy && (
            <button
              type="button"
              onClick={onSeeWhy}
              className={cn(
                "shrink-0 flex items-center gap-[var(--spacing-2xs)]",
                "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
                variant === "financial"
                  ? "text-[var(--color-surface-navy-text)]"
                  : "text-[var(--color-primary)]",
                "hover:underline underline-offset-2",
                "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--spacing-sm)]"
              )}
            >
              See why
            </button>
          )}
        </div>

        {stateNote}
      </CardContent>
    </Card>
  );
}
