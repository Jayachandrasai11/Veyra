/**
 * Fermor/Veyra — VeyraNoticedSection
 * Source: design_system/Architecture/Section4.md (Veyra intelligence layer)
 *
 * The core differentiator: the system explains a meaningful financial
 * change in natural language, answering four questions in one glance:
 * 1. What happened? 2. Why does it matter? 3. What drove it? 4. What to do?
 *
 * Rules:
 * - Calm and advisory in tone — never alarmist, never marketing copy
 * - One insight per card; depth lives on the linked page
 * - Labels are always text (never color-alone)
 */

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";

export interface NoticedInsight {
  change: string;
  whyItMatters: string;
  drivers: string;
  recommendedAction: string;
  ctaLabel: string;
  ctaHref: string;
}

interface VeyraNoticedSectionProps {
  insight: NoticedInsight;
  className?: string;
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--spacing-2xs)]">
      <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-tertiary)]">
        {label}
      </p>
      <div className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-primary)]">
        {children}
      </div>
    </div>
  );
}

export function VeyraNoticedSection({ insight, className }: VeyraNoticedSectionProps) {
  return (
    <section
      className={cn("w-full", className)}
      aria-labelledby="veyra-noticed-title"
    >
      <Card
        frame="violet"
        surface="default"
        decoration="coins"
        className="w-full card-hover border-l-4 border-l-[var(--color-primary)]"
      >
        <CardContent className="p-[var(--spacing-lg)] flex flex-col md:flex-row md:items-start gap-[var(--spacing-lg)]">
          {/* Identity chip */}
          <div className="shrink-0 flex md:flex-col items-center gap-[var(--spacing-sm)]">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary-soft)]"
              aria-hidden="true"
            >
              <Sparkles size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
            </span>
            <p className="md:hidden text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)]">
              Veyra noticed
            </p>
          </div>

          {/* Narrative */}
          <div className="flex-1 min-w-0 flex flex-col gap-[var(--spacing-md)]">
            <div className="flex flex-col gap-[var(--spacing-2xs)]">
              <h2
                id="veyra-noticed-title"
                className="hidden md:block text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)]"
              >
                Veyra noticed
              </h2>
              <p className="text-[length:var(--typography-h3-size)] font-semibold leading-snug text-[var(--color-text-primary)]">
                {insight.change}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--spacing-md)] pt-[var(--spacing-2xs)] border-t border-[var(--color-border)]">
              <Block label="Why it matters">{insight.whyItMatters}</Block>
              <Block label="What drove it">{insight.drivers}</Block>
              <Block label="Recommended action">{insight.recommendedAction}</Block>
            </div>
          </div>

          {/* Action */}
          <div className="shrink-0 md:self-center">
            <a
              href={insight.ctaHref}
              className={cn(
                "inline-flex items-center justify-center gap-[var(--icon-gap)]",
                "h-10 px-[var(--spacing-md)] rounded-[var(--radius-button)]",
                "bg-[var(--color-primary)] text-white text-[length:var(--typography-label-size)] font-medium",
                "hover:bg-[var(--color-primary-hover)]",
                "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                "focus-visible:outline-offset-[var(--focus-ring-offset)]"
              )}
            >
              {insight.ctaLabel}
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
