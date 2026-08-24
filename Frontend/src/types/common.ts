export type Currency = "USD" | "EUR" | "GBP";

export type Timeframe = "1W" | "1M" | "3M" | "6M" | "1Y" | "ALL";

export type ViewMode = "grid" | "list";

export type SortDirection = "asc" | "desc";

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface DateRange {
  from: Date | null;
  to: Date | null;
}
