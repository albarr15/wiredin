import { z } from "zod";

const AmenitySchema = z.object({
  place_id: z.uuid(),
  has_wifi: z.boolean(),
  wifi_quality: z.enum(["UNAVAILABLE", "SLOW", "MODERATE", "FAST", "UNKNOWN"]),
  has_outlets: z.boolean(),
  outlet_availability: z.enum([
    "UNAVAILABLE",
    "FEW",
    "MODERATE",
    "MANY",
    "UNKNOWN",
  ]),
  outlet_count: z.number().int().nonnegative().optional(),
  noise_level: z.enum(["LOW", "MODERATE", "HIGH", "UNKNOWN"]),
  has_parking: z.boolean().optional(),
  parking_availability: z
    .enum(["UNAVAILABLE", "LIMITED", "AVAILABLE", "UNKNOWN"])
    .optional(),
  has_toilets: z.boolean().optional(),
  has_meeting_rooms: z.boolean().optional(),
  meeting_room_count: z.number().int().nonnegative().optional(),
  has_free_snacks: z.boolean().optional(),
  has_free_water: z.boolean().optional(),
  has_airconditioning: z.boolean().optional(),
  is_pet_friendly: z.boolean().optional(),
});

const IdParamSchema = z.object({ place_id: z.uuid() });

export const CreateAmenitySchema = z.object({
  body: AmenitySchema.omit({ place_id: true }),
});

export const UpdateAmenitySchema = z.object({
  body: AmenitySchema.omit({ place_id: true }).partial(),
  params: IdParamSchema,
});

export const DeleteAmenitySchema = z.object({
  params: IdParamSchema,
});

export const GetAmenitySchema = z.object({
  params: z.object({ place_id: z.uuid() }),
});

export type Amenity = z.infer<typeof AmenitySchema>;
export type WifiQuality = Amenity["wifi_quality"];
export type NoiseLevel = Amenity["noise_level"];
export type OutletAvailability = Amenity["outlet_availability"];
export type CreateAmenityInput = z.infer<typeof CreateAmenitySchema>["body"];
export type UpdateAmenityInput = z.infer<typeof UpdateAmenitySchema>["body"];
