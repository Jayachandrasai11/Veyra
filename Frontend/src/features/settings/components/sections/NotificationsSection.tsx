/**
 * VEYRA — Notifications Settings Section
 * Source: design_system/Components/Badge.md (Recommended tag)
 *         design_system/States/Default.md (toggle states)
 *         design_system/Accessibility.md (labeled switches)
 */

import { Switch } from "@/components/ui/Switch/Switch";
import { Badge } from "@/components/ui/Badge/Badge";
import { Separator, SettingGroup, SettingRow } from "../SettingsPrimitives";
import type { NotificationSettings } from "../../types";

interface NotificationsSectionProps {
  value: NotificationSettings;
  update: (patch: Partial<NotificationSettings>) => void;
}

interface ToggleRow {
  key: keyof NotificationSettings;
  title: string;
  description: string;
  recommended?: boolean;
}

const DELIVERY: ToggleRow[] = [
  { key: "push", title: "Push notifications", description: "Alerts on this device." },
  { key: "email", title: "Email", description: "Summaries and important updates to your inbox." },
  { key: "sms", title: "SMS", description: "Critical alerts by text message." },
];

const CATEGORIES: ToggleRow[] = [
  { key: "spendingAlerts", title: "Spending alerts", description: "Notify me about unusual or large spends." },
  { key: "goalReminders", title: "Goal reminders", description: "Nudges to stay on track with your goals." },
  { key: "insights", title: "Insights", description: "Personalized financial observations from Veyra." },
  { key: "weeklySummary", title: "Weekly summary", description: "A calm recap of your week.", recommended: true },
  { key: "securityAlerts", title: "Security alerts", description: "Sign-ins and account changes.", recommended: true },
];

export function NotificationsSection({ value, update }: NotificationsSectionProps) {
  const renderRow = (row: ToggleRow) => (
    <SettingRow
      key={row.key}
      title={
        <span className="flex items-center gap-[var(--spacing-2xs)]">
          {row.title}
          {row.recommended && (
            <Badge variant="success" className="font-normal">
              Recommended
            </Badge>
          )}
        </span>
      }
      description={row.description}
      htmlFor={`notif-${row.key}`}
      control={
        <Switch
          id={`notif-${row.key}`}
          checked={value[row.key]}
          onCheckedChange={(v) => update({ [row.key]: v })}
          aria-label={row.title}
        />
      }
    />
  );

  return (
    <>
      <SettingGroup title="Delivery" description="Where Veyra can reach you.">
        {DELIVERY.map(renderRow)}
      </SettingGroup>

      <Separator />

      <SettingGroup title="What you get" description="Fine-tune the kinds of updates you receive.">
        {CATEGORIES.map(renderRow)}
      </SettingGroup>
    </>
  );
}
