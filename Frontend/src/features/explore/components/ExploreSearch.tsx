/**
 * VEYRA — Explore Search
 * Source: design_system/Components/Search.md
 *
 * Find tools inside Explore. Keyboard accessible.
 * Does not replace Ask Veyra — purely for locating tools.
 */

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input/Input";
import { cn } from "@/lib/cn";

export function ExploreSearch({
  value,
  onChange,
  placeholder = "Search tools, plans, calculators…",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full max-w-[420px]">
      <Search
        size={18}
        strokeWidth={2}
        className="absolute left-[var(--spacing-sm)] top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none"
        aria-hidden="true"
      />
      <Input
        type="search"
        role="searchbox"
        aria-label="Search Explore tools"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-9 h-11"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className={cn(
            "absolute right-[var(--spacing-xs)] top-1/2 -translate-y-1/2",
            "flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)]",
            "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]",
            "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
            "focus-visible:outline-offset-[var(--focus-ring-offset)]",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
          )}
        >
          <X size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
