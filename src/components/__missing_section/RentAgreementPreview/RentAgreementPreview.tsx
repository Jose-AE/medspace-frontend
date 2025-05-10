import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

interface RentAgreementPreviewProps {
  clinicName: string;
  rentalDate: string;
  schedule: string;
  onMessageClick: () => void;
  onReviewClick: () => void;
  images?: string[];
}

const RentAgreementPreview: React.FC<RentAgreementPreviewProps> = ({
  clinicName,
  rentalDate,
  schedule,
  onMessageClick,
  onReviewClick,
  images = []
}) => {
  return (
    <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6 flex flex-col gap-1">
      {/* Section: Title */}
      <div className="text-xl font-semibold text-gray-800">{clinicName}</div>

      {/* Section: Date and Schedule */}
      <div className="text-sm text-gray-500">
        {rentalDate} | {schedule}
      </div>

      {/* Section: Images (optional) */}
      {images.length > 0 && (
        <div className="flex gap-4 overflow-x-auto">
          {images.slice(0, 3).map((src, idx) => (
            <div
              key={idx}
              className="relative w-48 h-32 rounded overflow-hidden"
            >
              <Image
                src={src}
                alt={`Clinic image ${idx + 1}`}
                layout="fill" // Hace que la imagen llene el contenedor
                objectFit="cover" // Ajusta la imagen para que se recorte correctamente
                className="rounded"
              />
            </div>
          ))}
        </div>
      )}

      {/* Section: Buttons */}
      <div className="flex gap-4 mt-auto">
        <Button
          onClick={onMessageClick}
          variant="outline"
          className="flex-1 h-14 text-base"
        >
          Message Landlord
        </Button>
        <Button
          onClick={onReviewClick}
          variant="primary"
          className="flex-1 h-14 text-base"
        >
          Review Landlord
        </Button>
      </div>
    </div>
  );
};

export default RentAgreementPreview;
