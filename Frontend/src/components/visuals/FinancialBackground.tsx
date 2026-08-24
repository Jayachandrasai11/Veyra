/**
 * Veyra — FinancialBackground
 * Positioning wrapper around FinancialPattern for placing artwork
 * into empty/background areas (dashboard, sidebar, hero, empty-states).
 *
 * The artwork is always aria-hidden and pointer-events-none.
 */

import { cn } from "@/lib/cn";
import {
  FinancialPattern,
  type PatternVariant,
  type Tone,
  type Intensity,
} from "./FinancialPattern";

type Position = "right" | "left" | "top" | "bottom" | "behind" | "center";

const positionClass: Record<Position, string> = {
  right: "absolute right-0 top-0 h-full w-1/2",
  left: "absolute left-0 top-0 h-full w-1/2",
  top: "absolute top-0 left-0 right-0 h-1/2",
  bottom: "absolute bottom-0 left-0 right-0 h-1/2",
  behind: "absolute inset-0",
  center: "absolute inset-0",
};

interface FinancialBackgroundProps {
  variant?: PatternVariant;
  tone?: Tone;
  intensity?: Intensity;
  position?: Position;
  className?: string;
}

export function FinancialBackground({
  variant = "trend",
  tone = "navy",
  intensity = "low",
  position = "behind",
  className,
}: FinancialBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none", positionClass[position], className)}
    >
      <FinancialPattern variant={variant} tone={tone} intensity={intensity} />
    </div>
  );
}
