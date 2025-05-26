import React from "react";
import TenantList from "./TenantList";
import { RentRequestService } from "@/services/RentRequestService";

export default async function TenantFetcher() {
  const pastRentRequests =
    await RentRequestService.fetchRentRequestsByLandlord("ACCEPTED");

  return <TenantList pastRentRequests={pastRentRequests} />;
}
