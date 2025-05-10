"use client";

import React, { useState } from "react";
import { Share, Heart } from "lucide-react";

interface Props {
  title: string;
  rating: number | null;
  city: string;
}

export default function TitleSection({ city, rating, title }: Props) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title || "Consultorio médico en renta",
          text: "Consulta este espacio disponible",
          url: window.location.href
        });
      } else {
        alert("Sharing is not supported on this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold mb-2">
        {title || "Consultorio médico en renta"}
      </h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            {rating !== null ? (
              <>
                <span className="text-yellow-500 mr-1">★</span>
                <span className="font-medium">{rating || "5.0"} </span>
              </>
            ) : (
              <span className="text-gray-400">No ratings yet</span>
            )}
          </div>
          <span className="text-gray-600">{city || "CDMX"}</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleShare}
            className="flex items-center mr-4 text-gray-600 hover:text-black transition cursor-pointer"
          >
            <Share size={16} className="mr-1" /> Share
          </button>

          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="flex items-center text-gray-600 hover:text-red-500 transition cursor-pointer"
          >
            <Heart
              size={16}
              className={`mr-1 ${isFavorited ? "text-red-500 fill-red-500" : ""}`}
            />
            {isFavorited ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
