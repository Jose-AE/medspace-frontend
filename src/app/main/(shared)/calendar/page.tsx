import { RentRequestService } from "@/services/RentRequestService";
import CalendarDisplay from "./components/CalendarDisplay";

export default async function CalendarPage() {
  const acceptedRentRequests =
    await RentRequestService.fetchRentRequestsByUser("ACCEPTED");

  return (
    <main className="flex flex-col">
      <div className="container mx-auto px-6 py-8">
        <h2 className="font-bold text-2xl">Rent Calendar</h2>
        <CalendarDisplay rentRequests={acceptedRentRequests} />
      </div>
    </main>
  );
}
