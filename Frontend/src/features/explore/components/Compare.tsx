/**
 * VEYRA — Explore Compare
 * Source: design_system/Patterns/explore.md
 *         design_system/Components/Data.md
 *
 * Side-by-side comparison tools rendered inside Explore ToolPage.
 *
 * - Investment Options: compare vehicles on return, risk, lock-in
 * - Loan Offers: compare two loan scenarios on EMI and interest
 * - Card Benefits: compare two cards on net yearly value
 */

import { useState } from "react";
import { Field, ResultStat, ResultPanel } from "./toolUi";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { formatRupees } from "@/lib/format";
import { cn } from "@/lib/cn";

/* ─────────────────── Investment Options ─────────────── */

const INVESTMENTS = [
  { name: "Fixed Deposit", ret: "6.5–7.5%", risk: "Low", lockIn: "Flexible", liquidity: "High", note: "Stable, predictable returns" },
  { name: "PPF", ret: "7.1%", risk: "Low", lockIn: "15 yr", liquidity: "Low", note: "Long-term tax-saving" },
  { name: "Equity Mutual Fund", ret: "10–14%", risk: "High", lockIn: "None", liquidity: "High", note: "Growth over time" },
  { name: "NPS", ret: "8–10%", risk: "Medium", lockIn: "Till 60", liquidity: "Low", note: "Retirement focused" },
  { name: "Gold", ret: "7–9%", risk: "Medium", lockIn: "None", liquidity: "High", note: "Hedge against uncertainty" },
];

export function InvestmentCompare() {
  return (
    <Card>
      <CardContent className="p-0 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Comparison of common investment options</caption>
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
              {["Option", "Est. return", "Risk", "Lock-in", "Liquidity"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)] text-[var(--color-text-secondary)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVESTMENTS.map((inv) => (
              <tr key={inv.name} className="border-b border-[var(--color-border)] last:border-0">
                <th scope="row" className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]">
                  {inv.name}
                  <span className="block text-[length:var(--typography-caption-size)] font-normal text-[var(--color-text-tertiary)]">
                    {inv.note}
                  </span>
                </th>
                <td className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)] tabular-nums">
                  {inv.ret}
                </td>
                <td className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                  {inv.risk}
                </td>
                <td className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                  {inv.lockIn}
                </td>
                <td className="px-[var(--spacing-md)] py-[var(--spacing-md)] text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                  {inv.liquidity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

/* ───────────────────── Loan Offers ─────────────────── */

function emiOf(principal: number, annualRate: number, years: number): number {
  const i = annualRate / 100 / 12;
  const m = Math.max(0, Math.round(years * 12));
  if (i === 0) return m > 0 ? principal / m : 0;
  const x = Math.pow(1 + i, m);
  return (principal * i * x) / (x - 1);
}

function LoanColumn({ tag, accent }: { tag: string; accent: string }) {
  const [amount, setAmount] = useState(tag === "A" ? "2000000" : "2000000");
  const [rate, setRate] = useState(tag === "A" ? "9" : "9.5");
  const [years, setYears] = useState(tag === "A" ? "5" : "5");

  const principal = Number(amount) || 0;
  const r = Number(rate) || 0;
  const y = Number(years) || 0;
  const emi = emiOf(principal, r, y);
  const total = emi * Math.max(0, Math.round(y * 12));
  const interest = Math.max(0, total - principal);

  return (
    <Card surface="default" className="border">
      <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-md)]">
        <span className={cn("text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]", accent)}>
          Offer {tag}
        </span>
        <Field id={`loan-${tag}-amount`} label="Loan amount" prefix="₹" value={amount} onChange={setAmount} min={0} step={10000} />
        <Field id={`loan-${tag}-rate`} label="Interest rate" suffix="%" value={rate} onChange={setRate} min={0} max={50} step={0.1} />
        <Field id={`loan-${tag}-years`} label="Tenure" suffix="yr" value={years} onChange={setYears} min={1} max={40} step={1} />
        <div className="grid grid-cols-2 gap-[var(--spacing-md)] pt-[var(--spacing-2xs)]">
          <ResultStat label="Monthly EMI" value={formatRupees(emi)} />
          <ResultStat label="Total interest" value={formatRupees(interest)} />
        </div>
      </CardContent>
    </Card>
  );
}

export function LoanCompare() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-lg)] items-start">
        <LoanColumn tag="A" accent="text-[var(--color-primary)]" />
        <LoanColumn tag="B" accent="text-[var(--color-warning)]" />
      </div>
      <ResultPanel title="What this tells you" surface="slate">
        <p className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
          A lower interest rate or shorter tenure usually reduces total interest. Compare both offers
          and choose the one that keeps your monthly EMI comfortable.
        </p>
      </ResultPanel>
    </>
  );
}

/* ───────────────────── Card Benefits ───────────────── */

function CardColumn({ tag, accent }: { tag: string; accent: string }) {
  const [fee, setFee] = useState(tag === "A" ? "1000" : "2500");
  const [reward, setReward] = useState(tag === "A" ? "1.5" : "3");
  const [spend, setSpend] = useState("400000");

  const f = Number(fee) || 0;
  const rw = Number(reward) || 0;
  const sp = Number(spend) || 0;
  const net = (sp * rw) / 100 - f;

  return (
    <Card surface="default" className="border">
      <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-md)]">
        <span className={cn("text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]", accent)}>
          Card {tag}
        </span>
        <Field id={`card-${tag}-fee`} label="Annual fee" prefix="₹" value={fee} onChange={setFee} min={0} step={100} />
        <Field id={`card-${tag}-reward`} label="Reward rate" suffix="%" value={reward} onChange={setReward} min={0} max={20} step={0.1} />
        <Field id={`card-${tag}-spend`} label="Yearly spend" prefix="₹" value={spend} onChange={setSpend} min={0} step={10000} />
        <ResultStat label="Estimated net value / yr" value={formatRupees(net)} sub={net >= 0 ? "Rewards exceed the fee" : "Fee exceeds rewards at this spend"} />
      </CardContent>
    </Card>
  );
}

export function CardCompare() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-lg)] items-start">
      <CardColumn tag="A" accent="text-[var(--color-primary)]" />
      <CardColumn tag="B" accent="text-[var(--color-warning)]" />
    </div>
  );
}
