import React from "react";
import Button from "@/components/Button";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import { RentRequestService } from "@/services/RentRequestService";
import toast from "react-hot-toast";
import { CalendarIcon } from "lucide-react";
import { dateToString } from "@/lib/dateUtils";
import Link from "next/link";
import Image from "@/components/Image";
import Modal from "@/components/Modal";
import { FaInfoCircle } from "react-icons/fa";

interface TenantRequestItemProps {
  requestPreview: RentRequestPreview;
  setRequests: React.Dispatch<React.SetStateAction<RentRequestPreview[]>>;
}

const TenantRequestItem: React.FC<TenantRequestItemProps> = ({
  requestPreview,
  setRequests
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);

  const handleRejectRequest = async () => {
    try {
      setIsLoading(true);
      await RentRequestService.cancelRentRequest(requestPreview.id);
      setRequests((prev) => prev.filter((r) => r.id !== requestPreview.id));
      toast.success("Rent request canceled successfully.");
    } catch (error) {
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

            {/* Landlord Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Landlord Info</h3>
              <div className="flex items-center gap-4">
                <Image
                  src={requestPreview.landlordProfilePictureUrl}
                  alt="Tenant photo"
                  placeholderImage="/pfp_placeholder.png"
                  className="h-10 w-10 rounded-full object-cover border"
                  width={40}
                  height={40}
                />
                <div>
                  <Link
                    href={`/main/user/${requestPreview.landlordId}`}
                    className="text-primary font-medium hover:underline"
                  >
                    {requestPreview.landlordFullName}
                  </Link>
                </div>
              </div>
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
      <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg w-full flex-1 border border-gray-200">
        {/* Office photo */}
        {requestPreview.clinicMainPhotoPath && (
          <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
            <Image
              src={requestPreview.clinicMainPhotoPath}
              alt="Clinic photo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        )}

        {/* Office details */}
        <div className="flex-1 ml-4 text-gray-700 flex items-center gap-3">
          <p>{requestPreview.clinicDisplayName}</p>
          <FaInfoCircle
            className="text-gray-400 text-2xl cursor-pointer"
            onClick={() => setIsDetailsModalOpen(true)}
          />
        </div>

        {/* Cancel button */}
        <Button
          onClick={handleRejectRequest}
          variant="danger"
          isLoading={isLoading}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default TenantRequestItem;
