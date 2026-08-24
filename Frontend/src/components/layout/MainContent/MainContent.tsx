/**
 * VEYRA — MainContent
 * Source: design_system/Layout/Maincontent.md
 *         design_system/Layout/Appshell.md §MAIN CONTENT
 *
 * Rules:
 * - Desktop (≥1280px): margin-left 248px, overflow auto
 * - Tablet (768-1279px): margin-left 72px
 * - Mobile (<768px): margin-left 0
 * - Padding: 32px desktop / 24px tablet / 16px mobile
 * - Max-width container: 1440px, centered
 * - Min-height: 100vh
 */

import { cn } from "@/lib/cn";

interface MainContentProps {
  children: React.ReactNode;
  /** Overrides the sidebar offset classes (used by the collapse toggle) */
  offsetClassName?: string;
  className?: string;
}

export function MainContent({ children, offsetClassName, className }: MainContentProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn(
        // The only scrollable region of the app frame — scrolls, no visible bar
        "no-scrollbar flex-1 min-h-0 overflow-y-auto outline-none",
        "mr-[var(--spacing-sm)] mb-[var(--spacing-sm)]",
        // Offset for sidebar widths (overridable by the shell's collapse toggle)
        offsetClassName ?? "ml-0 md:ml-[var(--sidebar-width-collapsed)] xl:ml-[var(--sidebar-width)]",
        className
      )}
    >
      {/* Content container — max-width 1440px, responsive padding */}
      <div
        className={cn(
          "w-full max-w-[var(--container-max)] mx-auto",
          // Padding: 16px mobile / 24px tablet / 32px desktop
          "px-[var(--container-padding-mobile)]",
          "md:px-[var(--container-padding-tablet)]",
          "xl:px-[var(--container-padding-desktop)]",
          // Top breathing room below the sticky header
          "pt-[var(--container-padding-mobile)]",
          "md:pt-[var(--container-padding-tablet)]",
          "xl:pt-[var(--container-padding-desktop)]",
          // Bottom breathing room
          "pb-[var(--spacing-4xl)]"
        )}
      >
        {children}
      </div>
    </main>
  );
}
