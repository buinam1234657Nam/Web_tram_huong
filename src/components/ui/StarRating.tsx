import React from "react";
import { Star } from "lucide-react";

export function StarRating({
  rating,
  count,
  size = "sm",
  showScore = true,
}: {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  showScore?: boolean;
}) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`Đánh giá ${rating} trên 5 sao`}>
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((index) => {
          const filled = rating >= index;
          const half = rating >= index - 0.5 && rating < index;

          return (
            <Star
              key={index}
              className={`${starSize} ${
                filled
                  ? "fill-amber-500 text-amber-500"
                  : half
                  ? "fill-amber-500/50 text-amber-500"
                  : "text-stone-300"
              }`}
            />
          );
        })}
      </div>
      {showScore && (
        <span className="text-xs font-semibold text-charcoal">{rating.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-xs text-muted">({count})</span>
      )}
    </div>
  );
}
