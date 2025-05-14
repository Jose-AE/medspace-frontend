import React, { Suspense } from "react";

import ListSkeleton from "@/components/ListSuspenseSkeleton/ListSuspenseSkeleton";
import TenantFetcher from "./components/TenantFetcher";

export default async function page() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex flex-row items-center">
        <h1 className="text-2xl font-bold mr-5">Past Tenants</h1>
      </div>

      <Suspense fallback={<ListSkeleton />}>
        <TenantFetcher />
      </Suspense>
    </div>
  );
}
