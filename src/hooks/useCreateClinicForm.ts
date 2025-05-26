import { useState } from "react";
import {
  CLINIC_CATEGORIES,
  ClinicDailyAvailabilityInput,
  ClinicEquipmentType,
  ClinicRegistrationData,
  WEEK_DAYS
} from "@/types/clinicTypes";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import { useForm } from "./useForm";
import { ClinicService } from "@/services/ClinicService";
import { ClinicPhotoService } from "@/services/ClinicPhotoService";
import { v4 as uuidv4 } from "uuid";
import { ClinicEquipmentService } from "@/services/ClinicEquipmentService";
import { ClinicAvailabilityService } from "@/services/ClinicAvailabilityService";
import toast from "react-hot-toast";

export type CreateClinicFormData = Partial<ClinicRegistrationData>;

const ALLOWED_NUM_OF_PHOTOS = 4;


const defaultData: CreateClinicFormData = {
  displayName: "",
  description: "",
  category: CLINIC_CATEGORIES[0],
  equipments: [],
  size: null,
  photos: Array.from({ length: ALLOWED_NUM_OF_PHOTOS }, () => null),
  pricePerDay: null,
  maximumStayInDays: null,
  availabilities: WEEK_DAYS.map((day) => ({
    dayOfWeek: day,
    fromTime: null,
    toTime: null,
    isActive: true
  })),
  propertyProof: null,
  availableFromDate: null,
  availableToDate: null,
  addressStreet: "",
  addressCity: "",
  addressState: "",
  addressZip: "",
  addressCountry: "",
  addressLatitude: 0,
  addressLongitude: 0
};

export function useCreateClinicForm() {
  const router = useRouter();

  const { formData, updateFormData, errors, setError, clearError } =
    useForm<CreateClinicFormData>(defaultData);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => prev - 1);
  const cancel = () => router.push("/main");
  const submit = async () => {
    try {
      setIsSubmitting(true);
      const response = await ClinicService.createClinic(
        formData as ClinicRegistrationData
      );
      if (!response.success || !response.data) {
        throw new Error("Could not create clinic");
      }

      const clinic = response.data;
      await Promise.all([
        uploadPhotos(formData.photos!, clinic.id),
        uploadEquipments(formData.equipments!, clinic.id),
        uploadAvailabilities(formData.availabilities!, clinic.id)
      ]);
      toast.success("Clinic created successfully");
    } catch (error) {
      console.error("[Clinic]: Error creating clinic", error);
      toast.error("Could not create all resources. Please try again");
      const axiosError = error as AxiosError;
      console.error("CREATE CLINIC ERROR STATUS:", axiosError.response?.status);
      console.error("CREATE CLINIC ERROR DATA:", axiosError.response?.data);
      throw error;    
    } finally {
      setIsSubmitting(false);
      
    }
  };

  return {
    formData,
    updateFormData,
    currentStep,
    goNext,
    goBack,
    cancel,
    submit,
    setCurrentStep,
    errors,
    setError,
    clearError,
    isSubmitting
  };
}

async function uploadPhotos(photos: (File | null)[], clinicId: number) {
  await Promise.all(
    photos.map((photo, index) =>
      ClinicPhotoService.uploadClinicPhoto(
        photo!,
        uuidv4(),
        clinicId,
        index === 0
      )
    )
  );
}

async function uploadEquipments(
  equipments: ClinicEquipmentType[],
  clinicId: number
) {
  await Promise.all(
    equipments.map((equipment) =>
      ClinicEquipmentService.uploadClinicEquipment(equipment, 1, clinicId)
    )
  );
}

async function uploadAvailabilities(
  availabilities: ClinicDailyAvailabilityInput[],
  clinicId: number
) {
  await Promise.all(
    availabilities
      .filter((a) => a.isActive)
      .map((a) =>
        ClinicAvailabilityService.uploadClinicAvailability(
          clinicId,
          a.fromTime!,
          a.toTime!,
          a.dayOfWeek
        )
      )
  );
}
