/**
 * VEYRA — Explore Tool Registry
 * Source: design_system/Patterns/explore.md
 *
 * Maps a (category, tool) pair to its functional component.
 * Keeps routing and the Explore landing in sync with the
 * actual tools. Every listed tool resolves to a real experience.
 */

import type { ComponentType } from "react";
import {
  SipCalculator,
  EmiCalculator,
  TaxCalculator,
} from "./Calculators";
import {
  GoalPlanner,
  RetirementPlanner,
  BudgetPlanner,
} from "./Planners";
import { InvestmentCompare, LoanCompare, CardCompare } from "./Compare";
import { LearnLibrary } from "./Learn";

type ToolComponent = ComponentType;

export const toolRegistry: Record<string, ToolComponent> = {
  "calculate/sip-calculator": SipCalculator,
  "calculate/emi-calculator": EmiCalculator,
  "calculate/tax-calculator": TaxCalculator,

  "plan/goal-planner": GoalPlanner,
  "plan/retirement-planner": RetirementPlanner,
  "plan/budget-planner": BudgetPlanner,

  "compare/investment-options": InvestmentCompare,
  "compare/loan-offers": LoanCompare,
  "compare/card-benefits": CardCompare,

  "learn/guides": LearnLibrary,
  "learn/concepts": LearnLibrary,
  "learn/library": LearnLibrary,
};

export function getTool(categoryId: string, toolId: string): ToolComponent | null {
  return toolRegistry[`${categoryId}/${toolId}`] ?? null;
}
