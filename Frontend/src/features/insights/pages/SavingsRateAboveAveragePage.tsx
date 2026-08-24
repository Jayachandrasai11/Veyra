/**
 * VEYRA — Savings Rate Above Average Detail Page
 * Source: design_system/Patterns/Insight.md
 *
 * Pattern: Financial Insight Detail
 * Structure: Header + FinancialHealthSummary + Back navigation
 *
 * Rules:
 * - Explain the insight using factual language
 * - Show context and recommendations
 * - Support loading, default, and error states
 * - Use existing Veyra components and patterns
 */

import { ArrowLeft, Check, TrendingUp, Cloud, RefreshCw, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { Badge } from "@/components/ui/Badge/Badge";
import { SectionHeader } from "@/features/home/components/SectionHeader";
import { useInsights } from "../hooks/useInsights";
import { useAskFermor } from "@/features/assistant/AskFermorContext";
import { cn } from "@/lib/cn";

export function SavingsRateAboveAveragePage() {
  const { insights, loading, error, refetch } = useInsights();

  // Find this specific insight
  const insight = insights?.find(i => i.id === "ins-1");

// Loading state - preserve grid layout with skeletons
  if (loading || !insight) {
    return (
      <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
        <Card>
          <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-sm)]">
            <div className="flex items-center gap-[var(--spacing-sm)]">
              <div className="w-10 h-10 rounded-full bg-[var(--color-success-soft)] animate-pulse" aria-hidden="true" />
              <div className="flex-1">
                <div className="h-5 w-32 bg-[var(--color-surface-2)] rounded animate-pulse" />
                <div className="mt-2 h-4 w-48 bg-[var(--color-surface-2)] rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-8 w-24 bg-[var(--color-surface-2)] rounded animate-pulse" />
              <div className="h-4 w-full bg-[var(--color-surface-2)] rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-[var(--color-surface-2)] rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
        <SectionHeader
          title="Savings Rate Analysis"
          description="Unable to load insight details"
        />
        <Card>
          <CardContent className="p-[var(--spacing-lg)] text-center">
            <Cloud size={48} strokeWidth={2} className="text-[var(--color-text-tertiary)] mx-auto mb-[var(--spacing-md)]" />
            <h3 className="text-[length:var(--typography-h3-size)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
              Couldn't load insight
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-[var(--spacing-md)]">
              {error}
            </p>
            <Button onClick={refetch}>
              <RefreshCw size={16} strokeWidth={2} className="mr-2" />
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default state - show insight details
  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
      {/* Back navigation */}
      <div>
        <Link
          to="/insights"
          className={cn(
            "inline-flex items-center gap-[var(--spacing-2xs)]",
            "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
            "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)]",
            "focus-visible:outline-offset-[var(--spacing-sm)]"
          )}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          <span>Back to Insights</span>
        </Link>
      </div>

      <ArticleCard insight={insight} />
    </div>
  );
}

/**
 * Article-style card for insight detail view
 * Uses Veyra's calm, intelligent, trustworthy visual style
 */
function ArticleCard({ insight }: { insight: { id: string; type: string; title: string; value?: string; description: string; severity: "positive" | "neutral" | "attention" | "critical" } }) {
  const severityColor = {
    positive: "text-[var(--color-success)]",
    neutral: "text-[var(--color-text-secondary)]",
    attention: "text-[var(--color-warning)]",
    critical: "text-[var(--color-error)]",
  }[insight.severity];

  const severityBadge = {
    positive: "success",
    neutral: "neutral",
    attention: "warning",
    critical: "error",
  }[insight.severity] as "success" | "neutral" | "warning" | "error";

  const { openAskFermor } = useAskFermor();

  return (
    <article
      aria-labelledby={`insight-detail-${insight.id}-title`}
      className="w-full"
    >
      <Card surface="green">
        <CardHeader>
          <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-sm)]">
            <Badge variant={severityBadge}>{insight.type}</Badge>
            {insight.severity === "positive" && <Check size={16} className={severityColor} />}
          </div>
          <CardTitle id={`insight-detail-${insight.id}-title`} className="text-[length:var(--typography-h2-size)] font-[var(--typography-h2-weight)] text-[var(--color-text-primary)]">
            {insight.title}
          </CardTitle>
          {insight.value && (
            <span
              style={{
                fontSize: "var(--typography-financial-size)",
                fontWeight: "var(--typography-financial-weight)",
                lineHeight: "var(--typography-financial-line)",
                fontVariantNumeric: "tabular-nums",
                color: severityColor,
              }}
              aria-label={`Value: ${insight.value}`}
            >
              {insight.value}
            </span>
          )}
        </CardHeader>

        <CardContent>
          <CardDescription className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] mb-[var(--spacing-lg)]">
            {insight.description}
          </CardDescription>

          {/* Analysis section */}
          <section className="mb-[var(--spacing-lg)]">
            <h3 className="text-[length:var(--typography-h4-size)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
              Why this matters
            </h3>
            <ul className="space-y-[var(--spacing-sm)] text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-[var(--spacing-sm)]">
                <TrendingUp size={16} className="text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                <span>A savings rate of 42.6% positions you strongly for long-term financial goals and early retirement planning.</span>
              </li>
              <li className="flex items-start gap-[var(--spacing-sm)]">
                <Check size={16} className="text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                <span>You're exceeding the widely recommended 20% savings rate benchmark by 112%.</span>
              </li>
            </ul>
          </section>

          {/* Recommendations section */}
          <section>
            <h3 className="text-[length:var(--typography-h4-size)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
              Recommendations
            </h3>
            <ul className="space-y-[var(--spacing-sm)] text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
              <li>Maintain this exceptional savings discipline across life changes</li>
              <li>Consider directing excess savings toward investment vehicles for growth</li>
              <li>Review budget categories to understand which areas enable high savings</li>
            </ul>
          </section>

          <div className="mt-[var(--spacing-lg)]">
            <Button
              variant="ai"
              size="sm"
              onClick={() => openAskFermor({ entryPoint: "insight", sourceLabel: insight.title })}
            >
              <Sparkles size={16} strokeWidth={2} aria-hidden={true} />
              Ask Veyra
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}