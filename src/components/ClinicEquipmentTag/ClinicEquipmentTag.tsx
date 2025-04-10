"use client";

type ClinicEquipmentTagProps = {
  /** Name of the equipment */
  name: string;
  /** Callback to delete equipment */
  onDelete: () => void;
};

const ClinicEquipmentTag = ({ name, onDelete }: ClinicEquipmentTagProps) => {
  return (
    <div
      onClick={onDelete}
      className="relative group bg-gray-500 text-white px-8 py-0.5 text-center rounded-2xl border-2 border-gray-700 border-dashed text-sm cursor-pointer max-w-max"
    >
      {name}
      <p className="absolute top-1/2 -translate-y-1/2 right-2 text-white rounded-full w-4 h-4 text-md items-center justify-center group-hover:flex hidden">
        x
      </p>
    </div>
  );
};

export default ClinicEquipmentTag;
