/**
 * Fermor/Veyra — PlansPage
 * Source: design_system/Architecture/Plans.md
 *
 * Pattern: Upgrade / Plans
 * Structure: centered header + billing toggle + 3-tier pricing grid
 *
 * Rules:
 * - Pro tier is the visual hero (cobalt gradient, slightly raised)
 * - Prices switch Monthly / Yearly (yearly = 2 months free)
 * - Feature lists use Check icons + text, never color-alone
 * - Calm premium fintech tone; no marketing hype
 */

import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

type Billing = "monthly" | "yearly";

interface Plan {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  blurb: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    yearly: 0,
    blurb: "Everything you need to see your money clearly.",
    features: [
      "Net worth & cash-flow tracking",
      "1 connected account",
      "Weekly insight digest",
      "3 financial goals",
    ],
    cta: "Current plan",
    href: "/dashboard",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 299,
    yearly: 2990,
    blurb: "The full Veyra intelligence layer.",
    features: [
      "Unlimited account connections",
      "Veyra noticed — real-time change alerts",
      "Smart reminders & bill radar",
      "Goal forecasting & recommended top-ups",
      "Advanced insights library",
    ],
    cta: "Upgrade to Pro",
    href: "/settings",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 599,
    yearly: 5990,
    blurb: "For households planning together.",
    features: [
      "Everything in Pro",
      "Family sharing — up to 4 members",
      "Joint goals & shared budgets",
      "Priority support",
      "Custom reports export (PDF)",
    ],
    cta: "Get Premium",
    href: "/settings",
  },
];

export function PlansPage() {
  const [billing, setBilling] = useState<Billing>("monthly");

  const price = useMemo(
    () => (plan: Plan) =>
      billing === "monthly"
        ? plan.monthly === 0
          ? "₹0"
          : `₹${plan.monthly.toLocaleString("en-IN")}`
        : `₹${plan.yearly.toLocaleString("en-IN")}`,
    [billing]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link
        to="/"
        className={cn(
          "inline-flex items-center gap-1.5 text-[length:var(--typography-label-size)] font-medium",
          "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-6",
          "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
        )}
      >
        <ArrowLeft size={15} strokeWidth={2} aria-hidden={true} />
        Back to dashboard
      </Link>

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3 mb-9">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary-soft)] px-4 py-1.5 text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-primary-hover)]">
          <Sparkles size={13} strokeWidth={2.5} aria-hidden={true} />
          Veyra Pro
        </span>
        <h1 className="text-[length:var(--typography-display-size)] font-extrabold tracking-tight text-[var(--color-text-primary)] leading-tight">
          Choose your money journey
        </h1>
        <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-xl">
          Start free. Upgrade when you want Veyra to explain more, remind you
          sooner, and plan further ahead.
        </p>

        {/* Billing toggle */}
        <div className="mt-2 inline-flex items-center rounded-full border border-[var(--color-border)] bg-white p-1 shadow-sm">
          {(["monthly", "yearly"] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBilling(b)}
              aria-pressed={billing === b}
              className={cn(
                "rounded-full px-4 py-1.5 text-[length:var(--typography-caption-size)] font-semibold capitalize transition-all duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                billing === b
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
              )}
            >
              {b}
              {b === "yearly" && (
                <span className="ml-1.5 rounded-full bg-[var(--color-success-soft)] px-1.5 py-[1px] text-[10px] font-bold text-[var(--color-success)]">
                  2 months free
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {PLANS.map((plan) => {
          const pro = plan.highlighted;
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-[24px] p-7",
                pro
                  ? "text-white lg:-translate-y-2"
                  : "bg-white border border-[var(--color-border)] shadow-[0_18px_44px_-28px_rgba(11,31,58,0.35)]",
                pro && "ring-1 ring-white/25"
              )}
              style={
                pro
                  ? {
                      background:
                        "linear-gradient(150deg, #3D68F0 0%, #2153E6 48%, #12379B 100%)",
                      boxShadow:
                        "0 34px 70px -30px rgba(33,83,230,0.65), inset 0 1px 0 rgba(255,255,255,0.22)",
                    }
                  : undefined
              }
            >
              {pro && (
                <>
                  <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#2153E6] shadow-md">
                    Most popular
                  </span>
                </>
              )}

              <p
                className={cn(
                  "text-[length:var(--typography-label-size)] font-bold uppercase tracking-widest",
                  pro ? "text-white" : "text-[var(--color-text-secondary)]"
                )}
              >
                {plan.name}
              </p>

              <div className="flex items-baseline gap-1.5 mt-3">
                <span
                  className={cn(
                    "text-[length:var(--typography-financial-hero-size)] font-extrabold tracking-tight tabular-nums leading-none",
                    pro ? "text-white" : "text-[var(--color-text-primary)]"
                  )}
                >
                  {price(plan)}
                </span>
                <span
                  className={cn(
                    "text-[length:var(--typography-caption-size)] font-medium",
                    pro ? "text-white/75" : "text-[var(--color-text-tertiary)]"
                  )}
                >
                  / {billing}
                </span>
              </div>
              <p
                className={cn(
                  "mt-1 text-[length:var(--typography-caption-size)]",
                  pro ? "text-white/65" : "text-[var(--color-text-tertiary)]"
                )}
              >
                {billing === "yearly" && plan.yearly > 0
                  ? "Billed yearly · 2 months free"
                  : plan.blurb}
              </p>

              {/* Features */}
              <ul role="list" className="mt-6 mb-7 flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                        pro ? "bg-white/20" : "bg-[var(--color-success-soft)]"
                      )}
                      aria-hidden="true"
                    >
                      <Check
                        size={11}
                        strokeWidth={3}
                        className={pro ? "text-white" : "text-[var(--color-success)]"}
                      />
                    </span>
                    <span
                      className={cn(
                        "text-[length:var(--typography-body-sm-size)] leading-snug",
                        pro ? "text-white/90" : "text-[var(--color-text-secondary)]"
                      )}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.href}
                onClick={(e) => plan.id === "free" && e.preventDefault()}
                aria-disabled={plan.id === "free"}
                className={cn(
                  "mt-auto inline-flex h-11 items-center justify-center rounded-[var(--radius-button)] text-[length:var(--typography-label-size)] font-semibold transition-all duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                  "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]",
                  pro
                    ? "bg-white text-[#12379B] hover:bg-[var(--color-primary-soft)] shadow-lg shadow-[#0C2168]/40"
                    : plan.id === "premium"
                      ? "border border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]"
                      : "pointer-events-none border border-[var(--color-border)] text-[var(--color-text-tertiary)] cursor-default"
                )}
              >
                {plan.cta}
              </a>
            </div>
          );
        })}
      </div>

      {/* Reassurance */}
      <p className="mt-8 text-center text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">
        Cancel anytime · Read-only bank connections · Prices in INR, GST included
      </p>
    </div>
  );
}
