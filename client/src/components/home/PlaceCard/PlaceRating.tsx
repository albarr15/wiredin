import { StarIcon } from "lucide-react";

export function PlaceRating({ rating }: { rating: number }) {
    if (rating <= 0) {
        return (
            <div className="flex gap-2 items-center text-muted-foreground text-sm">
                <StarIcon className="fill-muted text-muted" size={16} />
                <span>No ratings yet</span>
            </div>
        );
    }

    const rounded = Math.round(rating);

    return (
        <div className="flex gap-2 items-center text-sm font-medium">
            <span>{rating.toFixed(1)}</span>
            <div className="flex gap-0.5" aria-label={`Rated ${rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                        key={i}
                        className={i < rounded ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}
                        size={16}
                    />
                ))}
            </div>
        </div>
    );
}
