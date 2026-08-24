/**
 * Veyra — Brand primitives
 *
 * Company logo as a first-class component: the official emblem
 * (white background removed for transparent surfaces) plus a
 * typographic lockup — never a raw raster drop-in.
 */

import { cn } from "@/lib/cn";

/** Emblem only — the official Veyra mark (Blue V), alpha-cleaned for glass surfaces. */
export function VeyraMark({
  size = 46,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src="/assets/veyra-emblem.png"
      alt="Veyra"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain select-none", className)}
      draggable={false}
    />
  );
}

/** Emblem + wordmark lockup. `stacked` breaks the slogan into two
 *  balanced lines; `tagline` shows the slogan (landing/navbar only —
 *  the application sidebar stays slogan-free per the brand system). */
export function VeyraLockup({
  className,
  stacked = false,
  tagline = false,
  light = false,
}: {
  className?: string;
  stacked?: boolean;
  tagline?: boolean;
  /** For colored surfaces — flips wordmark/tagline to white */
  light?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-[10px]", className)}>
      <VeyraMark size={32} className="shrink-0" />
      <span className="min-w-0">
        <span
          className={cn(
            "block font-bold text-[length:var(--typography-body-size)] tracking-tight",
            light ? "text-white" : "text-[var(--color-text-primary)]"
          )}
        >
          Veyra
        </span>
        {tagline &&
          (stacked ? (
            <span
              className={cn(
                "block text-[11px] leading-[1.35]",
                light ? "text-white/75" : "text-[var(--color-text-tertiary)]"
              )}
            >
              Know your money.
              <br />
              Move with purpose.
            </span>
          ) : (
            <span
              className={cn(
                "block whitespace-nowrap text-[length:var(--typography-caption-size)] leading-snug",
                light ? "text-white/75" : "text-[var(--color-text-tertiary)]"
              )}
            >
              Know your money. Move with purpose.
            </span>
          ))}
      </span>
    </span>
  );
}
