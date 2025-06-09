import axios from "axios";
import { env } from "@/config/env";
import {
  CreateUserProfileData,
  EditUserProfileData,
  User,
  UserPublic
} from "@/types/userTypes";
import { ApiResponse } from "@/types/serviceTypes";
import { AuthService } from "./AuthService";

export class UserService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/users";

  static async createUserProfile(data: CreateUserProfileData): Promise<void> {
    try {
      const headers = await AuthService.getAuthHeaders();

      await axios.post<ApiResponse<null>>(this.BASE_URL, data, { headers });
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
      userData.createdAt = new Date(userData.createdAt);

      return userData;
    } catch (error) {
      console.error("Error fetching user data", error);
      throw error; // You can customize the error handling as needed
    }
  }

  static async fetchPublicUserProfile(userId: number): Promise<UserPublic> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const response = await axios.get<ApiResponse<UserPublic>>(
        this.BASE_URL + `/${userId}/public-profile`,
        {
          headers
        }
      );

      const userData = response.data.data as UserPublic;
      userData.createdAt = new Date(userData.createdAt);

      return userData;
    } catch (error) {
      console.error("[UserService]: Error fetching public user data", error);
      throw error; // You can customize the error handling as needed
    }
  }

  static async updateUserProfile(data: EditUserProfileData): Promise<void> {
    try {
      const headers = await AuthService.getAuthHeaders();

      await axios.put<ApiResponse<null>>(this.BASE_URL + "/me", data, {
        headers
      });
    } catch (error) {
      console.error("[UserService]: Update user profile error:", error);
      throw error;
    }
  }

  static async deleteUserProfile(): Promise<void> {
    try {
      const headers = await AuthService.getAuthHeaders();

      await axios.delete<ApiResponse<null>>(this.BASE_URL + "/me", {
        headers
      });
    } catch (error) {
      console.error("[UserService]: Delete user profile error:", error);
      throw error;
    }
  }
  
}
