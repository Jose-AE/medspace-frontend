export const MEXICO_CITY_BOROUGHS = [
  "Coyoacán",
  "Álvaro Obregón",
  "Benito Juárez",
  "Cuauhtémoc",
  "Miguel Hidalgo"
] as const;

export type MexicoCityBorough = (typeof MEXICO_CITY_BOROUGHS)[number];

export const EXTERNAL_CLINIC_SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology"
] as const;

export type ExternalClinicSpecialty =
  (typeof EXTERNAL_CLINIC_SPECIALTIES)[number];

export interface BoroughCenter {
  lat: number;
  lng: number;
  zoom: number;
}

export interface ExternalClinic {
  id: number;
  name: string;
  specialty: ExternalClinicSpecialty;
  borough: MexicoCityBorough;
  lat: number;
  lng: number;
  estimatedSpecialists: number;
  address: string;
  source: string;
}

export interface ExternalClinicFilters {
  specialty?: ExternalClinicSpecialty;
  borough?: MexicoCityBorough;
  minLat?: number;
  maxLat?: number;
  minLng?: number;
  maxLng?: number;
}
