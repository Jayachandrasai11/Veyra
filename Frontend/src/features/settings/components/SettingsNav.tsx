/**
 * VEYRA — Settings Navigation
 * Source: design_system/Architecture/Appshell.md (Settings entry)
 *         design_system/Components/Navigation.md (active state never color alone)
 *         design_system/Foundations/responsive.md (mobile: horizontal scroll)
 *
 * Vertical, sticky section list on >= lg. Horizontal scrollable pill strip
 * on mobile/tablet. Active item communicates via background + weight + icon,
 * not color alone.
 */

import { cn } from "@/lib/cn";
import type { SettingsSectionConfig } from "../constants";

interface SettingsNavProps {
  sections: SettingsSectionConfig[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function SettingsNav({ sections, activeId, onSelect }: SettingsNavProps) {
  const onTabKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    orientation: "horizontal" | "vertical"
  ) => {
    const navKeys =
      orientation === "horizontal"
        ? ["ArrowRight", "ArrowLeft", "Home", "End"]
        : ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!navKeys.includes(e.key)) return;

    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    const current = tabs.findIndex((t) => t === document.activeElement);
    if (current === -1) return;

    let next = current;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = (current + 1) % tabs.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = (current - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = tabs.length - 1;
    }

    e.preventDefault();
    const target = tabs[next];
    target.focus();
    onSelect(target.dataset.value as string);
  };

  const renderTab = (section: SettingsSectionConfig, orientation: "horizontal" | "vertical") => {
    const active = section.id === activeId;
    const Icon = section.icon;
    return (
      <li key={section.id} role="presentation">
        <button
          type="button"
          role="tab"
          id={`settings-tab-${section.id}`}
          data-value={section.id}
          aria-selected={active}
          aria-current={active ? "true" : undefined}
          aria-controls="settings-panel"
          tabIndex={active ? 0 : -1}
          onClick={() => onSelect(section.id)}
          onKeyDown={(e) => onTabKeyDown(e, orientation)}
          className={cn(
            orientation === "horizontal"
              ? "inline-flex items-center gap-[var(--spacing-2xs)] whitespace-nowrap h-10 px-[var(--spacing-sm)] rounded-[var(--radius-md)] border"
              : "flex w-full items-center gap-[10px] min-h-[var(--nav-item-height)] rounded-[var(--radius-md)] px-[var(--nav-item-padding-x)]",
            "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
            "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
            "focus-visible:outline-offset-[var(--focus-ring-offset)]",
            active
              ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] border-[var(--color-primary)]/30 font-semibold"
              : "bg-[var(--color-surface-1)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]"
          )}
        >
          <Icon size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
          <span className="truncate">{section.label}</span>
        </button>
      </li>
    );
  };

  return (
    <nav aria-label="Settings sections" className="lg:sticky lg:top-[var(--header-height-desktop)]">
      {/* Mobile / tablet: horizontal scroll strip (never wrap) */}
      <ul
        className="flex gap-[var(--spacing-xs)] overflow-x-auto scrollbar-none pb-[var(--spacing-2xs)] xl:hidden"
        role="tablist"
        aria-orientation="horizontal"
      >
        {sections.map((section) => renderTab(section, "horizontal"))}
      </ul>

      {/* Desktop / tablet: vertical list */}
      <ul
        className="hidden xl:flex flex-col gap-[var(--nav-item-gap)]"
        role="tablist"
        aria-orientation="vertical"
      >
        {sections.map((section) => renderTab(section, "vertical"))}
      </ul>
    </nav>
  );
}
