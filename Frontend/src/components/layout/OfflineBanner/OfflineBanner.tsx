/**
 * VEYRA — OfflineBanner
 * Source: design_system/States/Offline.md (07.16)
 *
 * Global Offline state surface. Per the spec, offline must:
 * - never destroy existing content (cached data stays visible)
 * - tell the user the data is cached
 * - not be a full-screen error
 *
 * Rendered once near the top of the app shell, below the header.
 */

import { WifiOff } from "lucide-react";
import { cn } from "@/lib/cn";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function OfflineBanner() {
  const online = useOnlineStatus();

  if (online) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center justify-center gap-[var(--spacing-sm)]",
        "px-[var(--header-padding-mobile)] md:px-[var(--header-padding-desktop)]",
        "py-[var(--spacing-xs)]",
        "bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
        "border-b border-[var(--color-warning)]/30",
        "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]"
      )}
    >
      <WifiOff size={16} strokeWidth={2} aria-hidden={true} className="shrink-0" />
      <span>You&rsquo;re offline — showing your most recent cached data.</span>
    </div>
  );
}
