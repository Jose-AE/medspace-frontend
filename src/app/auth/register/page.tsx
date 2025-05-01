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
import { UserRegistrationData } from "@/types/userTypes";
import axios from "axios";
import { FirebaseError } from "firebase/app";

type CreateUserFormData = Partial<UserRegistrationData>;

export default function RegisterPage() {
  const { formData, updateFormData } = useForm<CreateUserFormData>({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    userType: "ANALYST",
    tenantProfessionalLicenseNumber: "",
    tenantSpecialtyId: 1
  });

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { label: "Basic Info" },
    { label: "Documents" }
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

    try {
      const d = formData as UserRegistrationData;

      await AuthService.registerUserWithEmailAndPassword(
        d.email,
        d.password,
        d
      );
      toast.success("User created successfully!");
      // Redirect to login page or show success message
      window.location.href = "/main";
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
    if (!formData.pfp) {
      toast.error("Please upload a profile picture.");
      return false;
    }
    if (!formData.officialId) {
      console.log(formData.officialId);
      toast.error("Please upload an official ID.");
      return false;
    }

    if (formData.userType === "TENANT") {
      if (!formData.tenantProfessionalLicenseNumber) {
        toast.error("Please enter your professional license number.");
        return false;
      }

      if (!formData.tenantProfessionalLicense) {
        toast.error("Please upload a professional license.");
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
                  ? "font-bold text-blue-600"
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
          <Button className="w-full" onClick={handleNextStep}>
            {currentStep === steps.length ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </main>
  );
}
