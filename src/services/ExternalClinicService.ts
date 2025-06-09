import {
  ExternalClinic,
  ExternalClinicFilters,
  MexicanState,
  BoroughCenter,
  ExternalClinicSpecialty
} from "@/types/externalClinicTypes";
import axios from "axios";
import { env } from "@/config/env";
import { AuthService } from "./AuthService";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Array<{
    latitud: number;
    longitud: number;
    clinicBorough: string;
    specialty: string;
  }>;
}

export class ExternalClinicService {
  private static instance: ExternalClinicService;
  private static readonly BASE_URL =
    env.NEXT_PUBLIC_API_URL + "/api/external-clinics";

  private readonly STATE_CENTERS: Record<MexicanState, BoroughCenter> = {
    AGUASCALIENTES: { lat: 21.8853, lng: -102.2916, zoom: 8 },
    "BAJA CALIFORNIA": { lat: 32.6245, lng: -115.4523, zoom: 7 },
    "BAJA CALIFORNIA SUR": { lat: 24.1426, lng: -110.3127, zoom: 7 },
    CAMPECHE: { lat: 19.8301, lng: -90.5349, zoom: 8 },
    CHIAPAS: { lat: 16.7569, lng: -93.1292, zoom: 7 },
    CHIHUAHUA: { lat: 28.6329, lng: -106.0691, zoom: 7 },
    "CIUDAD DE MÉXICO": { lat: 19.4326, lng: -99.1332, zoom: 10 },
    COAHUILA: { lat: 27.0587, lng: -101.7068, zoom: 7 },
    COLIMA: { lat: 19.2452, lng: -103.7241, zoom: 8 },
    DURANGO: { lat: 24.0225, lng: -104.6576, zoom: 7 },
    "ESTADO DE MÉXICO": { lat: 19.2833, lng: -99.6533, zoom: 8 },
    GUANAJUATO: { lat: 21.019, lng: -101.2574, zoom: 8 },
    GUERRERO: { lat: 17.4392, lng: -99.5451, zoom: 7 },
    HIDALGO: { lat: 20.0911, lng: -98.7624, zoom: 8 },
    JALISCO: { lat: 20.6597, lng: -103.3496, zoom: 7 },
    MICHOACÁN: { lat: 19.4326, lng: -101.7068, zoom: 7 },
    MORELOS: { lat: 18.6813, lng: -99.1013, zoom: 8 },
    NAYARIT: { lat: 21.7514, lng: -104.8455, zoom: 8 },
    "NUEVO LEÓN": { lat: 25.6866, lng: -100.3161, zoom: 8 },
    OAXACA: { lat: 17.0732, lng: -96.7266, zoom: 7 },
    PUEBLA: { lat: 19.0413, lng: -98.2062, zoom: 8 },
    QUERÉTARO: { lat: 20.5888, lng: -100.3899, zoom: 8 },
    "QUINTANA ROO": { lat: 19.1817, lng: -88.4791, zoom: 8 },
    "SAN LUIS POTOSÍ": { lat: 22.1565, lng: -100.9855, zoom: 7 },
    SINALOA: { lat: 25.1721, lng: -107.4795, zoom: 7 },
    SONORA: { lat: 29.0729, lng: -110.9559, zoom: 7 },
    TABASCO: { lat: 17.8409, lng: -92.6189, zoom: 8 },
    TAMAULIPAS: { lat: 23.7417, lng: -99.1459, zoom: 7 },
    TLAXCALA: { lat: 19.3185, lng: -98.2374, zoom: 8 },
    VERACRUZ: { lat: 19.1737, lng: -96.1342, zoom: 7 },
    YUCATÁN: { lat: 20.6843, lng: -88.5678, zoom: 8 },
    ZACATECAS: { lat: 22.7709, lng: -102.5832, zoom: 8 }
  };

  private constructor() {}

  public static getInstance(): ExternalClinicService {
    if (!ExternalClinicService.instance) {
      ExternalClinicService.instance = new ExternalClinicService();
    }
    return ExternalClinicService.instance;
  }

