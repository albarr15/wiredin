import { Badge } from "@/components/ui/badge";
import { AMENITY_CONFIG } from "./placeCard.constants";

export function PlaceAmenities({ amenities }: { amenities: string[] }) {
  if (!amenities.length) return null;

  return (
    <div className="flex flex-wrap gap-2 w-full mt-2">
      {amenities.map((key) => {
        const config = AMENITY_CONFIG[key];
        if (!config) return null;
        const Icon = config.icon;

        return (
          <Badge
            key={key}
            variant="default"
            className="flex items-center gap-1.5 py-1"
          >
            <Icon size={14} />
            <span>{config.label}</span>
          </Badge>
        );
      })}
    </div>
  );
}
