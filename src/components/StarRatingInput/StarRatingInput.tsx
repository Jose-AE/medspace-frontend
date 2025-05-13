"use client";

import { useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

type StarRatingProps = {
  defaultRating?: number;
  onChange?: (rating: number) => void;
};

export default function StarRatingInput({
  defaultRating = 0,
  onChange
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ratingInputRef = useRef<HTMLInputElement>(null);
  const ratingValueRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    ratingInputRef.current!.value = newRating.toString();

    onChange?.(newRating);
  };

  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleHoverOut = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="rating-container" style={{ padding: 0 }}>
      <div className="stars" style={{ display: "flex", gap: 4 }}>
        {[...Array(5)].map((_, i) => {
          const isFilled =
            hoveredIndex !== null ? i <= hoveredIndex : i < rating;
          return (
            <div
              key={i}
              className={`star ${isFilled ? "clickedStars" : ""}`}
              onClick={() => handleClick(i)}
              onMouseOver={() => handleHover(i)}
              onMouseOut={handleHoverOut}
              style={{ fontSize: 32, cursor: "pointer" }}
            >
              {isFilled ? (
                <FaStar color="orange" size={28} />
              ) : (
                <FaRegStar color="orange" size={28} />
              )}
            </div>
          );
        })}
      </div>
      <input
        type="hidden"
        ref={ratingInputRef}
        defaultValue={defaultRating.toString()}
      />
      <div ref={ratingValueRef} style={{ marginTop: 12 }} />
      <style jsx>{`
        .star:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
