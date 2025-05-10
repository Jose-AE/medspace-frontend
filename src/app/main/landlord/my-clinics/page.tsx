import React from "react";
import ClinicsList from "./components/ClinicsList";
import Link from "next/link";
import Button from "@/components/Button";
import { MdAddBox } from "react-icons/md";
import { ClinicService } from "@/services/ClinicService";

export default async function page() {
  const clinics = await ClinicService.getMyClinics();


  await new Promise(resolve => setTimeout(resolve, 10000));

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex flex-row items-center">
        <h1 className="text-2xl font-bold mr-5">My Clinics</h1>
        <Link href={"/main/landlord/create-clinic"}>
          <Button icon={<MdAddBox />} className="rounded-xl px-3">
            Create
          </Button>
        </Link>
      </div>

      <ClinicsList clinics={clinics} />
    </div>
  );
}
