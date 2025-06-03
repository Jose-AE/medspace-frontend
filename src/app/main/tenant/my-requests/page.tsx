import { Suspense } from "react";
import ClinicsListSkeleton from "@/components/ListSuspenseSkeleton/ListSuspenseSkeleton";
import TenantRequestFetcher from "./components/TenantRequestFetcher";

export default function RentRequestsPage() {
  return (
    <main className="flex flex-col">
      <div className="container mx-auto px-6 py-8">
        <h2 className="font-bold text-2xl">Sent Rent Requests</h2>

        <div className="mt-12 ">
          <Suspense fallback={<ClinicsListSkeleton />}>
            <TenantRequestFetcher />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
