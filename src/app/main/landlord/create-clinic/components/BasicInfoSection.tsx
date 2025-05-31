import {
  CLINIC_CATEGORIES,
  CLINIC_EQUIPMENTS,
  ClinicEquipmentType
} from "@/types/clinicTypes";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import { constToTitleCase } from "@/lib/textUtils";
import MapInput from "../steps/../../../../../components/MapInput/MapInput";
import toast from "react-hot-toast";
import StepSectionBase, { StepSectionProps } from "./StepSectionBase";
import ClinicEquipmentTag from "./ClinicEquipmentTag";
import { useMapAddress } from "@/hooks/useMapAddress";
import { Coordinates } from "@/hooks/useMapAddress";
import { useEffect } from "react";
import { IconType } from "react-icons";
import { LiaXRaySolid } from "react-icons/lia";
import { TbLineScan, TbUserScan } from "react-icons/tb";
import { LuScanFace } from "react-icons/lu";
import { PiTestTubeBold } from "react-icons/pi";
import { RiSurgicalMaskLine } from "react-icons/ri";
import { MdOutlineLocalPharmacy, MdWheelchairPickup } from "react-icons/md";

const INITIAL_COORDS = {
  latitude: 19.4326,
  longitude: -99.1332
} as const;

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

  const {
    address,
    addressCity,
    addressState,
    addressZip,
    addressCountry,
    updateLocation: setCoordsOnly
  } = useMapAddress(INITIAL_COORDS);

  useEffect(() => {
    setData("addressLatitude", INITIAL_COORDS.latitude);
    setData("addressLongitude", INITIAL_COORDS.longitude);

    setCoordsOnly(INITIAL_COORDS);
  }, [setData, setCoordsOnly]);

  const DEFAULT_EQUIPMENT = "DEFAULT_SELECT";
  const equipmentsOptions = [
    { name: "Select", value: DEFAULT_EQUIPMENT },
    ...CLINIC_EQUIPMENTS.map((eq) => ({
      value: eq,
      name: constToTitleCase(eq)
    }))
  ];

  useEffect(() => {
    if (address && address !== "Dirección no encontrada") {
      setData("addressStreet", address);
      setData("addressCity", addressCity);
      setData("addressState", addressState);
      setData("addressZip", addressZip);
      setData("addressCountry", addressCountry);
    }
  }, [address, addressCity, addressState, addressZip, addressCountry, setData]);

  const updateLocation = (coords: Coordinates) => {
    setData("addressLatitude", coords.latitude);
    setData("addressLongitude", coords.longitude);
    setCoordsOnly(coords);
  };

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

    if (!data.addressStreet?.trim()) {
      setError("addressStreet", "Address could not be determined");
      isValid = false;
    }
    if (!data.addressZip?.trim()) {
      setError("addressZip", "ZIP Code cannot be empty");
      isValid = false;
    } else if (!/^\d{5}$/.test(data.addressZip)) {
      setError("addressZip", "ZIP Code must be exactly 5 digits");
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
          <div className="flex-1">
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
          <div className="flex-1">
            <SelectInput
              label="Clinic Category"
              values={categoryOptions}
              onChange={(e) => setData("category", e.target.value)}
              value={data.category}
            />
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex-1">
            <TextInput
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
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full h-[250px]">
              <MapInput
                onLocationChange={updateLocation}
                className="w-full h-full rounded-lg "
              />
            </div>
            <div className="flex gap-4">
              <TextInput
                label="Address"
                value={data.addressStreet ?? ""}
                onChange={(e) => {
                  clearError("addressStreet");
                  setData("addressStreet", e.target.value);
                }}
                invalidMessage={errors.addressStreet}
                isInvalid={!!errors.addressStreet}
              />
              <div className="w-1/3">
                <TextInput
                  label="ZIP Code"
                  value={data.addressZip ?? ""}
                  onChange={(e) => {
                    clearError("addressZip");
                    setData("addressZip", e.target.value);
                  }}
                  invalidMessage={errors.addressZip}
                  isInvalid={!!errors.addressZip}
                />
              </div>
            </div>
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
