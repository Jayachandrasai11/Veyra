/**
 * VEYRA — Investment Opportunity Detail Page
 * Source: design_system/Patterns/Insight.md
 *
 * Pattern: Financial Insight Detail
 * Structure: Header + InvestmentOpportunityCard + Back navigation
 *
 * Rules:
 * - Present investment opportunity with context
 * - Show projected impact
 * - Provide actionable next steps
 * - Support loading, default, and error states
 */

import { ArrowLeft, Check, Cloud, RefreshCw, BarChart3 } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { Badge } from "@/components/ui/Badge/Badge";
import { SectionHeader } from "@/features/home/components/SectionHeader";
import { useInsights } from "../hooks/useInsights";
import { cn } from "@/lib/cn";

export function InvestmentOpportunityPage() {
  const { insights, loading, error, refetch } = useInsights();

  // Find this specific insight
  const insight = insights?.find(i => i.id === "ins-3");

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
          title="Investment Opportunity"
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
 * Article-style card for investment opportunity detail view
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

  return (
    <article
      aria-labelledby={`insight-detail-${insight.id}-title`}
      className="w-full"
    >
      <Card surface="blue">
        <CardHeader>
          <div className="flex items-center gap-[var(--spacing-sm)] mb-[var(--spacing-sm)]">
            <Badge variant={severityBadge}>{insight.type}</Badge>
            {insight.severity === "positive" && <Check size={16} className={severityColor} />}
          </div>
          <CardTitle id={`insight-detail-${insight.id}-title`} className="text-[length:var(--typography-h2-size)] font-[var(--typography-h2-weight)] text-[var(--color-text-primary)]">
            {insight.title}
          </CardTitle>
          {insight.value && (
            <div className="mt-[var(--spacing-xs)] flex items-baseline gap-[var(--spacing-xs)]">
              <span
                style={{
                  fontSize: "var(--typography-financial-size)",
                  fontWeight: "var(--typography-financial-weight)",
                  lineHeight: "var(--typography-financial-line)",
                  fontVariantNumeric: "tabular-nums",
                  color: severityColor,
                }}
                aria-label={`Opportunity value: ${insight.value}`}
              >
                {insight.value}
              </span>
              <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                bond allocation enhancement
              </span>
            </div>
          )}
          <CardDescription className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] mt-[var(--spacing-sm)]">
            {insight.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Analysis section */}
          <section className="mb-[var(--spacing-lg)]">
            <h3 className="text-[length:var(--typography-h4-size)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
              Risk profile alignment
            </h3>
            <div className="space-y-[var(--spacing-sm)] text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
              <p>
                Your current risk profile indicates moderate risk tolerance with a focus on capital preservation.
              </p>
              <p>
                Increasing bond allocation can help balance your portfolio's equity exposure and reduce volatility.
              </p>
            </div>
          </section>

          {/* Projection section */}
          <section className="mb-[var(--spacing-lg)]">
            <h3 className="text-[length:var(--typography-h4-size)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
              Potential impact of 5% increase
            </h3>
            <div className="bg-[var(--color-surface-2)] rounded-[var(--radius-md)] p-[var(--spacing-md)] border border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-[var(--spacing-sm)]">
                <div className="flex items-center gap-[var(--spacing-sm)]">
                  <BarChart3 size={16} className="text-[var(--color-primary)]" />
                  <span className="text-[length:var(--typography-body-size)] text-[var(--color-text-primary)]">Expected portfolio volatility reduction</span>
                </div>
                <Badge variant="success">5% lower</Badge>
              </div>
              <div className="text-sm text-[var(--color-text-tertiary)]">
                Based on historical bond-equity correlation analysis
              </div>
            </div>
          </section>

          {/* Recommendations section */}
          <section>
            <h3 className="text-[length:var(--typography-h4-size)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
              Next steps
            </h3>
            <ul className="space-y-[var(--spacing-sm)] text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
              <li>Review current bond holdings and identify suitable funds within your investment platform</li>
              <li>Consider dollar-cost averaging over 3-6 months for the 5% allocation increase</li>
              <li>Consult with a financial advisor to optimize tax-advantaged accounts for bond purchases</li>
              <li>Monitor portfolio rebalancing quarterly to maintain target allocations</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </article>
  );
}