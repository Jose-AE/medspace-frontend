import { ClinicAvailability } from "./clinicTypes";

export const RENT_REQUEST_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  DENIED: "DENIED"
} as const;
export type RentRequestStatusType =
  (typeof RENT_REQUEST_STATUS)[keyof typeof RENT_REQUEST_STATUS];

export interface RentRequestPreview {
  id: number;
  startDate: Date;
  endDate: Date;
  comments: string;
  status: RentRequestStatusType;
  tenantId: number;
  clinicId: number;
  clinicDisplayName: string;
  clinicMainPhotoPath: string;
  clinicAddress: string;
  clinicAvailabilities: ClinicAvailability[];
  tenantFullName: string;
  tenantProfilePictureUrl: string;
  tenantSpecialty: string;
  requestedDays: Date[];
}
