/**
 * Veyra — useInsights Hook
 * Fetches and manages financial insights from the data layer.
 */

import { useState, useEffect, useCallback } from "react";
import { insightsApi } from "../api/insights";
import type { Insight } from "../types";

export function useInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await insightsApi.getAll();
      setInsights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load insights");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    insights,
    loading,
    error,
    refetch: fetchData
  };
}