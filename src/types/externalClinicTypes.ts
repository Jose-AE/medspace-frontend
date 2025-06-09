export const MEXICAN_STATES = [
  "AGUASCALIENTES",
  "BAJA CALIFORNIA",
  "BAJA CALIFORNIA SUR",
  "CAMPECHE",
  "CHIAPAS",
  "CHIHUAHUA",
  "CIUDAD DE MÉXICO",
  "COAHUILA",
  "COLIMA",
  "DURANGO",
  "ESTADO DE MÉXICO",
  "GUANAJUATO",
  "GUERRERO",
  "HIDALGO",
  "JALISCO",
  "MICHOACÁN",
  "MORELOS",
  "NAYARIT",
  "NUEVO LEÓN",
  "OAXACA",
  "PUEBLA",
  "QUERÉTARO",
  "QUINTANA ROO",
  "SAN LUIS POTOSÍ",
  "SINALOA",
  "SONORA",
  "TABASCO",
  "TAMAULIPAS",
  "TLAXCALA",
  "VERACRUZ",
  "YUCATÁN",
  "ZACATECAS"
] as const;

export type MexicanState = (typeof MEXICAN_STATES)[number];

export const EXTERNAL_CLINIC_SPECIALTIES = [
  "Consultorios de medicina especializada del sector privado"
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
  name?: string;
  specialty: ExternalClinicSpecialty;
  borough: MexicanState;
  lat: number;
  lng: number;
  estimatedSpecialists?: number;
  address?: string;
  source: string;
}

export interface ExternalClinicFilters {
  specialty?: ExternalClinicSpecialty;
  borough?: MexicanState;
  minLat?: number;
  maxLat?: number;
  minLng?: number;
  maxLng?: number;
}
