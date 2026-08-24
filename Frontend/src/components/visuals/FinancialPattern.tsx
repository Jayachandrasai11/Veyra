/**
 * Veyra — FinancialPattern
 * Source: design_system (Background Visual Concept)
 *
 * Reusable abstract financial artwork rendered as inline SVG.
 * Intended as a SUBORDINATE, decorative layer (5–12% emphasis).
 *
 * Rules:
 * - Only uses the existing Veyra palette (navy / blue / soft).
 * - Very low opacity by default.
 * - aria-hidden by the component (decorative only).
 * - Static by default — no continuous animation.
 *
 * Variants:
 *   trend  — abstract up/down financial trend lines + data points
 *   wave   — soft layered financial-data contours
 *   grid   — minimal thin data grid structure
 *   bars   — minimal bar-chart geometry
 *   dots   — abstract financial data points
 *   coins  — abstract coin stacks + floating coins (money, not charts)
 *   target — concentric goal rings (planning)
 *   save   — coin dropping into a jar slot (savings)
 */

import { cn } from "@/lib/cn";

export type PatternVariant = "trend" | "wave" | "grid" | "bars" | "dots" | "coins" | "target" | "save";
export type Tone = "navy" | "blue" | "soft" | "white";
export type Intensity = "low" | "medium" | "high";

const toneColor: Record<Tone, string> = {
  navy: "var(--color-financial)",
  blue: "var(--color-primary)",
  soft: "var(--color-primary-soft)",
  white: "#FFFFFF",
};

const intensityOpacity: Record<Intensity, number> = {
  low: 0.05,
  medium: 0.09,
  high: 0.13,
};

interface FinancialPatternProps {
  variant?: PatternVariant;
  tone?: Tone;
  intensity?: Intensity;
  /** Stroke width in SVG user units (geometry, not a magic UI value) */
  strokeWidth?: number;
  className?: string;
}

export function FinancialPattern({
  variant = "trend",
  tone = "navy",
  intensity = "low",
  strokeWidth = 1.5,
  className,
}: FinancialPatternProps) {
  const color = toneColor[tone];
  const opacity = intensityOpacity[intensity];

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <g
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        opacity={opacity}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {variant === "grid" && <GridLines />}
        {variant === "trend" && <TrendLines color={color} />}
        {variant === "wave" && <WaveLines />}
        {variant === "bars" && <BarLines />}
        {variant === "dots" && <DotPoints />}
        {variant === "coins" && <CoinShapes color={color} />}
        {variant === "target" && <TargetRings color={color} />}
        {variant === "save" && <SavingsJar color={color} />}
      </g>
    </svg>
  );
}

/* ─── Variant geometry (viewBox 400 × 300) ─────────────────── */

function GridLines() {
  const cols = Array.from({ length: 11 }, (_, i) => i * 40);
  const rows = Array.from({ length: 8 }, (_, i) => i * 40);
  return (
    <>
      {cols.map((x) => (
        <line key={`v${x}`} x1={x} y1={0} x2={x} y2={300} />
      ))}
      {rows.map((y) => (
        <line key={`h${y}`} x1={0} y1={y} x2={400} y2={y} />
      ))}
    </>
  );
}

function TrendLines({ color }: { color: string }) {
  const main = "0,250 50,232 100,242 150,205 200,214 250,165 300,178 350,128 400,140";
  const sub = "0,272 60,262 120,268 180,242 240,250 300,226 360,232 400,212";
  const points: Array<[number, number]> = [
    [50, 232],
    [150, 205],
    [250, 165],
    [350, 128],
  ];
  return (
    <>
      {/* Area fill under the rising line — reads as a growing balance chart */}
      <polygon points={`${main} 400,300 0,300`} fill={color} stroke="none" opacity={0.35} />
      <polyline points={sub} opacity={0.5} />
      <polyline points={main} />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill={color} stroke="none" />
      ))}
    </>
  );
}

function WaveLines() {
  return (
    <>
      <path d="M0,180 C90,130 180,220 280,170 C340,142 380,160 400,152" opacity={0.6} />
      <path d="M0,210 C90,160 180,250 280,200 C340,172 380,190 400,182" />
      <path d="M0,240 C90,200 180,280 280,235 C340,212 380,225 400,215" opacity={0.6} />
    </>
  );
}

function BarLines() {
  const heights = [60, 92, 50, 120, 80, 140, 70, 110, 96, 130];
  const barW = 16;
  const step = 40;
  const startX = 20;
  return (
    <>
      {heights.map((h, i) => (
        <rect key={i} x={startX + i * step} y={300 - h} width={barW} height={h} rx={4} />
      ))}
    </>
  );
}

function DotPoints() {
  const xs = [50, 110, 170, 230, 290, 350];
  const ys = [60, 120, 180, 240];
  return (
    <>
      {xs.flatMap((x) =>
        ys.map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r={2.5} />)
      )}
    </>
  );
}

function CoinShapes({ color }: { color: string }) {
  return (
    <>
      {/* Coin stack, lower left */}
      <ellipse cx={70} cy={256} rx={36} ry={11} />
      <ellipse cx={70} cy={240} rx={36} ry={11} opacity={0.7} />
      <ellipse cx={70} cy={224} rx={36} ry={11} opacity={0.45} />
      {/* Lone coins with inner rings */}
      <circle cx={214} cy={196} r={24} />
      <circle cx={214} cy={196} r={15} opacity={0.5} />
      <circle cx={306} cy={112} r={17} />
      <circle cx={306} cy={112} r={10} opacity={0.5} />
      <circle cx={128} cy={104} r={12} opacity={0.7} />
      {/* Small drifting coins */}
      <circle cx={354} cy={224} r={9} fill={color} stroke="none" opacity={0.6} />
      <circle cx={252} cy={56} r={6} fill={color} stroke="none" opacity={0.5} />
      <circle cx={168} cy={158} r={5} fill={color} stroke="none" opacity={0.4} />
    </>
  );
}

function TargetRings({ color }: { color: string }) {
  return (
    <>
      {/* Concentric goal rings, offset so the composition survives corner crops */}
      <circle cx={268} cy={158} r={92} />
      <circle cx={268} cy={158} r={62} opacity={0.7} />
      <circle cx={268} cy={158} r={34} opacity={0.5} />
      <circle cx={268} cy={158} r={10} fill={color} stroke="none" />
      {/* Orbiting milestone marker */}
      <circle cx={330} cy={96} r={8} fill={color} stroke="none" opacity={0.6} />
    </>
  );
}

function SavingsJar({ color }: { color: string }) {
  return (
    <>
      {/* Jar body */}
      <rect x={148} y={118} width={112} height={132} rx={30} />
      {/* Slot */}
      <ellipse cx={204} cy={118} rx={28} ry={6} />
      {/* Coin mid-drop */}
      <circle cx={204} cy={66} r={16} />
      <circle cx={204} cy={66} r={9} opacity={0.5} />
      {/* Motion trail */}
      <circle cx={204} cy={94} r={3} fill={color} stroke="none" opacity={0.6} />
      <circle cx={204} cy={106} r={2.2} fill={color} stroke="none" opacity={0.45} />
      {/* Ground shadow */}
      <ellipse cx={204} cy={260} rx={62} ry={8} opacity={0.35} />
    </>
  );
}
