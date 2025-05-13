"use client";
import Button from "@/components/Button";
import React from "react";
import Image from "@/components/Image";
import toast from "react-hot-toast";
import { RentRequestService } from "@/services/RentRequestService";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import { FaInfoCircle } from "react-icons/fa";

interface LandlordRequestItemProps {
  specialistName: string;
  officeName: string;
  specialistPhoto?: string;
  requestId: number;
  setRequests: React.Dispatch<React.SetStateAction<RentRequestPreview[]>>;
}

const RequestDetails = ({
  specialistName,
  specialistPhoto
}: {
  specialistName: string;
  specialistPhoto?: string;
}) => (
  <div className="flex items-center space-x-2">
    {specialistPhoto && (
      <Image
        placeholderImage="/pfp_placeholder.png"
        src={specialistPhoto}
        alt="Specialist photo"
        className="h-8 w-8 rounded-full object-cover"
        width={32}
        height={32}
      />
    )}
    <div className="flex flex-col">
      <strong className="text-base font-medium">{specialistName}</strong>
    </div>
  </div>
);

const RequestActions = ({
  onClickAccept,
  onClickDeny,
  isLoading
}: {
  onClickAccept: () => void;
  onClickDeny: () => void;
  isLoading: boolean;
}) => (
  <div className="flex gap-2">
    <Button onClick={onClickAccept} variant="primary" disabled={isLoading}>
      Accept
    </Button>
    <Button onClick={onClickDeny} variant="danger" disabled={isLoading}>
      Deny
    </Button>
  </div>
);

const LandlordRequestItem: React.FC<LandlordRequestItemProps> = ({
  specialistName,
  officeName,
  specialistPhoto,
  requestId,
  setRequests
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRejectRequest = async () => {
    try {
      setIsLoading(true);
      await RentRequestService.rejectRentRequest(requestId);
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      toast.success("Rent request rejected successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      setIsLoading(true);
      await RentRequestService.acceptRentRequest(requestId);
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      toast.success("Rent request accepted successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg w-full max-w-6xl mx-auto">
      <RequestDetails
        specialistName={specialistName}
        specialistPhoto={specialistPhoto}
      />
      <div className="flex-1 ml-4 text-gray-700 flex items-center gap-3">
        <p>{officeName}</p>
        <FaInfoCircle className="text-gray-400 text-2xl cursor-pointer" />
      </div>
      <RequestActions
        isLoading={isLoading}
        onClickAccept={handleAcceptRequest}
        onClickDeny={handleRejectRequest}
      />
    </div>
  );
};

export default LandlordRequestItem;
