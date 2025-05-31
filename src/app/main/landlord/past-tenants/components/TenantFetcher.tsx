import React from "react";
import TenantList from "./TenantList";
import { RentRequestService } from "@/services/RentRequestService";

export default async function TenantFetcher() {
  const pastRentRequests =
    await RentRequestService.fetchRentRequestsByUser("ACCEPTED");

  return <TenantList pastRentRequests={pastRentRequests} />;
}
