/**
 * VEYRA — Explore Tool Page
 * Source: design_system/Patterns/explore.md
 *
 * Renders a single functional tool inside Explore.
 * Every tool resolves to a real, interactive experience —
 * no dead pages.
 */

import { useMemo } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Compass } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { getTool } from "../components/toolRegistry";
import { exploreCategories } from "../exploreData";

export function ToolPage() {
  const { category, tool } = useParams<{ category: string; tool: string }>();

  const found = useMemo(() => {
    const cat = exploreCategories.find((c) => c.id === category);
    const t = cat?.tools.find((x) => x.id === tool);
    return { cat, tool: t };
  }, [category, tool]);

  const ToolComponent = category && tool ? getTool(category, tool) : null;

  if (!ToolComponent || !found.cat || !found.tool) {
    return (
      <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
        <EmptyState
          icon={Compass}
          title="Tool not found"
          description="This tool isn't available. Browse the full toolkit from Explore."
        />
        <div className="text-center">
          <Link
            to="/explore"
            className="inline-flex items-center gap-[var(--spacing-2xs)] text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-primary)] rounded-[var(--radius-sm)] px-[var(--spacing-2xs)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
          >
            <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
            Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
      <nav aria-label="Breadcrumb">
        <Link
          to={`/explore/${found.cat.id}`}
          className="inline-flex items-center gap-[var(--spacing-2xs)] text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-primary)] rounded-[var(--radius-sm)] px-[var(--spacing-2xs)] -mx-[var(--spacing-2xs)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          {found.cat.name}
        </Link>
      </nav>

      <header className="flex flex-col gap-[var(--spacing-2xs)]">
        <h1 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)]">
          {found.tool.name}
        </h1>
        <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-[60ch]">
          {found.tool.description}
        </p>
      </header>

      <ToolComponent />
    </div>
  );
}
