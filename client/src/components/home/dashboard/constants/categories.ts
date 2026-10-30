import {
  Building2,
  Coffee,
  BookOpen,
  Laptop,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface PlaceCategory {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const PLACE_CATEGORIES: PlaceCategory[] = [
  { value: "place", label: "Place", icon: Building2 },
  { value: "cafe", label: "Cafe", icon: Coffee },
  { value: "library", label: "Library", icon: BookOpen },
  { value: "coworking", label: "Coworking", icon: Laptop },
  { value: "others", label: "Others", icon: Sparkles },
];
