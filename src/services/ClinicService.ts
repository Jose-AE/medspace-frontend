import { env } from "@/config/env";
import {
  Clinic,
  ClinicEquipmentType,
  ClinicRegistrationData
} from "@/types/clinicTypes";
import { ApiResponse } from "@/types/serviceTypes";
import { AuthService } from "./AuthService";
import axios from "axios";
import { format } from "date-fns";
import { MOCK_CLINICS } from "@/mocks/clinics";
import { safeApiCall } from "@/lib/apiUtils";

export class ClinicService {
  static BASE_URL = env.NEXT_PUBLIC_API_URL + "/clinics";

  static async createClinic(
    data: ClinicRegistrationData
  ): Promise<ApiResponse<Clinic>> {
    const MAX_STREET_LENGTH = 255;
    const street =
      data.addressStreet.length > MAX_STREET_LENGTH
        ? data.addressStreet.slice(0, MAX_STREET_LENGTH)
        : data.addressStreet;
        console.log("street", street)
        const zip = data.addressZip?.trim() || "00000";
    const body = {
      displayName: data.displayName,
      category: data.category,
      pricePerDay: data.pricePerDay,
      maxStayDays: data.maximumStayInDays,
      description: data.description,
      availableFromDate: data.availableFromDate,
      availableToDate: data.availableToDate,
      addressStreet: street,
      addressCity: data.addressCity,
      addressState: data.addressState,
      addressZip: zip,
      addressCountry: data.addressCountry,
      addressLongitude: data.addressLongitude?.toString() ?? "",
      addressLatitude:data.addressLatitude?.toString() ?? "",
    };

    const headers = await AuthService.getAuthHeaders();
    console.log("CREATE CLINIC body:", body);
    return safeApiCall(
      () =>
        axios
          .post<ApiResponse<Clinic>>(this.BASE_URL, body, { headers })
          .then((res) => res.data),
      "ClinicService: createClinic"
    );
  }

  static async getClinics(settings: {
    includePhotos: boolean;
    includeEquipments: boolean;
    includeAvailabilities: boolean;
    targetDate?: Date;
    equipmentList?: ClinicEquipmentType[];
    targetHour?: string;
    targetCity?: string;
  }): Promise<Clinic[]> {
    try {
      const headers = await AuthService.getAuthHeaders();

      const params = new URLSearchParams();
      params.append("photos", settings.includePhotos.toString());
      params.append("equipments", settings.includeEquipments.toString());
      params.append(
        "availabilities",
        settings.includeAvailabilities.toString()
      );

      if (settings.targetDate) {
        const date = format(settings.targetDate, "yyyy-MM-dd");
        params.append("date", date);
      }

      if (settings.equipmentList && settings.equipmentList.length > 0) {
        settings.equipmentList.forEach((equipment) => {
          params.append("equipmentList", equipment);
        });
      }

      if (settings.targetHour) {
        params.append("hour", settings.targetHour);
      }

      if (settings.targetCity) {
        params.append("city", settings.targetCity);
      }

      const response = await axios.get<ApiResponse<Clinic[]>>(
        `${this.BASE_URL}?${params.toString()}`,
        {
          headers
        }
      );

      return response.data.data || [];
    } catch (error) {
      console.error("[ClinicService]: Get clinic by ID error:", error);
      throw error;
    }
  }

  static async getClinicById(id: string): Promise<Clinic | null> {
    return MOCK_CLINICS.find((clinic) => clinic.id === Number(id)) || null;

    // try {
    //   const headers = await AuthService.getAuthHeaders();
    //   const response = await axios.get<ApiResponse<Clinic>>(
    //     `${this.BASE_URL}/${id}`,
    //     {
    //       headers
    //     }
    //   );

    //   if (!response.data || !response.data.data) {
    //     return null;
    //   }

    //   return response.data.data;
    // } catch (error) {
    //   console.error("[ClinicService]: Get clinic by ID error:", error);
    //   throw error;
    // }
  }
}
