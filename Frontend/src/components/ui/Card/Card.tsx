/**
 * VEYRA — Card Primitives
 * Source: design_system/Components/card.md
 *
 * Foundation layer only — raw structural primitives.
 * Semantic card variants (MetricCard, InsightCard, etc.)
 * are composed from these in their own pattern files.
 *
 * Rules:
 * - Use Veyra color/spacing/radius/border/motion tokens
 * - No hardcoded arbitrary values
 * - Non-interactive cards: no hover treatment
 * - Interactive cards: subtle hover via the `interactive` prop
 */

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { FinancialPattern, type PatternVariant, type Tone, type Intensity } from "@/components/visuals";

/* ─── Root Card ─────────────────────────────────────────── */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Add subtle hover treatment for clickable/interactive cards */
  interactive?: boolean;
  /** Tinted surface variant for visual hierarchy (defaults to neutral surface-1) */
  surface?: Surface;
  /** Optional subtle financial artwork behind the card content (decorative only) */
  decoration?: PatternVariant;
  /** Double-layer coloured side frame (two spread rings outside the border) */
  frame?: FrameTone;
}

/** Documented Veyra card surfaces — colour.md + card.md mapping. */
export type Surface =
  | "default"
  | "blue"
  | "sky"
  | "navy"
  | "green"
  | "slate"
  | "warm"
  | "lavender"
  | "brand";

/** Frame tones for the double-border layer effect.
 *  "medium" = one visible step above the quiet grey. */
export type FrameTone =
  | "blue"
  | "green"
  | "amber"
  | "violet"
  | "rose"
  | "white"
  | "medium";

/* Two spread box-shadow rings = two subtle border layers around the card,
   at a tiny offset. Tones currently resolve to one quiet grey so
   the frame whispers instead of dominating. White adds a crisp
   bright halo; medium adds a gentle cobalt presence. */
const frameShadowByTone: Record<FrameTone, string> = {
  blue: "shadow-[0_0_0_1px_rgba(11,31,58,0.08),0_0_0_4px_rgba(11,31,58,0.04),var(--shadow-raised)]",
  green: "shadow-[0_0_0_1px_rgba(11,31,58,0.08),0_0_0_4px_rgba(11,31,58,0.04),var(--shadow-raised)]",
  amber: "shadow-[0_0_0_1px_rgba(11,31,58,0.08),0_0_0_4px_rgba(11,31,58,0.04),var(--shadow-raised)]",
  violet: "shadow-[0_0_0_1px_rgba(11,31,58,0.08),0_0_0_4px_rgba(11,31,58,0.04),var(--shadow-raised)]",
  rose: "shadow-[0_0_0_1px_rgba(11,31,58,0.08),0_0_0_4px_rgba(11,31,58,0.04),var(--shadow-raised)]",
  white: "shadow-[0_0_0_1px_rgba(255,255,255,0.95),0_0_0_5px_rgba(255,255,255,0.6),var(--shadow-raised)]",
  medium:
    "shadow-[0_0_0_2px_rgba(104,126,255,0.5),0_0_0_8px_rgba(104,126,255,0.14),var(--shadow-raised)]",
};

const surfaceClasses: Record<Surface, string> = {
  default: "bg-[var(--color-surface-1)]",
  blue: "bg-[var(--color-surface-blue)]",
  sky: "bg-[var(--color-surface-sky)]",
  navy: "bg-[var(--color-surface-navy)]",
  green: "bg-[var(--color-surface-green)]",
  slate: "bg-[var(--color-surface-slate)]",
  warm: "bg-[var(--color-surface-amber)]",
  lavender: "bg-[var(--color-surface-lavender)]",
  brand: "bg-[var(--color-surface-brand)]",
};

/* Decoration artwork must contrast its surface: navy-tone strokes on the navy
   card are invisible, so dark surfaces get the light tone at higher intensity. */
const decorationToneBySurface: Partial<Record<Surface, Tone>> = {
  navy: "soft",
};

const decorationIntensityBySurface: Partial<Record<Surface, Intensity>> = {
  navy: "high",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, surface = "default", decoration, frame, children, ...props }, ref) => (
    <div
      ref={ref}
      data-surface={surface}
      className={cn(
        surfaceClasses[surface],
        "relative",
        "border border-[var(--color-border)]",
        "rounded-[var(--radius-card)]",
        frame && frameShadowByTone[frame],
        decoration && "overflow-hidden",
        interactive && [
          "cursor-pointer",
          "transition-all duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
          "hover:-translate-y-0.5 hover:shadow-[var(--shadow-raised)] hover:border-[var(--color-primary)]",
        ],
        className
      )}
      {...props}
    >
      {decoration && (
        <FinancialPattern
          variant={decoration}
          tone={decorationToneBySurface[surface] ?? "blue"}
          intensity={decorationIntensityBySurface[surface] ?? "medium"}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}
      {decoration ? <div className="relative z-10">{children}</div> : children}
    </div>
  )
);
Card.displayName = "Card";

/* ─── Card Header ───────────────────────────────────────── */

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-[var(--spacing-2xs)] p-[var(--spacing-lg)] pb-0",
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/* ─── Card Title ─────────────────────────────────────────── */

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)]",
        "leading-[var(--typography-h3-line)] tracking-[var(--typography-h3-tracking)]",
        "text-[var(--color-text-primary)]",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

/* ─── Card Description ───────────────────────────────────── */

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)]",
        "text-[var(--color-text-secondary)]",
        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

/* ─── Card Content ───────────────────────────────────────── */

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-[var(--spacing-lg)]", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

/* ─── Card Footer ────────────────────────────────────────── */

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-[var(--spacing-lg)] pt-0",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
