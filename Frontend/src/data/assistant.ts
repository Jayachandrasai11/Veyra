export interface SuggestedQuestion {
  id: string;
  text: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: "sq-1",
    text: "How much did I spend on groceries this month?",
    category: "Spending",
  },
  {
    id: "sq-2",
    text: "Am I on track for my emergency fund goal?",
    category: "Goals",
  },
  {
    id: "sq-3",
    text: "What's my net worth change over the last 6 months?",
    category: "Net Worth",
  },
  {
    id: "sq-4",
    text: "Show me my spending trends",
    category: "Trends",
  },
];

export const sampleMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "user",
    content: "How is my emergency fund doing?",
    timestamp: "2026-08-22T10:00:00Z",
  },
  {
    id: "msg-2",
    role: "assistant",
    content:
      "Your emergency fund is looking great! You've saved $24,500 out of your $30,000 target — that's 81.7% complete. You're ahead of schedule and on track to reach your goal by December 2026. Your last contribution was $2,000 on August 10th.",
    timestamp: "2026-08-22T10:00:01Z",
  },
];
