import ClinicImageInput from "./ClinicImageInput";
import StepSectionBase, { StepSectionProps } from "./StepSectionBase";
import toast from "react-hot-toast";

export default function PhotosSection({
  onClickPrimary,
  onClickSecondary,
  data,
  setData,
  setError,
  clearError,
  errors
}: StepSectionProps) {
  const handlePhotoChange = (index: number, file: File | null) => {
    clearError("photos");
    const updatedPhotos = [...(data.photos || [])];
    updatedPhotos[index] = file;
    setData("photos", updatedPhotos);
  };

  const validateData = () => {
    let isValid = true;
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB

    const missingPhoto = data.photos?.some((photo) => !photo);
    const oversizedPhoto = data.photos?.some(
      (photo) => photo && photo.size > MAX_SIZE
    );

    if (missingPhoto) {
      setError("photos", "Please upload all photos");
      isValid = false;
    } else if (oversizedPhoto) {
      setError("photos", "One or more photos exceed the 2MB size limit");
      isValid = false;
    }

    return isValid;
  };

  const onNavigate = (handler: () => void) => {
    if (!validateData()) {
      toast.error("Please fix errors in the form");
      return;
    }
    handler();
  };

  const label = errors.photos || "Upload a photo";

  return (
    <StepSectionBase
      onClickPrimary={() => onNavigate(onClickPrimary)}
      onClickSecondary={() => onNavigate(onClickSecondary)}
      primaryLabel="Continue"
      secondaryLabel="Back"
    >
      <div className="grid grid-cols-[auto_auto] gap-12 items-end justify-center">
        {data.photos?.map((photo, index) => (
          <ClinicImageInput
            key={index}
            image={photo}
            onChange={(file) => handlePhotoChange(index, file)}
            label={index == 0 ? label : null}
            isInvalid={!!errors.photos}
          />
        )) || null}
      </div>
    </StepSectionBase>
  );
}
