import React, { Suspense } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { MdAddBox } from "react-icons/md";
import ClinicFetcher from "./components/ClinicFetcher";
import ListSkeleton from "@/components/ListSuspenseSkeleton/ListSuspenseSkeleton";

export default async function page() {
  return (
    <main className="flex flex-col">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-row items-center mb-8">
          <h1 className="text-2xl font-bold mr-5">My Clinics</h1>
          <Link href={"/main/landlord/create-clinic"}>
            <Button icon={<MdAddBox />} className="rounded-xl px-3">
              Create
            </Button>
          </Link>
        </div>

        <Suspense fallback={<ListSkeleton />}>
          <ClinicFetcher />
        </Suspense>
      </div>
    </main>
  );
}
