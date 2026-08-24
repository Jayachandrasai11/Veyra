/**
 * VEYRA — AppShell
 * Source: design_system/Layout/Appshell.md
 *
 * Root layout wrapper composing Sidebar + Header + MainContent + MobileNavigation.
 * Used as the default layout for all authenticated routes.
 *
 * Responsive behavior:
 * - Desktop (≥1280px): Expanded sidebar (248px)
 * - Tablet (768-1279px): Collapsed sidebar (72px)
 * - Mobile (<768px): No sidebar, drawer navigation
 */

import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Sparkles } from "lucide-react";
import { pageThemeFromPath } from "@/lib/pageTheme";
import { Header } from "@/components/layout/Header/Header";
import { MainContent } from "@/components/layout/MainContent/MainContent";
import { MobileNavigation } from "@/components/layout/MobileNavigation/MobileNavigation";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { useResponsive } from "@/hooks/useResponsive";
import { useAskFermor } from "@/features/assistant/AskFermorContext";
import { cn } from "@/lib/cn";
import { AskFermorProvider } from "@/features/assistant/AskFermorContext";
import { AskFermorPanel } from "@/features/assistant/AskFermorPanel";
import { OfflineBanner } from "@/components/layout/OfflineBanner/OfflineBanner";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";

export function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [prefersCollapsed, setPrefersCollapsed] = useState(false);
  const { isDesktop } = useResponsive();
  const { pathname } = useLocation();
  const pageTheme = pageThemeFromPath(pathname);
  // Tablet is always collapsed; desktop respects the user's toggle
  const sidebarCollapsed = !isDesktop || prefersCollapsed;

  return (
    <AskFermorProvider>
      <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className={cn(
          "sr-only",
          "focus:not-sr-only focus:fixed focus:z-[var(--z-toast)]",
          "focus:top-[var(--spacing-sm)] focus:left-[var(--spacing-sm)]",
          "focus:rounded-[var(--radius-md)] focus:bg-[var(--color-surface-1)]",
          "focus:px-[var(--spacing-md)] focus:py-[var(--spacing-sm)]",
          "focus:text-[length:var(--typography-label-size)] focus:font-[var(--typography-label-weight)]",
          "focus:text-[var(--color-primary)] focus:shadow-[var(--shadow-raised)]",
          "focus:outline-[var(--focus-ring-width)] focus:outline-[var(--focus-ring-color)]",
          "focus:outline-offset-[var(--focus-ring-offset)]"
        )}
      >
        Skip to main content
      </a>
      {/* App frame — the shell itself never scrolls; only main does.
          Whole-page backdrop: goal-planning artwork under a readability
          veil, so white cards float on a branded canvas. */}
      <div
        className="h-screen overflow-hidden flex flex-col bg-[#F2F4F7]"
        data-page-theme={pageTheme}
      >
        {/* Desktop / Tablet Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setPrefersCollapsed((p) => !p)}
          />
        </div>

        {/* Mobile Drawer */}
        <div className="md:hidden">
          <MobileNavigation
            open={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          />
        </div>

        {/* Header — clears the floating sidebar */}
        <Header
          offsetClassName={
            sidebarCollapsed
              ? "md:ml-[calc(var(--sidebar-width-collapsed)+var(--spacing-md))]"
              : "md:ml-[calc(var(--sidebar-width)+var(--spacing-md))]"
          }
          onMenuToggle={() => setMobileNavOpen(true)}
        />

        {/* Offline state — preserves cached content (never a full-screen error) */}
        <OfflineBanner />

        {/* Main Content — offset follows the floating sidebar's live width */}
        <MainContent
          offsetClassName={
            sidebarCollapsed
              ? "ml-0 md:ml-[calc(var(--sidebar-width-collapsed)+var(--spacing-md))]"
              : "ml-0 md:ml-[calc(var(--sidebar-width)+var(--spacing-md))]"
          }
        >
          <Outlet />
        </MainContent>

        {/* Ask Veyra — contextual AI assistant */}
        <AskFermorPanel />
        <FloatingAskVeyra hidden={pathname === "/assistant"} />

        {/* Toast feedback (sonner) */}
        <Toaster position="bottom-right" />
      </div>
      </MotionConfig>
    </AskFermorProvider>
  );
}

/** Floating Ask Veyra action — one tap away on every page.
 *  Lives inside the provider so it can drive the panel state. */
function FloatingAskVeyra({ hidden }: { hidden: boolean }) {
  const { open, openAskFermor } = useAskFermor();
  if (hidden || open) return null;
  return (
    <button
      type="button"
      onClick={() => openAskFermor({ entryPoint: "header" })}
      aria-label="Ask Veyra"
      title="Ask Veyra"
      className={cn(
        "fixed bottom-5 right-5 z-[var(--z-overlay)]",
        "flex h-14 w-14 items-center justify-center rounded-full",
        "text-white bg-gradient-to-br from-[#2153E6] to-[#4D7CF3]",
        "shadow-[0_16px_40px_-12px_rgba(33,83,230,0.6)]",
        "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        "hover:scale-105 active:scale-95",
        "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
        "focus-visible:outline-offset-[var(--focus-ring-offset)]"
      )}
    >
      <Sparkles size={24} strokeWidth={2} aria-hidden={true} />
    </button>
  );
}
