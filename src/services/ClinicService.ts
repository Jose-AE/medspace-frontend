import { env } from "@/config/env";
import {
  Clinic,
  ClinicEquipmentType,
  ClinicRegistrationData,
  ClinicPreview,
  EditClinicData
} from "@/types/clinicTypes";
import { ApiResponse } from "@/types/serviceTypes";
import { AuthService } from "./AuthService";
import axios from "axios";
import { format } from "date-fns";
import { safeApiCall } from "@/lib/apiUtils";

export type CityOption = {
  label: string;
  value: string;
};
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
      addressLatitude: data.addressLatitude?.toString() ?? "",
      size: data.size
    };

    const headers = await AuthService.getAuthHeaders();

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

  static async getClinicById(
    id: string,
    settings: {
      includePhotos: boolean;
      includeEquipments: boolean;
      includeAvailabilities: boolean;
    }
  ): Promise<Clinic | null> {
    try {
      const params = new URLSearchParams();
      params.append("photos", settings.includePhotos.toString());
      params.append("equipments", settings.includeEquipments.toString());
      params.append(
        "availabilities",
        settings.includeAvailabilities.toString()
      );

      const headers = await AuthService.getAuthHeaders();
      const response = await axios.get<ApiResponse<Clinic>>(
        `${this.BASE_URL}/${id}?${params.toString()}`,
        {
          headers
        }
      );

      if (!response.data || !response.data.data) {
        return null;
      }

      //Delete when endpoint is ready
      const dates = [
        //YYYY-MM-DD
        "2025-05-02",
        "2025-05-03",
        "2025-05-04",
        "2025-05-05",
        "2025-05-06"
      ];

      const formattedDates = dates.map((date) => {
        return new Date(date);
      });
      response.data.data.occupiedDates = formattedDates;
      ///////

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return null;
        }
      }
      console.error("[ClinicService]: Get clinic by ID error:", error);
      throw error;
    }
  }

  static async deleteClinicById(clinicId: number): Promise<void> {
    try {
      const headers = await AuthService.getAuthHeaders();
      await axios.delete(`${this.BASE_URL}/${clinicId}`, { headers });
    } catch (error) {
      console.error("[ClinicService]: Delete clinic error:", error);
      throw error;
    }
  }

  static async getMyClinics(): Promise<ClinicPreview[]> {
    try {
      const headers = await AuthService.getAuthHeaders();
      const response = await axios.get<ApiResponse<ClinicPreview[]>>(
        `${this.BASE_URL}/my-clinics`,
        { headers }
      );

      return response.data.data || [];
    } catch (error) {
      console.error("[ClinicService]: Get my clinics error:", error);
      throw error;
    }
  }

  static async updateClinicById(clinicId: number, data: EditClinicData) {
    try {
      const headers = await AuthService.getAuthHeaders();
      await axios.put(`${this.BASE_URL}/${clinicId}`, data, { headers });
    } catch (error) {
      console.error("[ClinicService]: Update clinic error:", error);
      throw error;
    }
  }

  static async getClinicSuggestedPrice(clinicId: number) {
    try {
      //simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return clinicId + 100; // This should be replaced with actual logic to get suggested price

      // const headers = await AuthService.getAuthHeaders();
      // await axios.put(`${this.BASE_URL}/${clinicId}`, { headers });
    } catch (error) {
      console.error("[ClinicService]: Update clinic error:", error);
      throw error;
    }
  }
  static async getClinicsCount({
    category,
    city,
  }: {
    category?: string;
    city?: string;
  }): Promise<number> {
    let url = "";
  
    if (category && city) {
      url = `${this.BASE_URL}/filter?category=${category}&city=${city}`;
    } else if (city) {
      url = `${this.BASE_URL}/city-clinics/${city}`;
    } else if (category) {
      url = `${this.BASE_URL}/${category}/count`;
    } else {
      throw new Error("Debe indicar al menos ciudad o categoría");
    }
  
    const res = await fetch(url, { cache: "no-store" });
  
    if (!res.ok) throw new Error("No se pudo obtener el conteo");
  
    const json = await res.json();
  
    // Manejar los diferentes formatos posibles
    if (typeof json.data === "number") {
      return json.data; // caso filter
    } else if (json.data && typeof json.data.count === "number") {
      return json.data.count; // caso city-clinics
    } else if (typeof json.count === "number") {
      return json.count; // caso category/count
    } else {
      throw new Error("Formato inesperado en la respuesta del backend");
    }
  }
  
  static async getCitiesWithClinics(): Promise<CityOption[]> {
    const res = await fetch(`${this.BASE_URL}/cities`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error fetching cities");

    const json = await res.json();
    if (json.data) {
      return json.data.count ?? json.data;
    }
    
    return json.count ?? 0;
    
  }
  static async getTotalClinicsCount(): Promise<number> {
    const url = `${this.BASE_URL}/clinics-count`;
  
    const res = await fetch(url, { cache: "no-store" });
  
    if (!res.ok) throw new Error("No se pudo obtener el conteo total de clínicas");
  
    const json = await res.json();
  
    // Tu backend devuelve el count directamente en data, ej:
    // { success: true, message: "...", data: 123 }
    return json.data;
  }
  
}
