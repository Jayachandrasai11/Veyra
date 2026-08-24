import type { Insight } from "../types";
const mockInsights: Insight[] = [
  {
    id: "ins-1",
    type: "trend",
    title: "Savings rate above average",
    value: "42.6%",
    description: "Your savings rate is well above the recommended 20%. Keep up the great work!",
    severity: "positive",
    action: {
      label: "Understand",
      href: "/insights/savings-rate-above-average"
    }
  },
  {
    id: "ins-2",
    type: "alert",
    title: "Unusual spending detected",
    description: "Entertainment spending increased 35% compared to last month. Consider reviewing subscriptions.",
    severity: "attention",
    action: {
      label: "Understand",
      href: "/insights/unusual-spending"
    }
  },
  {
    id: "ins-3",
    type: "opportunity",
    title: "Investment opportunity",
    value: "5%",
    description: "Based on your risk profile, consider increasing bond allocation by 5%.",
    severity: "positive",
    action: {
      label: "Understand",
      href: "/insights/investment-opportunity"
    }
  },
  {
    id: "ins-4",
    type: "tip",
    title: "Goal on track",
    description: "Your Emergency Fund goal is 81% complete. You're ahead of schedule!",
    severity: "positive"
  },
  {
    id: "ins-5",
    type: "alert",
    title: "Bills due soon",
    description: "Electric bill (₹89.20) is due in 5 days. Make sure funds are available.",
    severity: "attention"
  }
];

interface InsightsApi {
  getAll: () => Promise<Insight[]>;
  getById: (id: string) => Promise<Insight | null>;
}

export const insightsApi: InsightsApi = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInsights;
  },
  
  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockInsights.find(i => i.id === id) || null;
  }
};