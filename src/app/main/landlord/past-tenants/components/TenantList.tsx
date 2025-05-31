"use client";

import React from "react";
import TenantListItem from "./TenantListItem";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import ReviewModal from "./ReviewModal";

interface Props {
  pastRentRequests: RentRequestPreview[];
}

export default function TenantList({ pastRentRequests }: Props) {
  const [rateModalIsOpen, setRateModalIsOpen] = React.useState(false);
  const [tenantId, setTenantId] = React.useState<number | null>(null);

  function handleRate(tenantId: number) {
    setTenantId(tenantId);
    setRateModalIsOpen(true);
  }

  if (pastRentRequests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-lg font-semibold">
          You don&apos;t have any past tenants.
        </p>
        <p className="text-sm text-gray-500">
          When a tenant finishes their rental period, you will see them here.
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
        tenantId={tenantId}
      />
      <div className="flex flex-col gap-4">
        {pastRentRequests.length === 0 && (
          <div className="text-gray-500">No past tenants available.</div>
        )}

        {pastRentRequests.map((req, i) => (
          <TenantListItem
            onRate={handleRate}
            tenantName={req.tenantFullName}
            tenantPfpPath={req.tenantProfilePictureUrl}
            endDate={req.endDate}
            startDate={req.startDate}
            tenantId={req.tenantId}
            key={i}
          />
        ))}
      </div>
    </>
  );
}
