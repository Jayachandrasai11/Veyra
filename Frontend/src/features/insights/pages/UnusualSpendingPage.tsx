/**
 * VEYRA — Unusual Spending Detail Page
 * Source: design_system/Patterns/Insight.md
 *
 * Pattern: Financial Insight Detail
 * Structure: Header + SpendingInsightCard + Back navigation
 *
 * Rules:
 * - Show spending observation with context
 * - Highlight areas of concern with factual language
 * - Provide actionable recommendations
 * - Support loading, default, and error states
 */

import { ArrowLeft, AlertCircle, TrendingDown, Cloud, RefreshCw } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { Badge } from "@/components/ui/Badge/Badge";
import { SectionHeader } from "@/features/home/components/SectionHeader";
import { useInsights } from "../hooks/useInsights";
import { cn } from "@/lib/cn";

export function UnusualSpendingPage() {
  const { insights, loading, error, refetch } = useInsights();

  // Find this specific insight
  const insight = insights?.find(i => i.id === "ins-2");

  // Loading state - preserve grid layout with skeletons
  if (loading || !insight) {
    return (
      <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
        <Card>
          <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-sm)]">
            <div className="flex items-center gap-[var(--spacing-sm)]">
              <div className="w-10 h-10 rounded-full bg-[var(--color-warning-soft)] animate-pulse" aria-hidden="true" />
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
          title="Spending Analysis"
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
 * Article-style card for spending insight detail view
 * Uses Veyra's calm, intelligent, trustworthy visual style
 */
function ArticleCard({ insight }: { insight: { id: string; type: string; title: string; description: string; severity: "positive" | "neutral" | "attention" | "critical" } }) {
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

  return (
    <article
      aria-labelledby={`insight-detail-${insight.id}-title`}
      className="w-full"
    >
      <Card surface="warm">
        <CardHeader>
          <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-sm)]">
            <Badge variant={severityBadge}>{insight.type}</Badge>
            {insight.severity === "attention" && (
              <AlertCircle size={16} className={severityColor} />
            )}
          </div>
          <CardTitle id={`insight-detail-${insight.id}-title`} className="text-[length:var(--typography-h2-size)] font-[var(--typography-h2-weight)] text-[var(--color-text-primary)]">
            {insight.title}
          </CardTitle>
          <CardDescription className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
            {insight.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Analysis section */}
          <section className="mb-[var(--spacing-lg)]">
            <h3 className="text-[length:var(--typography-h4-size)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
              Spending details
            </h3>
            <div className="bg-[var(--color-warning-soft)]/30 border border-[var(--color-warning)]/20 rounded-[var(--radius-md)] p-[var(--spacing-md)] mb-[var(--spacing-sm)]">
              <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-xs)]">
                <TrendingDown size={18} className="text-[var(--color-warning)]" />
                <span className="text-[length:var(--typography-body-size)] font-medium text-[var(--color-text-primary)]">
                  Entertainment Category
                </span>
              </div>
              <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
                Spending increased 35% compared to last month
              </p>
              <p className="mt-[var(--spacing-xs)] text-[length:var(--typography-body-sm-size)] text-[var(--color-text-tertiary)]">
                ₹2,840 this month vs ₹2,100 last month
              </p>
            </div>
          </section>

          {/* Recommendations section */}
          <section>
            <h3 className="text-[length:var(--typography-h4-size)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
              Recommendations
            </h3>
            <ul className="space-y-[var(--spacing-sm)] text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
              <li>Review entertainment subscriptions; identify which services provide the most value</li>
              <li>Consider setting a monthly entertainment budget with alerts when approaching limits</li>
              <li>Look for free or low-cost entertainment alternatives (community events, library resources)</li>
              <li>Track discretionary spending daily to build awareness of patterns</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </article>
  );
}