/**
 * VEYRA — Explore Planners
 * Source: design_system/Patterns/explore.md
 *         design_system/Patterns/List.md (Progress)
 *
 * Functional planning tools rendered inside Explore ToolPage.
 *
 * - Goal Planner: contribution path to a target
 * - Retirement Planner: corpus + inflation-adjusted income
 * - Budget Planner: income allocation with progress bars
 */

import { useState } from "react";
import { CheckCircle2, AlertTriangle, PiggyBank } from "lucide-react";
import { ToolLayout, Field, ResultStat, ResultPanel } from "./toolUi";
import { Progress } from "@/components/ui/Progress/Progress";
import { formatRupees, formatPercent, formatDuration } from "@/lib/format";
import { cn } from "@/lib/cn";

function projectFv(current: number, monthly: number, annualRate: number, months: number): number {
  const i = annualRate / 100 / 12;
  if (i === 0) return current + monthly * months;
  const x = Math.pow(1 + i, months);
  return current * x + monthly * ((x - 1) / i);
}

function monthsToGoal(
  target: number,
  current: number,
  monthly: number,
  annualRate: number
): number {
  if (current >= target) return 0;
  const i = annualRate / 100 / 12;
  if (monthly <= 0 && i <= 0) return Infinity;
  if (i === 0) return monthly > 0 ? (target - current) / monthly : Infinity;
  const a = current + monthly / i;
  const x = (target + monthly / i) / a;
  if (x <= 0) return Infinity;
  return Math.log(x) / Math.log(1 + i);
}

/* ─────────────────────── Goal Planner ───────────────── */

export function GoalPlanner() {
  const [target, setTarget] = useState("2000000");
  const [current, setCurrent] = useState("400000");
  const [monthly, setMonthly] = useState("12000");
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("8");

  const t = Number(target) || 0;
  const c = Number(current) || 0;
  const p = Number(monthly) || 0;
  const r = Number(rate) || 0;
  const y = Math.max(1, Number(years) || 1);

  const m = monthsToGoal(t, c, p, r);
  const onTrack = m <= y * 12;
  const fvAtTarget = projectFv(c, p, r, y * 12);
  const progress = t > 0 ? Math.min(100, Math.round((fvAtTarget / t) * 100)) : 0;

  return (
    <ToolLayout
      inputs={
        <>
          <Field id="goal-target" label="Target amount" prefix="₹" value={target} onChange={setTarget} min={0} step={50000} />
          <Field id="goal-current" label="Current savings" prefix="₹" value={current} onChange={setCurrent} min={0} step={10000} />
          <Field id="goal-monthly" label="Monthly contribution" prefix="₹" value={monthly} onChange={setMonthly} min={0} step={500} />
          <Field id="goal-rate" label="Expected annual return" suffix="%" value={rate} onChange={setRate} min={0} max={50} step={0.5} />
          <Field id="goal-years" label="Target in" suffix="yr" value={years} onChange={setYears} min={1} max={50} step={1} />
        </>
      }
      results={
        <ResultPanel title="Your goal path" surface="green">
          <ResultStat
            label={onTrack ? "On track to reach by target" : "Time needed at this pace"}
            value={m === Infinity ? "—" : formatDuration(m / 12)}
            emphasis
          />
          <Progress value={progress} label={`Progress toward ${formatRupees(t)}`} />
          <div className="flex items-center gap-[var(--spacing-2xs)] mt-[var(--spacing-xs)]">
            {onTrack ? (
              <>
                <CheckCircle2 size={16} className="text-[var(--color-success)]" aria-hidden="true" />
                <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-success)]">
                  You are on track to reach {formatRupees(t)} within {y} years.
                </span>
              </>
            ) : (
              <>
                <AlertTriangle size={16} className="text-[var(--color-warning)]" aria-hidden="true" />
                <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-warning)]">
                  At this pace it takes longer than {y} years. Consider a higher contribution.
                </span>
              </>
            )}
          </div>
          <ResultStat label={`Projected value in ${y} yr`} value={formatRupees(fvAtTarget)} />
        </ResultPanel>
      }
      note="Estimates assume constant monthly contributions and returns. Markets move, so revisit your plan periodically."
    />
  );
}

/* ──────────────────── Retirement Planner ────────────── */

