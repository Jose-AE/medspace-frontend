"use client";
import Button from "@/components/Button";
import SelectInput from "@/components/SelectInput";
import TextInput from "@/components/TextInput";
import { useForm } from "@/hooks/useForm";
import { constToTitleCase } from "@/lib/textUtils";
import { ClinicService } from "@/services/ClinicService";
import { PythonService } from "@/services/PythonService";
import { Clinic, CLINIC_CATEGORIES, EditClinicData } from "@/types/clinicTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  placeholders: Clinic;
  clinicId: number;
}

export default function EditForm({ clinicId, placeholders }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestedPrice, setSuggestedPrice] = React.useState<number | null>(
    null
  );
  const [isLoadingSuggestion, setIsLoadingSuggestion] = React.useState(true);

  const { formData: data, updateFormData: setData } = useForm<EditClinicData>({
    displayName: placeholders.displayName,
    category: placeholders.category,
    pricePerDay: placeholders.pricePerDay,
    maxStayDays: placeholders.maxStayDays,
    description: placeholders.description
  });

  const categoryOptions = CLINIC_CATEGORIES.map((cat) => ({
    value: cat,
    name: constToTitleCase(cat)
  }));

  function isFormValid() {
    if (!data.displayName?.trim()) {
      toast.error("Display Name is required");
      return false;
    }

    if (data.pricePerDay == null || data.pricePerDay <= 0) {
      toast.error("Price Per Day must be greater than 0");
      return false;
    }
    if (data.maxStayDays == null || data.maxStayDays <= 0) {
      toast.error("Maximum Stay Days must be greater than 0");
      return false;
    }
    if (!data.description?.trim()) {
      toast.error("Description is required");
      return false;
    }
    return true;
  }

  async function onSubmit() {
    if (!isFormValid()) return;
    setIsLoading(true);

    try {
      await ClinicService.updateClinicById(clinicId, data);
      toast.success("Clinic updated successfully");
      router.push(`/main/landlord/my-clinics`);
    } catch (error) {
      console.error("Error updating clinic:", error);
      toast.error("Failed to update clinic. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function fetchSuggestedPrice() {
      try {
        setIsLoadingSuggestion(true);
        const suggestion = await PythonService.predictPrice(
          placeholders.addressZip,
          placeholders.size
        );
        setSuggestedPrice(suggestion);
      } catch (error) {
        console.error("Error fetching price suggestion:", error);
        setSuggestedPrice(125); // fallback to default
      } finally {
        setIsLoadingSuggestion(false);
      }
    }

    fetchSuggestedPrice();
  }, [clinicId, placeholders.addressZip, placeholders.size]);

  return (
    <div className="flex flex-col gap-6 min-w-5xl  ">
      <div className="flex gap-4">
        <div className="flex-1 ">
          <TextInput
            label="Display Name"
            value={data.displayName}
            onChange={(e) => {
              setData("displayName", e.target.value);
            }}
          />
        </div>

        <div className="flex-1 ">
          <SelectInput
            label="Clinic Category"
            values={categoryOptions}
            onChange={(e) => setData("category", e.target.value)}
            value={data.category}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <TextInput
            type="number"
            label="Price Per Day (in USD)"
            onChange={(e) => {
              setData(
                "pricePerDay",
                e.target.value ? Number(e.target.value) : ""
              );
            }}
            value={data.pricePerDay ?? ""}
            min={1}
            className="w-full"
          />
          <p className="text-sm text-gray-600 mt-1">
            {isLoadingSuggestion
              ? "💡 Loading price suggestion..."
              : suggestedPrice
                ? `💡 Suggested: $${suggestedPrice} (based on nearby clinics)`
                : "💡 Insufficient clinic data in this area to estimate a recommended price."}
          </p>
        </div>
        <div className="flex-1">
          <TextInput
            label="Maximum Stay (in days)"
            type="number"
            onChange={(e) => {
              setData(
                "maxStayDays",
                e.target.value ? Number(e.target.value) : ""
              );
            }}
            value={data.maxStayDays ?? ""}
            min={1}
          />
        </div>
      </div>

      <div className="flex gap-12 ">
        <TextInput
          className=" resize-none"
          isTextArea={true}
          label="Description"
          value={data.description}
          onChange={(e) => {
            setData("description", e.target.value);
          }}
        />
      </div>

      <div className="flex space-between items-center mt-4 gap-2">
        <Link
          className={`w-1/2 ${isLoading && "pointer-events-none"}`}
          href={`/main/landlord/my-clinics`}
        >
          <Button disabled={isLoading} variant="outline" className="w-full">
            Cancel
          </Button>
        </Link>
        <Button isLoading={isLoading} className="w-1/2" onClick={onSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
