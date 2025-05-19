"use client";

import Button from "@/components/Button";
import Link from "next/link";
import Avatar from "@/components/Avatar/Avatar";

type Props = {
  clinicName: string;
  clinicId: number;
  landlordId: number;
  landlordName: string;

  clinicPhoto: string;
  onRate: (landlordId: number, clinicId: number) => void;
};

export default function PastRentListItem({
  onRate,
  clinicId,
  landlordId,
  landlordName,
  clinicPhoto,
  clinicName
}: Props) {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8 items-center justify-between shadow-sm  rounded-lg md:flex-row md:justify-between md:px-6 md:py-2 ">
      <div className="flex flex-row items-center gap-4">
        <Avatar className={"my-2"} imageUrl={clinicPhoto} />

        <Link
          href={"/main/clinic/" + clinicId}
          className="text-lg font-normal hover:underline text-blue-500 transition-colors duration-200"
        >
          {clinicName}
        </Link>
      </div>
      <div className="hidden md:flex items-center text-gray-700">
        <p className="text-base font-medium">Rented from </p>
        <Link
          href={"/main/user/" + landlordId}
          className="ml-1 text-sm font-normal hover:underline text-blue-500 transition-colors duration-200"
        >
          {landlordName}
        </Link>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Button variant="primary" onClick={() => onRate(1, clinicId)}>
          Rate
        </Button>
      </div>
    </div>
  );
}
