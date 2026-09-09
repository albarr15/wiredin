import { z } from "zod";

const ReviewSchema = z.object({
  id: z.uuid(),
  created_by: z.uuid(),
  place_id: z.uuid(),
  text: z.string().optional(),
  rating: z.number(),
  wifi_observed: z
    .enum(["UNAVAILABLE", "SLOW", "MODERATE", "FAST", "UNKNOWN"])
    .optional(),
  noise_level_observed: z
    .enum(["LOW", "MODERATE", "HIGH", "UNKNOWN"])
    .optional(),
  outlet_observed: z
    .enum(["UNAVAILABLE", "FEW", "MODERATE", "MANY", "UNKNOWN"])
    .optional(),
});

const IdParamSchema = z.object({ id: z.uuid() });

export const CreateReviewSchema = z.object({
  body: ReviewSchema.omit({ id: true }),
});

export const UpdateReviewSchema = z.object({
  body: ReviewSchema.omit({ id: true }).partial(),
  params: IdParamSchema,
});

export const DeleteReviewSchema = z.object({
  params: IdParamSchema,
});

export const GetReviewByIdSchema = z.object({
  params: z.object({ id: z.uuid() }),
});

export const GetReviewsByPlaceIdSchema = z.object({
  params: z.object({ place_id: z.uuid() }),
});
