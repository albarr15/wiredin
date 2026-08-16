import {
  AirVentIcon,
  CarIcon,
  CircleEllipsisIcon,
  Clock,
  Coffee,
  CookieIcon,
  DogIcon,
  DoorOpenIcon,
  GlassWaterIcon,
  Heart,
  MapPin,
  PhilippinePeso,
  Plug,
  Star,
  ToiletIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
  WifiIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "./ui/card";
import { z } from "zod";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

const AmenitySchema = z.object({
  id: z.uuid(),
  place_id: z.uuid(),
  has_wifi: z.boolean(),
  wifi_quality: z.enum(["UNAVAILABLE", "SLOW", "MODERATE", "FAST", "UNKNOWN"]),
  has_outlets: z.boolean(), // fixed: was missing ()
  outlet_availability: z.enum([
    "UNAVAILABLE",
    "FEW",
    "MODERATE",
    "MANY",
    "UNKNOWN",
  ]),
  noise_level: z.enum(["LOW", "MODERATE", "HIGH", "UNKNOWN"]),
  has_parking: z.boolean(),
  parking_availability: z.enum([
    "UNAVAILABLE",
    "LIMITED",
    "AVAILABLE",
    "UNKNOWN",
  ]),
  has_toilets: z.boolean(),
  has_meeting_rooms: z.boolean(),
  meeting_room_count: z.number(),
  has_free_snacks: z.boolean(),
  has_free_water: z.boolean(),
  has_airconditioning: z.boolean(),
  is_pet_friendly: z.boolean(),
});

const PlaceSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  address_id: z.uuid(),
  created_by: z.uuid(),
  category: z.enum(["CAFE", "COWORKING_SPACE", "LIBRARY", "OTHER"]),

  // optionals
  pricing_tier: z
    .string()
    .regex(/^\d+-\d+$/, {
      error:
        "The pricing_tier must follow the format: [lowest_price]-[highest_price]",
    })
    .optional(),
  image_url: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.url().optional(),
  ),
  phone: z
    .string()
    .regex(/^\+639\d{9}$/, {
      error: "The phone must follow the format: +639000000000 (no spaces)",
    })
    .optional(),
  email_address: z.email().optional(),
  facebook_url: z.url().optional(),
  instagram_url: z.url().optional(),
  tiktok_url: z.url().optional(),
  website_url: z.url().optional(),
});

type AmenityType = z.infer<typeof AmenitySchema>;
type PlaceType = z.infer<typeof PlaceSchema>;

interface PlaceCardProps extends React.ComponentPropsWithoutRef<"div"> {
  place: PlaceType;
  amenity?: AmenityType;
}
const NOISE_ICON: Record<AmenityType["noise_level"], typeof VolumeIcon> = {
  LOW: VolumeIcon,
  MODERATE: Volume1Icon,
  HIGH: Volume2Icon,
  UNKNOWN: VolumeIcon,
};

const NOISE_LABEL: Record<AmenityType["noise_level"], string> = {
  LOW: "Low Noise",
  MODERATE: "Moderate Noise",
  HIGH: "High Noise",
  UNKNOWN: "Noise Unknown",
};

type BadgeConfig = {
  key: string;
  show: (a: AmenityType) => boolean;
  icon: (a: AmenityType) => React.ElementType;
  label: (a: AmenityType) => string;
};
const AMENITY_BADGES: BadgeConfig[] = [
  {
    key: "wifi",
    show: (a) => a.has_wifi,
    icon: () => WifiIcon,
    label: () => "With Wifi",
  },
  {
    key: "outlets",
    show: (a) => a.has_outlets,
    icon: () => Plug,
    label: () => "With Outlets",
  },
  {
    key: "noise",
    show: (a) => a.noise_level !== "UNKNOWN",
    icon: (a) => NOISE_ICON[a.noise_level],
    label: (a) => NOISE_LABEL[a.noise_level],
  },
  {
    key: "parking",
    show: (a) => a.has_parking,
    icon: () => CarIcon,
    label: () => "Parking",
  },
  {
    key: "toilets",
    show: (a) => a.has_toilets,
    icon: () => ToiletIcon,
    label: () => "Toilets",
  },
  {
    key: "meeting_rooms",
    show: (a) => a.has_meeting_rooms,
    icon: () => DoorOpenIcon,
    label: () => "Meeting Rooms",
  },
  {
    key: "aircon",
    show: (a) => a.has_airconditioning,
    icon: () => AirVentIcon,
    label: () => "Airconditioning",
  },
  {
    key: "pet_friendly",
    show: (a) => a.is_pet_friendly,
    icon: () => DogIcon,
    label: () => "Pet-friendly",
  },
  {
    key: "free_water",
    show: (a) => a.has_free_water,
    icon: () => GlassWaterIcon,
    label: () => "Free Water",
  },
  {
    key: "free_snacks",
    show: (a) => a.has_free_snacks,
    icon: () => CookieIcon,
    label: () => "Free Snacks",
  },
];

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
          alt=""
          className="ml-4 size-32 object-cover shrink-0 rounded-md"
        />
        <div className="w-full">
          <CardHeader>
            <div className="flex gap-2 items-start">
              <Coffee size={16} strokeWidth={2} />

              <CardTitle>{place.name}</CardTitle>
            </div>

            <div className="flex gap-2 mb-2">
              <span>4.8</span>
              <div className="flex">
                <Star fill="orange" color="none" size={16} />
                <Star fill="orange" color="none" size={16} />
                <Star fill="orange" color="none" size={16} />
                <Star fill="orange" color="none" size={16} />
                <Star fill="orange" color="none" size={16} />
              </div>
              <span className="font-light">(8 reviews)</span>
            </div>

            <CardAction>
              <Button variant={"secondary"}>
                <Heart />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex gap-2 flex-col">
            <div className="flex align-items gap-2">
              <MapPin size={16} strokeWidth={1.5} /> {place.address_id}
            </div>
            <div className="flex w-2/3 justify-between">
              <div className="flex align-items gap-2">
                <Clock size={16} strokeWidth={1.5} /> Scheuklde
              </div>
              <div className="flex align-items gap-2">
                <PhilippinePeso size={16} strokeWidth={1.5} />{" "}
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
