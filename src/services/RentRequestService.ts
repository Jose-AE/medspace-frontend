import { ApiResponse } from "@/types/serviceTypes";
import { AuthService } from "./AuthService";
import axios from "axios";
import { env } from "@/config/env";
import {
  RentRequestPreview,
  RentRequestStatusType
} from "@/types/rentRequestTypes";

export class RentRequestService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/rent-requests";

  static async fetchRentRequestsByLandlord(
    status: RentRequestStatusType
  ): Promise<ApiResponse<RentRequestPreview[]>> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const params = new URLSearchParams();
      params.append("status", status);
      const response = await axios.get<ApiResponse<RentRequestPreview[]>>(
        this.BASE_URL + "/landlord" + `?${params}`,
        {
          headers
        }
      );
      return response.data;
    } catch (error) {
      console.error("[RentRequestService]: Fetch rent requests error:", error);
      throw error;
    }
  }

  static async sendRentRequest(
    clinicId: number,
    comments: string,
    dates: Date[]
  ): Promise<void> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const body = {
        clinicId,
        comments,
        dates: dates.map((date) => date.toISOString().split("T")[0])
      };

      await axios.post<ApiResponse<null>>(this.BASE_URL, body, {
        headers
      });
    } catch (error) {
      console.error("[RentRequestService]: Send rent request error:", error);
      throw error;
    }
  }
}
