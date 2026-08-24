/**
 * VEYRA — Explore Learn
 * Source: design_system/Patterns/explore.md
 *         design_system/Components/Tabs.md
 *         design_system/Components/Search.md
 *
 * Browseable, searchable financial education library.
 * No dead pages: each item expands inline to show its content.
 */

import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { ChevronDown, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { ExploreSearch } from "./ExploreSearch";
import { cn } from "@/lib/cn";

interface LearnItem {
  id: string;
  title: string;
  readTime: string;
  summary: string;
}

const LEARN: Record<string, { label: string; items: LearnItem[] }> = {
  guides: {
    label: "Guides",
    items: [
      { id: "g1", title: "Build your first budget", readTime: "4 min", summary: "Start with your monthly income, list fixed and flexible expenses, and decide a savings amount first. Review it monthly so it stays realistic." },
      { id: "g2", title: "Start an emergency fund", readTime: "3 min", summary: "Aim for three to six months of essential expenses in a separate, easy-to-access account before investing aggressively." },
      { id: "g3", title: "Begin investing with SIPs", readTime: "5 min", summary: "A Systematic Investment Plan lets you invest a fixed amount regularly. Consistency matters more than timing the market." },
      { id: "g4", title: "Plan for a major goal", readTime: "4 min", summary: "Name the goal, put a number and date on it, then work backwards to a monthly contribution you can sustain." },
    ],
  },
  concepts: {
    label: "Key Concepts",
    items: [
      { id: "c1", title: "Compound interest", readTime: "2 min", summary: "Interest earned on both your original amount and previously earned interest. Starting earlier gives it more time to work." },
      { id: "c2", title: "Risk and return", readTime: "2 min", summary: "Higher expected returns usually come with larger ups and downs. Match the risk to when you need the money." },
      { id: "c3", title: "Inflation", readTime: "2 min", summary: "Prices tend to rise over time, so money kept idle loses purchasing power. Investments aim to stay ahead of inflation." },
      { id: "c4", title: "Asset allocation", readTime: "3 min", summary: "How you divide money across equity, debt and cash. A balanced mix helps smooth the journey toward your goals." },
    ],
  },
  library: {
    label: "Library",
    items: [
      { id: "l1", title: "Tax-saving options explained", readTime: "6 min", summary: "A calm overview of common ways households reduce taxable income, and what to check before committing." },
      { id: "l2", title: "Reading a mutual fund factsheet", readTime: "5 min", summary: "What expense ratio, returns and portfolio mix tell you, and the questions worth asking before investing." },
      { id: "l3", title: "Insurance basics", readTime: "4 min", summary: "Term cover protects your family; products that mix investment and insurance are not always the most efficient." },
      { id: "l4", title: "Retirement, simply", readTime: "6 min", summary: "How a corpus, inflation and a withdrawal rate combine to give a sustainable monthly income later in life." },
    ],
  },
};

export function LearnLibrary() {
  const { tool } = useParams<{ tool?: string }>();
  /* Show only the section that matches the selected Learn tool
     (guides / concepts / library) — no cross-section switcher. */
  const section = tool && LEARN[tool] ? tool : "guides";
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const list = LEARN[section].items;
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (it) => it.title.toLowerCase().includes(q) || it.summary.toLowerCase().includes(q)
    );
  }, [section, query]);

  return (
    <div className="flex flex-col gap-[var(--spacing-lg)]">
      <ExploreSearch value={query} onChange={setQuery} placeholder="Search topics…" />

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-[var(--spacing-lg)]">
            <p className="text-center text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
              No topics match “{query}”. Try a different word.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-md)]">
          {items.map((item) => (
            <LearnCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function LearnCard({ item }: { item: LearnItem }) {
  const [open, setOpen] = useState(false);
  const panelId = `learn-${item.id}`;
  return (
    <Card surface="warm" className="border">
      <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-sm)]">
        <div className="flex items-start justify-between gap-[var(--spacing-sm)]">
          <h3 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] text-[var(--color-text-primary)] leading-[var(--typography-h3-line)]">
            {item.title}
          </h3>
          <span className="flex items-center gap-[var(--spacing-2xs)] text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)] whitespace-nowrap">
            <Clock size={14} strokeWidth={2} aria-hidden="true" />
            {item.readTime}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            "inline-flex items-center gap-[var(--spacing-2xs)] self-start",
            "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-primary)]",
            "rounded-[var(--radius-sm)] px-[var(--spacing-2xs)] -mx-[var(--spacing-2xs)]",
            "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
            "focus-visible:outline-offset-[var(--focus-ring-offset)]",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
          )}
        >
          {open ? "Hide" : "Read"}
          <ChevronDown
            size={16}
            strokeWidth={2}
            className={cn("transition-transform duration-[var(--duration-fast)] ease-[var(--ease-fast)]", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
        {open && (
          <p
            id={panelId}
            className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)] leading-[var(--typography-body-sm-line)]"
          >
            {item.summary}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
