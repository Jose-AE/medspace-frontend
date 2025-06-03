import {
  CLINIC_CATEGORIES,
  CLINIC_EQUIPMENTS,
  ClinicEquipmentType
} from "@/types/clinicTypes";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import { constToTitleCase } from "@/lib/textUtils";
import MapInput, {
  LocationData
} from "../steps/../../../../../components/MapInput/MapInput";
import toast from "react-hot-toast";
import StepSectionBase, { StepSectionProps } from "./StepSectionBase";
import ClinicEquipmentTag from "./ClinicEquipmentTag";
import { IconType } from "react-icons";
import { LiaXRaySolid } from "react-icons/lia";
import { TbLineScan, TbUserScan } from "react-icons/tb";
import { LuScanFace } from "react-icons/lu";
import { PiTestTubeBold } from "react-icons/pi";
import { RiSurgicalMaskLine } from "react-icons/ri";
import { MdOutlineLocalPharmacy, MdWheelchairPickup } from "react-icons/md";

const DEFAULT_COORDINATES = {
  longitude: -99.132390928256,
  latitude: 19.43121854346279
};

export default function BasicInfoSection({
  onClickPrimary,
  onClickSecondary,
  data,
  setData,
  setError,
  clearError,
  errors
}: StepSectionProps) {
  const categoryOptions = CLINIC_CATEGORIES.map((cat) => ({
    value: cat,
    name: constToTitleCase(cat)
  }));
  const DEFAULT_EQUIPMENT = "DEFAULT_SELECT";
  const equipmentsOptions = [
    { name: "Select", value: DEFAULT_EQUIPMENT },
    ...CLINIC_EQUIPMENTS.map((eq) => ({
      value: eq,
      name: constToTitleCase(eq)
    }))
  ];

  const handleAddEquipment = (eq: ClinicEquipmentType | "DEFAULT_SELECT") => {
    if (eq != DEFAULT_EQUIPMENT && !data.equipments?.includes(eq)) {
      setData("equipments", [...(data.equipments ?? []), eq]);
    }
  };

  const handleDeleteEquipment = (eq: string) => {
    setData("equipments", [...(data.equipments ?? []).filter((e) => e !== eq)]);
  };

  const validateData = () => {
    let isValid = true;
    if (!data.displayName?.trim()) {
      setError("displayName", "Display name cannot be empty");
      isValid = false;
    }

    if (!data.description?.trim()) {
      setError("description", "Description cannot be empty");
      isValid = false;
    }

    if (data.size == null || data.size <= 0) {
      setError("size", "Size must be greater than 0");
      isValid = false;
    }

    if (data.addressLatitude == null || data.addressLongitude == null) {
      setError("addressCountry", "Please select a valid location on the map");
      isValid = false;
    }

    return isValid;
  };

  const onNavigateNext = () => {
    if (!validateData()) {
      toast.error("Please fix errors in the form.");
      return;
    }
    onClickPrimary();
  };

  function onLocationChange(locationData: LocationData) {
    setData("addressStreet", locationData.displayName);
    setData("addressCity", locationData.city);
    setData("addressState", locationData.state);
    setData("addressZip", locationData.zipCode);
    setData("addressCountry", locationData.country);
    setData("addressLatitude", locationData.coordinates.latitude);
    setData("addressLongitude", locationData.coordinates.longitude);
  }

  const iconMap: Record<ClinicEquipmentType, IconType> = {
    X_RAY: LiaXRaySolid,
    CT_SCAN: TbUserScan,
    MRI: TbLineScan,
    ULTRASOUND: LuScanFace,
    LABORATORY: PiTestTubeBold,
    SURGICAL_THEATER: RiSurgicalMaskLine,
    PHARMACY: MdOutlineLocalPharmacy,
    REHABILITATION: MdWheelchairPickup
  };

  return (
    <StepSectionBase
      onClickPrimary={onNavigateNext}
      onClickSecondary={onClickSecondary}
      primaryLabel={"Continue"}
      secondaryLabel={"Cancel"}
    >
      <div className="flex flex-col gap-6">
        <div className="flex gap-12">
          <div className="flex-1 ">
            <TextInput
              label="Display Name"
              value={data.displayName}
              onChange={(e) => {
                clearError("displayName");
                setData("displayName", e.target.value);
              }}
              invalidMessage={errors.displayName}
              isInvalid={!!errors.displayName}
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

        <div className="flex gap-12 ">
          <div className="flex-1">
            <TextInput
              className=" resize-none"
              isTextArea={true}
              label="Description"
              value={data.description}
              onChange={(e) => {
                clearError("description");
                setData("description", e.target.value);
              }}
              invalidMessage={errors.description}
              isInvalid={!!errors.description}
            />
          </div>
          <div className="flex-1 flex flex-col ">
            <label
              className={`flex mt-4 mb-2 items-center justify-between text-sm font-medium text-gray-800 `}
            >
              Location
            </label>
            <MapInput
              defaultCoordinates={DEFAULT_COORDINATES}
              onLocationChange={onLocationChange}
              className="w-full h-full rounded-lg "
            />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1">
            <SelectInput
              label="Equipments"
              values={equipmentsOptions}
              onChange={(e) =>
                handleAddEquipment(e.target.value as ClinicEquipmentType)
              }
              value={"Select"}
            />
          </div>
          <div className="flex-1">
            <TextInput
              type="number"
              label="Size (in sq m)"
              value={data.size ?? ""}
              min="1"
              onChange={(e) => {
                clearError("size");
                setData("size", e.target.value ? Number(e.target.value) : null);
              }}
              invalidMessage={errors.size}
              isInvalid={!!errors.size}
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          {data.equipments?.map((eq, idx) => (
            <ClinicEquipmentTag
              key={idx}
              icon={iconMap[eq as ClinicEquipmentType]}
              name={constToTitleCase(eq)}
              onDelete={() => {
                handleDeleteEquipment(eq);
              }}
            />
          ))}
        </div>
      </div>
    </StepSectionBase>
  );
}
