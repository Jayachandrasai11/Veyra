/**
 * Veyra — InsightTicker
 * Source: design_system/Layout/Dashboard.md
 *
 * Slim animated band under the greeting: live financial signals glide
 * left-to-right, telling the user their money story at a glance.
 *
 * Rules:
 * - One line tall (~52px) — atmosphere, never a content section
 * - Seamless loop via duplicated track; pauses under reduced-motion
 * - Every signal = icon + concrete number (meaningful, not filler)
 */

import {
  TrendingUp,
  Sparkles,
  Target,
  ShieldCheck,
  ReceiptText,
  Banknote,
} from "lucide-react";

const SIGNALS: Array<{
  icon: React.ComponentType<{ size: number; strokeWidth: number; color?: string }>;
  color: string;
  text: string;
}> = [
  { icon: TrendingUp, color: "var(--color-success)", text: "Net worth up 11.6% in six months" },
  { icon: Sparkles, color: "var(--color-primary)", text: "Veyra spotted 3 new spending patterns" },
  { icon: Target, color: "#6D28D9", text: "Vacation fund crossed 40%" },
  { icon: ShieldCheck, color: "var(--color-success)", text: "Emergency fund on track — 82%" },
  { icon: ReceiptText, color: "#B7791F", text: "Dining spend cooled 12% this week" },
  { icon: Banknote, color: "var(--color-primary)", text: "Cash flow +₹2,858 this month" },
];

export function InsightTicker({ className }: { className?: string }) {
  const track = [...SIGNALS, ...SIGNALS];
  return (
    <div
      aria-hidden="true"
      className={
        "relative w-full overflow-hidden rounded-[var(--radius-full)] border border-[var(--color-border)] bg-white/70 py-[10px] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]" +
        (className ? ` ${className}` : "")
      }
    >
      <div className="animate-ticker flex w-max items-center gap-3 pl-3">
        {track.map(({ icon: Icon, color, text }, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-border)] bg-white px-3 py-1.5 shadow-[0_2px_8px_rgba(11,31,58,0.06)]"
          >
            <Icon size={14} strokeWidth={2.25} color={color} />
            <span className="whitespace-nowrap text-[length:var(--typography-caption-size)] font-medium text-[var(--color-text-secondary)]">
              {text}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
