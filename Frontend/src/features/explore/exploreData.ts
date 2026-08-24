/**
 * VEYRA — Explore Data
 * Source: design_system/Patterns/explore.md
 *
 * Home exposes the four top-level categories.
 * Detailed tools belong inside Explore.
 */

import {
  Route,
  GitCompare,
  Calculator,
  BookOpen,
  Target,
  PiggyBank,
  LineChart,
  Layers,
  CreditCard,
  Scale,
  TrendingUp,
  Percent,
  FileText,
  GraduationCap,
  Lightbulb,
  Library,
} from "lucide-react";
import type { ExploreCategory } from "./types";

export const exploreCategories: ExploreCategory[] = [
  {
    id: "plan",
    name: "Plan",
    description: "Map your financial future with structured planning tools.",
    icon: Route,
    surface: "blue",
    tools: [
      {
        id: "goal-planner",
        name: "Goal Planner",
        description: "Set a target and see a contribution path to reach it.",
        icon: Target,
        href: "/explore/plan",
      },
      {
        id: "retirement-planner",
        name: "Retirement Planner",
        description: "Estimate the corpus you need and how to build it.",
        icon: PiggyBank,
        href: "/explore/plan",
      },
      {
        id: "budget-planner",
        name: "Budget Planner",
        description: "Create a monthly plan that fits your lifestyle.",
        icon: LineChart,
        href: "/explore/plan",
      },
    ],
  },
  {
    id: "compare",
    name: "Compare",
    description: "Weigh options side by side before you decide.",
    icon: GitCompare,
    surface: "slate",
    tools: [
      {
        id: "investment-options",
        name: "Investment Options",
        description: "Compare funds, deposits and other vehicles.",
        icon: Layers,
        href: "/explore/compare",
      },
      {
        id: "loan-offers",
        name: "Loan Offers",
        description: "Understand interest and tenure across lenders.",
        icon: CreditCard,
        href: "/explore/compare",
      },
      {
        id: "card-benefits",
        name: "Card Benefits",
        description: "See fees, rewards and fit for your spending.",
        icon: Scale,
        href: "/explore/compare",
      },
    ],
  },
  {
    id: "calculate",
    name: "Calculate",
    description: "Run the numbers with focused calculators.",
    icon: Calculator,
    surface: "default",
    tools: [
      {
        id: "sip-calculator",
        name: "SIP Calculator",
        description: "Project growth from regular investments.",
        icon: TrendingUp,
        href: "/explore/calculate",
      },
      {
        id: "emi-calculator",
        name: "EMI Calculator",
        description: "Estimate monthly payments for a loan.",
        icon: Percent,
        href: "/explore/calculate",
      },
      {
        id: "tax-calculator",
        name: "Tax Calculator",
        description: "Estimate your tax position for the year.",
        icon: FileText,
        href: "/explore/calculate",
      },
    ],
  },
  {
    id: "learn",
    name: "Learn",
    description: "Build confidence with clear, calm explanations.",
    icon: BookOpen,
    surface: "warm",
    tools: [
      {
        id: "guides",
        name: "Guides",
        description: "Step-by-step explainers for key topics.",
        icon: GraduationCap,
        href: "/explore/learn",
      },
      {
        id: "concepts",
        name: "Key Concepts",
        description: "Plain-language definitions of finance terms.",
        icon: Lightbulb,
        href: "/explore/learn",
      },
      {
        id: "library",
        name: "Library",
        description: "Browse the full collection of resources.",
        icon: Library,
        href: "/explore/learn",
      },
    ],
  },
];