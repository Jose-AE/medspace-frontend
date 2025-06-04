"use client";

import MultistepFormNavItem from "@/components/MultistepFormNavItem";
import { useForm } from "@/hooks/useForm";
import { cn } from "@/lib/utils";
import { useState } from "react";
import BasicInfoSection from "./steps/BasicInfoSection";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import DocumentsSection from "./steps/DocumentsSection";
import { AuthService } from "@/services/AuthService";
import { CreateUserProfileData } from "@/types/userTypes";
import axios from "axios";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { StorageService } from "@/services/StorageService";
import { v4 as uuidv4 } from "uuid";
import { UserService } from "@/services/UserService";

export interface CreateUserFormData
  extends Omit<CreateUserProfileData, "pfpPath" | "tenantLicensePath"> {
  pfpFile: File | null;
  tenantLicenseFile: File | null;
  password: string;
  officialIdFile: File | null;
  tenantLicenseNumber: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { formData, updateFormData } = useForm<CreateUserFormData>({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    userType: "ANALYST",
    pfpFile: null,
    tenantSpecialtyId: 1,
    tenantLicenseFile: null,
    bio: "",
    officialIdFile: null,
    tenantLicenseNumber: ""
  });

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { label: "Basic Info" },
    { label: "Details" }
    // { label: "Payment details" }
  ];

  function renderCurrentStepComponent() {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoSection
            formData={formData}
            updateFormData={updateFormData}
          />
        );

      case 2:
        return (
          <DocumentsSection
            formData={formData}
            updateFormData={updateFormData}
          />
        );

      default:
        return null;
    }
  }

  async function handleSumit() {
    if (!validateDocuments()) return;
    setIsLoading(true); // Set loading state to true

    try {
      const userData: CreateUserProfileData = {
        pfpPath: "/pfp_placeholder.png",
        tenantLicensePath: "null",
        bio: formData.bio,
        email: formData.email,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        tenantSpecialtyId: formData.tenantSpecialtyId,
        userType: formData.userType
      };

      await AuthService.registerUserWithEmailAndPassword(
        formData.password,
        userData
      );

      //try to get user profile for 10 seconds
      // This is to ensure that the user is created and can create documents
      for (let i = 0; i < 10; i++) {
        // Check if the user is created by fetching the user profile
        const token = await AuthService.getIdToken();
        if (token) {
          break; // Exit loop if user is found
        }
        console.warn(
          `Attempt ${i + 1}: User profile not found yet, retrying...`
        );

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retrying
      }

      //create documents
      const pfpPath = await StorageService.uploadImage(
        formData.pfpFile!,
        `user-pfps/${uuidv4()}-${formData.pfpFile?.name}`
      );

      let tenantLicensePath: string | undefined = undefined;
      if (formData.userType === "TENANT") {
        tenantLicensePath = await StorageService.uploadImage(
          formData.tenantLicenseFile!,
          `tenant-licenses/${uuidv4()}-${formData.tenantLicenseFile?.name}`
        );
      }

      await UserService.updateUserProfile({
        pfpPath,
        tenantLicensePath
      });

      toast.success("User created successfully!");

      router.push("/main"); // Redirect to home page after successful registration
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK")
          toast.error(
            error.response?.data.message || "Error making request to backend."
          );
        else
          toast.error(error.response?.data.message || "Error creating user.");
      } else if (error instanceof FirebaseError) {
        // Handle specific Firebase error codes here
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("This email is already in use.");
            break;
          default:
            toast.error(error.message || "Firebase error occurred.");
        }
      } else {
        toast.error("Error creating user. Please try again.");
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  function validateBasicInfo() {
    if (!formData.fullName) {
      toast.error("Please enter your full name.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || "")) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Please enter a password with at least 6 characters.");
      return false;
    }

    if (!formData.phoneNumber) {
      toast.error("Please enter your phone number.");
      return false;
    }

    return true;
  }

  function validateDocuments() {
    const sizeLimit = 2 * 1024 * 1024; // 2MB

    if (!formData.pfpFile) {
      toast.error("Please upload a profile picture.");
      return false;
    }
    if (formData.pfpFile.size > sizeLimit) {
      toast.error("Profile picture size should be less than 2MB.");
      return false;
    }

    if (!formData.bio) {
      toast.error("Please enter a short description about you.");
      return false;
    }

    if (formData.bio.length > 500) {
      toast.error("Bio should be max 500 characters.");
      return false;
    }

    if (!formData.officialIdFile) {
      toast.error("Please upload an official ID.");
      return false;
    }

    if (formData.officialIdFile.size > sizeLimit) {
      toast.error("Oficial ID size should be less than 2MB.");
      return false;
    }

    if (formData.userType === "TENANT") {
      if (!formData.tenantLicenseNumber) {
        toast.error("Please enter your professional license number.");
        return false;
      }

      if (!formData.tenantLicenseFile) {
        toast.error("Please upload a professional license.");
        return false;
      }

      if (formData.tenantLicenseFile.size > sizeLimit) {
        toast.error("Professional license size should be less than 2MB.");
        return false;
      }
    }

    return true;
  }

  function handleNextStep() {
    if (currentStep < steps.length) {
      if (currentStep === 1 && !validateBasicInfo()) {
        return;
      }
      if (currentStep === 2 && !validateDocuments()) {
        return;
      }

      setCurrentStep((prev) => prev + 1);
    } else {
      // Handle form submission
      handleSumit();
    }
  }

  function handleBackStep() {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  return (
    <main className="flex items-center pt-3 justify-center min-h-[calc(100vh-70px)]  px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 space-y-8">
        {/* Step Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          {steps.map((step, i) => (
            <MultistepFormNavItem
              key={i}
              stepNumber={i + 1}
              label={step.label}
              fill={currentStep >= i + 1}
              arrow={i < steps.length - 1}
              className={cn(
                "flex",
                currentStep === i + 1
                  ? "font-bold text-primary-600"
                  : "text-gray-500"
              )}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="w-full">{renderCurrentStepComponent()}</div>
        <div className="mt-6 flex flex-row gap-4">
          {currentStep > 1 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleBackStep}
            >
              Back
            </Button>
          )}
          <Button
            className="w-full"
            onClick={handleNextStep}
            isLoading={isLoading}
          >
            {currentStep === steps.length ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </main>
  );
}
