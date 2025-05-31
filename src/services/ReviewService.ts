import axios from "axios";
import { AuthService } from "./AuthService";
import { ApiResponse } from "@/types/serviceTypes";
import { Review, ReviewType } from "@/types/reviewTypes";

export class ReviewService {
  static BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

  static async createReview(
    type: ReviewType,
    rentRequestId: number,
    rating: number,
    comment: string
  ): Promise<void> {
    try {
      const headers = await AuthService.getAuthHeaders();
      await axios.post<ApiResponse<null>>(
        `${this.BASE_URL}/${type}`,
        {
          rating,
          comment,
          rentRequestId
        },
        { headers }
      );
    } catch (error) {
      console.error("[ReviewService]: Review tenant error:", error);
      throw error;
    }
  }

  static async getReviewsByUserId(id: number): Promise<Review[]> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const response = await axios.get<ApiResponse<Review[]>>(
        `${this.BASE_URL}/user/${id}`,
        { headers }
      );

      return response.data.data || [];
    } catch (error) {
      console.error("[ReviewService]: Get reviews by user ID error:", error);
      throw error;
    }
  }

  static async getReviewsByClinicId(id: number): Promise<Review[]> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const response = await axios.get<ApiResponse<Review[]>>(
        `${this.BASE_URL}/clinic/${id}`,
        { headers }
      );

      return response.data.data || [];
    } catch (error) {
      console.error("[ReviewService]: Get reviews by  clinic ID error:", error);
      throw error;
    }
  }
}
