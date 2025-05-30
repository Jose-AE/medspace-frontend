"use client";
import Button from "@/components/Button";
import React from "react";
import Image from "@/components/Image";
import toast from "react-hot-toast";
import { RentRequestService } from "@/services/RentRequestService";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "@/components/Modal";
import Link from "next/link";
import { dateToString } from "@/lib/dateUtils";
import { CalendarIcon } from "lucide-react";

interface LandlordRequestItemProps {
  setRequests: React.Dispatch<React.SetStateAction<RentRequestPreview[]>>;
  requestPreview: RentRequestPreview;
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
  setRequests,
  requestPreview
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);

  const handleRejectRequest = async () => {
    try {
      setIsLoading(true);
      await RentRequestService.rejectRentRequest(requestPreview.id);
      setRequests((prev) => prev.filter((r) => r.id !== requestPreview.id));
      toast.success("Rent request rejected successfully.");
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      setIsLoading(true);
      await RentRequestService.acceptRentRequest(requestPreview.id);
      setRequests((prev) => prev.filter((r) => r.id !== requestPreview.id));
      toast.success("Rent request accepted successfully.");
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        body={
          <div className="flex flex-col gap-6 text-gray-800">
            <h2 className="text-2xl font-semibold">Request Details</h2>

            {/* Tenant Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Tenant Info</h3>
              <div className="flex items-center gap-4">
                <Image
                  src={requestPreview.tenantProfilePictureUrl}
                  alt="Tenant photo"
                  placeholderImage="/pfp_placeholder.png"
                  className="h-10 w-10 rounded-full object-cover border"
                  width={40}
                  height={40}
                />
                <div>
                  <Link
                    href={`/main/user/${requestPreview.tenantId}`}
                    className="text-primary font-medium hover:underline"
                  >
                    {requestPreview.tenantFullName}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {requestPreview.tenantSpecialty}
                  </p>
                </div>
              </div>
              {/* Comments */}
              {requestPreview.comments && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 whitespace-pre-wrap">
                  <p className="font-medium text-gray-600 mb-1">Comments:</p>
                  {requestPreview.comments}
                </div>
              )}
            </div>

            {/* Clinic Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Clinic Info</h3>
              <div className="flex items-center gap-4">
                <Image
                  src={requestPreview.clinicMainPhotoPath}
                  alt="Clinic photo"
                  placeholderImage="/placeholder.png"
                  className="h-10 w-10 rounded-full object-cover border"
                  width={40}
                  height={40}
                />
                <div>
                  <Link
                    href={`/main/clinic/${requestPreview.clinicId}`}
                    className="text-primary font-medium hover:underline"
                  >
                    {requestPreview.clinicDisplayName}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {requestPreview.clinicAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Requested Dates */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Requested Dates</h3>
              <div className="max-h-50 overflow-y-auto pr-1 flex flex-col gap-2">
                {requestPreview.requestedDays
                  .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                  .map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
                    >
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      <span className="text-gray-700 font-medium">
                        {dateToString(new Date(day))}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        }
      />
      <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg w-full flex-1 mx-auto">
        <RequestDetails
          specialistName={requestPreview.tenantFullName}
          specialistPhoto={requestPreview.tenantProfilePictureUrl}
        />
        <div className="flex-1 ml-4 text-gray-700 flex items-center gap-3">
          <p>{requestPreview.clinicDisplayName}</p>
          <FaInfoCircle
            className="text-gray-400 text-2xl cursor-pointer"
            onClick={() => setIsDetailsModalOpen(true)}
          />
        </div>
        <RequestActions
          isLoading={isLoading}
          onClickAccept={handleAcceptRequest}
          onClickDeny={handleRejectRequest}
        />
      </div>
    </>
  );
};

export default LandlordRequestItem;
