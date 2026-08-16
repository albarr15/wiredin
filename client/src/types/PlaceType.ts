import { z } from "zod";

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

export type PlaceType = z.infer<typeof PlaceSchema>;
