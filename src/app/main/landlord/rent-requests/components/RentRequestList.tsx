"use client";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import LandlordRequestItem from "./LandlordRequestItem";
import { RentRequestService } from "@/services/RentRequestService";
import toast from "react-hot-toast";
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

  const handleRejectRequest = async (requestId: number) => {
    try {
      await RentRequestService.rejectRentRequest(requestId);
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      toast.success("Rent request rejected successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error rejecting rent request:", error);
    }
  };

  const handleAcceptRequest = async (requestId: number) => {
    try {
      await RentRequestService.acceptRentRequest(requestId);
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      toast.success("Rent request accepted successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error accepting rent request:", error);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {requests.map((request) => (
        <LandlordRequestItem
          key={request.id}
          specialistName={request.tenantFullName}
          date={request.startDate}
          officeName={request.clinicDisplayName}
          onClickAccept={() => {
            handleAcceptRequest(request.id);
          }}
          onClickDeny={() => {
            handleRejectRequest(request.id);
          }}
          specialistPhoto={request.tenantProfilePictureUrl}
        />
      ))}
    </div>
  );
}
