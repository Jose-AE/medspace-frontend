import axios from "axios";
import { env } from "@/config/env";
import { User, UserRegistrationData } from "@/types/userTypes";
import { ApiResponse } from "@/types/serviceTypes";
import { AuthService } from "./AuthService";

export class UserService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/users";

  static async createUserProfile(
    data: Omit<UserRegistrationData, "password">
  ): Promise<ApiResponse<null>> {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("pfp", data.pfp);
      formData.append("userType", data.userType);
      formData.append("officialId", data.officialId);

      if (data.userType === "TENANT") {
        formData.append(
          "tenantProfessionalLicense",
          data.tenantProfessionalLicense!
        );
        formData.append(
          "tenantProfessionalLicenseNumber",
          data.tenantProfessionalLicenseNumber!
        );
        formData.append("tenantSpecialtyId", String(data.tenantSpecialtyId));
      }
      const headers = await AuthService.getAuthHeaders();

      const response = await axios.post<ApiResponse<null>>(
        this.BASE_URL,
        formData,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error("[UserService]: Create user profile error:", error);
      throw error;
    }
  }

  static async fetchCurrentUserProfile(): Promise<User> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const response = await axios.get(this.BASE_URL + "/me", {
        headers
      });

      const userData = response.data.data as User;

      if (userData.createdAt)
        userData.createdAt = new Date(userData.createdAt);

      return userData;
    } catch (error) {
      console.error("Error fetching user data", error);
      throw error; // You can customize the error handling as needed
    }
  }
}
