import { z } from "zod";

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

export type AmenityType = z.infer<typeof AmenitySchema>;
