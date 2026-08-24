/**
 * VEYRA — Explore Calculators
 * Source: design_system/Patterns/explore.md
 *         design_system/Components/inputs_forms.md
 *
 * Three fully functional calculators. Each is a self-contained
 * tool rendered inside the Explore ToolPage.
 *
 * - SIP Calculator: project growth from regular investments
 * - EMI Calculator: estimate monthly loan payments
 * - Tax Calculator: estimate income tax (India new regime)
 *
 * All values use Indian Rupee formatting. Results update live.
 */

import { useState } from "react";
import { ToolLayout, Field, ResultStat, ResultPanel, SplitBar, SplitLegend } from "./toolUi";
import { formatRupees, formatPercent } from "@/lib/format";

/* ───────────────────────── SIP ───────────────────────── */

export function SipCalculator() {
  const [monthly, setMonthly] = useState("10000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");

  const p = Number(monthly) || 0;
  const r = Number(rate) || 0;
  const y = Number(years) || 0;
  const i = r / 100 / 12;
  const m = Math.max(0, Math.round(y * 12));

  const invested = p * m;
  const growth = i === 0 ? invested : p * ((Math.pow(1 + i, m) - 1) / i) * (1 + i);
  const fv = Math.max(0, growth);
  const returns = Math.max(0, fv - invested);

  return (
    <ToolLayout
      inputs={
        <>
          <Field id="sip-monthly" label="Monthly investment" prefix="₹" value={monthly} onChange={setMonthly} min={0} step={500} />
          <Field id="sip-rate" label="Expected annual return" suffix="%" value={rate} onChange={setRate} min={0} max={50} step={0.5} />
          <Field id="sip-years" label="Time period" suffix="yr" value={years} onChange={setYears} min={1} max={50} step={1} />
        </>
      }
      results={
        <ResultPanel title="Projected value" surface="green">
          <ResultStat label="Total value" value={formatRupees(fv)} emphasis />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)] mt-[var(--spacing-xs)]">
            <ResultStat label="Amount invested" value={formatRupees(invested)} />
            <ResultStat label="Est. returns" value={formatRupees(returns)} />
          </div>
          <SplitBar
            ariaLabel={`Invested ${formatRupees(invested)} versus returns ${formatRupees(returns)}`}
            segments={[
              { label: "Invested", value: invested, className: "bg-[var(--color-text-secondary)]" },
              { label: "Returns", value: returns, className: "bg-[var(--color-primary)]" },
            ]}
          />
          <SplitLegend
            segments={[
              { label: "Invested", value: invested, className: "bg-[var(--color-text-secondary)]" },
              { label: "Returns", value: returns, className: "bg-[var(--color-primary)]" },
            ]}
          />
        </ResultPanel>
      }
      note="Estimates assume returns are compounded monthly and stay constant. Actual returns will vary."
    />
  );
}

/* ───────────────────────── EMI ───────────────────────── */

