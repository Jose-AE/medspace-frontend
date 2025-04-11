"use client";
import { FaStar } from "react-icons/fa";

type ReviewStarsProps = {
  rating: number;
};

const ReviewStars = ({ rating }: ReviewStarsProps) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar key={index} className={`${index < rating ? "text-yellow-500" : "text-gray-300"}`} />
      ))}
    </div>
  );
};

export default ReviewStars;