  private async fetchData(
    page: number = 0,
    size: number = 100000
  ): Promise<ApiResponse> {
    try {
      const headers = await AuthService.getAuthHeaders();
      const response = await axios.get<ApiResponse>(
        `${ExternalClinicService.BASE_URL}/dashboard`,
        {
          headers,
          params: {
            page: page,
            size: size
          }
        }
      );
      if (
        !response.data ||
        typeof response.data.success !== "boolean" ||
        !Array.isArray(response.data.data)
      ) {
        console.error("Invalid API response structure:", response.data);
        throw new Error("Received malformed data from the clinic API.");
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error fetching clinic data:",
          error.response?.data || error.message
        );
        throw new Error(
          `API request failed: ${error.response?.statusText || error.message}`
        );
      } else {
        console.error("Unexpected error fetching clinic data:", error);
        throw new Error(
          "An unexpected error occurred while fetching clinic data."
        );
      }
    }
  }

  public async getClinics(
    filters?: ExternalClinicFilters
  ): Promise<ExternalClinic[]> {
    const response = await this.fetchData();

    if (!response.success) {
      throw new Error(
        response.message || "Failed to retrieve clinic data from API."
      );
    }

    let clinicData = response.data;

    if (filters) {
      if (filters.specialty) {
        clinicData = clinicData.filter(
          (clinic) => clinic.specialty === filters.specialty
        );
      }

      if (filters.borough) {
        clinicData = clinicData.filter(
          (clinic) => clinic.clinicBorough === filters.borough
        );
      }

      if (filters.minLat !== undefined) {
        clinicData = clinicData.filter(
          (clinic) => clinic.latitud >= filters.minLat!
        );
      }
      if (filters.maxLat !== undefined) {
        clinicData = clinicData.filter(
          (clinic) => clinic.latitud <= filters.maxLat!
        );
      }
      if (filters.minLng !== undefined) {
        clinicData = clinicData.filter(
          (clinic) => clinic.longitud >= filters.minLng!
        );
      }
      if (filters.maxLng !== undefined) {
        clinicData = clinicData.filter(
          (clinic) => clinic.longitud <= filters.maxLng!
        );
      }
    }

    return clinicData.map((clinic, index) => ({
      id: index + 1,
      name: `External Clinic Data Entry #${index + 1}`,
      specialty: clinic.specialty as ExternalClinicSpecialty,
      borough: clinic.clinicBorough as MexicanState,
      lat: clinic.latitud,
      lng: clinic.longitud,
      source: "API"
    }));
  }

  public async getSpecialties(): Promise<string[]> {
    const response = await this.fetchData();
    if (!response.success) {
      throw new Error(
        response.message || "Failed to fetch specialties due to an API issue."
      );
    }
    return Array.from(new Set(response.data.map((clinic) => clinic.specialty)));
  }

  public async getBoroughs(): Promise<string[]> {
    const response = await this.fetchData();
    if (!response.success) {
      throw new Error(
        response.message || "Failed to fetch boroughs due to an API issue."
      );
    }
    return Array.from(
      new Set(response.data.map((clinic) => clinic.clinicBorough))
    );
  }

  public async getHeatmapData(
    filters?: ExternalClinicFilters
  ): Promise<{ lat: number; lng: number; intensity: number }[]> {
    const response = await this.fetchData();
    if (!response.success) {
      throw new Error(
        response.message || "Failed to fetch heatmap data due to an API issue."
      );
    }

    let clinicData = response.data;

    if (filters) {
      if (filters.specialty) {
        clinicData = clinicData.filter(
          (clinic) => clinic.specialty === filters.specialty
        );
      }

      if (filters.borough) {
        clinicData = clinicData.filter(
          (clinic) => clinic.clinicBorough === filters.borough
        );
      }
    }

    return clinicData.map((clinic) => ({
      lat: clinic.latitud,
      lng: clinic.longitud,
      intensity: 1 // Each point has equal intensity since we don't have that data
    }));
  }

  public getBoroughCenter(borough: MexicanState): BoroughCenter {
    return this.STATE_CENTERS[borough];
  }

  public getDefaultCenter(): BoroughCenter {
    return { lat: 23.6345, lng: -102.5528, zoom: 5 }; // Center of Mexico
  }
}
