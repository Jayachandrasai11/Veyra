/**
 * VEYRA — Explore Category Card
 * Source: design_system/Patterns/explore.md
 *
 * Compact, navigation-style entry into a category.
 * Icon + label + description, links to /explore/:id.
 * Uses the existing Card system with a tinted surface.
 */

import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ExploreCategory } from "../types";

export function CategoryCard({
  category,
  active = false,
  featured = false,
}: {
  category: ExploreCategory;
  active?: boolean;
  featured?: boolean;
}) {
  const Icon = category.icon;
  return (
    <Link
      to={`/explore/${category.id}`}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group card-hover flex flex-col gap-[var(--spacing-sm)] h-full",
        "p-[var(--spacing-lg)] rounded-[var(--radius-card)]",
        "border transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
        "focus-visible:outline-offset-[var(--focus-ring-offset)]",
        active
          ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)]"
          : featured
            ? "border-[var(--color-border)] bg-[var(--color-surface-sky)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-raised)]"
            : "border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-raised)]"
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)]"
          aria-hidden="true"
        >
          <Icon size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
        </div>
        <ArrowUpRight
          size={18}
          strokeWidth={2}
          className="text-[var(--color-text-tertiary)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-fast)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-[var(--color-primary)]"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-[var(--spacing-2xs)] mt-[var(--spacing-2xs)]">
        <span className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] tracking-[var(--typography-h3-tracking)] text-[var(--color-text-primary)]">
          {category.name}
        </span>
        <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
          {category.description}
        </span>
      </div>
    </Link>
  );
}
