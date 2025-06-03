"use client";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import LandlordRequestItem from "./LandlordRequestItem";
import { useState } from "react";

interface RentRequestListProps {
  rentRequests: RentRequestPreview[];
}

export default function RentRequestList({
  rentRequests
}: RentRequestListProps) {
  const [requests, setRequests] = useState(rentRequests);

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-lg font-semibold">
          You don&apos;t have any rent requests.
        </p>
        <p className="text-sm text-gray-500">
          When a tenant requests to rent your property, you will see their
          request here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {requests.map((request) => (
        <LandlordRequestItem
          key={request.id}
          setRequests={setRequests}
          requestPreview={request}
        />
      ))}
    </div>
  );
}
