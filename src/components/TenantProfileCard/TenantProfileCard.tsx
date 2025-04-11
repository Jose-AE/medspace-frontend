"use client";
import { HiOutlinePhone } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";

import Button from "@/components/Button";
import ReviewStars from "@/components/ReviewStars";

type ProfileCardProps = {
  /** Url of the tenant's profile image */
  tenantImageURL: string;
  /** Name of the tenant */
  tenantName: string;
  /** Speciality of the tenant */
  tenantSpeciality: string;
  /** Phone number of the tenant */
  tenantPhoneNumber: string;
  /** Email of the tenant */
  tenantEmail: string;
  /** Rating of the tenant */
  tenantRating: number;
  /** Number of rent agreements of the tenant */
  numberOfRentAgreements: number;
  /** Biography of the tenant */
  tenantBiography: string;
  /** Function to call when the edit button is clicked */
  onClickEdit: () => void;
  /** Variant of the profile card */
  variant?: "primary" | "public";
};

const TenantProfileCard = ({
  tenantImageURL,
  tenantName,
  tenantSpeciality,
  tenantPhoneNumber,
  tenantEmail,
  tenantRating,
  numberOfRentAgreements,
  tenantBiography,
  onClickEdit,
  variant = "primary",
}: ProfileCardProps) => {
  return (
    <div className="flex flex-1 flex-col gap-4 items-center justify-between shadow-[0_0_5px_rgba(0,0,0,0.1)] rounded-sm">
      <div className="flex flex-col items-center gap-4 bg-blue-500 p-4 w-full rounded-t-sm">
        <img
          src={tenantImageURL}
          alt="Tenant"
          className="w-24 h-24 object-cover rounded-full"
        />
      </div>
      <p className="text-3xl font-bold">{tenantName}</p>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-light">{tenantSpeciality}</p>
      </div>
      <div className="flex flex-row items-center gap-6">
        <div className="flex items-center gap-2">
          <HiOutlinePhone />
          <span>{tenantPhoneNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineEnvelope />
          <span>{tenantEmail}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ReviewStars rating={tenantRating} />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-light">{numberOfRentAgreements} rents</p>
      </div>
      <div className="flex flex-col gap-4 px-6">
        <p className="text-md font-light">{tenantBiography}</p>
      </div>
      {variant === "primary" ? (
        <div className="flex flex-col gap-4 mb-4">
          <Button onClick={onClickEdit}>Edit Profile</Button>
        </div>
      ) : (
        <div className="mb-4" /> /* Spacer div when no edit button */
      )}
    </div>
  );
};

export default TenantProfileCard;
