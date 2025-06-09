import axios from "axios";
import { AuthService } from "./AuthService";
import { env } from "@/config/env";

export interface EarningsDataPoint {
  label: string;
  income: number;
}

export interface BackendWeeklyEarnings {
  week: string;
  earnings: number;
}

export interface BackendMonthlyEarnings {
  month?: string;
  week?: string;
  earnings: number;
}

export interface EarningsResponse {
  data: EarningsDataPoint[];
}

class EarningsService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/api/landlords/earnings";

  async getWeeklyEarnings(): Promise<EarningsResponse> {
    try {
      const headers = await AuthService.getAuthHeaders();
      const response = await axios.get<BackendWeeklyEarnings[]>(
        `${EarningsService.BASE_URL}/weekly`,
        { headers }
      );
      // Map backend { week, earnings } to { label, income }
      const mappedData = Array.isArray(response.data)
        ? response.data.map((item: BackendWeeklyEarnings) => ({
            label: item.week,
            income: item.earnings
          }))
        : [];
      return { data: mappedData };
    } catch (error) {
      console.error("Error fetching weekly earnings:", error);
      throw error;
    }
  }

  async getMonthlyEarnings(): Promise<EarningsResponse> {
    try {
      const headers = await AuthService.getAuthHeaders();
      const response = await axios.get<BackendMonthlyEarnings[]>(
        `${EarningsService.BASE_URL}/monthly`,
        { headers }
      );
      // Map backend { month, earnings } to { label, income }
      const mappedData = Array.isArray(response.data)
        ? response.data.map((item: BackendMonthlyEarnings) => ({
            label: item.month || item.week || "",
            income: item.earnings
          }))
        : [];
      return { data: mappedData };
    } catch (error) {
      console.error("Error fetching monthly earnings:", error);
      throw error;
    }
  }
}

export const earningsService = new EarningsService();
