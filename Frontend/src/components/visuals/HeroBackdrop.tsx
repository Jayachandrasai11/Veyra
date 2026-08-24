/**
 * Veyra — HeroBackdrop
 * Decorative hero background: a faint spreadsheet-style grid of market
 * numbers at the top that dissolves into layered area-chart silhouettes
 * with trend lines and data-point markers at the bottom.
 *
 * Subordinate, decorative layer only (aria-hidden, pointer-events none).
 * Uses the existing Veyra palette (navy / primary blue / soft blues).
 * Static by default — no continuous animation.
 */

import { cn } from "@/lib/cn";

interface HeroBackdropProps {
  className?: string;
}

/** Deterministic PRNG so the rendered numbers never shift between loads */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260823);

const COLS = Array.from({ length: 19 }, (_, i) => 24 + i * 78);
const ROWS = Array.from({ length: 13 }, (_, i) => 26 + i * 38);

const DATA_CELLS = COLS.flatMap((x, ci) =>
  ROWS.map((y, ri) => {
    const v = rand();
    const value = v > 0.82 ? (2140 + rand() * 900).toFixed(2) : (rand() * 560 + 4).toFixed(2);
    return { x, y, value, key: `${ci}-${ri}` };
  }),
);

export function HeroBackdrop({ className }: HeroBackdropProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 select-none", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMax slice"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Data-grid dissolve mask: strong at top, gone by mid-hero */}
          <linearGradient id="veyra-data-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="0.32" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="0.52" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="veyra-data-mask">
            <rect x="0" y="0" width="1440" height="720" fill="url(#veyra-data-fade)" />
          </mask>

          {/* Area-chart fills */}
          <linearGradient id="veyra-peak-1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#BBD9F0" />
            <stop offset="1" stopColor="#DCEEFA" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="veyra-peak-2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#A9CDEA" />
            <stop offset="1" stopColor="#CFE6F8" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="veyra-peak-3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C3DEF4" />
            <stop offset="1" stopColor="#EAF4FC" />
          </linearGradient>
        </defs>

        {/* ── Spreadsheet data grid (top, dissolving downward) ── */}
        <g mask="url(#veyra-data-mask)">
          <g stroke="#C7D9EA" strokeWidth="1" opacity="0.45">
            {COLS.map((x) => (
              <line key={`v${x}`} x1={x - 20} y1={0} x2={x - 20} y2={430} />
            ))}
            {ROWS.map((y) => (
              <line key={`h${y}`} x1={0} y1={y + 14} x2={1440} y2={y + 14} />
            ))}
          </g>
          <g
            fill="#7FA6C4"
            fontSize="13"
            fontFamily="'Inter', system-ui, sans-serif"
            style={{ fontVariantNumeric: "tabular-nums" }}
            opacity="0.5"
          >
            {DATA_CELLS.map((cell) => (
              <text
                key={cell.key}
                x={cell.x}
                y={cell.y}
                textAnchor={cell.x > 1400 ? "end" : "start"}
              >
                {cell.value}
              </text>
            ))}
          </g>
        </g>

        {/* ── Layered area-chart mountains (bottom) ── */}
        <path
          d="M0,520 L110,468 L240,502 L400,428 L560,476 L720,398 L880,442 L1030,330 L1170,398 L1300,352 L1440,262 L1440,720 L0,720 Z"
          fill="url(#veyra-peak-1)"
          opacity="0.6"
        />
        <path
          d="M0,594 L150,542 L310,586 L480,498 L650,556 L840,470 L1020,532 L1210,442 L1340,488 L1440,462 L1440,720 L0,720 Z"
          fill="url(#veyra-peak-2)"
          opacity="0.7"
        />
        <path
          d="M0,652 L185,610 L365,648 L565,574 L765,630 L965,558 L1165,610 L1330,564 L1440,588 L1440,720 L0,720 Z"
          fill="url(#veyra-peak-3)"
          opacity="0.85"
        />

        {/* ── Trend lines with data-point markers ── */}
        <g
          stroke="#5E97CC"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        >
          <polyline points="0,600 170,556 340,608 520,536 700,582 880,512 1060,552 1240,486 1440,522" />
        </g>
        <g
          stroke="#7FB0DC"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        >
          <polyline points="0,662 200,616 380,664 560,590 760,636 960,564 1180,612 1360,570 1440,582" />
        </g>
        <g fill="#FFFFFF" stroke="#5E97CC" strokeWidth="2.5" opacity="0.65">
          {[
            [170, 556],
            [520, 536],
            [880, 512],
            [1240, 486],
          ].map(([cx, cy]) => (
            <circle key={`m${cx}`} cx={cx} cy={cy} r="7" />
          ))}
        </g>
        <g fill="#FFFFFF" stroke="#7FB0DC" strokeWidth="2.5" opacity="0.55">
          {[
            [200, 616],
            [560, 590],
            [960, 564],
            [1360, 570],
          ].map(([cx, cy]) => (
            <circle key={`s${cx}`} cx={cx} cy={cy} r="6" />
          ))}
        </g>
      </svg>
    </div>
  );
}
