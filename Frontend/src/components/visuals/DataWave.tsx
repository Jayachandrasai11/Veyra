/**
 * Veyra — Named financial-decoration primitives.
 * Thin, configurable wrappers over FinancialPattern so pages can use
 * intent-revealing components instead of raw SVG.
 */

import { cn } from "@/lib/cn";
import { FinancialPattern, type Tone, type Intensity } from "./FinancialPattern";

interface CommonProps {
  tone?: Tone;
  intensity?: Intensity;
  className?: string;
}

/** Soft layered financial-data contours. */
export function DataWave({ tone = "blue", intensity = "low", className }: CommonProps) {
  return (
    <FinancialPattern
      variant="wave"
      tone={tone}
      intensity={intensity}
      className={cn("h-full w-full", className)}
    />
  );
}

/** Minimal thin data-grid structure. */
export function FinancialGrid({ tone = "navy", intensity = "low", className }: CommonProps) {
  return (
    <FinancialPattern
      variant="grid"
      tone={tone}
      intensity={intensity}
      className={cn("h-full w-full", className)}
    />
  );
}

/** Abstract up/down financial trend lines + data points. */
export function TrendDecoration({ tone = "navy", intensity = "low", className }: CommonProps) {
  return (
    <FinancialPattern
      variant="trend"
      tone={tone}
      intensity={intensity}
      className={cn("h-full w-full", className)}
    />
  );
}
