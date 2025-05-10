"use client";

import { useRentRequests } from "@/hooks/useRentRequests";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import { FaSpinner } from "react-icons/fa";
import LandlordRequestItem from "./components/LandlordRequestItem";

export default function RentRequestsPage() {
  const { rentRequests, loading } = useRentRequests();

  return (
    <main className="flex flex-col">
      <div className="container mx-auto px-6 py-8">
        <h2 className="font-bold text-2xl">Rent Requests</h2>

        <div className="mt-12 ">
          <RentRequestList
            rentRequests={rentRequests}
            loading={loading}
            onClickAccept={(id) => console.log("Accept", id)}
            onClickDeny={(id) => console.log("Deny", id)}
          />
        </div>
      </div>
    </main>
  );
}

interface RentRequestListProps {
  rentRequests: RentRequestPreview[];
  loading: boolean;
  onClickAccept: (id: string) => void;
  onClickDeny: (id: string) => void;
}

const RentRequestList = ({
  rentRequests,
  loading,
  onClickAccept,
  onClickDeny
}: RentRequestListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <FaSpinner className="animate-spin text-gray-500 text-4xl" />
      </div>
    );
  }
  if (rentRequests.length === 0) {
    return <div>No rent requests available.</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      {rentRequests.map((request) => (
        <LandlordRequestItem
          key={request.id}
          specialistName={request.tenantFullName}
          date={request.startDate}
          officeName={request.clinicDisplayName}
          onClickAccept={() => onClickAccept(request.id)}
          onClickDeny={() => onClickDeny(request.id)}
          specialistPhoto={request.tenantProfilePictureUrl}
        />
      ))}
    </div>
  );
};
