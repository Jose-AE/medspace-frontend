import { useState, useEffect } from "react";
import { earningsService, EarningsDataPoint } from "@/services/EarningsService";
import { useAuth } from "@/hooks/useAuth";

interface UseEarningsReturn {
  data: EarningsDataPoint[];
  isLoading: boolean;
  error: Error | null;
  fetchWeeklyEarnings: () => Promise<void>;
  fetchMonthlyEarnings: () => Promise<void>;
}

export const useEarnings = (): UseEarningsReturn => {
  const [data, setData] = useState<EarningsDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, authInitialized } = useAuth();

  const fetchWeeklyEarnings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await earningsService.getWeeklyEarnings();
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch weekly earnings")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMonthlyEarnings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await earningsService.getMonthlyEarnings();
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch monthly earnings")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authInitialized && user) {
      fetchWeeklyEarnings();
    }
  }, [authInitialized, user]);

  return {
    data,
    isLoading,
    error,
    fetchWeeklyEarnings,
    fetchMonthlyEarnings
  };
};
