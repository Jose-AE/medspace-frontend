import React from "react";
import Image from "@/components/Image";
import { ClinicPreview } from "@/types/clinicTypes";
import Link from "next/link";

interface Props {
  userFullName: string;
  clinics: ClinicPreview[];
}

export default function ListingsSection({ clinics, userFullName }: Props) {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{userFullName}&#39;s Listings</h2>
      </div>

      {clinics.length === 0 && (
        <div className="text-gray-500">No listings available.</div>
      )}

      {clinics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.map((clinic, i) => (
            <Link
              key={i}
              href={"/main/clinic/" + clinic.id}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-2">
                <Image
                  src={clinic.mainPhotoPath}
                  alt={`Listing ${clinic.displayName}`}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={300}
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <h3 className="font-medium">{clinic.displayName}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>

                    <span className="ml-1">{clinic.averageRating}</span>
                  </div>
                </div>
                <p className="mt-1">
                  <span className="font-semibold">${clinic.pricePerDay}</span>{" "}
                  day
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
