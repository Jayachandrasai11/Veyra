/**
 * VEYRA — Explore Tool Card
 * Source: design_system/Patterns/explore.md
 *
 * Compact card representing a detailed tool inside Explore.
 * Links to /explore/:category/:tool. Not a dead page:
 * every tool resolves to a functional experience.
 */

import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ExploreTool, ExploreCategoryId, ExploreSurface } from "../types";

const surfaceBg: Record<ExploreSurface, string> = {
  default: "bg-[var(--color-surface-1)]",
  blue: "bg-[var(--color-surface-blue)]",
  sky: "bg-[var(--color-surface-sky)]",
  navy: "bg-[var(--color-surface-navy)]",
  green: "bg-[var(--color-surface-green)]",
  slate: "bg-[var(--color-surface-slate)]",
  warm: "bg-[var(--color-surface-amber)]",
  lavender: "bg-[var(--color-surface-lavender)]",
  brand: "bg-[var(--color-surface-brand)]",
};

export function ToolCard({
  tool,
  categoryId,
  surface = "default",
}: {
  tool: ExploreTool;
  categoryId: ExploreCategoryId;
  surface?: ExploreSurface;
}) {
  const ToolIcon = tool.icon;
  return (
    <Link
      to={`/explore/${categoryId}/${tool.id}`}
      className={cn(
        "group card-hover flex flex-col gap-[var(--spacing-sm)] h-full",
        "rounded-[var(--radius-card)] border border-[var(--color-border)]",
        "p-[var(--spacing-lg)] transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
        "focus-visible:outline-offset-[var(--focus-ring-offset)]",
        "hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-raised)]",
        surfaceBg[surface]
      )}
    >
      <div className="flex items-center gap-[var(--spacing-sm)]">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-surface-2)]"
          aria-hidden="true"
        >
          <ToolIcon size={18} strokeWidth={2} className="text-[var(--color-text-secondary)]" />
        </div>
        <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] leading-[var(--typography-h3-line)] tracking-[var(--typography-h3-tracking)] text-[var(--color-text-primary)]">
          {tool.name}
        </h3>
      </div>

      <p className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)] flex-1">
        {tool.description}
      </p>

      <span className="inline-flex items-center gap-[var(--spacing-2xs)] mt-[var(--spacing-2xs)] text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-primary)]">
        Open
        <ArrowRight
          size={14}
          strokeWidth={2}
          className="transition-transform duration-[var(--duration-fast)] ease-[var(--ease-fast)] group-hover:translate-x-[2px]"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
