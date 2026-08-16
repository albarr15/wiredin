import {
  CircleEllipsisIcon,
  Clock,
  Coffee,
  Heart,
  MapPin,
  PhilippinePeso,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "./ui/card";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import type { AmenityType } from "@/types/AmenityType";
import type { PlaceType } from "@/types/PlaceType";
import { AMENITY_BADGES } from "./amenity-badges";
import StarRating from "./star-rating";

interface PlaceCardProps extends React.ComponentPropsWithoutRef<"div"> {
  place: PlaceType;
  amenity?: AmenityType;
}

export default function PlaceCard({
  place,
  amenity,
  ...props
}: PlaceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const VISIBLE_LIMIT = 3;
  const PRIORITY_KEYS = ["wifi", "outlets", "noise"];

  const activeBadges = amenity
    ? AMENITY_BADGES.filter((b) => b.show(amenity)).sort((a, b) => {
        const aPriority = PRIORITY_KEYS.indexOf(a.key);
        const bPriority = PRIORITY_KEYS.indexOf(b.key);
        // both in priority list -> sort by priority order
        if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
        // only a is prioritized -> a comes first
        if (aPriority !== -1) return -1;
        // only b is prioritized -> b comes first
        if (bPriority !== -1) return 1;
        // neither prioritized -> keep original relative order
        return 0;
      })
    : [];
  const visibleBadges = expanded
    ? activeBadges
    : activeBadges.slice(0, VISIBLE_LIMIT);
  const hiddenCount = activeBadges.length - visibleBadges.length;

  return (
    <Card
      {...props}
      className="cursor-pointer hover:shadow-md transition-shadow duration-200 ease-in-out"
    >
      <div className="flex w-full items-start">
        <img
          src={
            place.image_url ?? "/public/images/Placeholder_view_vector.svg.png"
          }
          alt={`${place.name} photo`}
          className="ml-4 size-32 object-cover shrink-0 rounded-md"
        />
        <div className="w-full">
          <CardHeader>
            <div className="flex gap-2 items-start">
              <Coffee size={16} strokeWidth={2} />

              <CardTitle>{place.name}</CardTitle>
            </div>

            <StarRating rating={4.3} reviewCount={10} />

            <CardAction>
              <Button variant={"secondary"}>
                <Heart />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex gap-2 flex-col">
            <div className="flex gap-2">
              <MapPin className="shrink-0" size={16} strokeWidth={1.5} />{" "}
              {place.address_id}
            </div>
            <div className="flex w-2/3 justify-between">
              <div className="flex gap-2">
                <Clock className="shrink-0" size={16} strokeWidth={1.5} />{" "}
                Scheuklde
              </div>
              <div className="flex gap-2">
                <PhilippinePeso
                  className="shrink-0"
                  size={16}
                  strokeWidth={1.5}
                />
                {place.pricing_tier}
              </div>
            </div>
            {amenity && (
              <div className="w-full  flex-wrap flex gap-2 ">
                {visibleBadges.map(({ key, icon, label }) => {
                  const Icon = icon(amenity);
                  const text = label(amenity);
                  return (
                    <Badge key={key} className="font-light">
                      <Icon /> {text}
                    </Badge>
                  );
                })}
                {(hiddenCount > 0 || expanded) &&
                  activeBadges.length > VISIBLE_LIMIT && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpanded((prev) => !prev);
                      }}
                    >
                      <CircleEllipsisIcon />
                      {expanded ? "Show less" : `+${hiddenCount} more`}
                    </Badge>
                  )}
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
