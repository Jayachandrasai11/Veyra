/**
 * VEYRA — ExploreSection
 * Source: design_system/Architecture/Section7.md
 *
 * Pattern: Quick Actions
 * Structure: SectionHeader + QuickActions
 *
 * Rules:
 * - Compact action buttons (Secondary/Outline style)
 * - Desktop: 4 actions in one row
 * - Tablet: allow wrapping
 * - Mobile: 2-column layout
 * - Icons: Plan (Map), Compare (GitCompare), Calculate (Calculator), Learn (BookOpen)
 * - Icon size: 18px, 2px stroke
 * - Icon/text gap: 8px
 * - Not AI accent color
 * - Visually quieter than primary sections
 * - Empty Explore: omit entirely
 */

import { Map, GitCompare, Calculator, BookOpen } from "lucide-react";
import { cn } from "@/lib/cn";
import { SectionHeader } from "../components/SectionHeader";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number; strokeWidth: number; "aria-hidden": boolean; className?: string }>;
  href: string;
}

const quickActions: QuickAction[] = [
  { id: "plan", label: "Plan", icon: Map, href: "/explore/plan" },
  { id: "compare", label: "Compare", icon: GitCompare, href: "/explore/compare" },
  { id: "calculate", label: "Calculate", icon: Calculator, href: "/explore/calculate" },
  { id: "learn", label: "Learn", icon: BookOpen, href: "/explore/learn" },
];

/* Tinted surface per explore action — subtle hierarchy, not colorful promo cards.
   Plan→blue, Compare→slate, Calculate→white, Learn→warm */
const actionSurface: Record<string, string> = {
  plan: "bg-[var(--color-surface-blue)]",
  compare: "bg-[var(--color-surface-slate)]",
  calculate: "bg-[var(--color-surface-1)]",
  learn: "bg-[var(--color-surface-warm)]",
};

interface ExploreSectionProps {
  className?: string;
}

export function ExploreSection({ className }: ExploreSectionProps) {
  return (
    <section className={cn("w-full flex flex-col gap-[var(--spacing-md)]", className)} aria-labelledby="explore-title">
      <SectionHeader
        title="Explore"
        description="What can you do next?"
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-[var(--spacing-sm)]">
        {quickActions.map(({ id, label, icon: Icon, href }) => (
          <a
            key={id}
            href={href}
            className={cn(
              "flex items-center justify-center gap-[var(--spacing-xs)]",
              "h-11 px-[var(--spacing-md)]",
              "rounded-[var(--radius-button)]",
              "border border-[var(--color-border)]",
              "shadow-[0_0_0_1px_rgba(11,31,58,0.08),0_0_0_4px_rgba(11,31,58,0.04)]",
              actionSurface[id] ?? "bg-[var(--color-surface-2)]",
              "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
              "text-[var(--color-text-primary)]",
              "hover:brightness-95 hover:border-[var(--color-primary)]",
              "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
              "focus-visible:outline-offset-[var(--focus-ring-offset)]",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
            )}
          >
            <Icon size={18} strokeWidth={2} aria-hidden={true} className="shrink-0" />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
