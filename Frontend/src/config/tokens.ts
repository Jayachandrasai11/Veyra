/**
 * VEYRA DESIGN TOKENS — JavaScript Reference
 * ─────────────────────────────────────────────
 * Source of truth: design_system/Foundations/
 *
 * Use these for:
 *  - Motion (motion/react) duration/easing values
 *  - Recharts chart config (colors, radius, spacing)
 *  - Dynamic inline styles where CSS vars can't be used
 *  - Unit tests / token verification
 *
 * Do NOT use for anything a CSS variable can handle.
 * ─────────────────────────────────────────────
 */

// ─── Colors ──────────────────────────────────────────
// Reference only — components should prefer CSS vars.
// These match colour.md light-mode values.
export const colors = {
  // Surfaces
  background: '#f6fafe',
  surface1:   '#ffffff',
  surface2:   '#f0f6fc',
  surface3:   '#e6f0fa',

  // Text
  textPrimary:   '#172033',
  textSecondary: '#526071',
  textTertiary:  '#7a8798',
  textDisabled:  '#a7b1bd',

  // Brand
  primary:       '#2153E6',
  primaryHover:  '#1A42C2',
  primarySoft:   '#E9EFFF',
  accent:        '#2094f3',
  accentSoft:    '#eaf5ff',

  // Border
  border: '#dce6f0',

  // Semantic
  success:     '#16803c',
  successSoft: '#e8f5ec',
  warning:     '#b7791f',
  warningSoft: '#fff7e6',
  error:       '#c62828',
  errorSoft:   '#fdecec',
  info:        '#2094f3',
  infoSoft:    '#eaf5ff',
} as const;

// Dark mode chart override (recharts uses inline colors)
export const colorsDark = {
  background: '#010509',
  surface1:   '#07101a',
  surface2:   '#0b1622',
  surface3:   '#102030',
  textPrimary:   '#f7faff',
  textSecondary: '#b7c2d0',
  primary:       '#5f9af2',
  accent:        '#0c80df',
  border:        '#1c2b3a',
  success:       '#4ade80',
  warning:       '#f2b84b',
  error:         '#f87171',
} as const;

// ─── Spacing (px numbers for JS use) ─────────────────
export const spacing = {
  '2xs': 4,
  xs:    8,
  sm:    12,
  md:    16,
  lg:    24,
  xl:    32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
} as const;

// ─── Border Radius ────────────────────────────────────
export const radius = {
  xs:   4,
  sm:   6,
  md:   8,
  lg:   12,
  xl:   16,
  full: 9999,
  // Semantic
  card:   12,
  button: 8,
  input:  8,
  badge:  9999,
  avatar: 9999,
} as const;

// ─── Motion ───────────────────────────────────────────
// For use with motion/react
export const duration = {
  fast:     0.12,   // 120ms
  normal:   0.20,   // 200ms
  slow:     0.36,   // 360ms
  emphasis: 0.50,   // 500ms
} as const;

export const easing = {
  fast:     [0, 0, 0.58, 1]          as [number,number,number,number], // ease-out
  normal:   [0.42, 0, 0.58, 1]       as [number,number,number,number], // ease-in-out
  slow:     [0.34, 1.56, 0.64, 1]    as [number,number,number,number], // spring approx
  emphasis: [0.16, 1, 0.3, 1]        as [number,number,number,number], // gentle spring
} as const;

// Per-component motion presets (pass directly to motion/react `transition`)
export const motionPresets = {
  cardHover: {
    duration: duration.fast,
    ease: easing.fast,
  },
  sidebar: {
    duration: duration.normal,
    ease: easing.normal,
  },
  modal: {
    duration: duration.normal,
    ease: easing.fast,
  },
  progress: {
    duration: duration.emphasis,
    ease: easing.fast,
  },
  number: {
    duration: duration.slow,
    ease: easing.normal,
  },
  aiResponse: {
    duration: duration.slow,
    ease: easing.fast,
  },
} as const;

// ─── Icon sizes ───────────────────────────────────────
export const iconSize = {
  xs: 16,   // metadata, compact
  sm: 18,   // nav, standard UI
  md: 20,   // primary controls
  lg: 24,   // prominent
} as const;

export const iconStroke = {
  default:   2,
  secondary: 1.5,
} as const;

// ─── Breakpoints ──────────────────────────────────────
export const breakpoints = {
  tablet:  768,
  desktop: 1200,
} as const;

// ─── Z-index ──────────────────────────────────────────
export const zIndex = {
  base:     0,
  raised:   1,
  dropdown: 20,
  sticky:   30,
  overlay:  40,
  modal:    50,
  toast:    60,
} as const;

// ─── App Shell dimensions ─────────────────────────────
export const shell = {
  sidebarWidth:          248,
  sidebarWidthCollapsed: 72,
  headerHeightDesktop:   64,
  headerHeightMobile:    56,
} as const;

// ─── Elevation / Shadows ─────────────────────────────
// CSS strings for recharts or dynamic inline usage
export const shadows = {
  none:    'none',
  card:    '0 1px 3px rgba(15, 35, 55, 0.06)',
  raised:  '0 4px 12px rgba(15, 35, 55, 0.10)',
  overlay: '0 12px 32px rgba(15, 35, 55, 0.16)',
} as const;
