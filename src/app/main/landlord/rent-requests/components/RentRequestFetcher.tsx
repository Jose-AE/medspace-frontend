import { RentRequestService } from "@/services/RentRequestService";
import { RENT_REQUEST_STATUS } from "@/types/rentRequestTypes";
import RentRequestList from "./RentRequestList";

export default async function RentRequestFetcher() {
  const rentRequests = await RentRequestService.fetchRentRequestsByUser(
    RENT_REQUEST_STATUS.PENDING
  );

  return <RentRequestList rentRequests={rentRequests} />;
}
