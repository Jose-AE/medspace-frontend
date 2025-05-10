import TextInput from "@/components/TextInput";
import StepSectionBase, { StepSectionProps } from "./StepSectionBase";
import { constToTitleCase } from "@/lib/textUtils";
import toast from "react-hot-toast";
import { useState } from "react";
import DatePicker from "@/components/DatePicker";
import { ClinicDailyAvailabilityInput } from "@/types/clinicTypes";
import ClinicAvailabilityInput from "./ClinicAvailabilityInput";

export default function RentDataSection({
  onClickPrimary,
  onClickSecondary,
  data,
  setData,
  setError,
  clearError,
  errors
}: StepSectionProps) {
  const [availabilityErrors, setAvailabilityErrors] = useState({
    availabilities: data.availabilities!.map(() => ""),
    atLeastOneAvailabilityActive: ""
  });

  const handleAvailabilityChange = (
    dayOfWeek: string,
    newData: Partial<ClinicDailyAvailabilityInput>
  ) => {
    setAvailabilityErrors((prev) => ({
      ...prev,
      atLeastOneAvailabilityActive: "",
      availabilities: prev.availabilities.map((err, index) =>
        index ===
        data.availabilities!.findIndex(
          (availability) => availability.dayOfWeek === dayOfWeek
        )
          ? ""
          : err
      )
    }));

    setData(
      "availabilities",
      data.availabilities?.map((availability) =>
        availability.dayOfWeek === dayOfWeek
          ? { ...availability, ...newData }
          : availability
      )
    );
  };

  const validateData = () => {
    const newErrors: typeof availabilityErrors = {
      availabilities: data.availabilities!.map(() => ""),
      atLeastOneAvailabilityActive: ""
    };
    let isValid = true;

    if (data.pricePerDay == null || data.pricePerDay <= 0) {
      setError("pricePerDay", "Price per day must be greater than 0");
      isValid = false;
    }

    if (data.maximumStayInDays == null || data.maximumStayInDays <= 0) {
      setError("maximumStayInDays", "Maximum stay must be greater than 0");
      isValid = false;
    }

    if (!data.availableFromDate || !data.availableToDate) {
      setError("availableFromDate", "Please select a valid range");
      isValid = false;
    }

    let numOfActiveAvailabilities = 0;

    data.availabilities?.forEach((availability, index) => {
      if (availability.isActive) {
        numOfActiveAvailabilities++;
        if (!availability.fromTime || !availability.toTime) {
          newErrors.availabilities[index] =
            "Please select valid from and to times";
          isValid = false;
        } else if (availability.fromTime >= availability.toTime) {
          newErrors.availabilities[index] = "From time must be before to time";
          isValid = false;
        }
      }
    });

    if (numOfActiveAvailabilities === 0) {
      newErrors.atLeastOneAvailabilityActive =
        "Please select at least one availability";
      isValid = false;
    }

    setAvailabilityErrors(newErrors);
    return isValid;
  };

  const onNavigate = (handler: () => void) => {
    if (!validateData()) {
      toast.error("Please fix errors in the form");
      return;
    }
    handler();
  };

  return (
    <StepSectionBase
      onClickPrimary={() => onNavigate(onClickPrimary)}
      onClickSecondary={() => onNavigate(onClickSecondary)}
      primaryLabel="Continue"
      secondaryLabel="Back"
    >
      <div className="flex flex-col gap-8">
        <div className="flex gap-12">
          <div className="flex-1">
            <TextInput
              label="Price Per Day (in USD)"
              type="number"
              min={1}
              value={data.pricePerDay ?? ""}
              onChange={(e) => {
                clearError("pricePerDay");
                setData(
                  "pricePerDay",
                  e.target.value ? Number(e.target.value) : null
                );
              }}
              isInvalid={!!errors.pricePerDay}
              invalidMessage={errors.pricePerDay}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Maximum Stay (in days)"
              type="number"
              onChange={(e) => {
                clearError("maximumStayInDays");
                setData(
                  "maximumStayInDays",
                  e.target.value ? Number(e.target.value) : null
                );
              }}
              value={data.maximumStayInDays ?? ""}
              min={1}
              isInvalid={!!errors.maximumStayInDays}
              invalidMessage={errors.maximumStayInDays}
            />
          </div>
        </div>
        <div className="flex gap-10 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col">
            <p className="mb-4 block text-sm font-medium text-gray-800 ">
              Date Availability
            </p>
            {errors.availableFromDate && (
              <p className="text-sm text-red-500 mb-4">
                {errors.availableFromDate}
              </p>
            )}
            <DatePicker
              mode="range"
              selectedDate={{
                from: data.availableFromDate ?? undefined,
                to: data.availableToDate ?? undefined
              }}
              onSelectDate={(dates) => {
                clearError("availableFromDate");
                setData("availableFromDate", dates?.from ?? null);
                setData("availableToDate", dates?.to ?? null);
              }}
            />
          </div>
          <div className="flex flex-col flex-3">
            <p className="mb-4 block text-sm font-medium text-gray-800 ">
              Daily Availabilities
            </p>
            {availabilityErrors.atLeastOneAvailabilityActive && (
              <p className="text-sm text-red-500 mb-4">
                {availabilityErrors.atLeastOneAvailabilityActive}
              </p>
            )}
            <div className="flex flex-col gap-6">
              {data.availabilities?.map((availability) => (
                <div key={availability.dayOfWeek}>
                  <ClinicAvailabilityInput
                    dayOfWeek={constToTitleCase(availability.dayOfWeek)}
                    onChangeFromTime={(newTime) =>
                      handleAvailabilityChange(availability.dayOfWeek, {
                        fromTime: newTime
                      })
                    }
                    onChangeToTime={(newTime) =>
                      handleAvailabilityChange(availability.dayOfWeek, {
                        toTime: newTime
                      })
                    }
                    isActive={availability.isActive}
                    onChangeActive={(checked) =>
                      handleAvailabilityChange(availability.dayOfWeek, {
                        isActive: checked
                      })
                    }
                    fromTime={availability.fromTime}
                    toTime={availability.toTime}
                    error={
                      availabilityErrors.availabilities[
                        data.availabilities!.indexOf(availability)
                      ]
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StepSectionBase>
  );
}
