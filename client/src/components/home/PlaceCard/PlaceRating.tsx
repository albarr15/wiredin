import { StarIcon } from "lucide-react";
import type { PlaceRatingData } from "./PlaceCard";

export function PlaceRating({ reviewCount, rating }: PlaceRatingData) {
  if (reviewCount <= 0) {
    return (
      <div className="flex gap-2 items-center text-muted-foreground text-sm">
        <span>No ratings yet</span>
      </div>
    );
  }

  const roundedRating = Math.round(rating);

  return (
    <div className="flex gap-2 items-center! text-sm font-medium">
      <span className="text-sm font-normal">{rating.toFixed(1)}</span>
      <div
        className="flex gap-0.5"
        aria-label={`Rated ${rating.toFixed(1)} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            className={
              i < roundedRating
                ? "fill-amber-400 text-amber-400"
                : " fill-muted-foreground/20 text-muted-foreground/20"
            }
            size={16}
          />
        ))}
      </div>
      <span className="text-sm hidden sm:block font-normal">
        ({reviewCount} reviews)
      </span>
      <span className="text-sm block sm:hidden font-normal">
        ({reviewCount})
      </span>
    </div>
  );
}
