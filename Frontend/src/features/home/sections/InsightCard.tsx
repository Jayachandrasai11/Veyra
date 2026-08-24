/**
 * VEYRA — InsightCard
 * Source: design_system/Architecture/Section4.md
 *
 * Pattern: Financial Insight Feed
 * Structure: Type/Category + Title + Value + Description + Severity + Action
 *
 * Rules:
 * - Card padding: 20px
 * - Card radius: LG radius
 * - Card border: 1px
 * - Desktop: 2 columns, Tablet: 2 columns, Mobile: 1 column
 * - Grid gap: 16px
 * - Severity: positive (--success), neutral (--text-secondary), attention (--warning), critical (--error)
 * - Action: Arrow Link
 */

import {
  ArrowRight,
  Minus,
  AlertTriangle,
  Flame,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";

type Severity = "positive" | "neutral" | "attention" | "critical";

interface InsightCardProps {
  id: string;
  type: string;
  title: string;
  value?: string;
  description: string;
  severity: Severity;
  action?: {
    label: string;
    href: string;
  };
  /** Lead insight in a feed — same anatomy, stronger hierarchy. */
  featured?: boolean;
  className?: string;
}

const severityBadgeVariant: Record<Severity, "success" | "neutral" | "warning" | "error"> = {
  positive: "success",
  neutral: "neutral",
  attention: "warning",
  critical: "error",
};

const severityColors: Record<Severity, string> = {
  positive: "var(--color-success)",
  neutral: "var(--color-text-secondary)",
  attention: "var(--color-warning)",
  critical: "var(--color-error)",
};

/* Severity-tinted icon chip — same header language as every dashboard card */
const severityChips: Record<
  Severity,
  { icon: React.ComponentType<{ size: number; strokeWidth: number; "aria-hidden": boolean }>; bg: string }
> = {
  positive: { icon: TrendingUp, bg: "var(--color-success-soft)" },
  neutral: { icon: Minus, bg: "var(--color-surface-slate)" },
  attention: { icon: AlertTriangle, bg: "#FFF4E0" },
  critical: { icon: Flame, bg: "var(--color-error-soft)" },
};

export function InsightCard({
  id,
  type,
  title,
  value,
  description,
  severity,
  action,
  featured = false,
  className,
}: InsightCardProps) {
  const severityChip = severityChips[severity];
  const ChipIcon = severityChip.icon;

  return (
    <article
      aria-labelledby={`insight-${id}-title`}
      className={cn("h-full", className)}
    >
      <Card
        className={cn("h-full", !!action && "card-hover")}
        surface={
          featured
            ? severity === "attention" || severity === "critical"
              ? "warm"
              : "sky"
            : "blue"
        }
        decoration={featured ? "trend" : undefined}
        interactive={!!action}
      >
        <CardContent
          className={cn(
            "p-[var(--spacing-md)] md:p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-sm)] h-full",
            featured && "md:flex-row md:items-end md:justify-between md:gap-[var(--spacing-lg)]"
          )}
        >
          <div className="flex flex-col gap-[var(--spacing-sm)] min-w-0 flex-1">
            <div className="flex items-center justify-between gap-[var(--spacing-sm)]">
              <div className="flex items-center gap-[var(--spacing-sm)] min-w-0">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: severityChip.bg, color: severityColors[severity] }}
                  aria-hidden="true"
                >
                  <ChipIcon size={15} strokeWidth={2.5} aria-hidden={true} />
                </span>
                <span className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)] truncate">
                  {type}
                </span>
              </div>
              <Badge variant={severityBadgeVariant[severity]}>{severity}</Badge>
            </div>

            <h3
              id={`insight-${id}-title`}
              className={cn(
                featured
                  ? "text-[length:var(--typography-h2-size)] font-[var(--typography-h2-weight)] leading-[var(--typography-h2-line)] tracking-[var(--typography-h2-tracking)]"
                  : "text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] tracking-[var(--typography-h3-tracking)]",
                "text-[var(--color-text-primary)]"
              )}
            >
              {title}
            </h3>

            {value && (
              <span
                style={{
                  fontSize: featured
                    ? "var(--typography-financial-hero-size)"
                    : "var(--typography-financial-size)",
                  fontWeight: featured
                    ? "var(--typography-financial-hero-weight)"
                    : "var(--typography-financial-weight)",
                  lineHeight: "var(--typography-financial-line)",
                  fontVariantNumeric: "tabular-nums",
                  color: severityColors[severity],
                }}
                aria-label={`Value: ${value}`}
              >
                {value}
              </span>
            )}

            <p className="flex-1 text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
              {description}
            </p>
          </div>

          {action && (
            <a
              href={action.href}
              className={cn(
                "inline-flex items-center gap-[var(--spacing-2xs)] shrink-0",
                featured ? "md:mb-[var(--spacing-2xs)]" : "mt-auto",
                "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
                "text-[var(--color-primary)]",
                "hover:underline underline-offset-2",
                "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                "focus-visible:outline-offset-[var(--focus-ring-offset)]"
              )}
            >
              {action.label}
              <ArrowRight size={14} strokeWidth={2} aria-hidden={true} />
            </a>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
