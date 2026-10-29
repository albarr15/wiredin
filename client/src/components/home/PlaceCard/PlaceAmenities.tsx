import { Badge } from "@/components/ui/badge";
import { amenityConfig, type AmenityConfigType } from "./placeCard.constants";

export function PlaceAmenities({ amenities }: { amenities: string[] }) {
  if (!amenities.length) return null;

  const allAmenities: AmenityConfigType[] = amenities.map((amenity) =>
    amenityConfig(amenity),
  );

  const visibleAmenities: AmenityConfigType[] = amenities
    .slice(0, 3)
    .map((amenity) => amenityConfig(amenity));

  const remainingAmenities: AmenityConfigType[] = amenities
    .slice(3)
    .map((amenity) => amenityConfig(amenity));

  const amenityBadges: AmenityConfigType[] = [
    ...visibleAmenities,
    ...(remainingAmenities.length
      ? [amenityConfig("more", remainingAmenities.length, remainingAmenities)]
      : []),
  ];

  return (
    <>
      <div className="flex-wrap gap-2 w-full mt-2 hidden sm:flex">
        {amenityBadges.map((badge, i) => {
          const Icon = badge.icon;

          return (
            <Badge
              key={i}
              variant="default"
              className="flex items-center gap-1.5 py-1"
            >
              <Icon size={14} />
              <span>{badge.label}</span>
            </Badge>
          );
        })}
      </div>

      <div className="flex sm:hidden flex-wrap gap-2 w-full mt-2">
        {allAmenities.map((badge, i) => {
          const Icon = badge.icon;

          return (
            <Badge
              key={i}
              variant="default"
              className="flex items-center gap-0 rounded-full"
            >
              <Icon className="h-10" />
            </Badge>
          );
        })}
      </div>
    </>
  );
}
