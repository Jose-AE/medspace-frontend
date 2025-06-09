import axios from "axios";
import { ApiResponse } from "@/types/serviceTypes";
import { env } from "@/config/env";
import { AuthService } from "./AuthService";

export interface EarningPrediction {
  date: string;
  predictedAmount: number;
}

export class PythonService {
  static BASE_URL = "https://python-backend-567161984682.us-central1.run.app";

  static async predictPrice(zipCode: string, size: number): Promise<number> {
    try {
      await axios.get<ApiResponse<null>>(
        this.BASE_URL + `/predict_price/train`
      );

      const res = await axios.get(
        this.BASE_URL + `/predict_price?zip=${zipCode}&size=${size}`
      );

      return res.data.PrecioIdeal / 20;
    } catch (error) {
      console.error("[PythonService]: Predict Price Error:", error);
      throw error;
    }
  }

  static async getPredictedEarnings(): Promise<EarningPrediction[]> {
    try {
      //sleep for 2 seconds to ensure the Python service is ready
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const headers = await AuthService.getAuthHeaders();

      const res = await axios.get(
        `${env.NEXT_PUBLIC_API_URL}/predictions/earnings`,
        {
          headers
        }
      );

      return JSON.parse(res.data.data) as EarningPrediction[];
    } catch (error) {
      console.error("[PythonService]: Predicted Earnings Error:", error);
      throw error;
    }
  }
}
