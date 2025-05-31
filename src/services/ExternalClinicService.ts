import {
  ExternalClinic,
  ExternalClinicFilters,
  MexicoCityBorough,
  BoroughCenter
} from "@/types/externalClinicTypes";
import { MOCK_EXTERNAL_CLINICS } from "@/mocks/externalClinics";

export class ExternalClinicService {
  private static instance: ExternalClinicService;
  private clinics: ExternalClinic[] = MOCK_EXTERNAL_CLINICS;

  private readonly BOROUGH_CENTERS: Record<MexicoCityBorough, BoroughCenter> = {
    Cuauhtémoc: { lat: 19.4326, lng: -99.1332, zoom: 12 },
    "Miguel Hidalgo": { lat: 19.415, lng: -99.193, zoom: 12 },
    "Benito Juárez": { lat: 19.397, lng: -99.167, zoom: 12 },
    Coyoacán: { lat: 19.345, lng: -99.162, zoom: 12 },
    "Álvaro Obregón": { lat: 19.355, lng: -99.2, zoom: 12 }
  };

  private constructor() {}

  public static getInstance(): ExternalClinicService {
    if (!ExternalClinicService.instance) {
      ExternalClinicService.instance = new ExternalClinicService();
    }
    return ExternalClinicService.instance;
  }

  public getClinics(filters?: ExternalClinicFilters): ExternalClinic[] {
    if (!filters) {
      return this.clinics;
    }

    return this.clinics.filter((clinic) => {
      // Filter by specialty if specified
      if (filters.specialty && clinic.specialty !== filters.specialty) {
        return false;
      }

      // Filter by borough if specified
      if (filters.borough && clinic.borough !== filters.borough) {
        return false;
      }

      // Filter by bounding box if specified
      if (filters.minLat !== undefined && clinic.lat < filters.minLat)
        return false;
      if (filters.maxLat !== undefined && clinic.lat > filters.maxLat)
        return false;
      if (filters.minLng !== undefined && clinic.lng < filters.minLng)
        return false;
      if (filters.maxLng !== undefined && clinic.lng > filters.maxLng)
        return false;

      return true;
    });
  }

  public getClinicsBySpecialty(specialty: string): ExternalClinic[] {
    return this.clinics.filter((clinic) => clinic.specialty === specialty);
  }

  public getClinicsByBorough(borough: MexicoCityBorough): ExternalClinic[] {
    return this.clinics.filter((clinic) => clinic.borough === borough);
  }

  public getClinicsInBoundingBox(
    minLat: number,
    maxLat: number,
    minLng: number,
    maxLng: number
  ): ExternalClinic[] {
    return this.getClinics({
      minLat,
      maxLat,
      minLng,
      maxLng
    });
  }

  public getSpecialties(): string[] {
    return [...new Set(this.clinics.map((clinic) => clinic.specialty))];
  }

  public getBoroughs(): string[] {
    return [...new Set(this.clinics.map((clinic) => clinic.borough))];
  }

  public getClinicById(id: number): ExternalClinic | undefined {
    return this.clinics.find((clinic) => clinic.id === id);
  }

  public getHeatmapData(
    filters?: ExternalClinicFilters
  ): { lat: number; lng: number; intensity: number }[] {
    const filteredClinics = this.getClinics(filters);
    return filteredClinics.map((clinic) => ({
      lat: clinic.lat,
      lng: clinic.lng,
      intensity: clinic.estimatedSpecialists / 15 // Normalize to 0-1 range, assuming max specialists is 15
    }));
  }

  public getBoroughCenter(borough: MexicoCityBorough): BoroughCenter {
    return this.BOROUGH_CENTERS[borough];
  }

  public getDefaultCenter(): BoroughCenter {
    return { lat: 19.4326, lng: -99.1332, zoom: 10 }; // Mexico City center
  }
}
