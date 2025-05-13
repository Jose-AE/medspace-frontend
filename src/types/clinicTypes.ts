export const CLINIC_CATEGORIES = [
  "GENERAL_PURPOSE",
  "DENTIST",
  "PEDIATRIC",
  "PSYCHOLOGICAL",
  "SURGICAL",
  "DERMATOLOGICAL"
] as const;
export type ClinicCategoryType = (typeof CLINIC_CATEGORIES)[number];

export const CLINIC_EQUIPMENTS = [
  "X_RAY",
  "ULTRASOUND",
  "MRI",
  "CT_SCAN",
  "LABORATORY",
  "SURGICAL_THEATER",
  "PHARMACY",
  "REHABILITATION"
] as const;
export type ClinicEquipmentType = (typeof CLINIC_EQUIPMENTS)[number];

export const WEEK_DAY_NUMBERS = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0
} as const;

export const WEEK_DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
] as const;

export type WeekDayType = (typeof WEEK_DAYS)[number];

export interface Clinic {
  id: number;
  displayName: string;
  category: ClinicCategoryType;
  description: string;

  pricePerDay: number;
  maxStayDays: number;
  availableFromDate: Date;
  availableToDate: Date;

  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  addressLongitude: string;
  addressLatitude: string;

  landlordId: number;
  averageRating: number;

  photos?: ClinicPhoto[];
  equipments?: ClinicEquipment[];
  availabilities?: ClinicAvailability[];
}

export interface ClinicPhoto {
  id: number;
  clinicId: number;
  path: string;
  isPrimary: boolean;
}

export interface ClinicAvailability {
  id: number;
  clinicId: number;
  startTime: string; // Format: HH:mm
  endTime: string; // Format: HH:mm
  weekDay: WeekDayType;
}

export interface ClinicEquipment {
  id: number;
  clinicId: number;
  quantity: number;
  type: ClinicEquipmentType;
}

export interface ClinicRegistrationData {
  displayName: string;
  description: string;
  category: ClinicCategoryType;
  equipments: ClinicEquipmentType[];
  size: number | null;
  photos: (File | null)[];
  pricePerDay: number | null;
  maximumStayInDays: number | null;
  availabilities: {
    dayOfWeek: string;
    fromTime: string | null;
    toTime: string | null;
    isActive: boolean;
  }[];
  propertyProof: File | null;
  availableFromDate: Date | null;
  availableToDate: Date | null;
  addressLatitude: number; 
  addressLongitude: number; 
  addressStreet: string
  addressCity: string;
  addressZip: string;
  addressCountry: string;
  addressState: string;
}

export interface ClinicDailyAvailabilityInput {
  dayOfWeek: string;
  fromTime: string | null;
  toTime: string | null;
  isActive: boolean;
}

export interface ClinicPreview
  extends Pick<
    Clinic,
    | "id"
    | "displayName"
    | "addressState"
    | "averageRating"
    | "category"
    | "pricePerDay"
    | "description"
  > {
  mainPhotoPath: string;
}
