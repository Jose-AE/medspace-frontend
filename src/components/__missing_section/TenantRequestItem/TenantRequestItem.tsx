import React from "react";
import Image from "next/image"; // Importa el componente Image de Next.js
import Button from "@/components/Button";

interface TenantRequestItemProps {
  officeName: string;
  date: string;
  onClickCancel: () => void;
  officePhoto?: string;
}

const TenantRequestItem: React.FC<TenantRequestItemProps> = ({
  officeName,
  date,
  onClickCancel,
  officePhoto
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg w-full max-w-4xl border border-gray-200">
      {/* Office photo */}
      {officePhoto && (
        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
          <Image
            src={officePhoto}
            alt="Office photo"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
      )}

      {/* Office details */}
      <div className="flex-1">
        <strong className="text-base font-medium">{officeName}</strong>
        <div className="text-sm text-gray-500">{date}</div>
      </div>

      {/* Cancel button */}
      <Button
        onClick={onClickCancel}
        variant="danger" // Use the danger variant for the red button
      >
        Cancel
      </Button>
    </div>
  );
};

export default TenantRequestItem;
