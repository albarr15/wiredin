import { z } from "zod";

const AddressSchema = z.object({
  place_id: z.uuid(),
  street: z.string().trim().min(1),
  city: z.string().trim().min(1),
  province: z.string().trim().min(1),
  country: z.string().trim().min(1),
  zip_code: z.string().trim().min(1),
});

const IdParamSchema = z.object({ place_id: z.uuid() });

export const CreateAddressSchema = z.object({
  body: AddressSchema.omit({ place_id: true }),
});

export const UpdateAddressSchema = z.object({
  body: AddressSchema.omit({ place_id: true }).partial(),
  params: IdParamSchema,
});

export const DeleteAddressSchema = z.object({
  params: IdParamSchema,
});

export const getAddressSchema = z.object({
  params: IdParamSchema,
});
