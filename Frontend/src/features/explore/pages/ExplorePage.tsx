/**
 * VEYRA — Explore Page
 * Source: design_system/Patterns/explore.md
 *
 * Pattern: Explore (complete toolkit)
 * Structure: Header → Search → Category tabs →
 *            Category grid (landing) → Tool sections
 *
 * Rules:
 * - Home exposes Plan / Compare / Calculate / Learn
 * - Detailed tools belong inside Explore
 * - Responsive: 4 cols desktop, 2 tablet, 1 mobile
 * - Use Lucide icons, existing Card / Button systems
 * - Keyboard accessible, visible focus
 * - URL is the source of truth for active category
 */

import { useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { Compass, ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/features/home/components/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { CategoryCard } from "../components/CategoryCard";
import { ToolCard } from "../components/ToolCard";
import { ExploreSearch } from "../components/ExploreSearch";
import { ExploreTabs } from "../components/ExploreTabs";
import { exploreCategories } from "../exploreData";

export function ExplorePage() {
  const { category } = useParams<{ category?: string }>();
  const [query, setQuery] = useState("");

  const activeCategory = useMemo(
    () => exploreCategories.find((c) => c.id === category),
    [category]
  );

  const visibleCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = activeCategory ? [activeCategory] : exploreCategories;
    if (!q) return base;
    return base
      .map((c) => ({
        ...c,
        tools: c.tools.filter(
          (t) =>
            t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.tools.length > 0);
  }, [activeCategory, query]);

  const hasResults = visibleCategories.length > 0;

  return (
    <div className="flex flex-col gap-[var(--spacing-2xl)] pt-[var(--spacing-lg)]">
      {/* Page header */}
      <header className="flex items-start gap-[var(--spacing-md)]">
        <span
          className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)]"
          aria-hidden="true"
        >
          <Compass size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
        </span>
        <div className="flex flex-col gap-[var(--spacing-2xs)] min-w-0">
          <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)]">
            Explore
          </p>
          <h1 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)]">
            {activeCategory ? activeCategory.name : "Your money toolkit"}
          </h1>
          <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-[60ch]">
            {activeCategory
              ? activeCategory.description
              : "Start with one action. Plan, compare, calculate, or learn."}
          </p>
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[var(--spacing-md)]">
        <div className="w-full lg:max-w-md">
          <ExploreSearch value={query} onChange={setQuery} />
        </div>
        <ExploreTabs />
      </div>

      {activeCategory && (
        <Link
          to="/explore"
          className="inline-flex items-center gap-[var(--spacing-2xs)] self-start text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-primary)] rounded-[var(--radius-sm)] px-[var(--spacing-2xs)] -mx-[var(--spacing-2xs)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          All tools
        </Link>
      )}

      {/* Category entry grid (landing only) */}
      {!activeCategory && hasResults && (
        <section aria-labelledby="explore-categories-title">
          <h2 id="explore-categories-title" className="sr-only">
            Explore categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[var(--spacing-md)]">
            {exploreCategories.map((cat, index) => (
              <div
                key={cat.id}
                className={index === 0 ? "sm:col-span-2" : undefined}
              >
                <CategoryCard category={cat} featured={index === 0} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detailed tool sections */}
      {hasResults ? (
        visibleCategories.map((cat) => (
          <section
            key={cat.id}
            id={`explore-section-${cat.id}`}
            aria-labelledby={`explore-section-${cat.id}-title`}
            className="scroll-mt-[var(--spacing-2xl)] flex flex-col gap-[var(--spacing-md)]"
          >
            <SectionHeader title={cat.name} description={cat.description} />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[var(--spacing-md)]">
              {cat.tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  categoryId={cat.id}
                  surface={cat.surface}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="py-[var(--spacing-2xl)]">
          <EmptyState
            icon={Compass}
            title="No tools match your search"
            description={
              query
                ? `We couldn't find a tool for “${query}”. Try a different word or clear the search.`
                : "There are no tools in this category yet."
            }
            action={
              query
                ? { label: "Clear search", onClick: () => setQuery("") }
                : undefined
            }
          />
        </section>
      )}
    </div>
  );
}
