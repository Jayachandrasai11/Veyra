/**
 * VEYRA — Appearance Settings Section
 * Source: design_system/Deisgntokens/master.md (light-only theming)
 *         design_system/Foundations/icons.md (Lucide only)
 *         design_system/Accessibility.md (not color-alone state)
 */

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Switch } from "@/components/ui/Switch/Switch";
import { SettingGroup, SettingRow } from "../SettingsPrimitives";
import { ACCENT_OPTIONS } from "../../constants";
import type { AccentColor, AppearanceSettings } from "../../types";

interface AppearanceSectionProps {
  value: AppearanceSettings;
  update: (patch: Partial<AppearanceSettings>) => void;
}

/**
 * Keyboard support for a single-select radiogroup (ARIA pattern):
 * Arrow keys move and select, Home/End jump to first/last.
 */
function handleRadioGroupKeyDown(
  e: React.KeyboardEvent<HTMLDivElement>,
  values: string[],
  current: string,
  select: (value: string) => void
) {
  const nextKeys = ["ArrowRight", "ArrowDown"];
  const prevKeys = ["ArrowLeft", "ArrowUp"];
  const idx = values.indexOf(current);
  if (idx === -1) return;

  let next = -1;
  if (nextKeys.includes(e.key)) next = (idx + 1) % values.length;
  else if (prevKeys.includes(e.key)) next = (idx - 1 + values.length) % values.length;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = values.length - 1;
  else return;

  e.preventDefault();
  select(values[next]);
}

export function AppearanceSection({ value, update }: AppearanceSectionProps) {
  return (
    <SettingGroup title="Appearance" description="Personalize how Veyra looks and feels.">
      <SettingRow
        title="Accent color"
        description="Used for primary actions and highlights across Veyra."
        htmlFor="appearance-accent"
        control={
          <div
            id="appearance-accent"
            role="radiogroup"
            aria-label="Accent color"
            onKeyDown={(e) =>
              handleRadioGroupKeyDown(
                e,
                ACCENT_OPTIONS.map((o) => o.value),
                value.accent,
                (v) => update({ accent: v as AccentColor })
              )
            }
            className="flex flex-wrap gap-[var(--spacing-sm)]"
          >
            {ACCENT_OPTIONS.map((opt) => {
              const selected = value.accent === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={selected} tabIndex={selected ? 0 : -1}
                  aria-label={opt.label}
                  title={opt.label}
                  onClick={() => update({ accent: opt.value as AccentColor })}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)]",
                    "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                    "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                    "focus-visible:outline-offset-[var(--focus-ring-offset)]",
                    selected && "ring-2 ring-offset-2 ring-[var(--color-primary)] ring-offset-[var(--color-surface-1)]"
                  )}
                  style={{ backgroundColor: opt.hex }}
                >
                  {selected && <Check size={16} strokeWidth={3} className="text-white" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        }
      />

      <SettingRow
        title="Density"
        description="Comfortable spacing or a more compact layout."
        htmlFor="appearance-density"
        control={
          <div
            id="appearance-density"
            role="radiogroup"
            aria-label="Density"
            onKeyDown={(e) =>
              handleRadioGroupKeyDown(
                e,
                ["comfortable", "compact"],
                value.density,
                (v) => update({ density: v as AppearanceSettings["density"] })
              )
            }
            className="inline-flex rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-2)] p-[var(--spacing-2xs)]"
          >
            {(["comfortable", "compact"] as const).map((opt) => {
              const selected = value.density === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={selected} tabIndex={selected ? 0 : -1}
                  onClick={() => update({ density: opt })}
                  className={cn(
                    "rounded-[var(--radius-sm)] px-[var(--spacing-md)] py-[var(--spacing-2xs)]",
                    "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] capitalize",
                    "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                    "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                    "focus-visible:outline-offset-[var(--focus-ring-offset)]",
                    selected
                      ? "bg-[var(--color-surface-1)] text-[var(--color-text-primary)] shadow-[var(--shadow-card)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        }
      />

      <SettingRow
        title="Reduce motion"
        description="Minimize animations and transitions throughout the app."
        htmlFor="appearance-reduce-motion"
        control={
          <Switch
            id="appearance-reduce-motion"
            checked={value.reduceMotion}
            onCheckedChange={(v) => update({ reduceMotion: v })}
            aria-label="Reduce motion"
          />
        }
      />
    </SettingGroup>
  );
}
