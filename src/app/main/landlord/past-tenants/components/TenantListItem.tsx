"use client";

import Button from "@/components/Button";
import Link from "next/link";
import Avatar from "@/components/Avatar/Avatar";
import { dateToString } from "@/lib/dateUtils";

type Props = {
  tenantId: number;
  tenantName: string;
  startDate: Date;
  endDate: Date;
  tenantPfpPath: string;
  onRate: (tenantId: number) => void;
};

export default function TenantListItem({
  onRate,
  tenantId,
  endDate,
  startDate,
  tenantPfpPath,
  tenantName
}: Props) {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8 items-center justify-between shadow-sm  rounded-lg md:flex-row md:justify-between md:px-6 md:py-2 ">
      <div className="flex flex-row items-center gap-4">
        <Avatar className={"my-2"} imageUrl={tenantPfpPath} />

        <Link
          href={"/main/user/" + tenantId}
          className="text-lg font-normal hover:underline text-blue-500 transition-colors duration-200"
        >
          {tenantName}
        </Link>
      </div>
      <div className="hidden md:flex items-center text-gray-700">
        <p className="text-base font-medium">
          Rented from{" "}
          <span className="font-bold">{dateToString(startDate)}</span> to{" "}
          <span className="font-bold">{dateToString(endDate)}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Button variant="primary" onClick={() => onRate(tenantId)}>
          Rate
        </Button>
      </div>
    </div>
  );
}
