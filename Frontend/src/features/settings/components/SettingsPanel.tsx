/**
 * VEYRA — Settings Panel
 * Source: design_system/Components/card.md (surface-1, card radius)
 *         design_system/Architecture/Appshell.md (section alignment)
 *
 * Consistent shell for every settings section: a titled card that aligns to
 * the shared content container. Children are semantic section panels.
 */

import { cn } from "@/lib/cn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card/Card";
import type { SettingsSectionConfig } from "../constants";

interface SettingsPanelProps {
  section: SettingsSectionConfig;
  children: React.ReactNode;
  className?: string;
}

export function SettingsPanel({ section, children, className }: SettingsPanelProps) {
  const Icon = section.icon;
  return (
    <Card className={cn("scroll-mt-[calc(var(--header-height-desktop)_+_var(--spacing-md))]", className)} surface="default">
      <CardHeader className="gap-[var(--spacing-xs)]">
        <div className="flex items-center gap-[var(--spacing-sm)]">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
          >
            <Icon size={18} strokeWidth={2} />
          </span>
          <CardTitle className="text-[length:var(--typography-h3-size)]">{section.label}</CardTitle>
        </div>
        <CardDescription className="text-[length:var(--typography-body-sm-size)]">
          {section.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-md)]">
        {children}
      </CardContent>
    </Card>
  );
}
