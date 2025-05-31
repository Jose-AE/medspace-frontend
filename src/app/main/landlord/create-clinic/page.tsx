"use client";

import MultistepFormNavItem from "@/components/MultistepFormNavItem";
import { cn } from "@/lib/utils";
import { useCreateClinicForm } from "@/hooks/useCreateClinicForm";
import BasicInfoSection from "./components/BasicInfoSection";
import PhotosSection from "./components/PhotosSection";
import RentDataSection from "./components/RentDataSection";
import PropertyProof from "./components/PropertyProofSection";

export default function CreateClinicPage() {
  const {
    currentStep,
    goBack,
    goNext,
    cancel,
    formData,
    updateFormData,
    submit,
    errors,
    setError,
    clearError,
    isSubmitting
  } = useCreateClinicForm();

  const steps = [
    { label: "Basic Info" },
    { label: "Photos" },
    { label: "Rent Data" },
    { label: "Property Proof" }
  ];

  const renderCurrentStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoSection
            onClickPrimary={goNext}
            onClickSecondary={cancel}
            data={formData}
            setData={updateFormData}
            errors={errors}
            setError={setError}
            clearError={clearError}
          />
        );
      case 2:
        return (
          <PhotosSection
            onClickPrimary={goNext}
            onClickSecondary={goBack}
            data={formData}
            setData={updateFormData}
            errors={errors}
            setError={setError}
            clearError={clearError}
          />
        );
      case 3:
        return (
          <RentDataSection
            onClickPrimary={goNext}
            onClickSecondary={goBack}
            data={formData}
            setData={updateFormData}
            errors={errors}
            setError={setError}
            clearError={clearError}
          />
        );
      case 4:
        return (
          <PropertyProof
            isSubmitting={isSubmitting}
            onClickPrimary={submit}
            onClickSecondary={goBack}
            data={formData}
            setData={updateFormData}
            errors={errors}
            setError={setError}
            clearError={clearError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <main className="flex flex-col">
        <div className="container mx-auto px-6 py-8">
          <h2 className="font-bold text-2xl">Create Clinic</h2>

          <div className="flex flex-col gap-6 justify-center items-center mt-12 max-w-3xl mx-auto sm:flex-row">
            {steps.map((step, i) => (
              <MultistepFormNavItem
                key={i}
                stepNumber={i + 1}
                label={step.label}
                fill={currentStep >= i + 1}
                arrow={i < steps.length - 1}
                className={cn(
                  "sm:flex",
                  currentStep === i + 1 ? "flex" : "hidden"
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="container mx-auto px-6 py-2">
            {renderCurrentStepComponent()}
          </div>
        </div>
      </main>
    </>
  );
}
