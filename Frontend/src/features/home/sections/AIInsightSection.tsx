/**
 * Fermor/Veyra — AIInsightSection
 * Source: design_system/Architecture/Section6.md
 *
 * Pattern: AI Recommendation
 * Structure: AILabel + Insight + Explanation + Actions
 *
 * Rules:
 * - NOT a chat component
 * - NOT a generic notification
 * - AI identity: Sparkles icon on soft chip
 * - AI label: "A THOUGHT FROM VEYRA"
 * - Primary action: Arrow Link; Secondary action: "Ask Veyra" AI button
 * - Empty AI state: render nothing
 */

import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { Skeleton } from "@/components/ui/Loading/Skeleton";
import { useAskFermor } from "@/features/assistant/AskFermorContext";

interface AIInsightData {
  id: string;
  title: string;
  insight: string;
  explanation?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
}

interface AIInsightSectionProps {
  data?: AIInsightData | null;
  loading?: boolean;
  className?: string;
}

export function AIInsightSection({ data, loading = false, className }: AIInsightSectionProps) {
  const { openAskFermor } = useAskFermor();

  if (loading) {
    return (
      <section className={cn("w-full", className)}>
        <Card>
          <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-sm)]">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-[var(--spacing-sm)]">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-8 w-28" />
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className={cn("w-full", className)} aria-labelledby="ai-insight-title">
      <Card surface="lavender" decoration="wave">
        <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-sm)]">
          {/* AI Label — icon chip header, consistent with the card system */}
          <div className="flex items-center gap-[var(--spacing-sm)]">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70"
              aria-hidden="true"
            >
              <Sparkles size={18} strokeWidth={2} className="text-[var(--color-primary)]" />
            </span>
            <span className="text-app-label uppercase tracking-wider text-[var(--color-text-secondary)]">
              A Thought From Veyra
            </span>
          </div>

          {/* Insight Title */}
          <h2
            id="ai-insight-title"
            className={cn(
              "text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)]",
              "leading-[var(--typography-h3-line)]",
              "text-[var(--color-text-primary)]"
            )}
          >
            {data.title}
          </h2>

          {/* Insight */}
          <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-primary)]">
            {data.insight}
          </p>

          {/* Explanation */}
          {data.explanation && (
            <p className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
              {data.explanation}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-[var(--spacing-sm)] pt-[var(--spacing-xs)]">
            {data.primaryAction && (
              <a
                href={data.primaryAction.href}
                className={cn(
                  "inline-flex items-center gap-[var(--spacing-2xs)]",
                  "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
                  "text-[var(--color-primary)]",
                  "hover:underline underline-offset-2",
                  "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                  "focus-visible:outline-offset-[var(--focus-ring-offset)]"
                )}
              >
                {data.primaryAction.label}
                <ArrowRight size={14} strokeWidth={2} aria-hidden={true} />
              </a>
            )}
            <Button
              variant="ai"
              size="sm"
              onClick={() => openAskFermor({ entryPoint: "insight", sourceLabel: data.title })}
              aria-label={`Ask Veyra about: ${data.title}`}
            >
              <Sparkles size={16} strokeWidth={2} aria-hidden={true} />
              Ask Veyra
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
