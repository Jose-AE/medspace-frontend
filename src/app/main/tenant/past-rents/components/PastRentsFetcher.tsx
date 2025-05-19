import React from "react";
import PastRentList from "./PastRentList";
import { RentRequestService } from "@/services/RentRequestService";

export default async function PastRentsFetcher() {
  const pastRentRequests =
    await RentRequestService.fetchRentRequestsByUser("ACCEPTED");

  return <PastRentList pastRentRequests={pastRentRequests} />;
}
