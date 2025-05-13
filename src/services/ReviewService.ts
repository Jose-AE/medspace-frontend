import axios from "axios";
import { AuthService } from "./AuthService";
import { ApiResponse } from "@/types/serviceTypes";

export class ReviewService {
  static BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

  static async reviewTenant(
    tenantId: number,
    rating: number,
    comment: string
  ): Promise<void> {
    try {
      //simulate wait
      await new Promise((resolve) => setTimeout(resolve, 2000));

      //   const headers = await AuthService.getAuthHeaders();
      //   await axios.post<ApiResponse<null>>(
      //     `${this.BASE_URL}/review-tenant/${tenantId}`,
      //     {},
      //     {
      //       headers
      //     }
      //   );
    } catch (error) {
      console.error("[ReviewService]: Review tenant error:", error);
      throw error;
    }
  }
}
