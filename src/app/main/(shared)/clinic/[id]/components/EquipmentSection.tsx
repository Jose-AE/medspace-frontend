import React from "react";
import { ClinicEquipment, ClinicEquipmentType } from "@/types/clinicTypes";
import { IconType } from "react-icons";
import { TbLineScan, TbUserScan } from "react-icons/tb";
import { RiSurgicalMaskLine } from "react-icons/ri";
import { MdOutlineLocalPharmacy, MdWheelchairPickup } from "react-icons/md";
import { LuScanFace } from "react-icons/lu";
import { PiTestTubeBold } from "react-icons/pi";
import { constToTitleCase } from "@/lib/textUtils";
import { LiaXRaySolid } from "react-icons/lia";

interface Props {
  equipment: ClinicEquipment[];
}

export default function EquipmentSection({ equipment }: Props) {
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
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">What this clinic offers</h2>
      <div className="grid grid-cols-2 gap-4">
        {equipment.map((item) => {
          const Icon = iconMap[item.type as ClinicEquipmentType];
          return (
            <Equipment
              key={item.id}
              icon={Icon}
              name={constToTitleCase(item.type)}
            />
          );
        })}
      </div>
    </div>
  );
}

function Equipment({ icon: Icon, name }: { icon: IconType; name: string }) {
  return (
    <div className="flex items-center">
      <Icon className="w-6 h-6" />
      <span className="ml-2">{name}</span>
    </div>
  );
}
