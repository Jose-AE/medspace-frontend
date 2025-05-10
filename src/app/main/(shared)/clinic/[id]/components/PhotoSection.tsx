import React from "react";
import Image from "@/components/Image";
import { ClinicPhoto } from "@/types/clinicTypes";

interface Props {
  photos: ClinicPhoto[];
}

export default async function PhotoSection({ photos }: Props) {
  const primaryPhoto = photos?.find((p) => p.isPrimary);
  const otherPhotos = photos?.filter((p) => !p.isPrimary);

  return (
    <div className="grid grid-cols-4 grid-rows-2 h-96 gap-2 mb-6">
      {/* Main Photo 1 */}
      <div className="col-span-2 row-span-2">
        <Image
          src={primaryPhoto?.path}
          alt="Main photo 1"
          width={400}
          height={320}
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>

      {/* Main Photo 2 */}
      <div className="col-span-2 row-span-1">
        <Image
          src={otherPhotos?.[0]?.path}
          alt="Main photo 2"
          width={400}
          height={160}
          className="w-full h-full object-cover rounded-tr-lg"
        />
      </div>

      {/* Small Photo 1 */}
      <div className="col-span-1 row-span-1">
        <Image
          src={otherPhotos?.[1].path}
          alt="Small photo 1"
          width={200}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Small Photo 2 */}
      <div className="col-span-1 row-span-1">
        <Image
          src={otherPhotos?.[2]?.path}
          alt="Small photo 2"
          width={200}
          height={160}
          className="w-full h-full object-cover rounded-br-lg"
        />
      </div>
    </div>
  );
}
