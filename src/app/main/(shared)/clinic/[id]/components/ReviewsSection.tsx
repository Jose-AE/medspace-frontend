"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Avatar from "@/components/Avatar/Avatar";
import { Review } from "@/types/reviewTypes";
import { dateToString } from "@/lib/dateUtils";

interface Props {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="mb-6 relative">
      <h2 className="text-xl font-bold mb-4">
        What others think about this clinic{" "}
      </h2>
      {/* Rating */}

      {reviews.length === 0 && <div>No reviews yet.</div>}

      {reviews.length > 0 && (
        <div>
          {/* Rating and reviews count */}
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-medium">
              {reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0}{" "}
              Average
            </span>
            <span className="mx-1">·</span>
            <span>{reviews.length} reviews</span>
          </div>

          <div className="relative overflow-hidden">
            {/* Arrows */}
            {reviews.length > 0 && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Scrollable container */}
            {reviews.length === 0 ? (
              <div className="p-4 text-gray-500 italic">No reviews yet.</div>
            ) : (
              <div
                ref={scrollRef}
                className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar p-2 gap-4"
              >
                {reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="flex-shrink-0 snap-start"
      style={{ width: "calc(51% - 0.5rem)" }} // 0.5rem = half of gap-4 (1rem)
    >
      <div className="flex border border-gray-300 p-4 rounded-lg shadow-sm ml-1">
        <Avatar
          imageUrl={review?.userPfpPath}
          className="mr-3 h-10 w-10 flex-shrink-0"
        />

        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center mb-1">
            <p className="font-medium">{review?.userName || "Odaddy Aracio"}</p>
            <span className="text-yellow-500 mr-1 ml-2">★</span>
            <span className="font-medium">{review?.rating || "5.0"}</span>
          </div>
          <p className="text-gray-500 text-sm">
            {dateToString(review.createdAt)}
          </p>

          <p className="mt-1 break-words">
            {review?.body || "Nice place to stay!"}
          </p>
        </div>
      </div>
    </div>
  );
}
