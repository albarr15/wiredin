import type { AmenityType } from "@/types/AmenityType";
import {
  VolumeIcon,
  Volume1Icon,
  Volume2Icon,
  WifiIcon,
  Plug,
  CarIcon,
  ToiletIcon,
  DoorOpenIcon,
  AirVentIcon,
  DogIcon,
  GlassWaterIcon,
  CookieIcon,
} from "lucide-react";

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

export const AMENITY_BADGES: BadgeConfig[] = [
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
