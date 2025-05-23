"use client";

import React from "react";
import PastRentListItem from "./PastRentListItem";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import ReviewModal from "./ReviewModal";

interface Props {
  pastRentRequests: RentRequestPreview[];
}

export default function PastRentList({ pastRentRequests }: Props) {
  const [rateModalIsOpen, setRateModalIsOpen] = React.useState(false);
  const [landlordId, setLandlordId] = React.useState<number | null>(null);
  const [clinicId, setClinicId] = React.useState<number | null>(null);

  function handleRate(landlordId: number, clinicId: number) {
    setLandlordId(landlordId);
    setClinicId(clinicId);
    setRateModalIsOpen(true);
  }

  if (pastRentRequests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-lg font-semibold">
          You don&apos;t have any past rents.
        </p>
        <p className="text-sm text-gray-500">
          When a rental period is completed, you will see it here.
        </p>
      </div>
    );
  }

  return (
    <>
      <ReviewModal
        isOpen={rateModalIsOpen}
        onClose={() => {
          setRateModalIsOpen(false);
        }}
        clinicId={clinicId}
        landlordId={landlordId}
      />
      <div className="flex flex-col gap-4">
        {pastRentRequests.length === 0 && (
          <div className="text-gray-500">No past tenants available.</div>
        )}

        {pastRentRequests.map((req, i) => (
          <PastRentListItem
            onRate={handleRate}
            clinicId={req.clinicId}
            clinicName={req.clinicDisplayName}
            clinicPhoto={req.clinicMainPhotoPath}
            landlordId={req.landlordId}
            landlordName={req.landlordFullName}
            key={i}
          />
        ))}
      </div>
    </>
  );
}
