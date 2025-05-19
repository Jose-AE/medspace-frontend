import React, { Suspense } from "react";

import ListSkeleton from "@/components/ListSuspenseSkeleton/ListSuspenseSkeleton";
import PastRentsFetcher from "./components/PastRentsFetcher";

export default async function page() {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mr-5">Past Rents</h1>
        <div className="mt-12">
          <Suspense fallback={<ListSkeleton />}>
            <PastRentsFetcher />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
