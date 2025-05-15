"use client";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import { useState } from "react";
import TenantRequestItem from "./TenantRequestItem";

interface RentRequestListProps {
  rentRequests: RentRequestPreview[];
}

export default function TenantRentRequestList({
  rentRequests
}: RentRequestListProps) {
  const [requests, setRequests] = useState(rentRequests);

  if (requests.length === 0) {
    return <div>No pending rent requests.</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      {requests.map((request) => (
        <TenantRequestItem
          key={request.id}
          setRequests={setRequests}
          requestPreview={request}
        />
      ))}
    </div>
  );
}
