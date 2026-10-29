import {
  AirVentIcon,
  BookIcon,
  BriefcaseIcon,
  CookieIcon,
  DogIcon,
  GlassWaterIcon,
  MapPinnedIcon,
  CoffeeIcon,
  PlugIcon,
  SquareParkingIcon,
  ToiletIcon,
  WifiIcon,
  type LucideIcon,
  CircleEllipsisIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  CAFE: CoffeeIcon,
  COWORKING_SPACE: BriefcaseIcon,
  LIBRARY: BookIcon,
  OTHER: MapPinnedIcon,
};

type AmenityConfigBaseType = {
  label: string;
  icon: LucideIcon;
};

export type AmenityConfigType = {
  label: string;
  icon: LucideIcon;
  remainingAmenities?: AmenityConfigBaseType[];
};

// TODO: include noise level once api response is updated
export const amenityConfig = (
  amenity: string,
  remainingAmt?: number,
  remainingAmenities?: AmenityConfigBaseType[],
): AmenityConfigType => {
  const config: Record<string, { label: string; icon: LucideIcon }> = {
    has_wifi: { label: "Free Wi-Fi", icon: WifiIcon },
    has_outlets: { label: "Outlets", icon: PlugIcon },
    has_parking: { label: "Parking", icon: SquareParkingIcon },
    has_toilets: { label: "Restroom", icon: ToiletIcon },
    has_free_snacks: { label: "Free Snacks", icon: CookieIcon },
    has_free_water: { label: "Free Water", icon: GlassWaterIcon },
    has_airconditioning: { label: "Air Conditioning", icon: AirVentIcon },
    is_pet_friendly: { label: "Pet-Friendly", icon: DogIcon },
  };

  if (amenity === "more") {
    return {
      label: `+${remainingAmt ?? 0} more`,
      icon: CircleEllipsisIcon,
      remainingAmenities: remainingAmenities,
    };
  }

  return config[amenity];
};

export function formatAddress(address: Record<string, any> | null): string {
  if (!address) return "...";
  const ignoredKeys = new Set(["id", "place_id", "created_at", "updated_at"]);
  return Object.entries(address)
    .filter(([key, val]) => !ignoredKeys.has(key) && Boolean(val))
    .map(([, val]) => val)
    .join(", ");
}
