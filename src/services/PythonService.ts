import axios from "axios";
import { ApiResponse } from "@/types/serviceTypes";

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
}
