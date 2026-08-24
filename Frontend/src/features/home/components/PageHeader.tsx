/**
 * VEYRA — PageHeader
 * Source: design_system/Architecture/Section1.md
 *         design_system/Foundations/Typography.md
 *
 * Pattern: Dashboard Welcome
 * Structure: Greeting + Description
 *
 * Rules:
 * - Greeting is the page H1 (typography-h1 token scale:
 *   product page-title target ~28–32px / weight 700)
 * - Description: body size, secondary color
 * - Internal spacing: 8px desktop, 4px mobile
 * - Time-of-day greeting from local time
 * - Optional userName (first name preferred)
 */

import { cn } from "@/lib/cn";
import { getTimeOfDayGreeting } from "@/lib/format";

interface PageHeaderProps {
  userName?: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  userName,
  description = "Here's what changed in your financial picture today.",
  className,
}: PageHeaderProps) {
  const greeting = getTimeOfDayGreeting();
  const greetingText = userName ? `${greeting}, ${userName}` : greeting;
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className={cn("flex flex-col gap-[var(--spacing-2xs)] md:gap-[var(--spacing-xs)]", className)}>
      {/* Context eyebrow — quiet, scannable, never competes with the greeting */}
      <p className="text-app-label uppercase tracking-wider text-[var(--color-text-tertiary)]">
        {today}
      </p>
      <h1
        className={cn(
          "text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)]",
          "leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)]",
          "text-[var(--color-text-primary)]"
        )}
      >
        {greetingText}
      </h1>
      <p
        className={cn(
          "text-[length:var(--typography-body-size)]",
          "text-[var(--color-text-secondary)]"
        )}
      >
        {description}
      </p>
    </header>
  );
}
