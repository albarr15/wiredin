import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export default function StarRating(props: StarRatingProps) {
  return (
    <div className="flex gap-2 mb-2">
      <span>{props.rating}</span>
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < Math.round(props.rating) ? "orange" : "gray"}
            color="none"
          />
        ))}
      </div>
      <span className="font-light">({props.reviewCount} reviews)</span>
    </div>
  );
}
