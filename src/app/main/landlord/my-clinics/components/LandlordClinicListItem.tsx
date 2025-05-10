"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiShare } from "react-icons/hi2";

import Button from "@/components/Button";
import Link from "next/link";
import Avatar from "@/components/Avatar/Avatar";

type ClinicListItemProps = {
  /** Id of the clinic */
  clinicId: number;
  /** Name of the clinic */
  clinicName: string;
  /** State of the clinic */
  clinicLocation: string;
  /** Url to the clinic's main image */
  clinicImageURL: string;
  /** Function to call when the requests button is clicked */
  onDelete: (clinicId: number) => void;
  /** Function to call when the edit button is clicked */
  onEdit: (clinicId: number) => void;
  /** Function to call when the share button is clicked */
  onShare: (clinicId: number) => void;
};

const LandlordClinicListItem = ({
  clinicId,
  clinicName,
  clinicImageURL,
  clinicLocation,
  onDelete,
  onEdit,
  onShare
}: ClinicListItemProps) => {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8 items-center justify-between shadow-sm  rounded-lg md:flex-row md:justify-between md:px-6 md:py-2 ">
      <div className="flex flex-row items-center gap-4">
        <Avatar className={"my-2"} imageUrl={clinicImageURL} />

        <Link
          href={"/main/clinic/" + clinicId}
          className="text-lg font-normal hover:underline text-blue-500 transition-colors duration-200"
        >
          {clinicName}
        </Link>
      </div>
      <div className="hidden md:block">
        <p className="text-md ">{clinicLocation}</p>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <HiShare
          className="mr-2 cursor-pointer w-6 h-6 fill-gray-600 transition-transform duration-200 hover:-rotate-12"
          onClick={() => onShare(clinicId)}
        />

        <Button
          icon={<MdEdit />}
          variant="outline"
          onClick={() => onEdit(clinicId)}
        >
          Edit
        </Button>

        <Button
          icon={<MdDelete />}
          variant="danger"
          onClick={() => onDelete(clinicId)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default LandlordClinicListItem;
