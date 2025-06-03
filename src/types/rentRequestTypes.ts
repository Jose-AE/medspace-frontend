import { ClinicAvailability } from "./clinicTypes";
import { ApiResponse } from "./serviceTypes";

export const RENT_REQUEST_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  CANCELED: "CANCELED"
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
  landlordId: number;
  clinicId: number;
  clinicDisplayName: string;
  clinicMainPhotoPath: string;
  clinicAddress: string;
  clinicAvailabilities: ClinicAvailability[];
  tenantFullName: string;
  tenantProfilePictureUrl: string;
  tenantSpecialty: string;
  landlordFullName: string;
  landlordProfilePictureUrl: string;
  requestedDays: Date[];
}

export interface RentRequestDashboardData {
  rentRequestId: number;
  tenantName: string;
  clinicName: string;
  status: string;
  createdAt: string;
  tenantSpecialty: string;
  clinicAddress: string;
  clinicBorough: string;
  clinicLatitude: number;
  clinicLongitude: number;
}

export interface RentRequestDashboardResponse
  extends ApiResponse<RentRequestDashboardData[]> {
  success: boolean;
  message: string;
  data: RentRequestDashboardData[];
}
