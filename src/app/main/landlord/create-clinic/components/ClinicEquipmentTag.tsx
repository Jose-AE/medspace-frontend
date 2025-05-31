"use client";

import { IconType } from "react-icons";
import { FaTimes } from "react-icons/fa";

type ClinicEquipmentTagProps = {
  /** Name of the equipment */
  name: string;
  icon: IconType;
  /** Callback to delete equipment */
  onDelete: () => void;
};

const ClinicEquipmentTag = ({
  name,
  icon: Icon,
  onDelete
}: ClinicEquipmentTagProps) => {
  return (
    <div
      onClick={onDelete}
      className="relative group bg-white text-gray-800 px-4 py-2 rounded-xl border border-gray-300 shadow-sm text-sm cursor-pointer max-w-fit flex items-center gap-2 transition hover:shadow-md"
    >
      <Icon className="text-gray-500 text-base" />
      <span className="font-medium">{name}</span>
      <button
        className="w-5 h-5 cursor-pointer flex items-center justify-center text-white bg-red-500 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Remove tag"
      >
        <FaTimes className="text-xs" />
      </button>
    </div>
  );
};

export default ClinicEquipmentTag;