export function RetirementPlanner() {
  const [age, setAge] = useState("30");
  const [retireAge, setRetireAge] = useState("60");
  const [corpus, setCorpus] = useState("500000");
  const [monthly, setMonthly] = useState("15000");
  const [rate, setRate] = useState("10");
  const [inflation, setInflation] = useState("6");

  const a = Number(age) || 0;
  const ra = Number(retireAge) || 0;
  const c = Number(corpus) || 0;
  const p = Number(monthly) || 0;
  const r = Number(rate) || 0;
  const inf = Number(inflation) || 0;

  const years = Math.max(1, ra - a);
  const projected = projectFv(c, p, r, years * 12);
  const todayValue = projected / Math.pow(1 + inf / 100, years);
  const monthlyIncome = (projected * 0.04) / 12;
  const contributions = c + p * years * 12;

  return (
    <ToolLayout
      inputs={
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)]">
            <Field id="ret-age" label="Current age" suffix="yr" value={age} onChange={setAge} min={18} max={70} step={1} />
            <Field id="ret-rage" label="Retirement age" suffix="yr" value={retireAge} onChange={setRetireAge} min={40} max={80} step={1} />
          </div>
          <Field id="ret-corpus" label="Current retirement corpus" prefix="₹" value={corpus} onChange={setCorpus} min={0} step={10000} />
          <Field id="ret-monthly" label="Monthly contribution" prefix="₹" value={monthly} onChange={setMonthly} min={0} step={500} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)]">
            <Field id="ret-rate" label="Expected return" suffix="%" value={rate} onChange={setRate} min={0} max={50} step={0.5} />
            <Field id="ret-inf" label="Inflation" suffix="%" value={inflation} onChange={setInflation} min={0} max={20} step={0.5} />
          </div>
        </>
      }
      results={
        <ResultPanel title="Retirement outlook" surface="navy">
          <ResultStat label={`Corpus at age ${ra}`} value={formatRupees(projected)} emphasis />
          <ResultStat label="In today's value" value={formatRupees(todayValue)} sub={`Adjusted for ${formatPercent(inf)} inflation`} />
          <ResultStat label="Est. monthly income" value={formatRupees(monthlyIncome)} sub="Based on a 4% withdrawal rate" />
          <div className="mt-[var(--spacing-xs)]">
            <Progress value={contributions > 0 ? Math.round((contributions / projected) * 100) : 0} label="Share from your contributions versus growth" />
          </div>
          <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)]">
            Around {formatPercent(projected > 0 ? (contributions / projected) * 100 : 0)} comes from your contributions; the rest is growth.
          </p>
        </ResultPanel>
      }
      note="A 4% withdrawal rate is a common guideline, not a guarantee. Longevity, returns and inflation can change the picture."
    />
  );
}

/* ───────────────────── Budget Planner ───────────────── */

function BudgetRow({ label, amount, income }: { label: string; amount: number; income: number }) {
  const pct = income > 0 ? Math.min(100, Math.round((amount / income) * 100)) : 0;
  return (
    <div className="flex flex-col gap-[var(--spacing-2xs)]">
      <div className="flex items-center justify-between">
        <span className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]">
          {label}
        </span>
        <span className="text-[length:var(--typography-label-size)] text-[var(--color-text-secondary)] tabular-nums">
          {formatRupees(amount)} · {pct}%
        </span>
      </div>
      <Progress value={pct} label={`${label}: ${formatRupees(amount)} of ${formatRupees(income)}`} />
    </div>
  );
}

export function BudgetPlanner() {
  const [income, setIncome] = useState("120000");
  const [rent, setRent] = useState("35000");
  const [food, setFood] = useState("20000");
  const [transport, setTransport] = useState("8000");
  const [other, setOther] = useState("12000");

  const inc = Number(income) || 0;
  const r = Number(rent) || 0;
  const f = Number(food) || 0;
  const tr = Number(transport) || 0;
  const o = Number(other) || 0;
  const expenses = r + f + tr + o;
  const remaining = inc - expenses;
  const savingsRate = inc > 0 ? (remaining / inc) * 100 : 0;
  const overBudget = remaining < 0;

  return (
    <ToolLayout
      inputs={
        <>
          <Field id="bud-income" label="Monthly income" prefix="₹" value={income} onChange={setIncome} min={0} step={1000} />
          <Field id="bud-rent" label="Rent / housing" prefix="₹" value={rent} onChange={setRent} min={0} step={1000} />
          <Field id="bud-food" label="Food & groceries" prefix="₹" value={food} onChange={setFood} min={0} step={500} />
          <Field id="bud-transport" label="Transport" prefix="₹" value={transport} onChange={setTransport} min={0} step={500} />
          <Field id="bud-other" label="Other expenses" prefix="₹" value={other} onChange={setOther} min={0} step={500} />
        </>
      }
      results={
        <ResultPanel title="Monthly plan" surface="warm">
          <ResultStat
            label={overBudget ? "Over budget" : "Remaining to save"}
            value={formatRupees(Math.abs(remaining))}
            emphasis
            sub={overBudget ? "Expenses exceed income" : undefined}
          />
          <ResultStat label="Savings rate" value={formatPercent(savingsRate)} sub={savingsRate < 0 ? "Spending more than you earn" : "Share of income unspent"} />

          <div className="flex flex-col gap-[var(--spacing-sm)] mt-[var(--spacing-xs)]">
            <BudgetRow label="Rent / housing" amount={r} income={inc} />
            <BudgetRow label="Food & groceries" amount={f} income={inc} />
            <BudgetRow label="Transport" amount={tr} income={inc} />
            <BudgetRow label="Other" amount={o} income={inc} />
          </div>

          {overBudget && (
            <p className={cn("flex items-center gap-[var(--spacing-2xs)] text-[length:var(--typography-body-sm-size)] text-[var(--color-warning)]")}>
              <PiggyBank size={16} aria-hidden="true" />
              Try reducing one category to bring spending back under income.
            </p>
          )}
        </ResultPanel>
      }
      note="A common calm approach is to aim for a savings rate near 20%. Adjust the amounts to reflect your real month."
    />
  );
}
