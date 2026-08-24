export interface Insight {
  id: string;
  title: string;
  description: string;
  type: "tip" | "alert" | "trend" | "opportunity";
  severity: "info" | "warning" | "success";
  category: string;
  date: string;
  actionable: boolean;
  action?: { label: string; href: string };
}

export const insights: Insight[] = [
  {
    id: "ins-1",
    title: "Savings rate above average",
    description:
      "Your 42.6% savings rate is well above the recommended 20%. Keep up the great work!",
    type: "trend",
    severity: "success",
    category: "Savings",
    date: "2026-08-22",
    actionable: true,
    action: { label: "View breakdown", href: "/insights/savings-rate-above-average" },
  },
  {
    id: "ins-2",
    title: "Unusual spending detected",
    description:
      "Entertainment spending increased 35% compared to last month. Consider reviewing subscriptions.",
    type: "alert",
    severity: "warning",
    category: "Spending",
    date: "2026-08-21",
    actionable: true,
    action: { label: "Review spending", href: "/insights/unusual-spending" },
  },
  {
    id: "ins-3",
    title: "Investment opportunity",
    description:
      "Based on your risk profile, consider increasing bond allocation by 5%.",
    type: "opportunity",
    severity: "info",
    category: "Investing",
    date: "2026-08-20",
    actionable: true,
    action: { label: "Explore", href: "/insights/investment-opportunity" },
  },
  {
    id: "ins-4",
    title: "Goal on track",
    description:
      "Your Emergency Fund goal is 81% complete. You're ahead of schedule!",
    type: "tip",
    severity: "success",
    category: "Goals",
    date: "2026-08-19",
    actionable: false,
  },
  {
    id: "ins-5",
    title: "Bills due soon",
    description:
      "Electric bill ($89.20) is due in 5 days. Make sure funds are available.",
    type: "alert",
    severity: "warning",
    category: "Bills",
    date: "2026-08-18",
    actionable: true,
  },
];
