/**
 * Veyra — RecommendedActionsSection
 * Source: design_system/Architecture/Section4.md
 *
 * Pattern: Recommended for you
 * Structure: SectionHeader + 3 action cards (title / insight / action link)
 *
 * Rules:
 * - Actions are specific and financial, never generic AI filler
 * - One action verb per card; depth lives behind the link
 * - Icon chip per card carries its own soft tint
 */

import { ArrowRight, PiggyBank, RefreshCcw, TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { SectionHeader } from "../components/SectionHeader";

export interface RecommendedAction {
  title: string;
  insight: string;
  actionLabel: string;
  href: string;
}

interface RecommendedActionsSectionProps {
  actions: RecommendedAction[];
  className?: string;
}

/* Icon chip per action — soft tint circles keep the row calm */
const actionChips = [
  { icon: PiggyBank, bg: "var(--color-primary-soft)", color: "var(--color-primary)" },
  { icon: RefreshCcw, bg: "#FFF4E0", color: "#B7791F" },
  { icon: TrendingUp, bg: "var(--color-success-soft)", color: "var(--color-success)" },
];

export function RecommendedActionsSection({ actions, className }: RecommendedActionsSectionProps) {
  return (
    <section
      className={cn("w-full flex flex-col gap-[var(--spacing-md)]", className)}
      aria-labelledby="recommended-title"
    >
      <SectionHeader
        title="Recommended for you"
        description="Small moves that keep you on track"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-md)]">
        {actions.map((action, i) => {
          const chip = actionChips[i % actionChips.length];
          const ChipIcon = chip.icon;
          return (
            <Card
              key={action.title}
              surface="default"
              frame={(["green", "amber", "violet"] as const)[i % 3]}
              className="h-full card-hover"
            >
              <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-md)] h-full">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: chip.bg, color: chip.color }}
                  aria-hidden="true"
                >
                  <ChipIcon size={18} strokeWidth={2} />
                </span>
                <p className="text-[length:var(--typography-label-size)] font-semibold text-[var(--color-text-primary)]">
                  {action.title}
                </p>
                <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)]">
                  {action.insight}
                </p>
                <a
                  href={action.href}
                  className={cn(
                    "mt-auto inline-flex items-center gap-[var(--spacing-2xs)] self-start pt-[var(--spacing-2xs)]",
                    "text-[length:var(--typography-label-size)] font-medium",
                    "text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]",
                    "hover:underline underline-offset-2",
                    "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                    "focus-visible:outline-offset-[var(--focus-ring-offset)]"
                  )}
                >
                  {action.actionLabel}
                  <ArrowRight size={14} strokeWidth={2} aria-hidden={true} />
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
