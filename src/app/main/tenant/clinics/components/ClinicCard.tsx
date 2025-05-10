import Image from "@/components/Image";
import Link from "next/link";
import React, { useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

interface Props {
  clinicId: number;
  thumbnailURL: string;
  title: string;
  category: string;
  rating: number | null;
  rentCostPerDay: number;
  isFavorited: boolean;
}

export default function ClinicCard({
  clinicId,
  thumbnailURL,
  title,
  category,
  rating,
  rentCostPerDay,
  isFavorited: initialFavorited
}: Props) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  // Handle heart click and completely stop navigation
  const handleHeartClick = (event: React.MouseEvent) => {
    // Both stop propagation and prevent default
    event.stopPropagation();
    event.preventDefault();

    // Toggle favorite state manually instead of relying on the Toggle component
    setIsFavorited((prev) => !prev);
  };

  return (
    <Link
      href={`/main/clinic/${clinicId}`}
      className="flex flex-row bg-white cursor-pointer hover:bg-gray-50 transition-colors w-full py-4"
    >
      <div className="w-72 h-48 p-2">
        <Image
          src={thumbnailURL}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
          width={288}
          height={192}
        />
      </div>
      <div className="flex-1 px-4 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div
            onClick={handleHeartClick}
            className={`p-2 cursor-pointer ${isFavorited ? "text-red-500" : "text-gray-400 hover:text-red-500"} transition-colors`}
          >
            {isFavorited ? (
              <HiHeart className="h-8 w-8" />
            ) : (
              <HiOutlineHeart className="h-8 w-8" />
            )}
          </div>
        </div>
        <p className="text-gray-600">{category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center">
              {rating !== null ? (
                <>
                  <span className="font-semibold">{rating}</span>
                  <span className="text-yellow-400 ml-1">★</span>
                </>
              ) : (
                <span className="text-gray-400">No ratings yet</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xl font-semibold">${rentCostPerDay}</span>
            <span className="text-gray-600">/day</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
