/**
 * VEYRA — Ask Veyra Mock Engine
 * Source: design_system/Interaction/Conversation.md
 *         design_system/Ux_writing/ai_writing.md
 *         design_system/States/Aistates.md
 *
 * Mocked, deterministic responses. No network, no real model.
 * Responses are grounded in a small mocked financial context
 * so Veyra never invents the user's own numbers on the fly.
 *
 * States covered:
 *  - answer (idle/complete)
 *  - clarification (needs more info)
 *  - error (with retry recovery)
 */

import type { AskFermorEntryPoint } from "./types";

/** Mocked "financial data layer" — the only numbers Veyra may reference. */
export const MOCK_FINANCIAL = {
  netWorth: "₹18.4 lakh",
  savingsRate: "35%",
  emergencyMonths: "4.5 months",
  spendingChange: "18%",
  topCategories: "dining and travel",
};

export interface MockInput {
  text: string;
  entryPoint: AskFermorEntryPoint;
  sourceLabel?: string;
  /** True when this is a retry of a previously failed request. */
  retry?: boolean;
}

export interface MockResult {
  kind: "answer" | "clarification" | "error";
  content: string;
  suggestions?: string[];
}

type Intent =
  | "overview"
  | "spending"
  | "afford"
  | "retire"
  | "save"
  | "invest"
  | "goal"
  | "explicit-error"
  | "default";

function detectIntent(lower: string): Intent {
  if (lower.includes("error")) return "explicit-error";
  if (lower.includes("invest") || lower.includes("mutual fund") || lower.includes("market"))
    return "invest";
  if (lower.includes("afford") || lower.includes("house") || lower.includes("home") || lower.includes("buy"))
    return "afford";
  if (lower.includes("retire")) return "retire";
  if (lower.includes("goal") || lower.includes("target")) return "goal";
  if (lower.includes("spend")) return "spending";
  if (lower.includes("save") || lower.includes("budget")) return "save";
  if (lower.includes("how am i doing") || lower.includes("doing") || lower.includes("overview") || lower.includes("financial health"))
    return "overview";
  return "default";
}

export function generateMockResponse(input: MockInput): MockResult {
  const lower = input.text.toLowerCase();
  const intent = detectIntent(lower);

  // Investment needs connected data; first attempt errors, retry recovers.
  if (intent === "invest" && !input.retry) {
    return {
      kind: "error",
      content:
        "I couldn't analyze your investments right now. Your investment account isn't connected, so Veyra doesn't have that data yet.",
      suggestions: ["Try again", "Connect an account"],
    };
  }

  if (intent === "explicit-error") {
    return {
      kind: "error",
      content:
        "Fermor couldn't complete this analysis. Your previous data is still available, and you can try again.",
      suggestions: ["Try again", "Ask something else"],
    };
  }

  if (intent === "afford") {
    return {
      kind: "clarification",
      content:
        "To give a grounded answer, I need to know what you're comparing. Do you mean your monthly spending or your total spending this year?",
      suggestions: ["Monthly spending", "Total spending this year"],
    };
  }

  if (lower.includes("monthly spending")) {
    return {
      kind: "answer",
      content:
        "Based on your connected accounts, your monthly spending is around ₹78,000 against a take-home income near ₹1.2 lakh. That leaves comfortable room to save. Want to set a monthly target?",
      suggestions: ["Open the budget planner", "Set a spending target?"],
    };
  }

  if (lower.includes("total spending this year")) {
    return {
      kind: "answer",
      content:
        "Your total spending this year is roughly ₹9.4 lakh. Most of the year's increase came from dining and travel. Would you like to see the biggest changes?",
      suggestions: ["Show the biggest changes", "How am I doing?"],
    };
  }

  switch (intent) {
    case "overview":
      return {
        kind: "answer",
        content:
          "Here's a calm snapshot from your connected accounts: net worth is around ₹18.4 lakh, you're saving roughly 35% of your monthly income, and your emergency fund covers about 4.5 months of essentials. Your picture looks steady. Want to look at where you could build further?",
        suggestions: ["How is my emergency fund?", "Where can I save more?", "Help me plan a goal"],
      };
    case "retire":
      return {
        kind: "answer",
        content:
          "Using a 4% withdrawal guideline, the corpus you're building could support a modest monthly income later. The earlier you start, the more time compounding has to work. Want a retirement estimate?",
        suggestions: ["Open the retirement planner", "How am I doing?"],
      };
    case "save":
      return {
        kind: "answer",
        content:
          "A simple approach is to decide your savings amount first, then build the rest of the month around it. You're currently saving around 35%, which is a healthy starting point. Want a plan?",
        suggestions: ["Open the budget planner", "Help me plan a goal"],
      };
    case "goal":
      return {
        kind: "answer",
        content: `Your ${input.sourceLabel || "goal"} is progressing. Veyra estimates you're on a steady path if contributions stay consistent. Want a detailed projection?`,
        suggestions: ["Open the goal planner", "How can I reach it sooner?"],
      };
    case "invest":
      return {
        kind: "answer",
        content:
          "Based on your connected accounts, your monthly investments are growing steadily. At your current contribution rate, you're likely to stay on track with a long-term plan. Want a projection?",
        suggestions: ["Open the SIP calculator", "How am I doing?"],
      };
    case "spending":
      return {
        kind: "answer",
        content:
          "Your spending rose about 18% this month. Most of the increase came from dining and travel, and you're currently above your usual monthly range. Nothing alarming, but worth a look. Want to review the biggest changes?",
        suggestions: ["Show the biggest changes", "Set a spending target?"],
      };
    default:
      return {
        kind: "answer",
        content:
          "Based on your connected accounts, your savings rate looks healthy and your spending is within a normal range. Tell me what you'd like to dig into — spending, saving, or a goal?",
        suggestions: ["Why did my spending increase?", "How am I doing?", "Help me plan a goal"],
      };
  }
}

/** Contextual suggestions shown when the panel first opens. */
export function getInitialSuggestions(
  entryPoint: AskFermorEntryPoint,
  sourceLabel?: string
): string[] {
  switch (entryPoint) {
    case "goal":
      return [
        `Am I on track with ${sourceLabel || "this goal"}?`,
        "How can I reach it sooner?",
        "What if I increase my contribution?",
      ];
    case "insight":
      return ["Why did this change?", "What should I do?", "Tell me more"];
    case "financial-health":
    case "metric":
      return ["How is my financial health?", "What can I improve?", "Where should I start?"];
    case "explore":
      return ["What should I explore first?", "Help me plan a goal", "How am I doing?"];
    case "assistant":
      return ["How am I doing?", "Why did my spending increase?", "Help me plan a goal"];
    case "header":
    default:
      return ["How am I doing?", "Why did my spending increase?", "Can I afford a house?"];
  }
}
