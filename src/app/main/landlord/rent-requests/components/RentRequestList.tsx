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
    return <div>No rent requests available.</div>;
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
