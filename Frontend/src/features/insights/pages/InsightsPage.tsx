/**
 * Veyra — Insights Page
 * Source: design_system/Patterns/Insight.md
 *         design_system/Components/Data.md
 *
 * Pattern: Financial Insight Feed
 * Structure: Section Header + Insight Feed Grid
 *
 * Rules:
 * - Financial observations from data analysis
 * - Each insight: Observation → Context → Action
 * - One primary action per insight
 * - Loading, Empty, Error, Partial data states
 * - 2 columns desktop, 1 mobile
 */

import { Lightbulb, Cloud, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { InsightCard } from "@/features/home/sections/InsightCard";
import { Skeleton } from "@/components/ui/Loading/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { useInsights } from "../hooks/useInsights";

export function InsightsPage() {
  const { insights, loading, error, refetch } = useInsights();

  const pageTitle = (
    <header className="flex flex-col gap-[var(--spacing-2xs)]">
      <h1 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)]">
        Veyra Noticed
      </h1>
      <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-[60ch]">
        What changed, why it matters, and what to do next
      </p>
    </header>
  );

  // Loading state - preserve grid layout with skeletons
  if (loading) {
    return (
      <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
        {pageTitle}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-md)]">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-sm)]">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state - show error with recovery
  if (error) {
    return (
      <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
        {pageTitle}
        <Card>
          <CardContent className="p-[var(--spacing-lg)] text-center">
            <Cloud size={48} strokeWidth={2} className="text-[var(--color-text-tertiary)] mx-auto mb-[var(--spacing-md)]" />
            <h3 className="text-[length:var(--typography-h3-size)] font-semibold text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
              Couldn't load insights
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

  // Empty state
  if (!insights || insights.length === 0) {
    return (
      <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
        {pageTitle}
        <Card>
          <CardContent className="p-[var(--spacing-lg)]">
            <EmptyState
              icon={Lightbulb}
              title="No insights yet"
              description="Connect your accounts to receive personalized financial insights."
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  const featuredIndex = insights.findIndex(
    (insight) => insight.severity === "critical" || insight.severity === "attention"
  );
  const featured = insights[featuredIndex >= 0 ? featuredIndex : 0];
  const rest = insights.filter((insight) => insight.id !== featured.id);

  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
      {pageTitle}

      <InsightCard
        id={featured.id}
        type={featured.type}
        title={featured.title}
        value={featured.value}
        description={featured.description}
        severity={featured.severity}
        action={featured.action}
        featured
      />

      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-md)]">
          {rest.map((insight) => (
            <InsightCard
              key={insight.id}
              id={insight.id}
              type={insight.type}
              title={insight.title}
              value={insight.value}
              description={insight.description}
              severity={insight.severity}
              action={insight.action}
            />
          ))}
        </div>
      )}
    </div>
  );
}