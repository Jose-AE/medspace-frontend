import React from "react";
import Avatar from "@/components/Avatar/Avatar";
import { Review } from "@/types/reviewTypes";
import { dateToString } from "@/lib/dateUtils";

interface Props {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reviews</h2>
      </div>

      <div className="grid gap-6">
        {reviews.map((review, i) => (
          <div key={i} className="border-b border-gray-200 pb-6">
            <div className="flex items-center gap-4 mb-3">
              <Avatar className=" size-10" imageUrl={review.userPfpPath} />

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{review.userName}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 ">★</span>
                    <span className="font-medium">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {dateToString(review.createdAt)}
                </p>
              </div>
            </div>
            <p className="text-gray-700">{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