export function EmiCalculator() {
  const [amount, setAmount] = useState("2000000");
  const [rate, setRate] = useState("9");
  const [years, setYears] = useState("5");

  const principal = Number(amount) || 0;
  const r = Number(rate) || 0;
  const y = Number(years) || 0;
  const i = r / 100 / 12;
  const m = Math.max(0, Math.round(y * 12));

  const emi = i === 0 ? principal / (m || 1) : (principal * i * Math.pow(1 + i, m)) / (Math.pow(1 + i, m) - 1);
  const totalPayment = emi * m;
  const interest = Math.max(0, totalPayment - principal);

  return (
    <ToolLayout
      inputs={
        <>
          <Field id="emi-amount" label="Loan amount" prefix="₹" value={amount} onChange={setAmount} min={0} step={10000} />
          <Field id="emi-rate" label="Interest rate" suffix="%" value={rate} onChange={setRate} min={0} max={50} step={0.1} />
          <Field id="emi-years" label="Loan tenure" suffix="yr" value={years} onChange={setYears} min={1} max={40} step={1} />
        </>
      }
      results={
        <ResultPanel title="Repayment summary" surface="navy">
          <ResultStat label="Monthly EMI" value={formatRupees(emi)} emphasis />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)] mt-[var(--spacing-xs)]">
            <ResultStat label="Principal" value={formatRupees(principal)} />
            <ResultStat label="Total interest" value={formatRupees(interest)} />
          </div>
          <SplitBar
            ariaLabel={`Principal ${formatRupees(principal)} versus interest ${formatRupees(interest)}`}
            segments={[
              { label: "Principal", value: principal, className: "bg-[var(--color-primary)]" },
              { label: "Interest", value: interest, className: "bg-[var(--color-warning)]" },
            ]}
          />
          <SplitLegend
            segments={[
              { label: "Principal", value: principal, className: "bg-[var(--color-primary)]" },
              { label: "Interest", value: interest, className: "bg-[var(--color-warning)]" },
            ]}
          />
          <ResultStat label="Total payment" value={formatRupees(totalPayment)} />
        </ResultPanel>
      }
      note="Estimates assume a fixed interest rate across the tenure. Actual terms depend on your lender."
    />
  );
}

/* ──────────────────────── TAX (India) ───────────────── */

const TAX_SLABS = [
  { upTo: 400000, rate: 0 },
  { upTo: 800000, rate: 0.05 },
  { upTo: 1200000, rate: 0.1 },
  { upTo: 1600000, rate: 0.15 },
  { upTo: 2000000, rate: 0.2 },
  { upTo: 2400000, rate: 0.25 },
  { upTo: Infinity, rate: 0.3 },
];

function slabTax(taxable: number): number {
  let tax = 0;
  let prev = 0;
  for (const slab of TAX_SLABS) {
    if (taxable > prev) {
      const band = Math.min(taxable, slab.upTo) - prev;
      tax += band * slab.rate;
    }
    prev = slab.upTo;
    if (taxable <= slab.upTo) break;
  }
  return tax;
}

export function TaxCalculator() {
  const [income, setIncome] = useState("1200000");
  const [deduction, setDeduction] = useState("75000");

  const gross = Number(income) || 0;
  const std = Number(deduction) || 0;
  const taxable = Math.max(0, gross - std);
  const tax = slabTax(taxable);
  const cess = tax * 0.04;
  const totalTax = tax + cess;
  const effective = gross > 0 ? (totalTax / gross) * 100 : 0;

  return (
    <ToolLayout
      inputs={
        <>
          <Field id="tax-income" label="Annual income" prefix="₹" value={income} onChange={setIncome} min={0} step={10000} />
          <Field id="tax-deduction" label="Standard deduction" prefix="₹" value={deduction} onChange={setDeduction} min={0} step={5000} helperText="₹75,000 for most salaried individuals under the new regime." />
        </>
      }
      results={
        <ResultPanel title="Estimated tax (new regime)" surface="blue">
          <ResultStat label="Total tax due" value={formatRupees(totalTax)} emphasis />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)] mt-[var(--spacing-xs)]">
            <ResultStat label="Taxable income" value={formatRupees(taxable)} />
            <ResultStat label="Effective rate" value={formatPercent(effective)} />
          </div>
          <SplitBar
            ariaLabel={`Income tax ${formatRupees(tax)} and cess ${formatRupees(cess)}`}
            segments={[
              { label: "Income tax", value: tax, className: "bg-[var(--color-primary)]" },
              { label: "Cess (4%)", value: cess, className: "bg-[var(--color-warning)]" },
            ]}
          />
          <SplitLegend
            segments={[
              { label: "Income tax", value: tax, className: "bg-[var(--color-primary)]" },
              { label: "Health & education cess", value: cess, className: "bg-[var(--color-warning)]" },
            ]}
          />
        </ResultPanel>
      }
      note="This is an illustrative estimate using the new tax regime slabs. It excludes other deductions, rebates and surcharge. Confirm with a tax professional."
    />
  );
}
