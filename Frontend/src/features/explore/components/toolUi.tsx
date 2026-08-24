/**
 * VEYRA — Explore Tool UI Primitives
 * Source: design_system/Components/{inputs_forms,metric,Progressions}.md
 *
 * Shared, reusable building blocks for Explore tools.
 * Every tool (calculators, planners, compare) composes these
 * so the experience stays visually consistent.
 *
 * Tokens only. Keyboard accessible. Visible focus.
 */

import type { ReactNode } from "react";
import { Input, InputWrapper } from "@/components/ui/Input/Input";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { cn } from "@/lib/cn";

/* ─── Two-column tool layout ─────────────────────────────
 * Inputs on the left, results pinned on the right (desktop).
 * Stacks on tablet / mobile. */
export function ToolLayout({
  inputs,
  results,
  note,
}: {
  inputs: ReactNode;
  results: ReactNode;
  note?: string;
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[var(--spacing-lg)] items-start">
      <div className="flex flex-col gap-[var(--spacing-md)]">{inputs}</div>
      <div className="flex flex-col gap-[var(--spacing-md)] lg:sticky lg:top-[var(--spacing-lg)]">
        {results}
      </div>
      {note && (
        <p className="lg:col-span-2 text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)] leading-[var(--typography-caption-line)]">
          {note}
        </p>
      )}
    </div>
  );
}

/* ─── Labelled numeric field ──────────────────────────── */
export function Field({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  step = 1,
  helperText,
}: {
  id: string;
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
}) {
  const hasAffix = Boolean(prefix || suffix);
  return (
    <InputWrapper label={label} htmlFor={id} helperText={helperText}>
      {hasAffix ? (
        <div className="relative">
          {prefix && (
            <span
              className="absolute left-[var(--spacing-sm)] top-1/2 -translate-y-1/2 text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] pointer-events-none"
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(e.target.value)}
            className={cn(prefix && "pl-7", suffix && "pr-9")}
          />
          {suffix && (
            <span
              className="absolute right-[var(--spacing-sm)] top-1/2 -translate-y-1/2 text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] pointer-events-none"
              aria-hidden="true"
            >
              {suffix}
            </span>
          )}
        </div>
      ) : (
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </InputWrapper>
  );
}

/* ─── Result statistic ────────────────────────────────── */
export function ResultStat({
  label,
  value,
  sub,
  emphasis = false,
}: {
  label: string;
  value: string;
  sub?: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[2px]">
      <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">
        {label}
      </span>
      <span
        className={cn(
          "font-semibold text-[var(--color-text-primary)] tabular-nums",
          emphasis
            ? "text-[length:var(--typography-financial-hero-size)] leading-[var(--typography-financial-hero-line)] tracking-[var(--typography-financial-hero-tracking)]"
            : "text-[length:var(--typography-financial-size)] leading-[var(--typography-financial-line)]"
        )}
      >
        {value}
      </span>
      {sub && (
        <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)]">
          {sub}
        </span>
      )}
    </div>
  );
}

/* ─── Results panel ───────────────────────────────────── */
export function ResultPanel({
  title,
  children,
  surface = "sky",
}: {
  title: string;
  children: ReactNode;
  surface?: "default" | "blue" | "sky" | "navy" | "green" | "slate" | "warm" | "lavender" | "brand";
}) {
  return (
    <Card surface={surface} className="border-0">
      <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-md)]">
        <h3 className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]">
          {title}
        </h3>
        {children}
      </CardContent>
    </Card>
  );
}

/* ─── Proportional split bar ──────────────────────────── */
export interface SplitSegment {
  label: string;
  value: number;
  className: string;
}

export function SplitBar({ segments, ariaLabel }: { segments: SplitSegment[]; ariaLabel: string }) {
  const total = segments.reduce((s, seg) => s + Math.max(0, seg.value), 0) || 1;
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="flex w-full h-3 overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-surface-2)]"
    >
      {segments.map((seg, i) => {
        const pct = (Math.max(0, seg.value) / total) * 100;
        if (pct <= 0) return null;
        return (
          <div
            key={`${seg.label}-${i}`}
            className={seg.className}
            style={{ width: `${pct}%` }}
          />
        );
      })}
    </div>
  );
}

export function SplitLegend({ segments }: { segments: SplitSegment[] }) {
  return (
    <ul className="flex flex-wrap gap-x-[var(--spacing-lg)] gap-y-[var(--spacing-2xs)]">
      {segments.map((seg) => (
        <li key={seg.label} className="flex items-center gap-[var(--spacing-2xs)]">
          <span className={cn("w-2.5 h-2.5 rounded-[var(--radius-xs)]", seg.className)} aria-hidden="true" />
          <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)]">
            {seg.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
