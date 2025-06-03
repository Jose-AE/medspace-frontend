import { RentRequestService } from "@/services/RentRequestService";
import { RENT_REQUEST_STATUS } from "@/types/rentRequestTypes";
import TenantRentRequestList from "./TenantRequestList";

export default async function TenantRequestFetcher() {
  const rentRequests = await RentRequestService.fetchRentRequestsByUser(
    RENT_REQUEST_STATUS.PENDING
  );
  return <TenantRentRequestList rentRequests={rentRequests} />;
}
